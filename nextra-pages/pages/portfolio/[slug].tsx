import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Comments } from '@/components/Comments'
import { portfolioData } from '@/data/portfolio'
import type { PortfolioItem } from '@/components/PortfolioCard'

interface PortfolioDetailProps {
  portfolio: PortfolioItem
}

export default function PortfolioDetail({ portfolio }: PortfolioDetailProps) {
  return (
    <article className="mx-auto max-w-4xl px-4 py-8">
      <Link
        href="/portfolio"
        className="mb-6 inline-flex items-center text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
      >
        ← ポートフォリオ一覧に戻る
      </Link>

      <header className="mb-8">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          {portfolio.title}
        </h1>
        <div className="mb-4 flex flex-wrap gap-2">
          {portfolio.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-primary-100 px-3 py-1 text-sm text-primary-800 dark:bg-primary-900 dark:text-primary-200"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>開発期間: {new Date(portfolio.date).getFullYear()}</p>
          <p>役割: {portfolio.role}</p>
        </div>
      </header>

      <div className="mb-8">
        <div className="relative mb-6 h-64 w-full overflow-hidden rounded-lg md:h-96">
          <Image
            src={portfolio.thumbnail}
            alt={portfolio.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </div>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {portfolio.description}
          </p>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-4">
        {portfolio.repo && (
          <a
            href={portfolio.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-gray-900 px-4 py-2 text-white transition-colors hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        )}
        {portfolio.live && (
          <a
            href={portfolio.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-primary-600 px-4 py-2 text-white transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            ライブサイト
          </a>
        )}
      </div>

      <Comments />
    </article>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = portfolioData.map((portfolio) => ({
    params: { slug: portfolio.slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const portfolio = portfolioData.find((p) => p.slug === params?.slug)

  if (!portfolio) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      portfolio,
    },
  }
}


