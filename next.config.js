/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  styledComponents: true,

}

module.exports = {
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: 'file-loader',
      },
    });
    return config;
  },
  nextConfig,
  env: {
    mongodburl: "mongodb+srv://femzy:precious1979@cluster0.bx43m.mongodb.net/node-tuts?retryWrites=true&w=majority",
  },
}
