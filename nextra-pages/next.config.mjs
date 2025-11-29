import nextra from 'nextra'
import path from 'path'

const withNextra = nextra({
  // theme: 'nextra-theme-blog',
  // themeConfig: './theme.config.tsx',
})

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
    }
    return config
  },
}

export default withNextra(nextConfig)
