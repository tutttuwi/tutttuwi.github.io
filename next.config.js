const withNextra = require('nextra')({
  theme: 'nextra-theme-blog',
  themeConfig: './theme.config.tsx',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    const path = require('path')
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
    }
    return config
  },
}

module.exports = withNextra(nextConfig)

