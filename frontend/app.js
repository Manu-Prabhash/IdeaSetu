const API_BASE = 'http://localhost:5000/api';

const DOM = {
    authView: document.getElementById('auth-view'),
    dashboardView: document.getElementById('dashboard-view'),
    loginForm: document.getElementById('login-form'),
    registerForm: document.getElementById('register-form'),
    forgotForm: document.getElementById('forgot-form'),
    showRegister: document.getElementById('show-register'),
    showLogin: document.getElementById('show-login'),
    forgotPasswordBtn: document.getElementById('forgot-password-btn'),
    backToLogin: document.getElementById('back-to-login'),
    loginMessage: document.getElementById('login-message'),
    forgotMessage: document.getElementById('forgot-message'),
    logoutBtn: document.getElementById('logout-btn'),
    navDash: document.getElementById('nav-dash'),
    navChallenges: document.getElementById('nav-challenges'),
    navResources: document.getElementById('nav-resources'),
    navNews: document.getElementById('nav-news'),
    profileName: document.getElementById('profile-name'),
    profileRole: document.getElementById('profile-role'),
    sectionDash: document.getElementById('section-dash'),
    sectionChallenges: document.getElementById('section-challenges'),
    sectionResources: document.getElementById('section-resources'),
    sectionNews: document.getElementById('section-news'),
    adminPanel: document.getElementById('admin-panel'),
    entrepreneurPanel: document.getElementById('entrepreneur-panel'),
    problemForm: document.getElementById('problem-form'),
    pitchForm: document.getElementById('pitch-form'),
    pitchTags: document.getElementById('pitch-tags'),
    adminPitchesList: document.getElementById('admin-pitches-list'),
    entProblemsList: document.getElementById('ent-problems-list'),
    myPitchesList: document.getElementById('my-pitches-list'),
    adminStats: document.getElementById('admin-stats'),
    adminChart: document.getElementById('admin-chart'),
    entrepreneurStats: document.getElementById('entrepreneur-stats'),
    entrepreneurChart: document.getElementById('entrepreneur-chart'),
    resourcesList: document.getElementById('resources-list'),
    resourceSearch: document.getElementById('resource-search'),
    resourceCategoryFilter: document.getElementById('resource-category-filter'),
    newsList: document.getElementById('news-list'),
    newsDomainFilter: document.getElementById('news-domain-filter'),
    newsStartDate: document.getElementById('news-start-date'),
    newsEndDate: document.getElementById('news-end-date'),
    newsSortFilter: document.getElementById('news-sort-filter'),
    pitchTagFilter: document.getElementById('pitch-tag-filter'),
    pitchStatusFilter: document.getElementById('pitch-status-filter'),
    challengeSearch: document.getElementById('challenge-search'),
    chatbotToggle: document.getElementById('chatbot-toggle'),
    chatbotPanel: document.getElementById('chatbot-panel'),
    chatbotClose: document.getElementById('chatbot-close'),
    chatbotMessages: document.getElementById('chatbot-messages'),
    chatbotForm: document.getElementById('chatbot-form'),
    chatbotInput: document.getElementById('chatbot-input')
};

const staticResources = [
    {
        category: 'Scheme',
        title: 'DPIIT Startup Recognition',
        desc: 'Official recognition under Startup India. It unlocks benefits such as easier public procurement norms, IPR support, self-certification under selected laws, and access to tax exemption applications.',
        action: 'Open Startup India',
        url: 'https://www.startupindia.gov.in/content/sih/en/startup-scheme.html'
    },
    {
        category: 'Scheme',
        title: 'Startup India Seed Fund Scheme',
        desc: 'Government seed support for eligible early-stage startups working on proof of concept, prototype development, product trials, market entry, and commercialization.',
        action: 'View SISFS',
        url: 'https://www.startupindia.gov.in/content/dam/invest-india/Templates/public/Guidelines%20for%20Startup%20India%20Seed%20Fund%20Scheme.pdf'
    },
    {
        category: 'Scheme',
        title: 'Fund of Funds for Startups',
        desc: 'SIDBI-managed fund-of-funds support that invests through SEBI-registered Alternative Investment Funds, helping startups access venture capital indirectly.',
        action: 'Explore Details',
        url: 'https://www.startupindia.gov.in/content/sih/en/startup-scheme.html'
    },
    {
        category: 'Scheme',
        title: 'Atal Innovation Mission',
        desc: 'NITI Aayog initiative supporting innovation through Atal Incubation Centres, Atal New India Challenges, community innovation centres, and mentor networks.',
        action: 'Visit NITI Aayog',
        url: 'https://www.niti.gov.in/sites/default/files/2025-06/Manual-4%20AIM.pdf'
    },
    {
        category: 'Scheme',
        title: 'BIRAC Biotechnology Ignition Grant',
        desc: 'Early-stage biotech grant support from BIRAC for proof-of-concept work. Suitable for biotech startups, researchers, and incubated innovators.',
        action: 'View BIG Scheme',
        url: 'https://www.birac.nic.in/big.php'
    },
    {
        category: 'Scheme',
        title: 'MeitY SAMRIDH Accelerator',
        desc: 'MeitY programme for product startups, delivered through accelerators, with support intended to help startups scale and attract investment.',
        action: 'Read Scheme',
        url: 'https://www.meity.gov.in/writereaddata/files/SAMRIDH%20Scheme%20Document.pdf'
    },
    {
        category: 'Registration',
        title: 'MSME Udyam Registration',
        desc: 'Free, paperless government registration for micro, small, and medium enterprises. Useful for MSME benefits, procurement, credit support, and formal recognition.',
        action: 'Register on Udyam',
        url: 'https://udyamregistration.gov.in/'
    },
    {
        category: 'Law / Tax',
        title: 'Section 80-IAC Tax Exemption',
        desc: 'Eligible DPIIT-recognised startups can apply for income-tax exemption on profits for a specified period, subject to conditions and approval.',
        action: 'Check Eligibility',
        url: 'https://www.startupindia.gov.in/content/sih/en/startupgov/startup_recognition_page.html'
    },
    {
        category: 'Law / Tax',
        title: 'Section 56 Angel Tax Exemption',
        desc: 'DPIIT-recognised startups may apply for exemption from angel-tax related provisions, subject to government conditions and declarations.',
        action: 'View Exemption',
        url: 'https://www.startupindia.gov.in/content/sih/en/startupgov/startup_recognition_page.html'
    },
    {
        category: 'Compliance',
        title: 'Startup Self-Certification',
        desc: 'DPIIT-recognised startups can self-certify compliance under selected labour and environmental laws to reduce early compliance burden.',
        action: 'See Benefits',
        url: 'https://www.startupindia.gov.in/content/sih/en/startup-scheme.html'
    }
];

let adminPitches = [];
let entrepreneurPitches = [];
let governmentProblems = [];
let newsArticles = [];

function init() {
    const token = localStorage.getItem('token');
    if (token) {
        showDashboard();
    } else {
        showAuth();
    }
}

DOM.showRegister.addEventListener('click', () => {
    DOM.loginForm.classList.add('hidden');
    DOM.forgotForm.classList.add('hidden');
    DOM.registerForm.classList.remove('hidden');
});

DOM.showLogin.addEventListener('click', () => {
    DOM.registerForm.classList.add('hidden');
    DOM.forgotForm.classList.add('hidden');
    DOM.loginForm.classList.remove('hidden');
});

DOM.forgotPasswordBtn.addEventListener('click', () => {
    DOM.loginForm.classList.add('hidden');
    DOM.registerForm.classList.add('hidden');
    DOM.forgotForm.classList.remove('hidden');
    DOM.forgotMessage.classList.add('hidden');
    document.getElementById('forgot-email').value = document.getElementById('login-email').value;
});

DOM.backToLogin.addEventListener('click', () => {
    DOM.forgotForm.classList.add('hidden');
    DOM.loginForm.classList.remove('hidden');
});

DOM.logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    showAuth();
});

DOM.navDash.addEventListener('click', () => switchTab('dash'));
DOM.navChallenges.addEventListener('click', () => {
    switchTab('challenges');
    renderProblems();
});
DOM.navResources.addEventListener('click', () => {
    switchTab('resources');
    loadResources();
});
DOM.navNews.addEventListener('click', () => {
    switchTab('news');
    loadNews();
});

DOM.pitchTagFilter.addEventListener('input', renderPitches);
DOM.pitchStatusFilter.addEventListener('change', renderPitches);
DOM.challengeSearch.addEventListener('input', renderProblems);
DOM.resourceSearch.addEventListener('input', loadResources);
DOM.resourceCategoryFilter.addEventListener('change', loadResources);
DOM.newsDomainFilter.addEventListener('change', loadNews);
DOM.newsStartDate.addEventListener('change', renderNews);
DOM.newsEndDate.addEventListener('change', renderNews);
DOM.newsSortFilter.addEventListener('change', renderNews);

DOM.chatbotToggle.addEventListener('click', openChatbot);
DOM.chatbotClose.addEventListener('click', closeChatbot);
DOM.chatbotForm.addEventListener('submit', handleChatbotSubmit);

document.querySelectorAll('[data-question]').forEach((button) => {
    button.addEventListener('click', () => {
        askChatbot(button.dataset.question);
    });
});

function switchTab(tab) {
    DOM.sectionDash.classList.add('hidden');
    DOM.sectionChallenges.classList.add('hidden');
    DOM.sectionResources.classList.add('hidden');
    DOM.sectionNews.classList.add('hidden');
    DOM.navDash.classList.remove('is-active');
    DOM.navChallenges.classList.remove('is-active');
    DOM.navResources.classList.remove('is-active');
    DOM.navNews.classList.remove('is-active');

    if (tab === 'dash') {
        DOM.sectionDash.classList.remove('hidden');
        DOM.navDash.classList.add('is-active');
    }
    if (tab === 'challenges') {
        DOM.sectionChallenges.classList.remove('hidden');
        DOM.navChallenges.classList.add('is-active');
    }
    if (tab === 'resources') {
        DOM.sectionResources.classList.remove('hidden');
        DOM.navResources.classList.add('is-active');
    }
    if (tab === 'news') {
        DOM.sectionNews.classList.remove('hidden');
        DOM.navNews.classList.add('is-active');
    }
}

function showAuth() {
    DOM.authView.classList.remove('hidden');
    DOM.dashboardView.classList.add('hidden');
    DOM.loginForm.classList.remove('hidden');
    DOM.registerForm.classList.add('hidden');
    DOM.forgotForm.classList.add('hidden');
}

function showDashboard() {
    DOM.authView.classList.add('hidden');
    DOM.dashboardView.classList.remove('hidden');
    switchTab('dash');

    const role = localStorage.getItem('role');
    const name = localStorage.getItem('name') || 'User';

    DOM.profileName.textContent = name;
    DOM.profileRole.textContent = role === 'admin' ? 'Government Official' : 'Entrepreneur';
    DOM.navChallenges.classList.toggle('hidden', role !== 'entrepreneur');

    if (role === 'admin') {
        DOM.adminPanel.classList.remove('hidden');
        DOM.entrepreneurPanel.classList.add('hidden');
        fetchPitches();
    } else {
        DOM.entrepreneurPanel.classList.remove('hidden');
        DOM.adminPanel.classList.add('hidden');
        fetchProblems();
        fetchMyPitches();
    }
}

DOM.loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            localStorage.setItem('name', data.name);
            setFormMessage(DOM.loginMessage, '', '');
            showDashboard();
        } else {
            setFormMessage(DOM.loginMessage, data.message || 'Login failed', 'error');
        }
    } catch (error) {
        setFormMessage(DOM.loginMessage, 'Login failed. Check that the backend is running.', 'error');
    }
});

DOM.forgotForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value;

    try {
        const res = await fetch(`${API_BASE}/auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await res.json();
        setFormMessage(
            DOM.forgotMessage,
            data.message || 'If an account exists, password recovery instructions will be available.',
            res.ok ? 'success' : 'error'
        );
    } catch (error) {
        setFormMessage(DOM.forgotMessage, 'Password recovery is unavailable right now.', 'error');
    }
});

DOM.registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const role = document.getElementById('reg-role').value;

    try {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            localStorage.setItem('name', data.name);
            showDashboard();
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Registration failed');
    }
});

DOM.problemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('prob-title').value;
    const department = document.getElementById('prob-dept').value;
    const description = document.getElementById('prob-desc').value;

    try {
        const res = await fetch(`${API_BASE}/admin/problems`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ title, department, description })
        });
        if (res.ok) {
            alert('Problem posted successfully');
            DOM.problemForm.reset();
        }
    } catch (error) {
        alert('Error posting problem');
    }
});

DOM.pitchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('pitch-title').value;
    const description = document.getElementById('pitch-desc').value;
    const tags = DOM.pitchTags.value
        .split(',')
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean);

    try {
        const res = await fetch(`${API_BASE}/entrepreneur/pitches`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ title, description, tags })
        });
        if (res.ok) {
            alert('Pitch submitted successfully');
            DOM.pitchForm.reset();
            fetchMyPitches();
        }
    } catch (error) {
        alert('Error submitting pitch');
    }
});

async function fetchPitches() {
    try {
        const res = await fetch(`${API_BASE}/admin/pitches`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await res.json();
        adminPitches = Array.isArray(data) ? data : [];
        renderPitches();
        renderDashboardAnalytics('admin');
    } catch (error) {
        console.error('Error fetching pitches', error);
    }
}

async function fetchProblems() {
    try {
        const res = await fetch(`${API_BASE}/entrepreneur/problems`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await res.json();
        governmentProblems = Array.isArray(data) ? data : [];
        renderProblems();
        renderDashboardAnalytics('entrepreneur');
    } catch (error) {
        console.error('Error fetching problems', error);
    }
}

async function fetchMyPitches() {
    try {
        const res = await fetch(`${API_BASE}/entrepreneur/pitches`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await res.json();
        entrepreneurPitches = Array.isArray(data) ? data : [];
        renderMyPitches();
        renderDashboardAnalytics('entrepreneur');
    } catch (error) {
        console.error('Error fetching submitted pitches', error);
    }
}

function renderPitches() {
    DOM.adminPitchesList.innerHTML = '';

    const tagFilter = DOM.pitchTagFilter.value.trim().toLowerCase();
    const statusFilter = DOM.pitchStatusFilter.value;
    const filteredPitches = adminPitches.filter((pitch) => {
        const tags = getTags(pitch);
        const matchesTag = !tagFilter || tags.some((tag) => tag.includes(tagFilter));
        const matchesStatus = statusFilter === 'all' || pitch.status === statusFilter;
        return matchesTag && matchesStatus;
    });

    if (filteredPitches.length === 0) {
        DOM.adminPitchesList.innerHTML = '<p class="empty-state">No pitches match the current filters.</p>';
        return;
    }

    filteredPitches.forEach(pitch => {
        const tags = getTags(pitch);
        const div = document.createElement('div');
        div.className = 'pitch-card border p-4 rounded bg-gray-50';
        div.innerHTML = `
      <div class="pitch-card-header">
        <div>
          <h3 class="font-bold text-lg">${escapeHtml(pitch.title)}</h3>
          <p class="text-sm text-gray-600 mb-2">By: ${escapeHtml(pitch.entrepreneurId?.name || 'Unknown')} | Status: <span class="status-pill status-${pitch.status}">${escapeHtml(pitch.status)}</span></p>
        </div>
      </div>
      <p class="mb-4">${escapeHtml(pitch.description)}</p>
      <div class="tag-row">${renderTags(tags)}</div>
      <textarea id="feedback-${pitch._id}" class="w-full px-4 py-2 border rounded h-24" placeholder="Write feedback for the entrepreneur">${escapeHtml(pitch.adminFeedback || '')}</textarea>
      <div class="flex gap-2 pitch-actions">
        <button onclick="updatePitch('${pitch._id}', 'approved')" class="bg-green-500 text-white px-3 py-1 rounded text-sm">Approve</button>
        <button onclick="updatePitch('${pitch._id}', 'rejected')" class="bg-red-500 text-white px-3 py-1 rounded text-sm">Reject</button>
      </div>
    `;
        DOM.adminPitchesList.appendChild(div);
    });
}

function renderProblems() {
    DOM.entProblemsList.innerHTML = '';

    const query = DOM.challengeSearch.value.trim().toLowerCase();
    const filteredProblems = governmentProblems.filter((prob) => {
        const text = `${prob.title} ${prob.department} ${prob.description}`.toLowerCase();
        return !query || text.includes(query);
    });

    if (filteredProblems.length === 0) {
        DOM.entProblemsList.innerHTML = '<p class="empty-state">No active government challenges found.</p>';
        return;
    }

    filteredProblems.forEach(prob => {
        const div = document.createElement('div');
        div.className = 'challenge-card border p-4 rounded bg-gray-50';
        div.innerHTML = `
      <span class="resource-category">Active Task</span>
      <h3 class="font-bold text-lg">${escapeHtml(prob.title)}</h3>
      <p class="text-sm text-blue-600 mb-2 font-semibold">Dept: ${escapeHtml(prob.department)}</p>
      <p>${escapeHtml(prob.description)}</p>
    `;
        DOM.entProblemsList.appendChild(div);
    });
}

function renderMyPitches() {
    DOM.myPitchesList.innerHTML = '';

    if (entrepreneurPitches.length === 0) {
        DOM.myPitchesList.innerHTML = '<p class="empty-state">You have not submitted any pitches yet.</p>';
        return;
    }

    entrepreneurPitches.forEach((pitch) => {
        const div = document.createElement('div');
        div.className = 'pitch-card border p-4 rounded bg-gray-50';
        div.innerHTML = `
      <div class="pitch-card-header">
        <div>
          <h3 class="font-bold text-lg">${escapeHtml(pitch.title)}</h3>
          <p class="text-sm text-gray-600 mb-2">Status: <span class="status-pill status-${pitch.status}">${escapeHtml(pitch.status)}</span></p>
        </div>
      </div>
      <p>${escapeHtml(pitch.description)}</p>
      <div class="tag-row">${renderTags(getTags(pitch))}</div>
      <div class="feedback-box">
        <strong>Government feedback</strong>
        <p>${escapeHtml(pitch.adminFeedback || 'No feedback yet.')}</p>
      </div>
    `;
        DOM.myPitchesList.appendChild(div);
    });
}

window.updatePitch = async function (id, status) {
    try {
        const feedback = document.getElementById(`feedback-${id}`)?.value || '';
        const res = await fetch(`${API_BASE}/admin/pitches/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ status, adminFeedback: feedback })
        });
        if (res.ok) fetchPitches();
    } catch (error) {
        alert('Error updating pitch');
    }
};

function loadResources() {
    DOM.resourcesList.innerHTML = '';
    const query = DOM.resourceSearch.value.trim().toLowerCase();
    const category = DOM.resourceCategoryFilter.value;
    const filteredResources = staticResources.filter((res) => {
        const searchable = `${res.title} ${res.desc} ${res.category}`.toLowerCase();
        const matchesSearch = !query || searchable.includes(query);
        const matchesCategory = category === 'all' || res.category.toLowerCase() === category;
        return matchesSearch && matchesCategory;
    });

    if (filteredResources.length === 0) {
        DOM.resourcesList.innerHTML = '<p class="empty-state">No schemes or laws match your filters.</p>';
        return;
    }

    filteredResources.forEach(res => {
        const div = document.createElement('div');
        div.className = 'resource-card border p-4 rounded bg-blue-50';
        div.innerHTML = `
      <span class="resource-category">${escapeHtml(res.category)}</span>
      <h3 class="font-bold text-blue-800">${escapeHtml(res.title)}</h3>
      <p class="text-sm text-gray-700 mt-1">${escapeHtml(res.desc)}</p>
      <a class="resource-link" href="${res.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(res.action)}</a>
    `;
        DOM.resourcesList.appendChild(div);
    });
}

async function loadNews() {
    DOM.newsList.innerHTML = '<p>Loading industry articles...</p>';
    const domain = DOM.newsDomainFilter.value || 'startup-business-fintech';
    const tags = getNewsTags(domain);

    try {
        const articleBatches = await Promise.all(tags.map(async (tag) => {
            const res = await fetch(`https://dev.to/api/articles?tag=${encodeURIComponent(tag)}&per_page=20`);

            if (!res.ok) {
                return [];
            }

            return res.json();
        }));
        newsArticles = dedupeArticles(articleBatches.flat());
        renderNews();
    } catch (error) {
        DOM.newsList.innerHTML = '<p class="text-red-500">Failed to load news.</p>';
    }
}

function renderNews() {
    DOM.newsList.innerHTML = '';

    const startDate = DOM.newsStartDate.value;
    const endDate = DOM.newsEndDate.value;
    const sortOrder = DOM.newsSortFilter.value;

    const filteredArticles = newsArticles.filter((article) => {
        const publishedDate = new Date(article.published_at).toISOString().slice(0, 10);
        const matchesStart = !startDate || publishedDate >= startDate;
        const matchesEnd = !endDate || publishedDate <= endDate;
        return matchesStart && matchesEnd;
    }).sort((a, b) => {
        const firstDate = new Date(a.published_at).getTime();
        const secondDate = new Date(b.published_at).getTime();
        return sortOrder === 'oldest' ? firstDate - secondDate : secondDate - firstDate;
    });

    if (filteredArticles.length === 0) {
        DOM.newsList.innerHTML = '<p class="empty-state">No articles match the selected date filters.</p>';
        return;
    }

    filteredArticles.forEach(article => {
        const div = document.createElement('div');
        div.className = 'news-card border-b pb-4';
        div.innerHTML = `
        <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="text-lg font-bold text-blue-600 hover:underline">${escapeHtml(article.title)}</a>
        <p class="text-sm text-gray-500">By ${escapeHtml(article.user?.name || 'Unknown')} on ${new Date(article.published_at).toLocaleDateString()}</p>
      `;
        DOM.newsList.appendChild(div);
    });
}

function getNewsTags(domain) {
    const tagsByDomain = {
        'startup-business-fintech': ['startup', 'business', 'fintech', 'entrepreneurship'],
        startup: ['startup', 'entrepreneurship'],
        business: ['business', 'entrepreneurship'],
        fintech: ['fintech', 'finance'],
        technology: ['technology'],
        ai: ['ai'],
        cybersecurity: ['cybersecurity']
    };

    return tagsByDomain[domain] || [domain];
}

function dedupeArticles(articles) {
    const seen = new Set();

    return articles.filter((article) => {
        const key = article.id || article.url;

        if (!key || seen.has(key)) {
            return false;
        }

        seen.add(key);
        return true;
    });
}

function renderDashboardAnalytics(role) {
    const pitches = role === 'admin' ? adminPitches : entrepreneurPitches;
    const approved = countByStatus(pitches, 'approved');
    const rejected = countByStatus(pitches, 'rejected');
    const pending = countByStatus(pitches, 'pending');
    const total = pitches.length;
    const challengesSolved = approved;

    const statsHtml = [
        { label: 'Challenges Solved', value: challengesSolved },
        { label: 'Pitches Approved', value: approved },
        { label: 'Total Pitches', value: total }
    ].map((stat) => `
        <div class="stat-card">
            <strong>${stat.value}</strong>
            <span>${stat.label}</span>
        </div>
    `).join('');

    const chartHtml = `
        <div class="bar-chart" aria-label="Pitch status chart">
            ${renderBar('Pending', pending, total, 'pending')}
            ${renderBar('Approved', approved, total, 'approved')}
            ${renderBar('Rejected', rejected, total, 'rejected')}
        </div>
    `;

    if (role === 'admin') {
        DOM.adminStats.innerHTML = statsHtml;
        DOM.adminChart.innerHTML = chartHtml;
    } else {
        DOM.entrepreneurStats.innerHTML = statsHtml;
        DOM.entrepreneurChart.innerHTML = chartHtml;
    }
}

function renderBar(label, value, total, status) {
    const width = total > 0 ? Math.max((value / total) * 100, value > 0 ? 8 : 0) : 0;

    return `
        <div class="bar-row">
            <div class="bar-meta">
                <span>${label}</span>
                <strong>${value}</strong>
            </div>
            <div class="bar-track">
                <span class="bar-fill status-${status}" style="width: ${width}%"></span>
            </div>
        </div>
    `;
}

function countByStatus(pitches, status) {
    return pitches.filter((pitch) => pitch.status === status).length;
}

function getTags(pitch) {
    return Array.isArray(pitch.tags) ? pitch.tags.filter(Boolean) : [];
}

function renderTags(tags) {
    if (!tags.length) {
        return '<span class="tag muted-tag">No tags</span>';
    }

    return tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('');
}

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function setFormMessage(element, message, type) {
    element.textContent = message;
    element.classList.toggle('hidden', !message);
    element.classList.toggle('is-error', type === 'error');
    element.classList.toggle('is-success', type === 'success');
}

function openChatbot() {
    DOM.chatbotPanel.classList.remove('hidden');
    DOM.chatbotToggle.classList.add('hidden');

    if (DOM.chatbotMessages.children.length === 0) {
        addChatbotMessage('bot', 'Hi, I can help with startup schemes, registration, pitching, login issues, and using this dashboard.');
    }

    DOM.chatbotInput.focus();
}

function closeChatbot() {
    DOM.chatbotPanel.classList.add('hidden');
    DOM.chatbotToggle.classList.remove('hidden');
}

function handleChatbotSubmit(e) {
    e.preventDefault();
    const question = DOM.chatbotInput.value.trim();

    if (!question) return;

    askChatbot(question);
    DOM.chatbotInput.value = '';
}

async function askChatbot(question) {
    addChatbotMessage('user', question);
    const pendingMessage = addChatbotMessage('bot', 'Thinking...');

    try {
        const res = await fetch(`${API_BASE}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: question })
        });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Chatbot failed');
        }

        pendingMessage.textContent = data.reply;
    } catch (error) {
        console.error('Chatbot request failed:', error);
        pendingMessage.textContent = getChatbotReply(question);
    }
}

function addChatbotMessage(sender, text) {
    const message = document.createElement('div');
    message.className = `chatbot-message ${sender}`;
    message.textContent = text;
    DOM.chatbotMessages.appendChild(message);
    DOM.chatbotMessages.scrollTop = DOM.chatbotMessages.scrollHeight;
    return message;
}

function getChatbotReply(question) {
    const query = question.toLowerCase();
    const role = localStorage.getItem('role');

    if (query.includes('login') || query.includes('register') || query.includes('sign')) {
        return 'For login/register issues, check that MongoDB is running, your backend shows "MongoDB connected" and "Server running on port 5000", and you are opening the app from http://localhost:5000.';
    }

    if (query.includes('pitch') || query.includes('proposal') || query.includes('submit')) {
        return 'To submit a pitch, log in as an Entrepreneur, choose an available government problem, then use Submit a Pitch with a clear project title and solution description. Keep it specific: problem, approach, impact, timeline.';
    }

    if (query.includes('problem') || query.includes('admin') || query.includes('government')) {
        return 'Government Admin users can post problems from the Dashboard. Add a concise title, department, and detailed description so entrepreneurs know the expected outcome.';
    }

    if (query.includes('scheme') || query.includes('fund') || query.includes('grant') || query.includes('startup india')) {
        return 'Open Resources to compare DPIIT Recognition, Startup India Seed Fund, Fund of Funds, Atal Innovation Mission, BIRAC BIG, MeitY SAMRIDH, and Udyam Registration. Start with DPIIT Recognition if your startup is eligible.';
    }

    if (query.includes('law') || query.includes('tax') || query.includes('80') || query.includes('56') || query.includes('compliance')) {
        return 'For laws and tax benefits, check Resources for Section 80-IAC, Section 56 angel tax exemption, self-certification, and MSME Udyam registration. Eligibility depends on entity type, age, turnover, and DPIIT recognition.';
    }

    if (query.includes('news') || query.includes('tech')) {
        return 'Use the News tab to load recent industry articles. You can filter by domain and date range. It needs internet access because the app fetches articles from dev.to.';
    }

    if (query.includes('database') || query.includes('mongo') || query.includes('server')) {
        return 'For database checks, open MongoDB Compass and connect to mongodb://127.0.0.1:27017. If the backend fails, make sure MongoDB is running and your C: drive has free space.';
    }

    if (query.includes('role') || query.includes('entrepreneur')) {
        return role ? `You are currently logged in as ${role}. Admins post problems and review pitches; entrepreneurs browse problems and submit pitches.` : 'When registering, choose Entrepreneur to submit pitches or Government Admin to post problems and review pitches.';
    }

    return 'I can help with login, registration, startup schemes, legal compliance, pitching, admin problems, MongoDB, and dashboard navigation. Try asking "Which scheme should I check?" or "How do I submit a pitch?"';
}

init();
