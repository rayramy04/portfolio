// Summary page data configuration
// This file provides a compact overview by selecting key information from other data files
window.summaryData = {
    // Personal intro section
    intro: {
        name: 'Ray',
        age: '22',
        specialization: {
            en: 'Full-stack Development, AI, Data Science',
            ja: 'フルスタック開発・AI・データサイエンス',
        },
        photo: 'assets/profile.jpg',
    },
    // Brief about me paragraph
    aboutMe: {
        en: 'Studying Computer Science and Data Science at Monash University Malaysia while building AI apps and running study-abroad media and music content.\n\nWon the Academic Excellence Award two years in a row, and earned medals at both the AI and Linguistics Olympiads. Over 30K social media followers.\n\nIn high school, won a national grand prize for acoustic phonetics research and competed internationally.',
        ja: 'モナッシュ大学マレーシア校でコンピュータサイエンスとデータサイエンスを学ぶ傍ら、AIアプリの開発や留学メディア・音楽の発信に取り組む。\n\n成績優秀賞を2年連続で受賞し、人工知能・言語学の両オリンピックではメダルも獲得。SNSのフォロワーは3万人超。\n\n高校時代は音響音声学の研究で全国最優秀賞を受賞し、国際大会にも出場。',
    },
    // Top 3 education entries (from cv.js)
    education: [
        {
            period: '2024.07 - Present',
            institution: {
                en: 'Monash University Malaysia',
                ja: 'モナッシュ大学マレーシア校',
            },
            degree: {
                en: 'Bachelor of Computer Science in Data Science',
                ja: '情報学部 コンピュータサイエンス・データサイエンス学士課程',
            },
            details: {
                en: 'GPA 3.9, Merit Scholarship',
                ja: 'GPA 3.9・奨学金受給',
            },
        },
        {
            period: '2023.07 - 2024.06',
            institution: {
                en: 'Sunway College',
                ja: 'サンウェイカレッジ',
            },
            degree: {
                en: 'Monash University Foundation Year (MUFY)',
                ja: 'モナッシュ大学基礎課程（MUFY）',
            },
            details: {
                en: 'GPA 4.0, Merit Scholarship',
                ja: 'GPA 4.0・奨学金受給',
            },
        },
        {
            period: '2020.04 - 2023.03',
            institution: {
                en: 'Public High School (IB-accredited)',
                ja: '公立高等学校（国際バカロレア認定校）',
            },
            degree: {
                en: 'General Studies',
                ja: '普通科',
            },
            details: 'GPA 4.0',
        },
    ],
    // Top 5 work experiences (from cv.js)
    experience: [
        {
            period: '2024.03 - Present',
            company: {
                en: 'Freelance',
                ja: 'フリーランス',
            },
            role: {
                en: 'Developer / Music Instructor',
                ja: '開発・音楽講師',
            },
            description: {
                en: 'AI apps & automation; music instruction & sheet music',
                ja: 'AIアプリ・業務自動化ツールの開発、音楽講師・楽譜制作・編曲',
            },
        },
        {
            period: '2024.06 - 2026.08',
            company: {
                en: 'Tobiratory Japan LLC',
                ja: '合同会社Tobiratory Japan',
            },
            role: {
                en: 'Intern',
                ja: 'インターンシップ',
            },
            description: {
                en: 'AI automation, JS web development',
                ja: 'AI自動化・JS Web開発',
            },
        },
        {
            period: '2024.09 - 2025.12',
            company: {
                en: 'GFI Educations Co., Ltd.',
                ja: '株式会社GFIエデュケーションズ',
            },
            role: {
                en: 'Intern',
                ja: 'インターンシップ',
            },
            description: {
                en: 'WordPress development, SEO, Project planning & Management',
                ja: 'WordPress開発・SEO・企画/運営',
            },
        },
    ],
    // Top achievements, newest first (date = YYYY.MM)
    topAchievements: [
        {
            date: '2026.07',
            en: 'YouTube Music Channel: 30,000+ subscribers (5M+ total views)',
            ja: 'YouTube音楽チャンネル: 登録者3万人達成（総再生回数500万回超）',
        },
        {
            date: '2026.07',
            en: 'Study-abroad blog: 900+ articles (20,000+ monthly page views)',
            ja: '留学ブログ: 累計900記事以上（月2万PV超）',
        },
        {
            date: '2026.03',
            en: 'Monash University: Academic Excellence Award (2nd consecutive year), Top Scholar in Mathematics (2025)',
            ja: 'モナッシュ大学: 成績優秀賞（2年連続）・数学分野首席（2025）',
        },
        {
            date: '2025.10',
            en: 'L\'Oréal x Monash Datathon 2025: 3rd place',
            ja: 'L\'Oréal x Monash Datathon 2025: 第3位',
        },
        {
            date: '2025.08',
            en: 'Geek CAMP Hackathon 2025 vol.9: Excellence Award (EmotiGift)',
            ja: '技育CAMPハッカソン2025 vol.9: 優秀賞（EmotiGift）',
        },
        {
            date: '2025.05',
            en: 'Japan AI Olympiad 2025: Gold Award, 5th place nationally',
            ja: '日本人工知能オリンピック2025: 金賞・全国5位',
        },
    ],

    // Technical skills: only what is used in the projects shown on this site (full list is on the CV)
    skills: [
        {
            category: {
                en: 'Development',
                ja: '開発',
            },
            items: ['Python', 'R', 'SQL', 'JavaScript / TypeScript', 'React', 'Next.js'],
        },
        {
            category: {
                en: 'Infrastructure & Services',
                ja: 'インフラ・サービス',
            },
            items: ['Firebase', 'Supabase', 'Cloudflare', 'Vercel', 'Railway', 'Stripe'],
        },
        {
            category: {
                en: 'Data Science & AI',
                ja: 'データサイエンス・AI',
            },
            items: ['LLM APIs', 'Machine Learning', 'Data Analytics', 'Statistical Modeling'],
        },
        {
            category: {
                en: 'Languages',
                ja: '言語',
            },
            items: ['Japanese (Native)', 'English (Business)', 'Mandarin Chinese (Basic)'],
        },
    ],

    // CTA section text
    cta: {
        title: {
            en: 'This is a quick summary',
            ja: 'こちらは簡易版サマリーです',
        },
        description: {
            en: 'For more detailed information, please visit the CV page or Projects page.',
            ja: 'より詳しい情報については、CVページまたはプロジェクトページをご覧ください。',
        },
        cvButton: {
            en: 'View CV',
            ja: 'CVページを見る',
        },
        projectsButton: {
            en: 'View Projects',
            ja: 'プロジェクトを見る',
        },
    },
    // Link at the end of the Links section
    linksPage: {
        en: 'All links are here',
        ja: 'リンク集はこちら',
    },

    // Social links (customize which links to show on Summary page)
    socialLinks: [
        {
            name: 'Blog',
            url: 'https://ray-globallife.com',
            username: 'ray-globallife.com',
            title: {
                en: "Ray's Global Life Notes (Blog)",
                ja: 'Rayの海外生活ノート（ブログ）',
            },
            icon: 'fas fa-home',
        },
        {
            name: 'Contact',
            url: 'https://ray-globallife.com/contact/',
            username: 'Contact Form',
            title: {
                en: 'Contact / Work Inquiries',
                ja: 'お問い合わせ・お仕事のご相談',
            },
            icon: 'fas fa-paper-plane',
        },
        {
            name: 'GitHub',
            url: 'https://github.com/rayramy04',
            username: '@rayramy04',
            title: {
                en: 'GitHub',
                ja: 'GitHub',
            },
            icon: 'fab fa-github',
        },
        {
            name: 'X (Twitter)',
            url: 'https://x.com/rayramy04',
            username: '@rayramy04',
            title: {
                en: 'X (Twitter)',
                ja: 'X (Twitter)',
            },
            icon: 'fab fa-twitter',
        },
        {
            name: 'YouTube',
            url: 'https://youtube.com/@ray_pianocover',
            username: '@ray_pianocover',
            title: {
                en: 'YouTube',
                ja: 'YouTube',
            },
            icon: 'fab fa-youtube',
        },
        {
            name: 'note',
            url: 'https://note.com/ll_0013py',
            username: '@ll_0013py',
            title: {
                en: 'note',
                ja: 'note',
            },
            icon: 'fas fa-file-alt',
        },
    ],
};
