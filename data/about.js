// About page data configuration
window.aboutData = {
    personal: {
        name: 'Ray',
        position: {
            en: 'Computer Science & Data Science Student at Monash University Malaysia',
            ja: 'モナッシュ大学マレーシア校 コンピュータサイエンス・データサイエンス専攻',
        },
        image: 'assets/about-photo.jpg',
        description: [
            {
                en: 'After graduating from high school in Japan, I moved to Malaysia to study in an international environment and now study Computer Science and Data Science at Monash University Malaysia.',
                ja: '日本の高校を卒業後、国際的な環境で学ぶためにマレーシアへ渡り、現在はモナッシュ大学マレーシア校でコンピュータサイエンスとデータサイエンスを学んでいます。',
            },
            {
                en: 'With AI and data science as my core focus, I also work across web development, education, music, and media.',
                ja: 'AI・データサイエンスを軸に、Web開発、教育、音楽、メディア運営など、複数の領域で活動しています。',
            },
        ],
    },
    // Detailed personal story/background narrative for the story section
    story: {
        // Multiple paragraph format for storytelling flow
        paragraphs: [
            {
                en: 'In high school, my research on speech synthesis introduced me to Python and sparked my interest in AI, statistics, and treating language as data. Also, after building a school festival website used across my school, I realized how rewarding it is to turn what I learn into something people can actually use.',
                ja: '高校時代の合成音声研究でPythonに初めて触れたことが、AIや統計、言語をデータとして扱う面白さを知るきっかけになりました。また、自作した学園祭サイトを全校生徒に使ってもらった経験から、学んだことを形にし、実際に使われるものへつなげる喜びを実感しました。',
            },
            {
                en: 'That led me to Monash University Malaysia, where I could deepen Computer Science and Data Science in an international environment. Looking ahead, I want to use AI and data science to create practical value for others.',
                ja: 'その延長で、国際的な環境でコンピュータサイエンスとデータサイエンスを深められるモナッシュ大学マレーシア校へ進学しました。今後は、AIやデータサイエンスを通じて、誰かの役に立つ価値を生み出していきたいです。',
            },
        ],
    },
    // Personal values and characteristics
    strengths: [
        {
            title: {
                en: 'Fast Learning & Consistent Results',
                ja: '高速学習と成果の再現性',
            },
            icon: 'fas fa-bolt',
            highlights: [
                {
                    en: 'Strong academic results alongside multiple technical and business certifications',
                    ja: '大学での高成績に加え、技術・ビジネス系資格を複数取得',
                },
                {
                    en: 'Awards across AI research, olympiads, hackathons, and data competitions',
                    ja: 'AI研究、オリンピック、ハッカソン、データコンペでの受賞',
                },
            ],
        },
        {
            title: {
                en: 'Global × Cross-Domain Value Creation',
                ja: 'グローバル×多領域で価値を創る',
            },
            icon: 'fas fa-globe',
            highlights: [
                {
                    en: '15+ countries, multinational teams, business-level English',
                    ja: '15カ国以上渡航、多国籍チーム協働、英語ビジネスレベル',
                },
                {
                    en: 'Projects spanning web development, AI/data science, media, and music',
                    ja: 'Web開発、AI/データサイエンス、メディア、音楽を横断して活動',
                },
            ],
        },
        {
            title: {
                en: 'Persistent Until Impact',
                ja: '成果が出るまで粘り強く',
            },
            icon: 'fas fa-mountain',
            highlights: [
                {
                    en: 'YouTube: 0 → 30K subscribers, 4.5M+ views over years of consistency',
                    ja: 'YouTube：0→3万人（総再生450万回超）数年間継続',
                },
                {
                    en: 'Study abroad blog: 850+ articles built into industry-leading site',
                    ja: '留学ブログ：850記事以上執筆、業界最大級のサイトに成長',
                },
            ],
        },
        {
            title: {
                en: 'Communicating Technology Clearly',
                ja: '技術を分かりやすく伝える',
            },
            icon: 'fas fa-comments',
            highlights: [
                {
                    en: 'Music instructor, math tutor, study abroad mentor',
                    ja: '音楽講師、数学家庭教師、留学進路メンター',
                },
                {
                    en: 'Won hackathons with storytelling, not just code',
                    ja: 'ハッカソンで技術だけでなくストーリーで勝利',
                },
            ],
        },
    ],
    // Chronological timeline of major life events - displayed in reverse order (newest first)
    timeline: [
        {
            period: 'Present',
            title: {
                en: 'Present',
                ja: '現在',
            },
            description: {
                en: 'Now in my third undergraduate year, studying programming and data analysis while continuing music and web media projects.',
                ja: '2026年現在、学部3年生としてプログラミングやデータ解析を学びながら、音楽活動やWebメディア運営にも取り組む。',
            },
            icon: 'fas fa-laptop-code',
        },
        {
            period: '2024.07',
            title: {
                en: 'Enrolled in Monash University undergraduate program',
                ja: 'モナッシュ大学の学部課程に進学',
            },
            description: {
                en: "After completing MUFY, entered Monash University Malaysia's Bachelor of Computer Science in Data Science with a scholarship.",
                ja: 'MUFY修了後、モナッシュ大学マレーシア校のコンピュータサイエンス・データサイエンス学士課程に奨学金付きで進学。',
            },
            icon: 'fas fa-university',
        },
        {
            period: '2023.07',
            title: {
                en: 'Started studying in Malaysia',
                ja: 'マレーシア留学開始',
            },
            description: {
                en: 'Entered Monash University Foundation Year (MUFY) with a scholarship and began studying abroad in Malaysia.',
                ja: 'モナッシュ大学基礎課程（MUFY）に奨学金付きで入学し、マレーシア留学を開始。',
            },
            icon: 'fas fa-plane-departure',
        },
        {
            period: '2023.03',
            title: {
                en: 'Graduated high school',
                ja: '高校卒業',
            },
            description: {
                en: 'Graduated from an IB-accredited public high school in Japan, followed by a four-month gap term before moving to Malaysia.',
                ja: '地元の公立高校（国際バカロレア認定校）を卒業。マレーシア渡航まで4か月のギャップタームを過ごす。',
            },
            icon: 'fas fa-graduation-cap',
        },
        {
            period: '2004.04',
            title: {
                en: 'Birth',
                ja: '誕生',
            },
            description: {
                en: 'Born in the Kanto region and later moved to a rural area in fourth grade.',
                ja: '関東で生まれ、小学4年生で地方に転校。',
            },
            icon: 'fas fa-baby',
        },
    ],
    // Personal interests and hobbies displayed in grid format
    // Uses specialized interestItem template (not unifiedCardTemplate)
    interests: [
        {
            title: {
                en: 'Programming',
                ja: 'プログラミング',
            },
            description: {
                en: 'Building with Python and JavaScript, from machine learning experiments to websites.',
                ja: 'PythonやJavaScriptを使った開発、機械学習の実装、Webサイト制作など。',
            },
            icon: 'fas fa-code',
        },
        {
            title: {
                en: 'Music',
                ja: '音楽',
            },
            description: {
                en: 'Piano performance, sheet music transcription by ear. Also run a YouTube channel and work as a music instructor.',
                ja: 'ピアノ演奏、耳コピでの楽譜制作。YouTubeチャンネルの運営や音楽講師も務める。',
            },
            icon: 'fas fa-music',
        },
        {
            title: {
                en: 'Shogi (Japanese Chess)',
                ja: '将棋',
            },
            description: {
                en: 'Amateur 2nd dan, Sangenbishasystem player. Would love to try chess someday.',
                ja: 'アマチュア二段、三間飛車党。チェスもいつかやりたい。',
            },
            icon: 'fas fa-chess',
        },
        {
            title: {
                en: 'Travel',
                ja: '旅行',
            },
            description: {
                en: 'Traveled to 15+ countries, mainly in Asia. I enjoy different cultures and local food.',
                ja: 'アジアを中心に15か国以上を旅行。異文化体験と食べ歩きが好き。',
            },
            icon: 'fas fa-plane',
        },
        {
            title: {
                en: 'Sports',
                ja: 'スポーツ',
            },
            description: {
                en: 'I enjoy all kinds of sports, from tennis to martial arts. Recently hooked on pickleball.',
                ja: 'テニスから格闘技までなんでも！最近はピックルボールにハマっています。',
            },
            icon: 'fas fa-dumbbell',
        },
        {
            title: {
                en: 'Reading',
                ja: '読書',
            },
            description: {
                en: 'Reading across a wide range of genres from technical books to novels. Particularly love mystery novels.',
                ja: '技術書から小説まで幅広く読む。特にミステリー小説が好き。',
            },
            icon: 'fas fa-book',
        },
    ],
};
