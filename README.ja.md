# Modern Portfolio Website

[![English](https://img.shields.io/badge/English-README-blue)](README.md) [![日本語](https://img.shields.io/badge/日本語-README-blue)](README.ja.md)

フルスクラッチから作成したSEO最適化済みポートフォリオサイト。バニラHTML、CSS、JavaScriptで構築し、テンプレート生成システムと構造化データを実装しています。

## 主な特徴

### SEO・ソーシャルメディア最適化
- 検索エンジン向けメタディスクリプション最適化
- Open Graph Protocolによるソーシャルメディアプレビュー
- Twitter Cardサポート
- Schema.org構造化データ（Person & Website）
- LinkedIn、Facebook、Twitter対応

### テンプレート生成システム
- 自動HTML生成
- SEOマークアップ自動挿入
- コンテンツファイル分離管理
- ワンコマンドHTML再生成

### パフォーマンス・アーキテクチャ
- 直接JavaScriptデータロード（CORS問題なし）
- 746行まで最適化されたJavaScript
- モジュラー設計
- 堅牢なエラーハンドリング

### モダンデザイン
- インタラクティブパーティクル背景
- ジグザグタイムラインレイアウト
- モバイルファーストレスポンシブデザイン
- プロフェッショナルグリーンテーマ

## アーキテクチャ

### テンプレート生成システム
```
Content Files → Template Engine → Generated HTML
     ↓              ↓                   ↓
  content/      generate-pages.js    index.html
                     +                about.html
               template-base.html      cv.html
                     +               projects.html
              SEO configuration       links.html
```

### ファイル構成
```
portfolio/
├── Generated HTML Files
│   ├── index.html          # ホームページ
│   ├── about.html          # アバウトページ
│   ├── cv.html             # 履歴書ページ
│   ├── projects.html       # プロジェクト一覧
│   └── links.html          # リンク集
├── Template System
│   ├── generate-pages.js   # HTML生成スクリプト
│   ├── template-base.html  # ベーステンプレート
│   └── content/            # ページ別コンテンツ
├── Data Layer (742 lines)
│   ├── common.js           # 共通データ
│   ├── home.js             # ホームページデータ
│   ├── about.js            # プロフィールデータ
│   ├── cv.js               # 履歴書データ
│   ├── projects.js         # プロジェクトデータ
│   ├── links.js            # リンクデータ
│   └── seo-config.js       # SEO設定
├── JavaScript (746 lines)
│   ├── pages-unified.js    # ページ初期化
│   └── utils/              # ユーティリティ
│       ├── html-generator.js
│       ├── dom-helpers.js
│       ├── page-manager.js
│       ├── data-populator.js
│       └── error-handler.js
├── Styling
│   └── css/style.css       # メインスタイルシート
└── Assets
    ├── profile.jpg
    ├── about-photo.jpg
    ├── og-image.jpg
    └── projects/
```

## セットアップ

### 1. クローン・セットアップ
```bash
git clone https://github.com/username/portfolio.git
cd portfolio
```

### 2. HTMLページ生成
```bash
node generate-pages.js
```

### 3. カスタマイズ

#### 個人情報の更新
```javascript
// data/about.js
window.aboutData = {
  personal: {
    name: "あなたの名前",
    position: "職種",
    description: "自己紹介文..."
  }
};
```

#### プロジェクト情報
```javascript
// data/projects.js
window.projectsData = [
  {
    name: "プロジェクト名",
    description: "説明",
    image: "assets/projects/project1.jpg",
    technologies: ["React", "Node.js"],
    githubUrl: "https://github.com/...",
    liveUrl: "https://demo.com"
  }
];
```

### 4. 開発サーバー
```bash
python -m http.server 8000
# または
npx http-server .
```

Visit `http://localhost:8000`

### 5. デプロイ
```bash
# All HTML files are pre-generated and ready to deploy
# No build process needed - just upload to any static host

# GitHub Pages: Push to main branch
# Netlify/Vercel: Drag & drop the folder
```

## カスタマイズガイド

### コンテンツ管理

#### テンプレート編集
```html
<!-- content/about-content.html -->
<section class="about-section">
    <!-- カスタムコンテンツ -->
</section>
```

#### ページ再生成
```bash
# 変更後、HTMLを再生成
node generate-pages.js
```

#### CV データ構造
```javascript
// data/cv.js
window.cvData = {
  education: [
    {
      institution: "大学名",
      degree: "学位",
      period: "2020-2024",
      description: "教育詳細",
      achievements: ["賞1", "賞2"]
    }
  ],
  experience: [
    {
      company: "会社名",
      position: "職種",
      period: "2020-現在",
      description: "職責",
      url: "https://company.com"
    }
  ],
  skills: {
    technical: ["Python", "JavaScript", "React"],
    languages: ["日本語", "英語"]
  }
};
```

### SEO 最適化

#### メタタグ設定
```javascript
// generate-pages.js - ページ設定
const pageConfigs = {
  'index': {
    title: "あなたの名前 | プロフェッショナルタイトル",
    metaDescription: "検索エンジン向けの魅力的な150文字説明",
    metaKeywords: "あなたの,関連,キーワード",
    // OGPとTwitterCard設定は自動生成
  }
};
```

#### 構造化データカスタマイズ
```javascript
// generate-pages.js - generateStructuredData()
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "あなたの名前",
  "jobTitle": "あなたの職種",
  "affiliation": {
    "@type": "Organization", 
    "name": "あなたの会社/大学"
  },
  "knowsAbout": ["あなたの", "キー", "スキル"],
  "sameAs": [
    "https://linkedin.com/in/yourusername",
    "https://github.com/yourusername"
  ]
};
```

### ビジュアルカスタマイズ

#### カラースキーム
```css
:root {
  --primary-color: #059669;
  --primary-light: #34d399;
  --primary-dark: #047857;
}
```

#### ソーシャルメディア画像
- `assets/og-image.jpg` - メインソーシャルプレビュー（1200x630px）
- `assets/about-photo.jpg` - アバウトページプレビュー
- `assets/profile.jpg` - プロフィールセクション

## 技術仕様

### パフォーマンス指標
- 総行数: 4,433行（HTML: 1,062, JS: 746, Data: 742, CSS: 1,883）
- JavaScript最適化: 元コードから57%削減
- ロード時間: 1秒未満
- SEOスコア: 検索エンジン最適化済み
- モバイルパフォーマンス: フルレスポンシブ

### SEO 機能
```html
<!-- 各ページに自動生成 -->
<meta name="description" content="最適化された説明">
<meta property="og:title" content="ソーシャルメディアタイトル">
<meta property="og:image" content="プレビュー画像">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "あなたの名前"
}
</script>
```

### ブラウザ対応
- モダンブラウザ（Chrome、Firefox、Safari、Edge）
- モバイルブラウザ（iOS Safari、Chrome Mobile）
- 外部依存関係不要
- プログレッシブエンハンスメントアプローチ

## 開発ワークフロー

### 新ページ追加
1. `content/`にコンテンツファイル作成
2. `generate-pages.js`にページ設定追加
3. `node generate-pages.js`でHTML再生成
4. ナビゲーションに追加

### SEO 更新
1. `generate-pages.js`でメタデータ修正
2. 構造化データスキーマ更新
3. HTML再生成
4. SEOツールでテスト

### パフォーマンス最適化
```bash
# 現在の統計確認
find . -name "*.js" -path "*/js/*" -exec wc -l {} + | tail -1
# JavaScript: 合計746行

find . -name "*.html" -exec wc -l {} + | tail -1  
# HTML: 合計1,062行
```

## 先進機能

### SEO最適化
- 検索エンジンフレンドリーURL
- セマンティックHTML構造
- リッチスニペット対応
- ソーシャルメディア最適化
- パフォーマンス最適化

### プログレッシブエンハンスメント
- モバイルファーストレスポンシブデザイン
- タッチフレンドリーインタラクション
- 全デバイス高速ロード
- アクセシビリティ配慮

### インタラクティブ要素
- Particle.js背景アニメーション
- スムーズなCSSトランジション
- ホバーエフェクトとアニメーション
- 折りたたみ可能CVセクション
- インタラクティブタイムライン

## デプロイオプション

### 静的ホスティング
- GitHub Pages: ゼロ設定
- Netlify: ドラッグ＆ドロップデプロイ
- Vercel: Gitベースデプロイ
- Surge.sh: コマンドラインデプロイ

### カスタムドメイン設定
1. ドメインで`CNAME`ファイル追加
2. DNS設定を構成
3. ホスティングプラットフォームでHTTPS有効化
4. SEO設定でURL更新

## コントリビューション

1. リポジトリを**フォーク**
2. 機能ブランチを**作成**（`git checkout -b feature/seo-enhancement`）
3. テンプレートやデータを**修正**
4. HTML**再生成**（`node generate-pages.js`）
5. ローカル**テスト**
6. 変更を**コミット**
7. プルリクエスト**作成**

## ライセンス

MIT License

## 主要な技術・ツール

- Schema.org（構造化データ）
- Open Graph Protocol（ソーシャルメディア最適化）
- Particles.js（背景エフェクト）
- Font Awesome（アイコン）
- Google Fonts（Poppins、Inter）

---

このポートフォリオサイトは、現代のWeb標準に準拠し、SEO最適化とパフォーマンスを重視して開発されています。