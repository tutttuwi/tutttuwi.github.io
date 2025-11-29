import Image from 'next/image'
import type { FC } from 'react'

export interface Certification {
  name: string
  organization: string
  badge: string
  date: string
  description: string
}

interface CertificationTimelineProps {
  certifications: Certification[]
}

/**
 * 資格をタイムライン形式で表示するコンポーネント
 */
export const CertificationTimeline: FC<CertificationTimelineProps> = ({
  certifications,
}) => {
  const sortedCerts = [...certifications].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB.getTime() - dateA.getTime()
  })

  return (
    <div className="relative">
      <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-300 dark:bg-gray-700 md:left-1/2" />
      <div className="space-y-8">
        {sortedCerts.map((cert, index) => {
          const date = new Date(cert.date)
          const year = date.getFullYear()
          const month = date.getMonth() + 1

          return (
            <div
              key={`${cert.name}-${cert.date}`}
              className={`relative flex items-center ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="absolute left-8 h-4 w-4 rounded-full border-4 border-white bg-primary-600 dark:border-gray-800 dark:bg-primary-500 md:left-1/2 md:-ml-2" />
              <div
                className={`ml-16 w-full md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'
                }`}
              >
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
                  <div className="mb-4 flex items-center space-x-4">
                    <Image
                      src={cert.badge}
                      alt={cert.name}
                      width={80}
                      height={80}
                      className="rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {cert.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {cert.organization}
                      </p>
                      <p className="mt-1 text-sm text-primary-600 dark:text-primary-400">
                        {year}年{month}月
                      </p>
                    </div>
                  </div>
                  {cert.description && (
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {cert.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}


