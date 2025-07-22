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
        setTimeout(() => {
            element.classList.add('loaded');
        }, delay);
    }

    // 複数要素にloaded クラスを追加
    static addLoadedClassToMultiple(elements, delay = 100) {
        elements.forEach(element => {
            if (element) {
                this.addLoadedClass(element, delay);
            }
        });
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
            console.log(`Initializing ${this.pageName} page`);
            
            // 共通コンポーネントの読み込み
            await this.loadCommonComponents();
            
            // ページ特有の初期化
            await this.initializePageContent();
            
            this.isInitialized = true;
            console.log(`${this.pageName} page initialized successfully`);
            
        } catch (error) {
            console.error(`Failed to initialize ${this.pageName} page:`, error);
        }
    }

    // 共通コンポーネント読み込み
    async loadCommonComponents() {
        this.loadComponents();
        this.setActiveNavLink();
        this.initializeMobileMenu();
        this.initializeBackToTop();
        this.initializeNavbarEffects();
        
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

    // ナビゲーションのアクティブリンク設定
    setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            }
        });
    }

    // モバイルメニューの初期化
    initializeMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
    }

    // トップへ戻るボタンの初期化
    initializeBackToTop() {
        const backToTop = document.getElementById('back-to-top');
        
        if (backToTop) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            });
            
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // ナビバー効果の初期化
    initializeNavbarEffects() {
        const navbar = document.getElementById('navbar');
        
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }
    }

    // CV セクショントグル機能の初期化
    initializeCVToggle() {
        console.log('CV Toggle: Initializing CV section toggles');
        
        // Find all CV section titles
        const sectionTitles = document.querySelectorAll('.cv-section-title');
        console.log('CV Toggle: Found section titles:', sectionTitles.length);
        
        sectionTitles.forEach(title => {
            title.addEventListener('click', function() {
                const sectionName = this.dataset.section;
                console.log('CV Toggle: Clicked section:', sectionName);
                
                // Find the content element
                const content = document.getElementById(sectionName + '-content');
                const toggleIcon = this.querySelector('.toggle-icon');
                
                if (content && toggleIcon) {
                    const isCollapsed = content.classList.contains('collapsed');
                    
                    if (isCollapsed) {
                        // Expand
                        content.classList.remove('collapsed');
                        toggleIcon.classList.remove('fa-chevron-down');
                        toggleIcon.classList.add('fa-chevron-up');
                        console.log('CV Toggle: Expanded section:', sectionName);
                    } else {
                        // Collapse
                        content.classList.add('collapsed');
                        toggleIcon.classList.remove('fa-chevron-up');
                        toggleIcon.classList.add('fa-chevron-down');
                        console.log('CV Toggle: Collapsed section:', sectionName);
                    }
                } else {
                    console.warn('CV Toggle: Could not find content or toggle icon for section:', sectionName);
                }
            });
        });
    }
}