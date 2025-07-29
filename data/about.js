// About page data configuration
window.aboutData = {
    personal: {
        name: "Ray",
        position: "Computer Science & Data Science Student at Monash University Malaysia",
        image: "assets/about-photo.jpg",
        description: [
            "2004年生まれ。高校時代は音響音声学の研究、将棋、英語ディベートなどの課外活動に励み、全国大会で最優秀賞・努力賞を受賞し、国際大会にも出場。",
            "マレーシアのモナッシュ大学(情報学部）に進学後は、大学でトップクラスの成績を維持し、給付型奨学金を受給。人工知能オリンピックや言語学オリンピックなどでも入賞。",
            "並行して、留学情報サイトの立ち上げや音楽フリーランスとしての活動も行いながら、インターンシップや海外旅行、格闘技にも取り組むなど、常に新たな挑戦を続けている。"
        ]
    },
    // Detailed personal story/background narrative for the story section
    story: {
        // Multiple paragraph format for storytelling flow
        paragraphs: [
            "高校時代に行っていた合成音声に関する研究で初めてPythonに触れ、AIや統計学への興味を深めました。また、自身が制作した学園祭のウェブサイトを全校生徒に利用してもらったことで、技術で人の役に立つ喜びを実感しました。",
            "その後、最先端の技術を国際的な環境で学びたいと考え、コンピュータサイエンスとデータサイエンスの両方を学ぶことができるモナッシュ大学マレーシア校に進学しました。現在は機械学習モデルの実装やWebアプリケーション開発を通じて、理論と実践の橋渡しに取り組んでいます。",
            "将来は、留学を通じて得たグローバルな視点や多様な課外活動の経験を活かし、AIやデータサイエンスを活用して社会問題を解決するプロダクトを開発したいです。"
        ]
    },
    // Core strengths and competencies
    strengths: [
        {
            title: "Technical × Content Creation",
            description: "ITスキルとコンテンツ制作力を融合。情報を分かりやすく発信",
            icon: "fas fa-bullhorn",
            highlights: [
                "フルスタック開発スキル（Python, Reactなど）",
                "業界最大規模の留学ブログ開設・YouTube登録者1万人超",
                "ウェブサイト構築・SEO対策・リサーチ＆ライティング"
            ]
        },
        {
            title: "Global Perspective",
            description: "海外大学での学業と多様な国際経験。グローバル視点での問題解決",
            icon: "fas fa-globe-asia",
            highlights: [
                "モナッシュ大学（マレーシア）在籍・オーストラリアへの交換留学",
                "15カ国以上への渡航経験",
                "英語ビジネスレベル・複数言語対応可能"
            ]
        },
        {
            title: "Academic Excellence",
            description: "学術的な成果と実践的なスキルの両立。理論と実装の両面から価値を創出",
            icon: "fas fa-graduation-cap",
            highlights: [
                "モナッシュ大学主席表彰・複数の奨学金獲得",
                "言語学＆人工知能オリンピック二冠",
                "音響音声学の研究で国際大会出場"
            ]
        },
        {
            title: "Entrepreneurial Mindset",
            description: "ゼロから価値を創出し、実際にユーザーに届ける実行力",
            icon: "fas fa-rocket",
            highlights: [
                "教育・IT・メディアなど複数業界での実務経験",
                "家計簿ツール・音声AIなど実用的プロダクトを開発・配布",
                "フリーランスとして50件以上の音楽案件を受注・収益化"
            ]
        }
    ],
    // Chronological timeline of major life events - displayed in reverse order (newest first)
    timeline: [
        {
            period: "Present", // Time period or date label
            title: "現在", // Event title/milestone
            description: "2025年現在、学部2年生として、より専門的なプログラミングやデータ解析の分野を学んでいる。学業の傍ら、音楽活動、ウェブサイト運営などにも取り組む。",
            icon: "fas fa-laptop-code" // FontAwesome icon for visual representation
        },
        {
            period: "2024.07",
            title: "モナッシュ大学の学部課程に進学",
            description: "MUFY修了後、モナッシュ大学マレーシア校の学部課程（Bachelor of Computer Science in Data Science）に奨学金付きで進学。",
            icon: "fas fa-university"
        },
        {
            period: "2023.07",
            title: "マレーシア留学開始",
            description: "海外での新生活をスタート。Monash University Foundation Year (MUFY)に奨学金付きで入学。この頃から各種インターンシップなども開始。",
            icon: "fas fa-plane-departure"
        },
        {
            period: "2023.03",
            title: "高校卒業",
            description: "地元の公立高校（国際バカロレア認定校）を卒業。渡航まで約4か月半のギャップタームに突入。",
            icon: "fas fa-graduation-cap"
        },
        {
            period: "2004.04",
            title: "誕生",
            description: "神奈川県で生まれ、千葉県で幼少期を過ごす。小学4年生で地方に転校。",
            icon: "fas fa-baby"
        }
    ],
    // Personal interests and hobbies displayed in grid format
    // Uses specialized interestItem template (not unifiedCardTemplate)
    interests: [
        {
            title: "Programming", // Interest category name
            description: "PythonやJavaScriptを使った開発、機械学習の実装、ウェブサイト制作など。", // Brief description
            icon: "fas fa-code" // FontAwesome icon
        },
        {
            title: "Music",
            description: "ピアノ演奏、耳コピでの楽譜制作。YouTubeチャンネルの運営や音楽講師も務める。",
            icon: "fas fa-music"
        },
        {
            title: "Shogi (Japanese Chess)",
            description: "アマチュア二段、三間飛車党。チェスもいつかやりたい。",
            icon: "fas fa-chess"
        },
        {
            title: "Travel",
            description: "アジア各国へ15か国ほど旅行。異文化体験と食べ歩きが好き。",
            icon: "fas fa-plane"
        },
        {
            title: "Sports",
            description: "テニスから格闘技までなんでも！最近はピックルボールにハマっています。",
            icon: "fas fa-dumbbell"
        },
        {
            title: "Reading",
            description: "技術書から小説まで、幅広いジャンルの読書。ミステリー小説が特に好き。",
            icon: "fas fa-book"
        }
    ]
};