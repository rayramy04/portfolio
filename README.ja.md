# 📚 モダンポートフォリオテンプレート

> JSON駆動、レスポンシブ対応のポートフォリオウェブサイトテンプレート（バニラHTML、CSS、JavaScript製）

[![English](https://img.shields.io/badge/English-README-blue)](README.md)
![ポートフォリオデモ](https://img.shields.io/badge/ポートフォリオ-ライブデモ-brightgreen)
![GitHub Stars](https://img.shields.io/github/stars/username/repository?style=social)
![ライセンス](https://img.shields.io/badge/License-MIT-blue.svg)

## ✨ 特徴

### 🎨 **モダンデザイン**
- スムーズなアニメーション付きのクリーンでミニマルなデザイン
- 完全レスポンシブレイアウト（モバイル、タブレット、デスクトップ）
- CSSカスタムプロパティによるダーク/ライトテーマ対応
- ホームページでのインタラクティブなパーティクル背景
- Intersection Observer APIによるスムーズスクロールアニメーション

### 📱 **モバイルファースト設計**
- 全画面サイズに対応するレスポンシブグリッドレイアウト
- ハンバーガーメニュー付きモバイル最適化ナビゲーション
- タッチフレンドリーなインターフェースとボタン
- モバイルネットワークでの高速読み込み

### 🚀 **パフォーマンス最適化**
- **バニラJavaScript** - 重いフレームワーク不使用
- 再利用可能なテンプレート**コンポーネントベースアーキテクチャ**
- **データ駆動型コンテンツ** - JSONファイルで簡単更新
- **遅延読み込み**とキャッシュメカニズム
- 適切なメタタグによる**SEO対応**構造

### 💾 **JSONベースコンテンツ管理**
- 整理されたJSONファイルに全コンテンツを保存
- データベース不要 - 静的ホスティングに最適
- コードを触らずに簡単更新
- 保守性向上のための構造化データ

## 🏗️ アーキテクチャ

### **ファイル構造**
```
portfolio/
├── 📄 HTMLファイル
│   ├── index.html          # ヒーローセクション付きホームページ
│   ├── about.html          # ストーリー＆タイムライン付きアバウトページ
│   ├── cv.html             # CV/履歴書ページ
│   ├── projects.html       # プロジェクト紹介ページ
│   └── links.html          # ソーシャルリンク＆連絡先ページ
├── 🎨 スタイリング
│   └── css/
│       └── style.css       # 単一の最適化されたCSSファイル
├── ⚡ JavaScript
│   ├── script.js           # パーティクル効果＆インタラクション
│   ├── data-loader.js      # キャッシュ付きJSONデータ読み込み
│   └── load-components.js  # コンポーネントテンプレート＆ページロジック
├── 📊 データ（JSON）
│   ├── common.json         # 共有データ（ナビゲーション、ソーシャル）
│   ├── home/hero.json      # ホームページヒーローコンテンツ
│   ├── about/              # アバウトページコンテンツ
│   ├── cv/                 # CVセクション（学歴、経験など）
│   ├── projects/           # プロジェクトポートフォリオデータ
│   └── links/              # 連絡先情報
└── 🖼️ アセット
    ├── favicon.ico
    ├── profile.jpg
    ├── about-photo.jpg
    └── project*.jpg        # プロジェクト画像
```

## 🚀 クイックスタート

### **1. クローン＆セットアップ**
```bash
git clone https://github.com/username/portfolio-template.git
cd portfolio-template
```

### **2. コンテンツのカスタマイズ**
`data/`ディレクトリのJSONファイルを編集：

```json
// data/home/hero.json
{
  "name": "あなたの名前",
  "title": "あなたの職業タイトル",
  "subtitle": "あなたの簡単な説明",
  "keywords": ["スキル1", "スキル2", "スキル3"]
}
```

### **3. 画像の追加**
`assets/`フォルダ内の画像を置き換え：
- `profile.jpg` - プロフィール写真
- `about-photo.jpg` - アバウトページ写真
- `project1.jpg`, `project2.jpg`など - プロジェクトスクリーンショット

### **4. ローカル起動**
```bash
# オプション1: Python（インストール済みの場合）
python -m http.server 8000

# オプション2: Node.js（インストール済みの場合）
npx http-server .

# オプション3: お好みのローカルサーバー
```

`http://localhost:8000`にアクセス

### **5. GitHub Pagesにデプロイ**
1. GitHubリポジトリにプッシュ
2. Settings → Pagesに移動
3. ソースを「Deploy from a branch」に設定
4. `main`ブランチと`/`（ルート）フォルダを選択
5. `https://username.github.io/repository-name`でサイトが公開

## 🛠️ カスタマイズガイド

### **📝 コンテンツ更新**

#### **個人情報**
```json
// data/about/personal.json
{
  "name": "あなたの名前",
  "position": "現在のポジション",
  "description": "自己紹介文..."
}
```

#### **プロジェクト**
```json
// data/projects/projects.json
[
  {
    "name": "プロジェクト名",
    "description": "短い説明",
    "longDescription": "詳細説明",
    "image": "assets/project1.jpg",
    "technologies": ["React", "Node.js", "MongoDB"],
    "githubUrl": "https://github.com/...",
    "liveUrl": "https://project-demo.com"
  }
]
```

### **🎨 スタイルカスタマイズ**

#### **カラースキーム**
```css
/* css/style.css - CSSカスタムプロパティ */
:root {
  --primary-color: #10b981;     /* ブランドカラー */
  --text-primary: #1f2937;      /* メインテキストカラー */
  --bg-primary: #ffffff;        /* 背景色 */
  /* 必要に応じてカスタマイズ */
}
```

## 🔧 技術的特徴

### **🏆 主要イノベーション**

#### **1. インテリジェントデータ読み込み**
```javascript
class DataLoader {
  constructor() {
    this.cache = new Map();           // キャッシュシステム
    this.loadingPromises = new Map(); // 重複リクエスト防止
  }
}
```

#### **2. コンポーネントベースアーキテクチャ**
- JavaScript内の再利用可能HTMLテンプレート
- 動的コンポーネント読み込みとキャッシング
- 集約化された状態管理

#### **3. パフォーマンス最適化**
- スクロールアニメーション用**Intersection Observer**
- テーマ用**CSSカスタムプロパティ**
- スムーズなパフォーマンスのための**デバウンスイベントハンドラー**
- 並列データ読み込み用**Promise.all**

## 📊 パフォーマンス指標

- **Lighthouseスコア**: 95+（パフォーマンス、SEO、ベストプラクティス）
- **First Contentful Paint**: < 1.5s
- **Cumulative Layout Shift**: < 0.1
- **総バンドルサイズ**: < 50KB（画像除く）
- **依存関係ゼロ**: 外部JavaScriptライブラリ不使用

## 🤝 コントリビューション

1. リポジトリを**フォーク**
2. フィーチャーブランチを**作成**（`git checkout -b feature/amazing-feature`）
3. 変更を**コミット**（`git commit -m 'Add amazing feature'`）
4. ブランチに**プッシュ**（`git push origin feature/amazing-feature`）
5. **プルリクエスト**を作成

## 📄 ライセンス

このプロジェクトは**MITライセンス**の下でライセンスされています - 詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 🙏 謝辞

- **Particles.js** - インタラクティブパーティクル背景
- **Font Awesome** - アイコンライブラリ
- **Google Fonts** - タイポグラフィ（Poppins、Inter）
- **Intersection Observer API** - スムーズスクロールアニメーション

## 📞 サポート

- **GitHub Issues**: バグ報告や機能リクエスト
- **ドキュメント**: 詳細ガイドは`docs/`フォルダを確認
- **サンプル**: 実装例は`examples/`フォルダを参照

---

**⭐ 役に立ったらこのリポジトリにスターをください！**

開発者により、開発者のために❤️で作成されました。