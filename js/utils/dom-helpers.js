// DOM操作とページ初期化の共通ユーティリティ
class DOMHelpers {
    // 要素を安全に取得
    static getElement(id, retryCount = 3) {
        return new Promise((resolve, reject) => {
            const attempt = (count) => {
                const element = document.getElementById(id);
                if (element) {
                    resolve(element);
                } else if (count > 0) {
                    setTimeout(() => attempt(count - 1), 50);
                } else {
                    reject(new Error(`Element with id '${id}' not found`));
                }
            };
            attempt(retryCount);
        });
    }

    // HTMLを安全に設定
    static setHTML(element, html) {
        if (!element) return false;
        element.innerHTML = html;
        return true;
    }

    // テキストを安全に設定
    static setText(element, text) {
        if (!element) return false;
        element.textContent = text;
        return true;
    }

    // クラスを追加してトランジション効果
    static addLoadedClass(element, delay = 100) {
        if (!element) return;
        setTimeout(() => element.classList.add('loaded'), delay);
    }

    // セクション全体にloaded クラスを追加
    static loadSection(sectionSelector, delay = 100) {
        const section = document.querySelector(sectionSelector);
        this.addLoadedClass(section, delay);
    }
}

// ページ初期化の基底クラス
class PageBase {
    constructor(pageName) {
        this.pageName = pageName;
        this.isInitialized = false;
    }

    // 共通初期化処理
    async init() {
        if (this.isInitialized) return;
        
        try {
            // 共通コンポーネントの読み込み
            await this.loadCommonComponents();
            
            // ページ特有の初期化
            await this.initializePageContent();
            
            this.isInitialized = true;
        } catch (error) {
            console.error(`Failed to initialize ${this.pageName} page:`, error);
        }
    }

    // 共通コンポーネント読み込み
    async loadCommonComponents() {
        this.loadComponents();
        this.initializeNavigation();
        this.initializeScrollEffects();
        
        // CV style見出しがある場合、トグル機能を初期化
        if (this.pageName === 'CV' || this.pageName === 'About' || document.querySelector('.cv-section-title')) {
            this.initializeCVToggle();
        }
    }

    // ページ固有コンテンツ初期化 (継承先で実装)
    async initializePageContent() {
        // オーバーライド用
    }

    // エラーハンドリング
    handleError(error, elementId = null) {
        console.error(`${this.pageName} page error:`, error);
        if (elementId) {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = `<div class="error">Failed to load content</div>`;
            }
        }
    }

    // ヘッダーとフッターの読み込み
    loadComponents() {
        const ComponentTemplates = {
            header: `
                <nav class="navbar" id="navbar">
                    <div class="nav-container">
                        <div class="nav-logo">
                            <a href="index.html">Ray's Portfolio</a>
                        </div>
                        <div class="nav-menu" id="nav-menu">
                            <a href="index.html" class="nav-link">Home</a>
                            <a href="about.html" class="nav-link">About</a>
                            <a href="cv.html" class="nav-link">CV</a>
                            <a href="projects.html" class="nav-link">Projects</a>
                            <a href="links.html" class="nav-link">Links</a>
                        </div>
                        <div class="nav-toggle" id="nav-toggle">
                            <span class="bar"></span>
                            <span class="bar"></span>
                            <span class="bar"></span>
                        </div>
                    </div>
                </nav>
            `,
            
            footer: `
                <footer class="footer">
                    <div class="footer-content">
                        <p class="copyright">&copy; Ray. All rights reserved.</p>
                        <div class="footer-social" id="footer-social">
                            <!-- Social media links populated dynamically -->
                        </div>
                    </div>
                    <div class="back-to-top" id="back-to-top">
                        <i class="fas fa-chevron-up"></i>
                    </div>
                </footer>
            `
        };

        // ヘッダーの注入
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = ComponentTemplates.header;
        }
        
        // フッターの注入
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = ComponentTemplates.footer;
        }
    }

    // ナビゲーション機能を統合初期化
    initializeNavigation() {
        // アクティブリンク設定
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });

        // モバイルメニュー
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
    }

    // スクロール関連機能を統合初期化
    initializeScrollEffects() {
        const navbar = document.getElementById('navbar');
        const backToTop = document.getElementById('back-to-top');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            // ナビバー効果
            if (navbar) {
                navbar.classList.toggle('scrolled', scrollY > 50);
            }
            
            // トップへ戻るボタン表示
            if (backToTop) {
                backToTop.classList.toggle('visible', scrollY > 300);
            }
        });
        
        // トップへ戻るボタンクリック
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // CV セクショントグル機能の初期化
    initializeCVToggle() {
        document.querySelectorAll('.cv-section-title').forEach(title => {
            title.addEventListener('click', function() {
                const content = document.getElementById(this.dataset.section + '-content');
                const toggleIcon = this.querySelector('.toggle-icon');
                
                if (content && toggleIcon) {
                    const isCollapsed = content.classList.contains('collapsed');
                    content.classList.toggle('collapsed', !isCollapsed);
                    toggleIcon.classList.toggle('fa-chevron-down', !isCollapsed);
                    toggleIcon.classList.toggle('fa-chevron-up', isCollapsed);
                }
            });
        });
    }
}