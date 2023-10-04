/** @type {import('next').NextConfig} */
const nextConfig = {    
    reactStrictMode: true,
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'books.google.com',

          },
        ],
      },
    env: {
      BASE_URL: process.env.BASE_URL,
      process: global.process,
    }};

module.exports = nextConfig
