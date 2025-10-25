/** @type {import('next').NextConfig} */
const nextConfig = {
    // env: {
    //     APP_DEV_AUTH_URL: process.env.APP_DEV_AUTH_URL,
    //     APP_DEV_IV_KEY: process.env.APP_DEV_IV_KEY,
    //     APP_DEV_IV_ENCRYPTION_SECRET_KEY: process.env.APP_DEV_IV_ENCRYPTION_SECRET_KEY,
    //     NEXT_PUBLIC_UPLOAD_PRESET: process.env.NEXT_PUBLIC_UPLOAD_PRESET,
    //     NEXT_PUBLIC_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUD_NAME,
    //     APP_URL:process.env.APP_URL,
    // },
    images: {domains: ['res.cloudinary.com', 'via.placeholder.com', "images.unsplash.com", "png.pngtree.com",'flagcdn.com','upload.wikimedia.org',"cdn.jsdelivr.net"],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.jsdelivr.net',
                port: '',
                pathname: '/npm/banks-ng@1.1.1/bin/logos/**',
            },
            {
                protocol: 'https',
                hostname: '**.jsdelivr.net', 
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'flagcdn.com',
                port: '',
                pathname: '/**', 
            },
            {
                protocol: 'https',
                hostname: '**.flagcdn.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
            };
        }
        return config;
    },
};


export default nextConfig;
