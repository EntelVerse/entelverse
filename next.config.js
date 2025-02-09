const nextConfig = {
    reactStrictMode: true,
    webpack(config) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@/components": require("path").resolve(__dirname, "src/components"),
        "@/lib": require("path").resolve(__dirname, "src/lib"),
        "@/types": require("path").resolve(__dirname, "src/types"),
        "@/pages": require("path").resolve(__dirname, "src/pages"),
        "@/api": require("path").resolve(__dirname, "src/api"),
      };
      return config;
    },
  };
  
  module.exports = nextConfig;
  