/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        APP_DEV_AUTH_URL: process.env.APP_DEV_AUTH_URL,
        APP_DEV_IV_KEY: process.env.APP_DEV_IV_KEY,
        APP_DEV_IV_ENCRYPTION_SECRET_KEY: process.env.APP_DEV_IV_ENCRYPTION_SECRET_KEY,
        NEXT_PUBLIC_UPLOAD_PRESET: process.env.NEXT_PUBLIC_UPLOAD_PRESET,
        NEXT_PUBLIC_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUD_NAME,
    },
    images: {domains: ['res.cloudinary.com', 'via.placeholder.com'],},
};


export default nextConfig;
