// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   productionBrowserSourceMaps: true,
//   images: {
//     domains: [
//       "res.cloudinary.com",
//     ],
//   },
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // Allow all images from Cloudinary
      },
    ],
  },
};

export default nextConfig;
