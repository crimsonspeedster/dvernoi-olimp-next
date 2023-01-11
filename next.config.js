/** @type {import('next').NextConfig} */

const {i18n} = require('./next-i18next.config');

const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    experimental: {
        largePageDataBytes: 128 * 100000
    },
    images: {
        domains: ['test.dvernoyolimp.com.ua', 'img.youtube.com', 'olimp.loc'],
    },
    redirects: async () => [
        {
            source: '/:path*',
            has: [{ type: 'host', value: 'www.localhost:3000' }],
            destination: 'http://www.localhost:3000/:path*',
            permanent: true
        }
    ],
    i18n
}

module.exports = nextConfig
