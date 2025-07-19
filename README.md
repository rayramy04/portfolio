# Portfolio Website

情報学部学生のポートフォリオサイトです。GitHub Pagesでホスティングされています。

## 🌟 特徴

- モダンでおしゃれなデザイン
- レスポンシブ対応（PC・タブレット・スマホ）
- アニメーション効果（AOS.js、particles.js）
- SEO・アクセシビリティ対応
- 5つのページ構成（Home, About, CV, Portfolio, Links）

## 🛠 技術スタック

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Animations**: AOS.js (Animate On Scroll), particles.js
- **Fonts**: Google Fonts (Poppins, Inter)
- **Icons**: Font Awesome
- **Hosting**: GitHub Pages

## 📁 ファイル構造

```
portfolio-site/
├── index.html          # ホームページ
├── about.html          # 自己紹介ページ
├── cv.html            # 履歴書ページ
├── portfolio.html     # ポートフォリオページ
├── links.html         # リンク集ページ
├── css/
│   └── style.css      # メインスタイルシート
├── js/
│   └── script.js      # メインJavaScript
├── assets/
│   ├── favicon.ico    # ファビコン
│   ├── profile.jpg    # プロフィール写真
│   ├── about-photo.jpg # About用写真
│   ├── project1.jpg   # プロジェクト画像1
│   ├── project2.jpg   # プロジェクト画像2
│   ├── project3.jpg   # プロジェクト画像3
│   ├── project4.jpg   # プロジェクト画像4
│   ├── project5.jpg   # プロジェクト画像5
│   ├── project6.jpg   # プロジェクト画像6
│   └── cv.pdf         # CV PDF版
└── README.md          # このファイル
```

## 🚀 セットアップ

### 1. リポジトリの準備
```bash
git clone https://github.com/your-username/portfolio-site.git
cd portfolio-site
```

### 2. 画像ファイルの配置
`assets/` フォルダに以下の画像を配置してください：
- `profile.jpg` - プロフィール写真（400x400px推奨）
- `about-photo.jpg` - About用写真（600x400px推奨）
- `project1.jpg` - `project6.jpg` - プロジェクト画像（800x600px推奨）
- `favicon.ico` - ファビコン

### 3. 個人情報の更新
- `js/data.js` - プロフィールデータを更新
- 各HTMLファイルの内容を確認・調整

### 4. GitHub Pagesでの公開
1. GitHubリポジトリを作成
2. Settings > Pages > Source を "Deploy from a branch" に設定
3. Branch を "main" に設定
4. 数分後にサイトが公開されます

## ✏️ カスタマイズ方法

### 個人情報の更新

1. **プロフィール情報**: 各HTMLファイルの名前、肩書き、自己紹介文を更新
2. **画像**: `assets/` フォルダの画像ファイルを差し替え
3. **リンク**: `links.html` のSNSリンクやお問い合わせフォームのURLを更新
4. **プロジェクト**: `portfolio.html` のプロジェクト情報を更新

### スタイルの変更

- `css/style.css` でカラーパレット、フォント、レイアウトを調整
- CSS変数を使用しているため、色の変更は簡単です

### コンテンツの追加

- 新しいプロジェクトを追加する場合は `portfolio.html` を編集
- CVに新しい項目を追加する場合は `cv.html` を編集

## 📱 レスポンシブ対応

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🎨 カラーパレット

- **Primary**: #059669 (Emerald)
- **Secondary**: #047857 (Green)
- **Accent**: #10b981 (Light Green)
- **Success**: #22c55e (Bright Green)
- **Warning**: #f59e0b (Amber)

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🤝 貢献

バグ報告や機能提案は Issues でお知らせください。

---

© 2025 Portfolio. All rights reserved.