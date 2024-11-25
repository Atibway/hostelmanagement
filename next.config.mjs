/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname:"utfs.io"
            },
            {
                protocol: "https",
                hostname:"images.unsplash.com" 
            },
            {
                protocol: "https",
                hostname:"lh3.googleusercontent.com"
            },
            {
                protocol: "https",
                hostname:"www.ugabox.com" 
            },
            {
                protocol: "https",
                hostname:"th.bing.com" 
            },
        ]
    }
};

export default nextConfig;
