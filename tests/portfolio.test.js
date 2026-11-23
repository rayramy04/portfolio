// Run: node --test tests/*.test.js
// Checks the data files, the page script helpers, the page generator and the
// sync protection list. Uses only Node's built-in test runner (no dependencies).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const vm = require('vm');
const { execFileSync, spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const PERIOD = /^\d{4}\.\d{2} - (\d{4}\.\d{2}|Present)$/;
const GENERATED_PAGES = ['index', 'summary', 'about', 'cv', 'projects', 'links'];

function loadData(name) {
    const context = { window: {} };
    vm.createContext(context);
    vm.runInContext(fs.readFileSync(path.join(ROOT, 'data', `${name}.js`), 'utf8'), context);
    return context.window;
}

function loadPageScript(lang) {
    const context = {
        window: {
            location: { search: `?lang=${lang}` },
            commonData: { lang: { available: ['en', 'ja'], current: 'en' } },
        },
        localStorage: { getItem: () => null, setItem: () => {} },
        document: { addEventListener: () => {} },
        URLSearchParams,
        console,
    };
    vm.createContext(context);
    vm.runInContext(fs.readFileSync(path.join(ROOT, 'js', 'pages-unified.js'), 'utf8'), context);
    return context;
}

function bilingual(value) {
    return value && typeof value === 'object' && typeof value.en === 'string' && typeof value.ja === 'string'
        && value.en.trim() !== '' && value.ja.trim() !== '';
}

// Copy the repo (without .git) to a temp dir so the generator never touches the real files
function scratchCopy() {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-test-'));
    fs.cpSync(ROOT, dir, {
        recursive: true,
        filter: src => !path.relative(ROOT, src).split(path.sep).some(part => part === '.git' || part === 'node_modules'),
    });
    return dir;
}

function generate(dir) {
    return execFileSync(process.execPath, ['generate-pages.js'], { cwd: dir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
}

function filterButtons(html) {
    return [...html.matchAll(/<button class="filter-btn" data-category="([^"]*)">([^<]*)<\/button>/g)].map(m => m[1]);
}

function escapeHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ---------- data ----------

test('projects: categories are valid, at most 3 per project, texts are bilingual, images exist', () => {
    const { projectCategories, projectsData } = loadData('projects');
    assert.ok(Array.isArray(projectCategories) && projectCategories.length > 0);
    assert.equal(new Set(projectCategories).size, projectCategories.length, 'duplicate category names');

    const names = new Set();
    for (const project of projectsData) {
        const label = project.name?.en;
        assert.ok(bilingual(project.name), `name must have en/ja: ${label}`);
        assert.ok(bilingual(project.description), `description must have en/ja: ${label}`);
        assert.ok(!names.has(label), `duplicate project: ${label}`);
        names.add(label);

        assert.ok(Array.isArray(project.categories) && project.categories.length >= 1, `no category: ${label}`);
        assert.ok(project.categories.length <= 3, `more than 3 categories: ${label}`);
        assert.equal(new Set(project.categories).size, project.categories.length, `repeated category: ${label}`);
        for (const category of project.categories) {
            assert.ok(projectCategories.includes(category), `unknown category "${category}" in ${label}`);
        }

        for (const url of [project.liveUrl, project.githubUrl]) {
            if (url === null || url === undefined) continue;
            assert.ok(/^https:\/\//.test(url) || fs.existsSync(path.join(ROOT, url)), `bad link in ${label}: ${url}`);
        }
        if (project.image && !/^https:\/\//.test(project.image)) {
            assert.ok(fs.existsSync(path.join(ROOT, project.image)), `missing image for ${label}: ${project.image}`);
        }
    }
    assert.ok(projectCategories.every(c => projectsData.some(p => p.categories.includes(c))), 'a category has no project');
});

test('cv and summary: periods use "YYYY.MM - YYYY.MM" or "YYYY.MM - Present", texts are bilingual', () => {
    const { cvData } = loadData('cv');
    const summary = loadData('summary');
    const summaryData = Object.values(summary).find(v => v && Array.isArray(v.experience));
    assert.ok(summaryData, 'summary data not found');

    for (const item of [...cvData.experience, ...cvData.education, ...summaryData.experience, ...summaryData.education]) {
        assert.match(item.period, PERIOD, `bad period: ${item.period}`);
    }
    for (const item of cvData.experience) {
        assert.ok(bilingual(item.company) && bilingual(item.position) && bilingual(item.description), `experience must be bilingual: ${item.company?.en}`);
    }
    for (const item of summaryData.experience) {
        assert.ok(bilingual(item.company) && bilingual(item.role) && bilingual(item.description), `summary experience must be bilingual: ${item.company?.en}`);
    }
    const awards = Object.values(cvData.awards).flat();
    for (const item of [...awards, ...cvData.certifications]) {
        assert.ok(bilingual(item.title), `title must be bilingual: ${item.title?.en}`);
        assert.ok(!/[ぁ-んァ-ヶ一-龠][^()]*\(|\([^()]*[ぁ-んァ-ヶ一-龠]/.test(item.title.ja), `use full-width parentheses in Japanese: ${item.title.ja}`);
    }
});

test('summary: achievements are listed newest first, About Me and skills are bilingual, Links points to the Links page', () => {
    const summaryData = Object.values(loadData('summary')).find(v => v && Array.isArray(v.experience));
    assert.ok(Array.isArray(summaryData.topAchievements), 'topAchievements should be an array of { date, en, ja }');
    const dates = summaryData.topAchievements.map(item => item.date);
    for (const item of summaryData.topAchievements) {
        assert.match(item.date, /^\d{4}\.\d{2}$/, `bad achievement date: ${item.date}`);
        assert.ok(bilingual(item), `achievement must be bilingual: ${item.date}`);
    }
    assert.deepEqual(Array.from(dates), Array.from(dates).sort().reverse(), 'achievements must be newest first');
    assert.ok(bilingual(summaryData.aboutMe), 'aboutMe must be bilingual');
    assert.equal(summaryData.aboutMe.ja.split('\n\n').length, summaryData.aboutMe.en.split('\n\n').length, 'aboutMe paragraphs must match in en/ja');
    for (const group of summaryData.skills) {
        assert.ok(bilingual(group.category) && group.items.length > 0, `skill group needs en/ja and items: ${group.category?.en}`);
    }
    assert.ok(bilingual(summaryData.linksPage), 'linksPage text must be bilingual');
    const educationDetails = summaryData.education.map(item => (typeof item.details === 'string' ? item.details : item.details.ja));
    for (const detail of educationDetails) assert.ok(!/、/.test(detail), `use "・" between facts: ${detail}`);
});

// ---------- page script helpers ----------

test('experience sort: ongoing first, then end date newest first, ties by start date', () => {
    const { sortItemsByPeriodEndDesc } = loadPageScript('en');
    const sorted = sortItemsByPeriodEndDesc([
        { id: 'old', period: '2020.01 - 2021.06' },
        { id: 'tieOlderStart', period: '2022.01 - 2024.06' },
        { id: 'ongoingOld', period: '2019.04 - Present' },
        { id: 'tieNewerStart', period: '2023.07 - 2024.06' },
        { id: 'ongoingNew', period: '2025.05 - Present' },
        { id: 'latestEnd', period: '2024.09 - 2025.12' },
    ]).map(item => item.id);
    // arrays from the vm context have another prototype, so compare as plain arrays
    assert.deepEqual(Array.from(sorted), ['ongoingNew', 'ongoingOld', 'latestEnd', 'tieNewerStart', 'tieOlderStart', 'old']);
});

test('experience sort on the real data puts the ongoing role first and ends are non-increasing', () => {
    const { sortItemsByPeriodEndDesc, extractPeriodEnd } = loadPageScript('en');
    const { cvData } = loadData('cv');
    const sorted = sortItemsByPeriodEndDesc(cvData.experience);
    const ends = sorted.map(item => extractPeriodEnd(item.period));
    for (let i = 1; i < ends.length; i++) assert.ok(ends[i - 1] >= ends[i], `out of order at ${sorted[i].period}`);
    if (cvData.experience.some(item => /Present$/.test(item.period))) assert.match(sorted[0].period, /Present$/);
});

test('withNote: full-width parentheses in Japanese, half-width in English', () => {
    assert.equal(loadPageScript('ja').withNote('ラベル', '補足'), 'ラベル（補足）');
    assert.equal(loadPageScript('en').withNote('Label', 'note'), 'Label (note)');
});

// ---------- generator ----------

test('generator: committed pages are up to date and filter buttons match the categories', () => {
    const dir = scratchCopy();
    try {
        generate(dir);
        for (const page of GENERATED_PAGES) {
            assert.equal(fs.readFileSync(path.join(dir, `${page}.html`), 'utf8'), fs.readFileSync(path.join(ROOT, `${page}.html`), 'utf8'),
                `${page}.html is stale: run node generate-pages.js and commit`);
        }
        const seo = require(path.join(dir, 'data', 'seo-config.js'));
        const sitemap = fs.readFileSync(path.join(dir, 'sitemap.xml'), 'utf8');
        const locs = [...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map(m => m[1]).sort();
        const expected = GENERATED_PAGES.map(page => (page === 'index' ? seo.baseUrl : `${seo.baseUrl}${page}.html`)).sort();
        assert.deepEqual(locs, expected, 'sitemap.xml must list every page under baseUrl');
        assert.equal(fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8').replace(/<lastmod>[^<]*<\/lastmod>/g, ''),
            sitemap.replace(/<lastmod>[^<]*<\/lastmod>/g, ''), 'sitemap.xml is stale (ignoring lastmod)');
        const { projectCategories } = loadData('projects');
        assert.deepEqual(filterButtons(fs.readFileSync(path.join(dir, 'projects.html'), 'utf8')), Array.from(projectCategories, escapeHtml));
    } finally {
        fs.rmSync(dir, { recursive: true, force: true });
    }
});

test('generator: filter buttons follow category changes, with escaping, CRLF and zero buttons', () => {
    const dir = scratchCopy();
    try {
        const dataPath = path.join(dir, 'data', 'projects.js');
        const contentPath = path.join(dir, 'content', 'projects-content.html');
        const setCategories = list => fs.writeFileSync(dataPath, fs.readFileSync(dataPath, 'utf8')
            .replace(/window\.projectCategories = \[[^\]]*\];/, `window.projectCategories = ${JSON.stringify(list)};`));
        const buttons = () => filterButtons(fs.readFileSync(path.join(dir, 'projects.html'), 'utf8'));

        setCategories(['A & B', 'Say "hi" <x>']);
        generate(dir);
        assert.deepEqual(buttons(), ['A &amp; B', 'Say &quot;hi&quot; &lt;x&gt;']);

        fs.writeFileSync(contentPath, fs.readFileSync(contentPath, 'utf8').replace(/\r?\n/g, '\r\n'));
        setCategories(['One', 'Two']);
        generate(dir);
        assert.deepEqual(buttons(), ['One', 'Two']);
        assert.ok(fs.readFileSync(path.join(dir, 'projects.html'), 'utf8').includes('data-category="Two">Two</button>\r\n'));

        fs.writeFileSync(contentPath, fs.readFileSync(contentPath, 'utf8')
            .replace(/[ \t]*<button class="filter-btn" data-category="(?!all")[^"]*">[^<]*<\/button>\r?\n/g, ''));
        setCategories(['Only']);
        generate(dir);
        assert.deepEqual(buttons(), ['Only']);

        setCategories([]);
        generate(dir);
        assert.deepEqual(buttons(), []);
        assert.ok(fs.readFileSync(path.join(dir, 'projects.html'), 'utf8').includes('data-category="all">All</button>'));
    } finally {
        fs.rmSync(dir, { recursive: true, force: true });
    }
});

test('generator: missing projectCategories leaves the buttons unchanged and warns', () => {
    const dir = scratchCopy();
    try {
        const dataPath = path.join(dir, 'data', 'projects.js');
        fs.writeFileSync(dataPath, fs.readFileSync(dataPath, 'utf8').replace(/window\.projectCategories = /, 'const unusedCategories = '));
        const before = filterButtons(fs.readFileSync(path.join(dir, 'content', 'projects-content.html'), 'utf8'));
        const run = spawnSync(process.execPath, ['generate-pages.js'], { cwd: dir, encoding: 'utf8' });
        assert.equal(run.status, 0);
        assert.deepEqual(filterButtons(fs.readFileSync(path.join(dir, 'projects.html'), 'utf8')), before);
        assert.match(run.stderr, /projectCategories not found/);
    } finally {
        fs.rmSync(dir, { recursive: true, force: true });
    }
});

// ---------- sync protection list ----------

test('.gitattributes keeps data and colors, and lets template code sync', () => {
    // Isolated temp repo holding only .gitattributes: works without a git checkout and ignores global git config
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-attr-'));
    const env = { ...process.env, GIT_CONFIG_GLOBAL: os.devNull, GIT_CONFIG_NOSYSTEM: '1' };
    execFileSync('git', ['init', '-q'], { cwd: dir, env });
    fs.copyFileSync(path.join(ROOT, '.gitattributes'), path.join(dir, '.gitattributes'));
    const attr = file => execFileSync('git', ['check-attr', 'merge', '--', file], { cwd: dir, env, encoding: 'utf8' }).trim().split(': ').pop();
    try {
    for (const kept of ['data/projects.js', 'data/new-file.js', 'css/palette.css', 'assets/photo.jpg', 'resume/resume-en.pdf', 'robots.txt', 'sitemap.xml', 'index.html', 'projects.html']) {
        assert.equal(attr(kept), 'ours', `${kept} must be protected (merge=ours)`);
    }
    for (const synced of ['js/pages-unified.js', 'js/utils/html-generator.js', 'generate-pages.js', 'template-base.html', 'content/projects-content.html', 'css/style.css', 'sync-template.sh', 'tests/portfolio.test.js']) {
        assert.notEqual(attr(synced), 'ours', `${synced} must NOT be protected (it is template code)`);
    }
    } finally {
        fs.rmSync(dir, { recursive: true, force: true });
    }
});
