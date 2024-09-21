/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID,
    NEXT_APP_PINATA_API_KEY: process.env.NEXT_APP_PINATA_API_KEY,
    NEXT_APP_PINATA_API_SECRET: process.env.NEXT_APP_PINATA_API_SECRET,
    NEXT_APP_PINATA_GATEWAY: process.env.NEXT_APP_PINATA_GATEWAY,
  },
};

export default nextConfig;
