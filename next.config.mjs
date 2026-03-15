/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    basePath: '/medicare-link',
    assetPrefix: '/medicare-link',
    images: {
        unoptimized: true,
    },
    experimental: {
        optimizePackageImports: ['lucide-react'],
    },
};

export default nextConfig;
