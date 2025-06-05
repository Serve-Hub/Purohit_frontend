// import withBundleAnalyzer from '@next/bundle-analyzer';

// /** @type {import('next').NextConfig} */
// const nextConfig =
//  withBundleAnalyzer({
//     // enabled:true,  // Enable only when ANALYZE env variable is set
//   });
// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // Ignore ESLint errors during build
      },
      typescript: {
        ignoreBuildErrors: true, // Ignore TypeScript errors during build
      },
};

export default nextConfig;