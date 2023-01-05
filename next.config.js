/** @type {import('next').NextConfig} */

const {i18n} = require('./next-i18next.config');

const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
        domains: ['test.dvernoyolimp.com.ua', 'img.youtube.com', 'olimp.loc'],
    },
    i18n
}

module.exports = nextConfig
