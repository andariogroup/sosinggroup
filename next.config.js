/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.sosinggroup.com',
      },
      {
        protocol: 'https',
        hostname: 'sosinggroup.com',
      },
      {
        protocol: 'https',
        hostname: 'www.prestigiomkafe.com',
      },
      {
        protocol: 'https',
        hostname: 'prestigiomkafe.com',
      },
    ],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  }
}

module.exports = nextConfig
