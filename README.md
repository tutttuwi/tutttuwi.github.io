# Portfolio & Blog Site

Next.js + Nextra を使用したポートフォリオ兼技術ブログサイトです。

## 技術スタック

- **Next.js**: 最新安定版
- **Nextra**: 3 系（nextra-theme-blog）
- **TypeScript**: strict モード
- **Tailwind CSS**: スタイリング
- **GitHub Pages**: ホスティング

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# 静的エクスポート（GitHub Pages 用）
npm run export
```

## プロジェクト構成

```
/
├── components/        # React コンポーネント
├── data/             # データファイル（ポートフォリオ、スキル、資格）
├── pages/            # Next.js ページ
│   ├── blog/        # ブログ記事
│   └── portfolio/   # ポートフォリオ
├── public/          # 静的アセット
│   └── assets/     # 画像ファイル
└── styles/          # グローバルスタイル
```

## データ管理

- **ポートフォリオ**: `data/portfolio.ts` を編集
- **スキル**: `data/skills.ts` を編集
- **資格**: `data/certifications.ts` を編集

## デプロイ

GitHub Actions により、`main` ブランチへの push で自動的に GitHub Pages にデプロイされます。

## ライセンス

MIT
