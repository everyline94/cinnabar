import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A vitrine e estatica: sai inteira em out/ e o catalogo do Storybook
  // e assado por cima em out/catalogo/ pelo script build-site.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
