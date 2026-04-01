import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  output: "standalone",
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  serverExternalPackages: ["bcryptjs", "@prisma/client", "@prisma/adapter-pg"],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

export default withMDX(nextConfig);
