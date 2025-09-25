/** @type {import('next').NextConfig} */
const nextConfig = {
  // Basic Next.js configuration for Sanity compatibility
  experimental: {
    // Disable turbo for studio route to fix HMR issues
    turbo: {
      rules: {
        '*/studio/**': false,
      },
    },
  },
  
  // Configure external images for Sanity CDN
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  
  // Transpile Sanity packages
  transpilePackages: ['@sanity/ui', '@sanity/icons'],
  
  // Webpack config for better Sanity compatibility
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Fix for Sanity Studio HMR issues
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;