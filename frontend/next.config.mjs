/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Example: Load images from GitHub
      // {
      //   protocol: 'https',
      //   hostname: 'avatars.githubusercontent.com',
      // },
    ]
  },
  reactStrictMode: false,
};

export default nextConfig;
