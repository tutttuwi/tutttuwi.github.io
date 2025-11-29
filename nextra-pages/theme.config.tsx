import { BlogThemeConfig } from 'nextra-theme-blog'
import { SocialLinks } from './components/SocialLinks'

const config: BlogThemeConfig = {
  footer: (
    <div className="mt-16 flex flex-col items-center justify-center space-y-4">
      <SocialLinks />
      <p className="text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Tomoaki Tsutsui. All rights reserved.
      </p>
    </div>
  ),
  head: ({ title, meta }) => (
    <>
      {meta.description && <meta name="description" content={meta.description} />}
      {meta.tag && <meta name="keywords" content={meta.tag} />}
      {meta.author && <meta name="author" content={meta.author} />}
    </>
  ),
  readMore: '続きを読む →',
  postFooter: null,
  darkMode: true,
  navs: [
    {
      url: '/',
      name: 'プロフィール',
    },
    {
      url: '/blog',
      name: 'ブログ',
    },
    {
      url: '/portfolio',
      name: 'ポートフォリオ',
    },
  ],
}

export default config



