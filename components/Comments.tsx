'use client'

import { useEffect, useRef } from 'react'
import type { FC } from 'react'

interface CommentsProps {
  repo?: string
  repoId?: string
  category?: string
  categoryId?: string
}

/**
 * Giscus コメントコンポーネント
 * 設定は giscus.app のウィザードで取得した値を使用してください
 */
export const Comments: FC<CommentsProps> = ({
  repo = 'tutttuwi/tutttuwi.github.io',
  repoId = '',
  category = 'General',
  categoryId = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', repo)
    script.setAttribute('data-repo-id', repoId)
    script.setAttribute('data-category', category)
    script.setAttribute('data-category-id', categoryId)
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', 'preferred_color_scheme')
    script.setAttribute('data-lang', 'ja')
    script.crossOrigin = 'anonymous'
    script.async = true

    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [repo, repoId, category, categoryId])

  return (
    <div className="mt-12">
      <div ref={containerRef} />
    </div>
  )
}

