import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { Layout } from 'nextra-theme-blog'
import themeConfig from '../theme.config'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout themeConfig={themeConfig}>
      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-T54EN7ND7V"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-T54EN7ND7V');
        `}
      </Script>
      <Component {...pageProps} />
    </Layout>
  )
}

