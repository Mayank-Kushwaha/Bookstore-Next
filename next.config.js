/** @type {import('next').NextConfig} */
const nextConfig = {    
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
    domains: ['books.google.com']
  },
  "env": {
    "browser": true, // If your code runs in a browser
    "node": true,    // If your code runs in Node.js
  },
  "globals": {
    "process": true, // Allow usage of `process` without warning
  },
  "rules": {
    "no-undef": ["error", { "typeof": true }],
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
