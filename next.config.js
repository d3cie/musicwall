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
    mongodburl: "mongodb+srv://decefemz:precious1979@cluster0.s5iun.mongodb.net/Musicwall?retryWrites=true&w=majority",
  },
}
