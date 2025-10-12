import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ... any other existing configurations you have ...

  // Add this part
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;