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
    S3_ACCESS_KEY: 'AKIA3FDUH43BWQA4LTRC',
    S3_IMAGE_BUCKET_NAME: 'musicwallimagebucket',
    S3_SECRET: '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',
    CLIENT_ID: '5066212596b94820b5a11df6f2b0fcd6',
    CLIENT_SECRET: '28f7a18d618c46d1b97526c3688268e7',
    TOKEN_SECRET: 'F2D6C91BBB4349A87D444283C4EC1',
    mongodburl: "mongodb+srv://decefemz:precious1979@cluster0.s5iun.mongodb.net/Musicwall?retryWrites=true&w=majority",
  },
}
