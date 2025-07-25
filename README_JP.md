# ポートフォリオWebサイトテンプレート

バニラHTML、CSS、JavaScriptで構築された、モダンでレスポンシブなポートフォリオWebサイトです。洗練されたユーティリティクラス設計、データ駆動型コンテンツ管理、包括的なSEO最適化を特徴としています。

## ✨ 主要機能

- **依存関係ゼロ** - ピュアなHTML、CSS、JavaScriptでビルドプロセス不要
- **データ駆動型アーキテクチャ** - JavaScriptデータファイルで簡単コンテンツ更新
- **統一デザインシステム** - CSSカスタムプロパティによる一貫したコンポーネント
- **レスポンシブデザイン** - モバイルファーストアプローチと適応レイアウト
- **SEO最適化** - 構造化データ、メタタグ、技術的SEOベストプラクティス
- **パフォーマンス重視** - 最適化された読み込み、アニメーション、リソース管理
- **アクセシビリティ対応** - セマンティックHTML、ARIAラベル、キーボードナビゲーション

## 🚀 クイックスタート

### ローカル開発

```bash
# リポジトリをクローンまたはダウンロード
git clone <repository-url>
cd portfolio

# ローカル開発サーバーを開始（どちらか選択）
python -m http.server 8000
# または
npx http-server .

# ブラウザで http://localhost:8000 を開く
```

### カスタマイズ

1. **個人情報の更新**
   - `/data/` ディレクトリ内のファイルを編集
   - `/assets/` ディレクトリ内の画像を差し替え
   - CSSカスタムプロパティで色を変更

2. **デプロイ**
   - 任意の静的ホスティングサービスにファイルをアップロード
   - GitHub Pages、Netlify、Vercelすべて対応
   - ビルドプロセス不要

## 📁 プロジェクト構造

```
portfolio/
├── index.html              # ホームページ
├── about.html              # タイムラインと興味を含むAboutページ
├── cv.html                 # 折りたたみ可能セクション付きCV/履歴書
├── projects.html           # プロジェクトショーケース
├── links.html              # 連絡先とソーシャルリンク
├── template-base.html      # 新規ページ作成用テンプレート
├── css/
│   └── style.css          # 完全スタイルシート（1,191行）
├── js/
│   ├── pages-unified.js   # 中央ページ初期化
│   └── utils/             # ユーティリティクラスライブラリ
│       ├── dom-helpers.js    # DOMユーティリティ + PageBaseクラス
│       ├── html-generator.js # テンプレートレンダリング
│       └── data-populator.js # データからDOMへの配置
├── data/                   # コンテンツ設定（これらを編集！）
│   ├── common.js          # サイトナビゲーション、ソーシャルリンク
│   ├── home.js            # ホームページヒーローコンテンツ
│   ├── about.js           # 個人ストーリー、タイムライン、興味
│   ├── cv.js              # 教育、経験、スキル、賞
│   ├── projects.js        # プロジェクトポートフォリオ
│   ├── links.js           # 連絡先情報
│   └── seo-config.js      # SEO構造化データ
├── assets/                # 画像とメディアファイル
└── content/               # 静的HTMLフラグメント
```

## 🎨 デザインシステム

### CSSカスタムプロパティ

デザインシステムは簡単なテーマ変更のためのCSSカスタムプロパティで構築：

```css
:root {
  /* プライマリカラー - テーマカスタマイズ用 */
  --color-primary: #059669;        /* メイングリーン */
  --color-primary-light: #34d399;  /* ライトグリーン */
  --color-primary-dark: #047857;   /* ダークグリーン */
  
  /* タイポグラフィ */
  --font-primary: 'Inter', sans-serif;
  --font-heading: 'Poppins', sans-serif;
  
  /* スペーシングスケール */
  --space-4: 1rem;    /* 16px */
  --space-8: 2rem;    /* 32px */
  --space-16: 4rem;   /* 64px */
}
```

### ユーティリティクラス

ユーティリティクラスによる一貫したスタイリング：

- **レイアウト**: `.grid-auto-fit`, `.flex-between`, `.container`
- **スペーシング**: `.gap-sm`, `.mb-section`, `.p-4`
- **インタラクティブ**: `.hover-lift`, `.card`, `.btn-primary`

## 📝 コンテンツ管理

### 新しいコンテンツの追加

コンテンツはJavaScriptデータファイルで管理。HTML編集不要！

**新しいプロジェクトを追加：**

```javascript
// data/projects.js内
{
    name: "私の新プロジェクト",
    description: "プロジェクトの説明",
    technologies: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/username/project",
    liveUrl: "https://project-demo.com",
    image: "assets/projects/new-project.jpg"
}
```

**職歴を追加：**

```javascript
// data/cv.js内 - experience配列
{
    company: "会社名",
    position: "職種",
    period: "2024.01 - Present",
    description: "役割説明と実績",
    url: "https://company.com"
}
```

**個人情報を更新：**

```javascript
// data/about.js内
window.aboutData = {
    personal: {
        name: "あなたの名前",
        position: "あなたの肩書き",
        description: [
            "自分についての第一段落",
            "詳細を含む第二段落"
        ]
    }
}
```

### サポートされるコンテンツタイプ

統一カードテンプレートが自動的に処理：

- **教育** - institution, degree, period, description, url
- **経験** - company, position, period, description, url  
- **プロジェクト** - name/title, description, technologies, githubUrl, liveUrl, image
- **タイムラインイベント** - period, title, description, icon
- **賞** - title, organization, date, description, link
- **資格** - title, organization, date, url
- **助成金** - title, organization, amount, date, description

## 🔧 アーキテクチャ概要

### ユーティリティクラス設計パターン

コードベースはユーティリティクラスアーキテクチャに従います：

- **HTMLGenerator** - テンプレートレンダリングとHTML生成
- **PageBase** - 共通ページ機能（ナビゲーション、スクロール効果）
- **DOMHelpers** - 安全なDOM操作ユーティリティ
- **DataPopulator** - エラー処理付きデータからDOMへの配置

### ページ初期化フロー

```javascript
// 1. 現在のページを検出
const pageName = getCurrentPageName();

// 2. 共通コンポーネントを初期化
await initializeBase(); // ナビゲーション、フッター、SEO

// 3. ページ固有のコンテンツを初期化
switch (pageName) {
    case 'about': await initAbout(); break;
    case 'cv': await initCV(); break;
    // ... その他のページ
}

// 4. アニメーションをトリガー
animateElements([{ selector: '.section', delay: 400 }]);
```

### 統一カードテンプレート

インテリジェントなフィールドマッピングによる複数コンテンツタイプの処理：

```javascript
static unifiedCardTemplate(item, config = {}) {
    // スマートフィールド検出
    const title = item.institution || item.company || item.title;
    const subtitle = item.degree || item.position || item.organization;
    const date = item.period || item.date || item.year;
    
    // 一貫したカードHTMLを生成
    return `<div class="card hover-lift">...</div>`;
}
```

## 🎯 SEO & パフォーマンス

### SEO機能

- **構造化データ** - Person、Website、ページタイプ用JSON-LD schema.orgマークアップ
- **メタタグ** - 動的ページ固有説明とキーワード
- **ソーシャルメディア** - Open GraphとTwitterカードサポート
- **技術的SEO** - XMLサイトマップ、robots.txt、カノニカルURL

### パフォーマンス最適化

- **CSSカスタムプロパティ** - 最小再計算での効率的スタイリング
- **遅延読み込み** - 必要時のみ画像読み込み
- **バッチDOM更新** - innerHTMLによる効率的レンダリング
- **ハードウェアアクセラレーション** - スムーズアニメーション用CSSトランスフォーム
- **リソースヒント** - 外部フォントサービスへのプリコネクト

## 📱 レスポンシブデザイン

### ブレークポイント

```css
/* モバイルファーストアプローチ */
.grid-auto-fit {
    grid-template-columns: 1fr; /* モバイル：単一カラム */
}

@media (min-width: 768px) {
    .grid-auto-fit {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
}
```

### 適応レイアウト

- **ナビゲーション** - モバイルでハンバーガーメニュー、デスクトップでフルメニュー
- **カード** - モバイルで縦積み、大画面でグリッドレイアウト
- **タイポグラフィ** - remユニットによる流動的フォントサイズ
- **画像** - アスペクト比保持でレスポンシブ

## 🎨 カスタマイズガイド

### 色の変更

CSSでプライマリカラーシステムを更新：

```css
:root {
    --color-primary: #your-color;        /* メインブランドカラー */
    --color-primary-light: #lighter-shade; /* ホバー状態 */
    --color-primary-dark: #darker-shade;   /* アクティブ状態 */
}
```

### 新しいページの追加

1. **HTMLファイルを作成**（`template-base.html`からコピー）
2. **ナビゲーションを追加** `data/common.js`内
3. **ページハンドラーを追加** `js/pages-unified.js`内
4. **データファイルを作成** `data/`ディレクトリ内

### カスタムアニメーション

```javascript
// ページ初期化に追加
animateElements([
    { selector: '.my-section', delay: 400 },
    { selector: '.my-cards', delay: 600 }
]);
```

### 画像管理

- **プロフィール写真** - `assets/profile.jpg`を差し替え
- **プロジェクト画像** - `assets/projects/`に追加
- **背景画像** - CSSのbackground-imageプロパティを更新
- **アイコン** - Font Awesome 6.4.0を使用（CDN経由で含有）

## 🔧 開発のヒント

### デバッグ

```javascript
// data-populator.js内でコンソールログを有効化
console.log('コンテナ配置:', containerId, 'データ:', data);
```

### ブラウザサポート

- **モダンブラウザ** - Chrome 60+、Firefox 60+、Safari 12+、Edge 79+
- **CSS機能** - CSS Grid、カスタムプロパティ、Flexbox
- **JavaScript機能** - ES6クラス、async/await、テンプレートリテラル

### パフォーマンス監視

- **Core Web Vitals** - LCP、FID、CLS最適化
- **Lighthouse** - 通常全カテゴリで95+スコア
- **バンドルサイズ** - 合計約50KB（CSS + JS + HTML）

## 🚀 デプロイ

### GitHub Pages

1. GitHubリポジトリにプッシュ
2. リポジトリ設定でGitHub Pagesを有効化
3. ソースをmainブランチ / ルートディレクトリに設定
4. `https://username.github.io/repository-name`でアクセス

### その他のプラットフォーム

- **Netlify** - フォルダをドラッグアンドドロップ
- **Vercel** - GitHubリポジトリを接続
- **従来のホスティング** - FTPでファイルアップロード

### 環境設定

環境変数不要。以下でURLを更新：
- `data/seo-config.js` - メインサイトURL
- `data/common.js`と`data/links.js`のソーシャルメディアリンク

## 📄 ライセンス

MITライセンス - 個人・商用プロジェクトでの自由な使用可能。

## 🤝 貢献

このテンプレートは簡単にカスタマイズできるよう設計されています。一般的な改善：

- 追加ページテンプレート
- 新しいカードタイプやレイアウト
- 強化されたアニメーション
- 追加ユーティリティクラス
- アクセシビリティ改善

## 💡 クレジット

モダンなWeb標準とベストプラクティスで構築：
- **CSS Grid & Flexbox** - レイアウト用
- **CSS Custom Properties** - テーマ用
- **Font Awesome** - アイコン用
- **Google Fonts** - タイポグラフィ用
- **Schema.org** - 構造化データ用

---

**テンプレートバージョン**: 1.0  
**最終更新**: 2025年  
**対応ブラウザ**: ES6+とCSS Gridをサポートするモダンブラウザ