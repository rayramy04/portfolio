# ポートフォリオウェブサイト テンプレート

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D15.0.0-brightgreen)](https://nodejs.org/)

**[🇬🇧 English Version](README.md)**

---

バニラHTML、CSS、JavaScriptで構築された、シンプルでレスポンシブな**日英バイリンガル対応**のポートフォリオテンプレートです。自由にフォーク、カスタマイズ、デプロイできます。

**[🌟 デモサイト](https://rayramy04.github.io/portfolio/)** | **[📝 更新履歴](CHANGELOG.md)**

![Portfolio Preview](assets/og-image.jpg)

## 主な機能

- **バイリンガル** - 日本語/英語の完全対応、localStorageで言語設定を保持
- **データ駆動** - JSON形式のJavaScriptファイルでコンテンツを管理
- **レスポンシブ** - モバイルファーストデザイン、全デバイス対応
- **依存関係ゼロ** - ピュアHTML/CSS/JS、ビルド不要
- **SEO最適化** - メタタグ、サイトマップ、構造化データ対応
- **カスタマイズ可能** - 簡単な色テーマとコンテンツ更新
- **フォークフレンドリー** - マージ戦略でカスタマイズを保護

## クイックスタート

```bash
# 1. GitHubでこのリポジトリをフォーク

# 2. フォークをクローン
git clone https://github.com/あなたのユーザー名/portfolio.git
cd portfolio

# 3. コンテンツを編集
vim data/seo-config.js    # 名前、URL、メタタグ
vim data/common.js        # SNSリンク、ナビゲーション
vim data/about.js         # 自己紹介と価値観
vim data/cv.js            # 経歴とスキル
vim data/projects.js      # プロジェクト

# 4. HTMLページを再生成
node generate-pages.js

# 5. ローカルでテスト
python -m http.server 8000
# http://localhost:8000 を開く

# 6. GitHub Pagesにデプロイ
git add . && git commit -m "ポートフォリオ内容を更新" && git push
```

## カスタマイズ

### 編集が必要なファイル

| ファイル | 用途 |
|---------|------|
| `data/seo-config.js` | 名前、URL、メタ情報 |
| `data/common.js` | 言語設定、SNSリンク |
| `data/about.js` | 自己紹介と価値観 |
| `data/cv.js` | 職歴、スキル、実績 |
| `data/projects.js` | プロジェクト |
| `css/palette.css` | ブランドカラー |
| `assets/**` | 画像を差し替え |
| `resume/**` | `resume-ja.pdf` と `resume-en.pdf` を追加（任意） |

### バイリンガルコンテンツの形式

すべてのデータファイルはバイリンガルオブジェクトに対応：

```javascript
{
    title: {
        en: "Software Engineer",
        ja: "ソフトウェアエンジニア"
    },
    description: {
        en: "Built scalable web applications",
        ja: "スケーラブルなWebアプリケーションを構築"
    }
}
```

### 色を変更

`css/palette.css` を編集：

```css
:root {
  --color-primary: #059669;        /* ブランドカラー */
  --color-primary-light: #34d399;
  --color-primary-dark: #047857;
}
```

### デフォルト言語を設定

`data/common.js` を編集：

```javascript
lang: {
    current: 'ja',  // 'en' または 'ja'
    available: ['en', 'ja']
}
```

## フォークと更新のワークフロー

このテンプレートは**フォークして上流の更新と同期できる**ように設計されています。

### 仕組み

**あなたのコンテンツは保護されます** - 更新を同期すると：
- 新しいテンプレート機能とバグ修正が適用されます
- あなたのカスタムデータ、画像、色は**絶対に上書きされません**
- HTMLページは新しいテンプレート + あなたのデータで自動再生成されます

**保護されるファイル**（上書きされない）：
- `data/**` - あなたのコンテンツ（名前、プロジェクト、経験）
- `css/palette.css` - あなたのブランドカラー
- `assets/**` - あなたの画像
- `resume/**` - あなたの履歴書PDF

**同期されるファイル**（テンプレートの更新を受け取る）：
- `generate-pages.js`、`template-base.html` - HTMLジェネレーター
- `js/**`、`css/style.css` - コア機能

### 初回セットアップ

フォーク後、マージ戦略を設定：

```bash
git config --local merge.ours.driver true

# オプション：同期後に自動でHTMLを再生成
cp .github/hooks/post-merge .git/hooks/post-merge
chmod +x .git/hooks/post-merge
```

### テンプレート更新の同期

**簡単な方法**（推奨）：
```bash
./sync-template.sh
```

**手動の方法**：
```bash
# GitHubで：「Sync fork」ボタンをクリック
# またはコマンドラインで：
git remote add template-upstream https://github.com/rayramy04/portfolio.git
git fetch template-upstream
git merge template-upstream/main

# HTMLを再生成（post-mergeフックを使っていない場合）
node generate-pages.js
git add *.html && git commit -m "同期後にHTMLを再生成" && git push
```

**詳細なセットアップ手順**: [TEMPLATE_SETUP.md](TEMPLATE_SETUP.md) を参照

## プロジェクト構造

```
portfolio/
├── data/              # ← コンテンツを編集
│   ├── seo-config.js
│   ├── common.js
│   ├── about.js
│   ├── cv.js
│   └── projects.js
├── assets/            # ← あなたの画像
├── css/
│   └── palette.css    # ← あなたの色
├── resume/            # ← resume-ja.pdf, resume-en.pdf
├── generate-pages.js  # ← HTMLを再生成
└── *.html             # 生成されたページ
```

## デプロイ

### GitHub Pages

1. GitHubにプッシュ
2. Settings → Pages に移動
3. `main` ブランチをソースに設定 → 保存
4. `data/seo-config.js` の `baseUrl` をGitHub PagesのURLに更新

任意の静的ホスティング（Netlify、Vercel、Cloudflare Pagesなど）で動作します。

## SEO設定

`robots.txt` で検索エンジンの可視性を制御：

**公開**（デフォルト）：
```txt
User-agent: *
Allow: /
```

**非公開**（直接リンクのみ）：
```txt
User-agent: *
Disallow: /
```

## コントリビューション

コントリビューション歓迎！以下の手順でお願いします：
1. リポジトリをフォーク
2. フィーチャーブランチを作成（`git checkout -b feature/新機能`）
3. 英語と日本語の両方のコンテンツでテスト
4. プルリクエストを送信

## ライセンス

MITライセンス - 個人利用・商用利用ともに自由です。詳細は [LICENSE](LICENSE) を参照してください。

## クレジット

- [Font Awesome](https://fontawesome.com/) - アイコン
- [Google Fonts](https://fonts.google.com/) - タイポグラフィ
- [Particles.js](https://vincentgarreau.com/particles.js/) - 背景アニメーション

---

**バージョン**: 1.3 | **必要環境**: Node.js 15.0+
