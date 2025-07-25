# ポートフォリオウェブサイトテンプレート

バニラHTML、CSS、JavaScriptで構築されたモダンでレスポンシブなポートフォリオウェブサイト。洗練されたユーティリティクラスアーキテクチャ、データ駆動型コンテンツ管理、包括的なSEO最適化を特徴としています。

## ✨ 主要機能

- **依存関係ゼロ** - ビルドプロセス不要の純粋なHTML、CSS、JavaScript
- **データ駆動型アーキテクチャ** - JavaScriptデータファイルによる簡単なコンテンツ更新
- **統一デザインシステム** - CSSカスタムプロパティによる一貫したコンポーネント
- **レスポンシブデザイン** - モバイルファーストアプローチによる適応レイアウト
- **SEO最適化** - 構造化データ、メタタグ、技術的SEOベストプラクティス
- **パフォーマンス重視** - 最適化されたローディング、アニメーション、リソース管理
- **アクセシビリティ対応** - セマンティックHTML、ARIAラベル、キーボードナビゲーション

## 🚀 クイックスタート

### ローカル開発

```bash
# リポジトリをクローンまたはダウンロード
git clone <repository-url>
cd portfolio

# ローカル開発サーバーを起動（いずれかを選択）
python -m http.server 8000
# または
npx http-server .

# ブラウザで http://localhost:8000 を開く
```

### カスタマイズ

1. **個人情報の更新**
   - `/data/`ディレクトリのファイルを編集
   - `/assets/`ディレクトリの画像を置き換え
   - CSSカスタムプロパティで色を変更

2. **デプロイ**
   - 任意の静的ホスティングサービスにファイルをアップロード
   - GitHub Pages、Netlify、Vercelすべてサポート
   - ビルドプロセス不要

## 📁 プロジェクト構成

```
portfolio/
├── *.html                 # ページ（index、about、cv、projects、links）
├── template-base.html     # ページ生成用テンプレート（オプション）
├── generate-pages.js      # HTML生成スクリプト（オプション）
├── css/
│   └── style.css         # CSSカスタムプロパティ付き完全スタイルシート
├── js/
│   ├── pages-unified.js  # 中央ページ初期化とルーティング
│   └── utils/            # ユーティリティクラスライブラリ
│       ├── dom-helpers.js   # DOMユーティリティ + PageBaseクラス
│       ├── html-generator.js # テンプレートレンダリングとカード生成
│       └── data-populator.js # データ→DOM変換ユーティリティ
├── data/                  # コンテンツ設定（これらを編集！）
│   ├── common.js         # サイトナビゲーション、ソーシャルリンク、プロフィール情報
│   ├── home.js           # ホームページヒーローコンテンツとキーワード
│   ├── about.js          # 個人ストーリー、タイムライン、興味・関心
│   ├── cv.js             # 教育、経験、スキル、賞、助成金
│   ├── projects.js       # 技術とリンク付きプロジェクトポートフォリオ
│   ├── links.js          # 連絡先とソーシャルメディア情報
│   └── seo-config.js     # SEO構造化データ（Schema.org）
├── assets/               # 画像とメディアファイル
│   ├── *.jpg            # プロフィール、about、OG画像
│   └── projects/        # プロジェクトスクリーンショットとサムネイル
├── content/              # テンプレート生成用HTMLフラグメント（オプション）
├── robots.txt            # 検索エンジンクローリング指示
└── sitemap.xml          # 検索エンジン用サイト構造
```

## 🎨 デザインシステム

### CSSカスタムプロパティ

テーマカスタマイズが簡単なCSSカスタムプロパティベースのデザインシステム：

```css
:root {
  /* プライマリカラー - テーマカスタマイズのために変更 */
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

- **レイアウト**: `.grid-auto-fit`、`.flex-between`、`.container`
- **スペーシング**: `.gap-sm`、`.mb-section`、`.p-4`
- **インタラクティブ**: `.hover-lift`、`.card`、`.btn-primary`

## 📝 コンテンツ管理

### 新しいコンテンツの追加

コンテンツはJavaScriptデータファイルで管理されます。HTML編集不要！

**新しいプロジェクトを追加：**

```javascript
// data/projects.js内
{
    name: "新しいプロジェクト",
    description: "プロジェクトの説明",
    technologies: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/username/project",
    liveUrl: "https://project-demo.com",
    image: "assets/projects/new-project.jpg"
}
```

**職歴を追加：**

```javascript
// data/cv.js - experience配列内
{
    company: "会社名",
    position: "職種",
    period: "2024.01 - 現在",
    description: "役割の説明と成果",
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
            "自分についての最初の段落",
            "より詳細な2番目の段落"
        ]
    }
}
```

### サポートされるコンテンツタイプ

統一カードテンプレートが自動的に処理：

- **教育** - institution、degree、period、description、url
- **経験** - company、position、period、description、url  
- **プロジェクト** - name/title、description、technologies[]、githubUrl、liveUrl、image
- **タイムラインイベント** - period、title、description、icon
- **賞** - title、organization、date、description、link
- **資格** - title、organization、date、url
- **助成金** - title、organization、amount、date、description
- **興味・関心** - title、description、icon（専用テンプレート使用）
- **スキル** - カテゴリ、レベル、説明付き複雑な入れ子構造

## 🔧 アーキテクチャ概要

### ユーティリティクラス設計パターン

コードベースはユーティリティクラスアーキテクチャに従います：

- **HTMLGenerator** - テンプレートレンダリングとHTML生成
- **PageBase** - 共通ページ機能（ナビゲーション、スクロールエフェクト）
- **DOMHelpers** - 安全なDOM操作ユーティリティ
- **DataPopulator** - データ→DOM変換ユーティリティ（利用可能だが活発に使用されていない）

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

インテリジェントなフィールドマッピングにより1つのテンプレートで複数のコンテンツタイプを処理：

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

## 🎯 SEO・パフォーマンス

### SEO機能

- **構造化データ** - Person、Website、ページタイプのJSON-LD schema.orgマークアップ
- **メタタグ** - 動的なページ固有の説明とキーワード
- **ソーシャルメディア** - Open GraphとTwitterカードサポート
- **技術的SEO** - XMLサイトマップ、robots.txt、正規URL

### パフォーマンス最適化

- **CSSカスタムプロパティ** - 最小限の再計算による効率的なスタイリング
- **遅延読み込み** - 必要な時のみ画像を読み込み
- **バッチDOM更新** - innerHTMLによる効率的なレンダリング
- **ハードウェアアクセラレーション** - スムーズなアニメーションのためのCSS変換
- **リソースヒント** - 外部フォントサービスへのプリコネクト

## 📱 レスポンシブデザイン

### ブレークポイント

```css
/* モバイルファーストアプローチ */
.grid-auto-fit {
    grid-template-columns: 1fr; /* モバイル：単一列 */
}

@media (min-width: 768px) {
    .grid-auto-fit {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
}
```

### 適応レイアウト

- **ナビゲーション** - モバイルではハンバーガーメニュー、デスクトップでは完全メニュー
- **カード** - モバイルでは縦積み、大画面ではグリッドレイアウト
- **タイポグラフィ** - remユニットによる流動的フォントサイズ
- **画像** - アスペクト比保持によるレスポンシブ

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

**オプション1：手動作成（現在のアプローチ）**
1. **HTMLファイルを作成** 適切な構造とスクリプトタグで
2. **ナビゲーションエントリを追加** `data/common.js`内
3. **ページハンドラーを追加** `js/pages-unified.js`内
4. **データファイルを作成** `data/`ディレクトリ内

**オプション2：テンプレート生成（代替手段）**
1. **コンテンツを追加** `content/`ディレクトリに
2. **ページ設定を更新** `generate-pages.js`内
3. **ジェネレータを実行** `node generate-pages.js`で
4. **ナビゲーションを更新** 必要に応じて

### カスタムアニメーション

```javascript
// ページ初期化に追加
animateElements([
    { selector: '.my-section', delay: 400 },
    { selector: '.my-cards', delay: 600 }
]);
```

### 画像管理

- **プロフィール写真** - `assets/profile.jpg`を置き換え
- **プロジェクト画像** - `assets/projects/`に追加
- **背景画像** - CSSのbackground-imageプロパティを更新
- **アイコン** - Font Awesome 6.4.0を使用（CDN経由で含まれる）

## 🔧 開発のヒント

### デバッグ

```javascript
// data-populator.jsでコンソールログを有効化
console.log('Populating container:', containerId, 'with data:', data);
```

### ブラウザサポート

- **モダンブラウザ** - Chrome 60+、Firefox 60+、Safari 12+、Edge 79+
- **CSS機能** - CSS Grid、カスタムプロパティ、Flexbox
- **JavaScript機能** - ES6クラス、async/await、テンプレートリテラル

### パフォーマンス監視

- **Core Web Vitals** - LCP、FID、CLSを最適化
- **Lighthouse** - 通常全カテゴリで95+のスコア
- **バンドルサイズ** - 合計約50KB（CSS + JS + HTML）

## 🚀 デプロイ

### GitHub Pages

1. GitHubリポジトリにプッシュ
2. リポジトリ設定でGitHub Pagesを有効化
3. メインブランチ / ルートディレクトリにソースを設定
4. `https://username.github.io/repository-name`でアクセス

### その他のプラットフォーム

- **Netlify** - フォルダをドラッグ&ドロップ
- **Vercel** - GitHubリポジトリを接続
- **従来のホスティング** - FTP経由でファイルをアップロード

### 環境設定

環境変数は不要。以下でURLを更新：
- `data/seo-config.js` - メインサイトURL
- `data/common.js`と`data/links.js`のソーシャルメディアリンク

## 📄 ライセンス

MIT License - 個人・商用プロジェクトでのテンプレート使用は自由です。

## 🤝 コントリビューション

このテンプレートは簡単にカスタマイズできるよう設計されています。一般的な改善：

- 追加のページテンプレート
- 新しいカードタイプやレイアウト
- 強化されたアニメーション
- 追加のユーティリティクラス
- アクセシビリティの改善

## 💡 クレジット

モダンなWeb標準とベストプラクティスで構築：
- **CSS Grid & Flexbox** レイアウト用
- **CSSカスタムプロパティ** テーマ用
- **Font Awesome** アイコン用
- **Google Fonts** タイポグラフィ用
- **Schema.org** 構造化データ用

---

**テンプレートバージョン**: 1.0  
**最終更新**: 2025  
**対応ブラウザ**: ES6+とCSS Gridをサポートするモダンブラウザ