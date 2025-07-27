# ポートフォリオWebサイト

バニラHTML、CSS、JavaScriptで構築された、クリーンでレスポンシブなポートフォリオWebサイト。コンテンツ管理が簡単なデータ駆動型アーキテクチャ、レスポンシブデザイン、SEO最適化を特徴としています。ビルドプロセスや依存関係は不要です。

**🌟 [ライブデモ](https://rayramy04.github.io/portfolio/index.html)** | **📖 [English Version](README.md)**

## ✨ 機能

- **依存関係ゼロ** - ビルドプロセス不要のピュアHTML、CSS、JavaScript
- **データ駆動型アーキテクチャ** - JavaScriptデータファイルによる簡単なコンテンツ更新
- **プロジェクトフィルタリングシステム** - スムーズなアニメーション付きカテゴリベースのプロジェクト絞り込み
- **複数カテゴリサポート** - プロジェクトが複数カテゴリに属することが可能で、柔軟なフィルタリング
- **統一エンプティステート処理** - 全セクション・全ページ共通の「項目が見つかりません」表示
- **レスポンシブデザイン** - モバイルファーストアプローチと適応レイアウト
- **SEO最適化** - 構造化データ、メタタグ、技術的SEOベストプラクティス
- **パフォーマンス重視** - 最適化された読み込み、アニメーション、リソース管理
- **統一アニメーションシステム** - 全ページで一貫したアニメーション効果
- **モジュラーユーティリティクラス** - 再利用可能なDOMヘルパー、HTMLジェネレーター、データポピュレーター
- **カテゴリ分類システム** - 視覚的フィルタリング付きプロジェクト分類整理
- **簡単デプロイ** - 任意の静的ホスティングサービスで動作

## 🚀 クイックスタート

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/rayramy04/portfolio.git
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
   - CSSカスタムプロパティで色をカスタマイズ

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
├── template-base.html      # 新規ページ作成用ベーステンプレート
├── css/
│   └── style.css          # 完全スタイルシート
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

## 🎨 カスタマイズ

### 色の変更

`css/style.css`のCSSカスタムプロパティを更新：

```css
:root {
  --color-primary: #059669;        /* メインブランドカラー */
  --color-primary-light: #34d399;  /* ホバー状態 */
  --color-primary-dark: #047857;   /* アクティブ状態 */
}
```

### コンテンツ追加

コンテンツはJavaScriptデータファイルで管理 - HTML編集不要！

**プロジェクトを追加**（`data/projects.js`内）：
```javascript
{
    name: "私の新プロジェクト",
    description: "プロジェクトの説明",
    categories: ["Web Development", "Backend & API"], // 複数カテゴリ対応
    githubUrl: "https://github.com/username/project",
    liveUrl: "https://project-demo.com",
    image: "assets/projects/new-project.jpg"
}
```

**プロジェクト分類システム**：
- **プロジェクト毎に複数カテゴリ** - プロジェクトは複数カテゴリに属することが可能
- **自動カテゴリボタン生成** - フィルターボタンはプロジェクトデータから生成
- **定義済みカテゴリ**（`data/projects.js`でカスタマイズ可能）：
  - Web Development
  - Backend & API
  - Data Science & AI
  - App Development
  - Automation & Tools
  - Research & Others

**職歴を追加**（`data/cv.js` - experience配列内）：
```javascript
{
    company: "会社名",
    position: "職種",
    period: "2024.01 - Present",
    description: "役割説明と実績",
    url: "https://company.com"
}
```

**リンクを安全に設定**（`data/links.js`内）：
```javascript
// ✅ 空のセクションは自動的に「項目が見つかりません」メッセージを表示
window.linksData = {
    contact: [],           // 常に表示（ウェブサイト/連絡先情報）
    social: [],            // 空の場合エンプティステート表示
    portfolio: []          // 空の場合エンプティステート表示
};

// ✅ 安全：自分のリンクを追加
social: [
    {
        title: "GitHub",
        url: "https://github.com/YOUR-USERNAME",
        username: "@YOUR-USERNAME",
        icon: "fab fa-github"
    }
]

// ❌ 危険：プロパティを完全に削除しない
// delete window.linksData.social;  // これはページを壊します！
```

**エンプティステート処理**：
- Social MediaとPortfolioセクションは空の場合、自動的に「項目が見つかりません」を表示
- Contactセクションは通常常にデータが入っている
- テンプレート利用者は空でもセクションが利用可能であることを確認できる

**個人情報を更新**（`data/about.js`内）：
```javascript
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

### プロジェクトフィルタリングシステム

ポートフォリオには動的なプロジェクトフィルタリングシステムが含まれています：

**機能**：
- スムーズなアニメーション付きリアルタイムカテゴリフィルタリング
- 複数カテゴリサポート - プロジェクトは複数カテゴリに属することが可能
- プロジェクトデータからの自動ボタン生成
- フィルターに一致するプロジェクトがない場合のエンプティステート処理
- 全インタラクションでの統一アニメーションタイミング

**設定**（`data/projects.js`内）：
```javascript
// 利用可能カテゴリを定義
window.projectCategories = [
    "Web Development",
    "Backend & API", 
    "Data Science & AI",
    "App Development",
    "Automation & Tools",
    "Research & Others"
];

// プロジェクトに複数カテゴリを割り当て
{
    name: "フルスタックアプリ",
    categories: ["Web Development", "Backend & API"], // 複数カテゴリ
    // ... その他のプロジェクトデータ
}
```

**カスタマイズ**：
- `window.projectCategories`配列を変更してカテゴリを追加/削除
- プロジェクトは自動的に複数カテゴリをサポート
- フィルターボタンはプロジェクトデータから動的生成
- エンプティステートメッセージを変更するには`js/pages-unified.js`の`EMPTY_STATE_CONFIG`を編集

### 新しいページの追加

1. **HTMLファイルを作成**（`template-base.html`からコピー）
2. **ナビゲーションを追加** `data/common.js`内
3. **ページハンドラーを追加** `js/pages-unified.js`内
4. **データファイルを作成** `data/`ディレクトリ内

## 🚀 デプロイ

### GitHub Pages

1. GitHubリポジトリにプッシュ
2. リポジトリ設定でGitHub Pagesを有効化
3. ソースをmainブランチ / ルートディレクトリに設定
4. `https://rayramy04.github.io/portfolio`でアクセス

### その他のプラットフォーム

- **Netlify** - フォルダをドラッグアンドドロップ
- **Vercel** - GitHubリポジトリを接続
- **従来のホスティング** - FTPでファイルアップロード

### 環境設定

環境変数不要。以下でURLを更新：
- `data/seo-config.js` - メインサイトURL
- `data/common.js`と`data/links.js`のソーシャルメディアリンク

## 🛠️ ブラウザサポート

- **モダンブラウザ** - Chrome 60+、Firefox 60+、Safari 12+、Edge 79+
- **CSS機能** - CSS Grid、カスタムプロパティ、Flexbox
- **JavaScript機能** - ES6クラス、async/await、テンプレートリテラル

## 🐛 トラブルシューティング

**ローカルサーバーが動かない場合：**
```bash
# 代替サーバーを試す
python3 -m http.server 8000
# または
php -S localhost:8000
```

**画像が読み込まれない場合：**
- `data/`ファイル内のファイルパスを確認
- `assets/`ディレクトリに画像が存在することを確認
- 相対パスを使用（例：`assets/projects/image.jpg`）

**リンクページでエラーが表示される場合：**
- `data/links.js`が存在し、`window.linksData`が含まれていることを確認
- プロパティを削除せず、空配列を使用：`contact: []`
- 空のセクション（social、portfolio）は自動的に「項目が見つかりません」を表示
- 詳細なエラーメッセージはJavaScriptコンソールで確認

**エンプティステートメッセージが表示されない場合：**
- `js/pages-unified.js`の`EMPTY_STATE_CONFIG`が正しく定義されていることを確認
- データ配列が実際に空（未定義ではない）であることを確認
- ページ初期化関数が正しく呼ばれていることを確認

## 📄 ライセンス

MITライセンス - 個人・商用利用無料。

## 🤝 貢献

貢献歓迎！このテンプレートは簡単にカスタマイズできるよう設計されています。一般的な改善：

- 追加ページテンプレート
- 新しいカードタイプやレイアウト
- 強化されたアニメーション
- 追加ユーティリティクラス
- アクセシビリティ改善

IssueやPull Requestをお気軽にどうぞ。

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