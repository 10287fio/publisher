/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
  images:{
    domains:['image.flaticon.com', 'images.rawpixel.com', 'e1.pngegg.com', 'raw.githubusercontent.com']
  },
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

}

module.exports = nextConfig