/** @type {import('next').NextConfig} */
const nextConfig = {    
  experimental: {
    appDir: true,
    serverActions: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    unoptimized: true,
    domains: [
      'lh3.googleusercontent.com',
      'books.google.com',
      'covers.openlibrary.org',
      'archive.org',
      'ia800000.us.archive.org',
    ],
  },
  env: {
    Base_URL: process.env.Base_URL,
    // Other environment variables
  },
  
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  }
}


module.exports = nextConfig
