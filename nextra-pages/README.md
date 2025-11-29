# Portfolio & Blog Site (Nextra Pages)

## Getting Started

## 技術スタック

- **Next.js**: 最新安定版
- **Nextra**: 4 系（nextra-theme-blog）
- **TypeScript**: strict モード
- **Tailwind CSS**: スタイリング
- **GitHub Pages**: ホスティング（静的エクスポート）

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド（静的エクスポート）
npm run build
```

ビルド後、`out/` ディレクトリに静的ファイルが生成されます。

## プロジェクト構成

```text
nextra-pages/
├── components/        # React コンポーネント
│   ├── PortfolioCard.tsx
│   ├── SkillsTags.tsx
│   ├── CertificationTimeline.tsx
│   ├── Profile.tsx
│   ├── Comments.tsx
│   └── SocialLinks.tsx
├── data/             # データファイル
│   ├── portfolio.ts
│   ├── skills.ts
│   └── certifications.ts
├── pages/            # Next.js ページ（MDX）
│   ├── index.mdx    # プロフィールページ
│   ├── blog/        # ブログ記事
│   └── portfolio/   # ポートフォリオ
├── public/          # 静的アセット
│   └── assets/     # 画像ファイル
├── styles/          # グローバルスタイル
│   └── globals.css
├── theme.config.tsx # Nextra テーマ設定
└── next.config.ts   # Next.js 設定
```

## データ管理

- **ポートフォリオ**: `data/portfolio.ts` を編集
- **スキル**: `data/skills.ts` を編集
- **資格**: `data/certifications.ts` を編集

## ブログ記事の追加

`pages/blog/` ディレクトリに MDX ファイルを追加します。

```mdx
---
title: '記事タイトル'
date: '2025-01-01'
tags: ['nextjs', 'react']
description: '記事の説明'
---

# 記事タイトル

本文...
```

## デプロイ

GitHub Actions により、`main` ブランチへの push で自動的に GitHub Pages にデプロイされます。

## ライセンス

MIT
