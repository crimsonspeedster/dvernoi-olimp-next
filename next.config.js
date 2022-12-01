/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  i18n: {
    locales: ['ru', 'uk'],
    defaultLocale: 'ru',
    localePath: "./lang"
  },
  images: {
    domains: ['test.dvernoyolimp.com.ua', 'img.youtube.com', 'olimp.loc'],
  },
}

module.exports = nextConfig
