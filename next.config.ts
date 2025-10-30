import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
        pathname: "/img/**", // מאפשר לכל תמונה בנתיב /img
      },
    ],
  },
};

module.exports = nextConfig;

export default nextConfig;
