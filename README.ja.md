# ポートフォリオWebサイト

バニラHTML、CSS、JavaScriptで構築された、クリーンでレスポンシブなポートフォリオWebサイト。コンテンツ管理が簡単なデータ駆動型アーキテクチャ、レスポンシブデザイン、SEO最適化を特徴としています。ビルドプロセスや依存関係は不要です。

**🌟 [ライブデモ](https://ll-0013py.github.io/portfolio/index.html)** | **📖 [English Version](README.md)**

## ✨ 機能

- **依存関係ゼロ** - ビルドプロセス不要のピュアHTML、CSS、JavaScript
- **データ駆動型アーキテクチャ** - JavaScriptデータファイルによる簡単なコンテンツ更新
- **レスポンシブデザイン** - モバイルファーストアプローチと適応レイアウト
- **SEO最適化** - 構造化データ、メタタグ、技術的SEOベストプラクティス
- **パフォーマンス重視** - 最適化された読み込み、アニメーション、リソース管理
- **統一アニメーションシステム** - 全ページで一貫したアニメーション効果
- **モジュラーユーティリティクラス** - 再利用可能なDOMヘルパー、HTMLジェネレーター、データポピュレーター
- **技術タグシステム** - スタイル付きタグによる技術スタックの視覚的表現
- **簡単デプロイ** - 任意の静的ホスティングサービスで動作

## 🚀 クイックスタート

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/ll-0013py/portfolio.git
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
    technologies: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/username/project",
    liveUrl: "https://project-demo.com",
    image: "assets/projects/new-project.jpg"
}
```

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
4. `https://username.github.io/repository-name`でアクセス

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