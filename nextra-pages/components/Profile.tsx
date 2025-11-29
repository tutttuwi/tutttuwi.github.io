import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

interface ProfileProps {
  name: string
  title: string
  location: string
  about: string[]
  mind: string[]
  favorite: string[]
  email: string
  profileImage: string
}

/**
 * プロフィール情報を表示するコンポーネント
 */
export const Profile: FC<ProfileProps> = ({
  name,
  title,
  location,
  about,
  mind,
  favorite,
  email,
  profileImage,
}) => {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex flex-col items-center space-y-6 md:flex-row md:items-start md:space-x-8 md:space-y-0">
        <div className="flex-shrink-0">
          <Image
            src={profileImage}
            alt={name}
            width={200}
            height={200}
            className="rounded-full"
            priority
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="mb-2 text-4xl font-bold">
            {name.split(' ')[0]}{' '}
            <span className="text-primary-600 dark:text-primary-400">
              {name.split(' ')[1]}
            </span>
          </h1>
          <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
            {title} - {location}
          </p>
          <div className="mb-6 space-y-4">
            <section>
              <h2 className="mb-2 text-xl font-semibold">--- About ---</h2>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                {about.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            </section>
            <section>
              <h2 className="mb-2 text-xl font-semibold">--- Mind ---</h2>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                {mind.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            </section>
            <section>
              <h2 className="mb-2 text-xl font-semibold">--- Favorite ---</h2>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                {favorite.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            </section>
          </div>
          <div className="mb-6">
            <h2 className="mb-4 text-xl font-semibold">Contact</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              最後まで読んでいただきありがとうございます。
              <br />
              こちらのページで、私のことを少しでも知っていただけたら幸いです。
              <br />
              もし、なにかコメントが御座いましたら、メールにてご連絡をお願い致します。
            </p>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center rounded-lg bg-primary-600 px-4 py-2 text-white transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
              aria-label={`${email} にメールを送信`}
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {email}
            </a>
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-semibold">Links</h2>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/blog"
                className="rounded-lg bg-primary-100 px-4 py-2 text-primary-800 transition-colors hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-200 dark:hover:bg-primary-800"
              >
                ブログ
              </Link>
              <Link
                href="/portfolio"
                className="rounded-lg bg-primary-100 px-4 py-2 text-primary-800 transition-colors hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-200 dark:hover:bg-primary-800"
              >
                ポートフォリオ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


