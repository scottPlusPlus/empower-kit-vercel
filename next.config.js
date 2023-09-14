const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          // {
          //   source: '/',
          //   destination: '/game',
          // },
        ]
      },
}

module.exports = withContentlayer(nextConfig)