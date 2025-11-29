import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

export interface PortfolioItem {
  slug: string
  title: string
  description: string
  thumbnail: string
  tech: string[]
  date: string
  role: string
  repo?: string
  live?: string
}

interface PortfolioCardProps {
  portfolio: PortfolioItem
}

/**
 * ポートフォリオカードコンポーネント
 */
export const PortfolioCard: FC<PortfolioCardProps> = ({ portfolio }) => {
  return (
    <div className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-shadow hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
      <Link href={`/portfolio/${portfolio.slug}`}>
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={portfolio.thumbnail}
            alt={portfolio.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6">
          <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
            {portfolio.title}
          </h3>
          <p className="mb-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
            {portfolio.description}
          </p>
          <div className="mb-4 flex flex-wrap gap-2">
            {portfolio.tech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-primary-100 px-2 py-1 text-xs text-primary-800 dark:bg-primary-900 dark:text-primary-200"
              >
                {tech}
              </span>
            ))}
            {portfolio.tech.length > 4 && (
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                +{portfolio.tech.length - 4}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>{new Date(portfolio.date).getFullYear()}</span>
            <span className="text-primary-600 dark:text-primary-400">
              詳細を見る →
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}


