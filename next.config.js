/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Replace Node.js modules with empty modules in client-side code
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        path: false,
        os: false,
      };
    }
    // Add specific module handling
    config.module.rules.push({
      test: /\.m?js$/,
      type: "javascript/auto",
      resolve: {
        fullySpecified: false,
      },
    });
    return config;
  },
  // Add transpilePackages to handle ESM modules
  transpilePackages: [
    "@chromia/ft4",
    "@chromia/react",
    "filehub",
    "postchain-client"
  ],
  experimental: {
    esmExternals: "loose"
  }
};

module.exports = nextConfig; 