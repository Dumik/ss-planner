/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_UNSPLASH_ACCESS_KEY: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  },
  images: {
    domains: [
      'picsum.photos',
      'images.unsplash.com',
      'https://www.svgrepo.com',
      'https://lh3.googleusercontent.com',
      'lh3.googleusercontent.com',
    ],
  },
};

export default nextConfig;
