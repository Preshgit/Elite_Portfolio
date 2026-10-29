const nextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              dimensions: false,
            },
          },
        ],
        as: "*.js",
      },
    },
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg"),
    );

    if (fileLoaderRule) {
      config.module.rules.push(
        // Reapply the existing rule, but only for svg imports ending in ?url
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
        },
        // Convert all other *.svg imports to React components
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: {
            not: [...(fileLoaderRule.resourceQuery?.not || []), /url/],
          }, // exclude if *.svg?url
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                dimensions: false,
              },
            },
          ],
        },
      );

      // Modify the file loader rule to ignore *.svg, since we have it covered now.
      fileLoaderRule.exclude = /\.svg$/i;
    }
    return config;
  },
  allowedDevOrigins: ["172.20.10.3"],
  images: {
    // Serve modern, smaller image formats when the browser supports them
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
