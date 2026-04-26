/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.100.13"],
  images: {
    domains: ["images.unsplash.com"],
  },
  reactCompiler: true,
};

export default nextConfig;
