import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const cache = new Map();
const inflight = new Map();

function cacheGet(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.t > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.v;
}

function cacheSet(key, v) {
  if (cache.size > 500) {
    const firstKey = cache.keys().next().value;
    if (firstKey !== undefined) cache.delete(firstKey);
  }
  cache.set(key, { t: Date.now(), v });
}

function priceFromKey(key) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) | 0;
  const buckets = [199, 249, 299, 349, 399, 449, 499, 549, 599, 699];
  return buckets[Math.abs(hash) % buckets.length];
}

// Open Library Subjects API uses lower-case, underscore-joined slugs.
// Map user-facing category headings to known-good subject slugs.
const SUBJECT_ALIASES = {
  "anime": "manga",
  "manga": "manga",
  "mystery": "mystery_and_detective_stories",
  "detective": "detective_and_mystery_stories",
  "business": "business",
  "history": "history",
  "thriller": "thrillers_(fiction)",
  "thrillers": "thrillers_(fiction)",
  "adventure": "adventure_stories",
  "adventure fiction": "adventure_stories",
  "drama": "drama",
  "fantasy": "fantasy_fiction",
  "science fiction": "science_fiction",
  "science and fiction": "science_fiction",
  "scifi": "science_fiction",
  "romance": "romance",
  "biography": "biography",
  "horror": "horror_tales",
  "poetry": "poetry",
  "children": "children's_stories",
  "self help": "self-help",
};

function slugifySubject(raw) {
  if (!raw) return "";
  const key = raw.toLowerCase().trim();
  if (SUBJECT_ALIASES[key]) return SUBJECT_ALIASES[key];
  return key.replace(/\s+/g, "_").replace(/[^a-z0-9_()'-]/g, "");
}

function upgradeImage(url) {
  if (!url) return url;
  let u = url.replace(/^http:\/\//, "https://");
  u = u.replace(/&edge=curl/, "");
  u = u.replace(/zoom=\d/, "zoom=1");
  return u;
}

function normalizeGoogle(item) {
  const v = item.volumeInfo || {};
  const a = item.accessInfo || {};
  const s = item.saleInfo || {};
  const id = item.id || `g_${Math.random()}`;
  const thumb = upgradeImage(v.imageLinks?.thumbnail || v.imageLinks?.smallThumbnail);
  const hasCover = !!thumb;

  const viewability = a.viewability || "NO_PAGES";
  const fullyReadable = viewability === "ALL_PAGES";
  const partiallyReadable = viewability === "PARTIAL";
  const readable = fullyReadable || partiallyReadable;
  const readerLink =
    a.webReaderLink ||
    v.previewLink ||
    v.infoLink ||
    `https://books.google.com/books?id=${id}`;

  const priceAmount =
    s.listPrice?.amount ||
    s.retailPrice?.amount ||
    priceFromKey(id);

  return {
    id,
    source: "google",
    readOnline: readable,
    readabilityLabel: fullyReadable
      ? "Read Online"
      : partiallyReadable
      ? "Read Preview"
      : null,
    hasCover,
    volumeInfo: {
      title: v.title || "Untitled",
      authors: v.authors || [],
      imageLinks: hasCover
        ? {
            thumbnail: thumb,
            smallThumbnail: upgradeImage(v.imageLinks?.smallThumbnail || thumb),
          }
        : undefined,
      previewLink: readerLink,
      publisher: v.publisher,
      publishedDate: v.publishedDate,
      categories: v.categories,
      industryIdentifiers: v.industryIdentifiers,
      description: v.description,
    },
    saleInfo: {
      listPrice: { amount: priceAmount, currencyCode: s.listPrice?.currencyCode || "INR" },
    },
  };
}

function olidFromKey(key) {
  if (!key) return null;
  const m = key.match(/OL\d+[MW]/i);
  return m ? m[0] : null;
}

function pickOLCover(doc) {
  if (doc.cover_i) {
    return {
      thumbnail: `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg?default=false`,
      small: `https://covers.openlibrary.org/b/id/${doc.cover_i}-S.jpg?default=false`,
    };
  }
  const isbn = Array.isArray(doc.isbn) ? doc.isbn.find(Boolean) : null;
  if (isbn) {
    return {
      thumbnail: `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg?default=false`,
      small: `https://covers.openlibrary.org/b/isbn/${isbn}-S.jpg?default=false`,
    };
  }
  const olid = olidFromKey(doc.key);
  if (olid) {
    return {
      thumbnail: `https://covers.openlibrary.org/b/olid/${olid}-M.jpg?default=false`,
      small: `https://covers.openlibrary.org/b/olid/${olid}-S.jpg?default=false`,
    };
  }
  const ia = Array.isArray(doc.ia) ? doc.ia.find(Boolean) : null;
  if (ia) {
    return {
      thumbnail: `https://archive.org/services/img/${ia}`,
      small: `https://archive.org/services/img/${ia}`,
    };
  }
  return null;
}

function normalizeOpenLibrary(doc) {
  const id =
    (doc.key || "").replace(/^\//, "").replace(/\//g, "_") ||
    `ol_${doc.cover_i || Math.random()}`;
  const ia = Array.isArray(doc.ia) ? doc.ia.filter(Boolean) : [];
  const readable = ia.length > 0;
  const iaId = readable ? ia[0] : null;
  const previewLink = readable
    ? `https://archive.org/details/${iaId}`
    : doc.key
    ? `https://openlibrary.org${doc.key}`
    : "https://openlibrary.org";
  const cover = pickOLCover(doc);

  return {
    id,
    source: "openlibrary",
    readOnline: readable,
    readabilityLabel: readable ? "Read Online" : null,
    hasCover: !!cover,
    volumeInfo: {
      title: doc.title || "Untitled",
      authors: doc.author_name || [],
      imageLinks: cover
        ? { thumbnail: cover.thumbnail, smallThumbnail: cover.small }
        : undefined,
      previewLink,
      publisher: Array.isArray(doc.publisher) ? doc.publisher[0] : doc.publisher,
      publishedDate: doc.first_publish_year ? String(doc.first_publish_year) : undefined,
      categories: doc.subject ? doc.subject.slice(0, 5) : undefined,
      industryIdentifiers: Array.isArray(doc.isbn)
        ? doc.isbn.slice(0, 2).map((v) => ({ type: "ISBN", identifier: v }))
        : undefined,
    },
    saleInfo: {
      listPrice: { amount: priceFromKey(id), currencyCode: "INR" },
    },
  };
}

function buildGoogleQuery(params) {
  const parts = [];
  const q = params.get("q");
  if (q) parts.push(q);
  const isbn = params.get("isbn");
  if (isbn) parts.push(`isbn:${isbn}`);
  const author = params.get("author");
  if (author) parts.push(`inauthor:${author}`);
  const publisher = params.get("publisher");
  if (publisher) parts.push(`inpublisher:${publisher}`);
  const subject = params.get("subject");
  if (subject) parts.push(`subject:${subject}`);
  const title = params.get("title");
  if (title && !q) parts.push(`intitle:${title}`);
  return parts.join("+");
}

async function callGoogleBooks(params, limit) {
  const q = buildGoogleQuery(params);
  if (!q) return { items: [] };

  const order = (params.get("orderBy") || "relevance").toLowerCase();
  const url = new URL("https://www.googleapis.com/books/v1/volumes");
  url.searchParams.set("q", q);
  url.searchParams.set("maxResults", String(Math.min(limit, 40)));
  url.searchParams.set("printType", "books");
  if (order === "newest") url.searchParams.set("orderBy", "newest");
  else url.searchParams.set("orderBy", "relevance");
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  if (apiKey) url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString(), {
    headers: { "User-Agent": "bookstore-app/1.0" },
    next: { revalidate: 86400 },
  });
  if (!res.ok) {
    const err = new Error(`Google Books responded ${res.status}`);
    err.status = res.status;
    throw err;
  }
  const data = await res.json();
  const items = Array.isArray(data.items) ? data.items.map(normalizeGoogle) : [];
  return { items, totalItems: data.totalItems || items.length };
}

async function callOpenLibrary(params, limit) {
  const order = (params.get("orderBy") || "relevance").toLowerCase();
  const url = new URL("https://openlibrary.org/search.json");

  const q = params.get("q");
  if (q) url.searchParams.set("q", q);
  const isbn = params.get("isbn");
  if (isbn) url.searchParams.set("isbn", isbn);
  const author = params.get("author");
  if (author) url.searchParams.set("author", author);
  const publisher = params.get("publisher");
  if (publisher) url.searchParams.set("publisher", publisher);
  const subject = params.get("subject");
  if (subject) url.searchParams.set("subject", subject);
  const title = params.get("title");
  if (title) url.searchParams.set("title", title);

  url.searchParams.set(
    "fields",
    "key,title,author_name,cover_i,ia,first_publish_year,publisher,subject,isbn"
  );
  url.searchParams.set("limit", String(Math.min(limit, 100)));
  if (order === "newest") url.searchParams.set("sort", "new");

  const res = await fetch(url.toString(), {
    headers: { "User-Agent": "bookstore-app/1.0" },
    next: { revalidate: 86400 },
  });
  if (!res.ok) {
    const err = new Error(`Open Library responded ${res.status}`);
    err.status = res.status;
    throw err;
  }
  const data = await res.json();
  const items = Array.isArray(data.docs) ? data.docs.map(normalizeOpenLibrary) : [];
  return { items, totalItems: data.numFound || items.length };
}

function normalizeOLSubjectWork(work) {
  const id =
    (work.key || "").replace(/^\//, "").replace(/\//g, "_") ||
    `ols_${work.cover_id || Math.random()}`;
  const ia = Array.isArray(work.ia) ? work.ia.filter(Boolean) : [];
  const availability = work.availability || {};
  const readable =
    availability.status === "open" ||
    availability.is_readable === true ||
    ia.length > 0;
  const iaId = ia[0] || availability.identifier || null;
  const previewLink = readable && iaId
    ? `https://archive.org/details/${iaId}`
    : work.key
    ? `https://openlibrary.org${work.key}`
    : "https://openlibrary.org";

  const coverId = work.cover_id || work.cover_i;
  const cover = coverId
    ? {
        thumbnail: `https://covers.openlibrary.org/b/id/${coverId}-M.jpg?default=false`,
        small: `https://covers.openlibrary.org/b/id/${coverId}-S.jpg?default=false`,
      }
    : null;

  const authors = Array.isArray(work.authors)
    ? work.authors.map((a) => a.name).filter(Boolean)
    : [];

  return {
    id,
    source: "openlibrary-subjects",
    readOnline: readable,
    readabilityLabel: readable ? "Read Online" : null,
    hasCover: !!cover,
    volumeInfo: {
      title: work.title || "Untitled",
      authors,
      imageLinks: cover
        ? { thumbnail: cover.thumbnail, smallThumbnail: cover.small }
        : undefined,
      previewLink,
      publisher: undefined,
      publishedDate: work.first_publish_year ? String(work.first_publish_year) : undefined,
      categories: Array.isArray(work.subject) ? work.subject.slice(0, 5) : undefined,
    },
    saleInfo: {
      listPrice: { amount: priceFromKey(id), currencyCode: "INR" },
    },
  };
}

async function callOLSubjects(slug, limit, order) {
  if (!slug) return { items: [] };
  const url = new URL(`https://openlibrary.org/subjects/${slug}.json`);
  // Subjects API caps at 1000, but a small overfetch helps the cover filter.
  url.searchParams.set("limit", String(Math.min(limit, 100)));
  // The Subjects API supports `published_in` ranges but no native sort;
  // we'll sort client-side when "newest" is requested.

  const res = await fetch(url.toString(), {
    headers: { "User-Agent": "bookstore-app/1.0" },
    next: { revalidate: 86400 },
  });
  if (!res.ok) {
    const err = new Error(`OL Subjects responded ${res.status}`);
    err.status = res.status;
    throw err;
  }
  const data = await res.json();
  let works = Array.isArray(data.works) ? data.works.slice() : [];
  if (order === "newest") {
    works.sort(
      (a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0)
    );
  }
  const items = works.map(normalizeOLSubjectWork);
  return { items, totalItems: data.work_count || items.length, subjectName: data.name };
}


async function fetchBooks(params) {
  const requestedMax = Math.min(
    parseInt(params.get("maxResults") || "10", 10) || 10,
    40
  );
  const requireCover = params.get("requireCover") === "1";
  const upstreamLimit = requireCover ? Math.min(requestedMax * 4, 40) : requestedMax;
  const mode = (params.get("mode") || "").toLowerCase();
  const order = (params.get("orderBy") || "relevance").toLowerCase();

  let result = { items: [], totalItems: 0, source: null };

  // Subject-browse mode: use Open Library's curated Subjects API first.
  if (mode === "subject") {
    const slug = slugifySubject(params.get("subject") || params.get("q") || "");
    try {
      const subj = await callOLSubjects(slug, upstreamLimit, order);
      if (subj.items.length) {
        result = { ...subj, source: "openlibrary-subjects" };
      }
    } catch (err) {
      result.error = err.message;
    }
    // Fallback for unknown/empty subjects: Google Books subject: operator.
    if (!result.items.length) {
      const fallbackParams = new URLSearchParams(params.toString());
      const raw = params.get("subject") || params.get("q") || "";
      if (raw) {
        fallbackParams.delete("q");
        fallbackParams.set("subject", raw);
        try {
          const gb = await callGoogleBooks(fallbackParams, upstreamLimit);
          if (gb.items.length) result = { ...gb, source: "google" };
        } catch (err) {
          if (!result.items.length) result.error = err.message;
        }
      }
    }
  } else {
    // Full-text search: Google Books primary, Open Library fallback.
    try {
      const gb = await callGoogleBooks(params, upstreamLimit);
      result = { ...gb, source: "google" };
    } catch (err) {
      result = { items: [], totalItems: 0, source: "google", error: err.message };
    }

    if (!result.items.length) {
      try {
        const ol = await callOpenLibrary(params, upstreamLimit);
        result = { ...ol, source: "openlibrary" };
      } catch (err) {
        if (!result.items.length) result.error = err.message;
      }
    }
  }

  let items = result.items;
  if (requireCover) items = items.filter((it) => it.hasCover);
  items = items.slice(0, requestedMax);

  return { items, totalItems: result.totalItems, source: result.source };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const cacheKey = searchParams.toString();

  const cached = cacheGet(cacheKey);
  if (cached) {
    return NextResponse.json(cached, {
      headers: { "x-cache": "HIT", "Cache-Control": "public, max-age=86400" },
    });
  }

  if (inflight.has(cacheKey)) {
    const payload = await inflight.get(cacheKey);
    return NextResponse.json(payload, {
      headers: { "x-cache": "COALESCED", "Cache-Control": "public, max-age=86400" },
    });
  }

  const work = (async () => {
    const payload = await fetchBooks(searchParams);
    cacheSet(cacheKey, payload);
    return payload;
  })();
  inflight.set(cacheKey, work);

  try {
    const payload = await work;
    return NextResponse.json(payload, {
      headers: {
        "x-cache": "MISS",
        "x-source": payload.source || "unknown",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { items: [], error: err?.message || "fetch failed" },
      { status: 502 }
    );
  } finally {
    inflight.delete(cacheKey);
  }
}
