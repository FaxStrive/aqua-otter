/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lespcy1zf5atqmwe.private.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
