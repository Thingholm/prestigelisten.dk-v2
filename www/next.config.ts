import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ijyqomzpcigbnwjjohrd.supabase.co",
        pathname: "/storage/v1/object/public/**"
      }
    ]
  }
};

export default withNextIntl(nextConfig);
