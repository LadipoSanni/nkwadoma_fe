/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        APP_DEV_AUTH_URL: process.env.APP_DEV_AUTH_URL
    },
    images: {domains: ['res.cloudinary.com'],},
};


export default nextConfig;
