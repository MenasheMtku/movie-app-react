

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      { hostname: "image.tmdb.org" },
      { hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
