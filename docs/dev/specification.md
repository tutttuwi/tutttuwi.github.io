# Next.js + Nextra 技術ブログ設計書

## 概要

この設計書は、**React（Next.js）＋Nextra（MDX）** を用いて、GitHub Pages 上に Markdown ベースの技術ブログを構築するためのアーキテクチャ、フォルダ構成、CI/CD、運用手順、及び各機能（検索・コメント・ポートフォリオ・プロフィール等）の設計をまとめたものです。

ターゲット要件（ユーザー指定）:

1. 技術ブログ
2. スッキリしたデザイン
3. 検索、コメント
4. ポートフォリオ／プロフィールページを併設

採用技術（推奨）:

* Next.js（最新安定版）
* Nextra（Blog テーマ / Nextra 3 系推奨）
* MDX（記事内で React コンポーネントを使用）
* Giscus（コメント：GitHub Discussions ベース）
* GitHub Actions（ビルド → GitHub Pages へデプロイ）
* Tailwind CSS（スタイル。Nextra でも利用可）

参考:

* Nextra ドキュメント（Blog テーマの導入方法）。Nextra は Next.js 上に構築された MDX ベースのサイトジェネレータです。
* Giscus（コメントシステム）。
* Next.js を静的エクスポートして GitHub Pages にデプロイする手法（output: "export"）。

---

## 高レベル構成図

* 開発者（ローカル）

  * VSCode などで記事（MDX）を書き、ローカルで `npm run dev` で確認
* GitHub リポジトリ（source）

  * `main` ブランチへ push
  * GitHub Actions がビルド（`npm run build && npm run export`）し、静的ファイルを `gh-pages` ブランチへデプロイ
* GitHub Pages

  * `gh-pages` ブランチを公開、`https://username.github.io/reponame` で配信
* 外部サービス

  * Giscus（コメントの保存先は GitHub Discussions）

## 詳細設計

### 1) プロジェクト初期化（コマンド例）

```bash
# Next.js + Nextra の最小セットアップ（npm 例）
npm init -y
npm install next react react-dom nextra nextra-theme-blog
# Tailwind を使う場合
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Nextra の公式 Getting Started を参照し、`nextra-theme-blog` を利用します。

### 2) next.config.js（静的エクスポート向け）

静的サイトとして GitHub Pages にホストするため、Next.js の出力モードを `export` に設定します。また、`basePath` や `assetPrefix` をリポジトリ名に合わせて設定する必要があります（`username.github.io/reponame` のパスに対応）。

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  // example: if repo is username/reponame and you host at https://username.github.io/reponame
  // basePath: '/reponame',
  // assetPrefix: '/reponame/',
}
export default nextConfig
```

参考: 静的エクスポートに関する記事・サンプル。

### 3) フォルダ構成（推奨）

```
/ (repo root)
├─ package.json
├─ next.config.js
├─ public/
│  └─ assets/ (画像など)
├─ pages/ (Nextra が利用する場所、または Nextra の docs/blog 配下)
├─ app/ (必要に応じて Next.js App Router を併用)
├─ blog/  # MDX 記事を置くディレクトリ
│  ├─ 2025-11-29-my-post.md
│  └─ ...
├─ portfolio/  # ポートフォリオ個別ページ（MDX）
│  └─ project-xyz.mdx
├─ about.mdx  # プロフィールページ
├─ components/
│  └─ ui/ (React components, e.g. <ProjectCard />, <AuthorBox />)
├─ styles/
│  └─ globals.css (Tailwind の base をここにimport)
└─ .github/workflows/ci-deploy.yml
```

### 4) Nextra の設定

* `theme: 'nextra-theme-blog'` を使い、`_meta` や frontmatter でメタ情報を管理。
* ページごとに frontmatter で `title`, `date`, `tags`, `description`, `image` を指定。

`/blog/2025-11-29-my-post.mdx` 例:

```mdx
---
title: "Example Post"
date: "2025-11-29"
tags: [nextjs, react]
---

本文（Markdown / MDX）...
```

Nextra は自動的にコンテンツをインデックス化し、サイト内検索に活用できます（Nextra のビルトイン機能）。

### 5) 検索実装

選択肢:

1. **Nextra のビルトイン検索（簡易）** — すぐ使える。軽量で技術ブログには十分。
2. **Algolia（DocSearch）** — 高度な検索体験が欲しい場合。無料枠ありだが設定が必要。
3. **クライアントサイド検索（Lunr.js, FlexSearch）** — プライバシー優先で外部サービスを使いたくない場合。

まずは Nextra 標準検索で開始し、必要なら Algolia に移行する運用が現実的です。

### 6) コメント（Giscus）

* Giscus を利用する手順（概要）:

  1. コメントを保存する GitHub リポジトリを用意（サイト本体とは別のリポジトリを推奨）。
  2. GitHub Discussions を有効化し、Giscus App をインストール。
  3. giscus.app でウィジェットを生成し、スニペットを取得。
  4. Nextra の記事テンプレート（`components/`）の末尾にスニペットを挿入。

Giscus の公式サイトとリポジトリ参照。

### 7) ポートフォリオ & プロフィール設計

* **/about.mdx** にプロフィール（自己紹介、スキル、連絡先リンク）を記述。
* **/portfolio/** 以下をプロジェクト単位の MDX ファイルとし、`components/ProjectCard` を用いて一覧表示ページを生成。
* プロジェクトごとに `title`, `role`, `tech`, `date`, `thumbnail`, `repo`, `live` フィールドを Frontmatter に持たせる。

例: `/portfolio/project-awesome.mdx`

```mdx
---
title: "Awesome App"
role: "Sole developer"
tech: [React, Flutter]
date: 2024-12-01
thumbnail: "/assets/awesome.png"
repo: "https://github.com/username/awesome"
live: "https://awesome.example.com"
---

プロジェクト説明...
```

### 8) SEO / メタデータ / SNSカード

* 各ページに `og:title`, `og:description`, `og:image`, `twitter:card` を出力。
* Nextra の `_meta` や `_app` レベルでデフォルト値を設定し、ページごとの frontmatter で上書き可能にする。

### 9) RSS / Sitemap

* RSS を自動生成するライブラリ（例: `rss` や `feed`) をビルドステップで実行して `public/rss.xml` を生成。
* Sitemap は `sitemap` ライブラリや独自スクリプトで `public/sitemap.xml` を出力。

### 10) Analytics

* 簡易かつプライバシー配慮 → Plausible / Simple Analytics / Fathom など（外部）。
* 完全に無料で始めるなら Google Analytics（設定は任意）。

### 11) CI / CD（GitHub Actions）

目的: `main` ブランチへ push があったら静的ビルドを実行し、`gh-pages` ブランチへデプロイする。

`.github/workflows/ci-deploy.yml`（サンプル）:

```yaml
name: Build and deploy to GitHub Pages
on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npm run export
      - name: Deploy to gh-pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
          # if you host at username.github.io, you may want target_branch: gh-pages (default)
```

参考: 複数の公開手順やサンプルが公開されています。

> 注意点: `next export` で出力される静的サイトは、Next.js の一部機能（SSR、API Routes、画像最適化の一部など）が使えません。ブログ用途では問題ないことが多いですが、必要な機能がある場合はホスティング（Vercel 等）を検討してください。

### 12) Assets / 画像の取り扱い

* `public/assets/` に画像を置く運用がシンプル。
* 大きな画像ファイルや最適化が必要な場合は、CDN（Imgix, Cloudinary）を検討。ただし GitHub Pages で運用する際は外部CDNが安定。

### 13) ローカル開発ワークフロー

* `npm run dev` でローカル確認
* ブログ記事は `blog/` に MDX として追加
* Pull Request ベースでレビュー→ Merge → CI deploy
* PR テンプレートにチェックリスト（リンク動作、画像最適化、frontmatter 記入）を用意

### 14) セキュリティ・運用注意点

* Giscus を利用するために GitHub Discussions の権限管理を確認。
* リポジトリの `GITHUB_TOKEN` 権限は最小限で。
* サイトで外部スクリプトを入れる場合は CSP（Content Security Policy）を検討。

## サンプル設定 / ファイルスニペット

* `package.json`（抜粋）

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "export": "next export",
    "start": "next start"
  }
}
```

* `components/Comments.jsx`（Giscus を埋め込むサンプル）

```jsx
import React from 'react'

export default function Comments(){
  return (
    <div>
      <script src="https://giscus.app/client.js"
        data-repo="<owner>/<repo>"
        data-repo-id=""
        data-category="General"
        data-category-id=""
        data-mapping="pathname"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-theme="light"
        crossOrigin="anonymous"
        async>
      </script>
    </div>
  )
}
```

※ giscus の設定は giscus.app の設定ウィザードで取得した値を使ってください。

## 運用ガイド（短め）

1. 記事作成: `blog/` に MDX を追加。frontmatter を必須にする（CI で検証可能）。
2. 画像: `public/assets` にアップし、適切に圧縮。PR レビューで画像サイズ確認。
3. コメント: Giscus 設定と Discussions のモデレーション方針を定める。
4. バックアップ: `gh-pages` ブランチは CI により上書きされるため、必要なら別ストレージにアーカイブを取る。

## 将来拡張案

* Algolia DocSearch を組み込む（大規模コンテンツで必須）
* i18n（多言語対応）を Nextra の I18n 機能で実装。
* RSS の購読者向けメール配信（Mailchimp など）
* サイト内検索の高度化（検索順位チューニング）

---

## 参考リンク（抜粋）

* Nextra Docs / Blog Theme.
* Giscus.
* Next.js: static export / deploy to GitHub Pages guides.

---

作業完了: 本設計書を元にテンプレリポジトリ（Next.js + Nextra の初期コード、サンプル記事、GitHub Actions ワークフロー、Giscus 組み込みサンプル）を作成できます。ご希望であれば次のステップとして **テンプレリポジトリ一式を生成** します。
