/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ['next-auth'],
  images: {
    domains: ['lh3.googleusercontent.com', 'uploadthing.com'],
  }
}

module.exports = nextConfig