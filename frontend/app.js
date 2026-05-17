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
    navCollaboration: document.getElementById('nav-collaboration'),
    collaborationNavBadge: document.getElementById('collaboration-nav-badge'),
    navResources: document.getElementById('nav-resources'),
    navNews: document.getElementById('nav-news'),
    profileName: document.getElementById('profile-name'),
    profileRole: document.getElementById('profile-role'),
    sectionDash: document.getElementById('section-dash'),
    sectionChallenges: document.getElementById('section-challenges'),
    sectionCollaboration: document.getElementById('section-collaboration'),
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
    dashboardProblemsList: document.getElementById('dashboard-problems-list'),
    notificationList: document.getElementById('notification-list'),
    themeToggle: document.getElementById('theme-toggle'),
    chatbotToggle: document.getElementById('chatbot-toggle'),
    chatbotPanel: document.getElementById('chatbot-panel'),
    chatbotClose: document.getElementById('chatbot-close'),
    chatbotMessages: document.getElementById('chatbot-messages'),
    chatbotForm: document.getElementById('chatbot-form'),
    chatbotInput: document.getElementById('chatbot-input'),
    collaborationList: document.getElementById('collaboration-list'),
    collaborationStatus: document.getElementById('collaboration-status'),
    collaborationEmpty: document.getElementById('collaboration-empty'),
    collaborationRoom: document.getElementById('collaboration-room'),
    collaborationRoomMeta: document.getElementById('collaboration-room-meta'),
    collaborationRoomTitle: document.getElementById('collaboration-room-title'),
    collaborationAccept: document.getElementById('collaboration-accept'),
    collaborationMessages: document.getElementById('collaboration-messages'),
    collaborationForm: document.getElementById('collaboration-form'),
    collaborationInput: document.getElementById('collaboration-input'),
    collaborationFile: document.getElementById('collaboration-file'),
    collaborationFileName: document.getElementById('collaboration-file-name')
};

const notificationToggle = document.getElementById('notification-toggle');
const notificationDropdown = document.getElementById('notification-dropdown');
const notificationBadge = document.getElementById('notification-badge');
const markAllReadButton = document.getElementById('mark-all-read');
const avatar = document.querySelector('.avatar');
const notificationReadIds = new Set(JSON.parse(localStorage.getItem('readNotifications') || '[]'));

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
let dashboardPollId = null;
let collaborations = [];
let activeCollaborationId = null;
let activeMessages = [];
let collaborationEvents = null;
let currentTab = 'dash';
let unreadCollaborationIds = new Set();

function init() {
    applySavedTheme();
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
    closeCollaborationStream();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    unreadCollaborationIds = new Set();
    renderCollaborationNavBadge();
    showAuth();
});

DOM.navDash.addEventListener('click', () => switchTab('dash'));
DOM.navChallenges.addEventListener('click', () => {
    switchTab('challenges');
    renderProblems();
});
DOM.navCollaboration.addEventListener('click', () => {
    switchTab('collaboration');
    markActiveCollaborationRead();
    fetchCollaborations();
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
DOM.collaborationForm.addEventListener('submit', handleCollaborationSubmit);
DOM.collaborationAccept.addEventListener('click', acceptActiveCollaboration);
DOM.collaborationFile.addEventListener('change', () => {
    DOM.collaborationFileName.textContent = DOM.collaborationFile.files[0]?.name || '';
});

if (notificationToggle && notificationDropdown) {
    notificationToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        const isOpen = !notificationDropdown.classList.contains('hidden');
        notificationDropdown.classList.toggle('hidden', isOpen);
        notificationToggle.setAttribute('aria-expanded', String(!isOpen));
    });

    document.addEventListener('click', (event) => {
        if (!notificationDropdown.contains(event.target) && !notificationToggle.contains(event.target)) {
            notificationDropdown.classList.add('hidden');
            notificationToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

if (markAllReadButton) {
    markAllReadButton.addEventListener('click', () => {
        getNotifications().forEach((notification) => notificationReadIds.add(notification.id));
        persistReadNotifications();
        renderNotifications();
    });
}

if (DOM.notificationList) {
    DOM.notificationList.addEventListener('click', (event) => {
        const button = event.target.closest('.mark-read');
        if (!button) return;

        event.stopPropagation();
        notificationReadIds.add(button.dataset.notificationId);
        persistReadNotifications();
        renderNotifications();
    });
}

if (DOM.themeToggle) {
    DOM.themeToggle.addEventListener('click', toggleTheme);
}

document.querySelectorAll('[data-question]').forEach((button) => {
    button.addEventListener('click', () => {
        askChatbot(button.dataset.question);
    });
});

function switchTab(tab) {
    currentTab = tab;
    DOM.sectionDash.classList.add('hidden');
    DOM.sectionChallenges.classList.add('hidden');
    DOM.sectionCollaboration.classList.add('hidden');
    DOM.sectionResources.classList.add('hidden');
    DOM.sectionNews.classList.add('hidden');
    DOM.navDash.classList.remove('is-active');
    DOM.navChallenges.classList.remove('is-active');
    DOM.navCollaboration.classList.remove('is-active');
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
    if (tab === 'collaboration') {
        DOM.sectionCollaboration.classList.remove('hidden');
        DOM.navCollaboration.classList.add('is-active');
        markActiveCollaborationRead();
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
    stopDashboardPolling();
    closeCollaborationStream();
    collaborations = [];
    activeCollaborationId = null;
    activeMessages = [];
    DOM.authView.classList.remove('hidden');
    DOM.dashboardView.classList.add('hidden');
    DOM.loginForm.classList.remove('hidden');
    DOM.registerForm.classList.add('hidden');
    DOM.forgotForm.classList.add('hidden');
    renderCollaborationNavBadge();
}

function showDashboard() {
    DOM.authView.classList.add('hidden');
    DOM.dashboardView.classList.remove('hidden');
    switchTab('dash');

    const role = localStorage.getItem('role');
    const name = localStorage.getItem('name') || 'User';

    loadUnreadCollaborations();
    DOM.profileName.textContent = name;
    DOM.profileRole.textContent = role === 'admin' ? 'Government Official' : 'Entrepreneur';
    if (avatar) avatar.textContent = getInitials(name);
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

    fetchCollaborations();
    openCollaborationStream();
    renderNotifications();
    renderCollaborationNavBadge();
    startDashboardPolling(role);
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
        renderNotifications();
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
        renderNotifications();
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
        renderNotifications();
    } catch (error) {
        console.error('Error fetching submitted pitches', error);
    }
}

function startDashboardPolling(role) {
    stopDashboardPolling();

    dashboardPollId = window.setInterval(() => {
        if (!localStorage.getItem('token') || DOM.dashboardView.classList.contains('hidden')) {
            stopDashboardPolling();
            return;
        }

        if (role === 'admin') {
            fetchPitches();
            fetchCollaborations();
            return;
        }

        fetchProblems();
        fetchMyPitches();
        fetchCollaborations();
    }, 3000);
}

function stopDashboardPolling() {
    if (!dashboardPollId) return;

    window.clearInterval(dashboardPollId);
    dashboardPollId = null;
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
        ${renderAdminCollaborationAction(pitch)}
      </div>
    `;
        DOM.adminPitchesList.appendChild(div);
    });
}

function renderProblems() {
    const targets = [DOM.entProblemsList, DOM.dashboardProblemsList].filter(Boolean);
    targets.forEach((target) => {
        target.innerHTML = '';
    });

    const query = DOM.challengeSearch.value.trim().toLowerCase();
    const filteredProblems = governmentProblems.filter((prob) => {
        const text = `${prob.title} ${prob.department} ${prob.description}`.toLowerCase();
        return !query || text.includes(query);
    });

    if (filteredProblems.length === 0) {
        targets.forEach((target) => {
            target.innerHTML = '<p class="empty-state">No active government challenges found.</p>';
        });
        return;
    }

    targets.forEach((target) => {
        filteredProblems.forEach(prob => {
            const div = document.createElement('div');
            div.className = 'challenge-card border p-4 rounded bg-gray-50';
            div.innerHTML = `
      <span class="resource-category">Active Task</span>
      <h3 class="font-bold text-lg">${escapeHtml(prob.title)}</h3>
      <p class="text-sm text-blue-600 mb-2 font-semibold">Dept: ${escapeHtml(prob.department)}</p>
      <p>${escapeHtml(prob.description)}</p>
    `;
            target.appendChild(div);
        });
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
      ${renderEntrepreneurCollaborationAction(pitch)}
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

function renderAdminCollaborationAction(pitch) {
    if (pitch.status !== 'approved') {
        return '';
    }

    const collaboration = getCollaborationForPitch(pitch._id);

    if (collaboration) {
        return `<button onclick="openCollaboration('${collaboration._id}')" class="bg-blue-600 text-white px-3 py-1 rounded text-sm">${collaboration.status === 'accepted' ? 'Open Chat' : 'Requested'}</button>`;
    }

    return `<button onclick="requestCollaboration('${pitch._id}')" class="bg-blue-600 text-white px-3 py-1 rounded text-sm">Push Collaboration</button>`;
}

function renderEntrepreneurCollaborationAction(pitch) {
    const collaboration = getCollaborationForPitch(pitch._id);

    if (!collaboration) {
        return '';
    }

    const action = collaboration.status === 'accepted'
        ? 'Open Chat'
        : 'Accept Collaboration';

    return `
        <div class="pitch-actions">
            <button onclick="openCollaboration('${collaboration._id}')" class="bg-blue-600 text-white px-3 py-1 rounded text-sm">${action}</button>
        </div>
    `;
}

function getCollaborationForPitch(pitchId) {
    return collaborations.find((collaboration) => String(collaboration.pitchId?._id || collaboration.pitchId) === String(pitchId));
}

window.requestCollaboration = async function (pitchId) {
    try {
        const res = await fetch(`${API_BASE}/collaborations/request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ pitchId })
        });
        const data = await res.json();

        if (!res.ok) {
            alert(data.message || 'Unable to request collaboration');
            return;
        }

        upsertCollaboration(data);
        renderPitches();
        switchTab('collaboration');
        openCollaboration(data._id);
    } catch (error) {
        alert('Error requesting collaboration');
    }
};

window.openCollaboration = async function (id) {
    activeCollaborationId = id;
    switchTab('collaboration');
    markCollaborationRead(id);
    renderCollaborations();
    await fetchCollaborationMessages(id);
};

async function fetchCollaborations() {
    try {
        const res = await fetch(`${API_BASE}/collaborations`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await res.json();
        collaborations = Array.isArray(data) ? data : [];

        if (!activeCollaborationId && collaborations.length > 0) {
            activeCollaborationId = collaborations[0]._id;
        }

        renderCollaborations();
        renderPitches();
        renderMyPitches();

        if (activeCollaborationId) {
            fetchCollaborationMessages(activeCollaborationId);
        }
    } catch (error) {
        console.error('Error fetching collaborations', error);
    }
}

function renderCollaborations() {
    DOM.collaborationList.innerHTML = '';

    if (collaborations.length === 0) {
        DOM.collaborationList.innerHTML = '<p class="empty-state">No collaboration sessions yet.</p>';
        DOM.collaborationEmpty.classList.remove('hidden');
        DOM.collaborationRoom.classList.add('hidden');
        DOM.collaborationStatus.textContent = 'No session selected';
        return;
    }

    collaborations.forEach((collaboration) => {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = `collaboration-item${collaboration._id === activeCollaborationId ? ' is-active' : ''}`;
        item.innerHTML = `
            <strong>${escapeHtml(collaboration.pitchId?.title || 'Pitch collaboration')}</strong>
            <span>${escapeHtml(getCollaborationPartyLabel(collaboration))}</span>
            <em>${collaboration.status === 'accepted' ? 'Chat active' : 'Awaiting acceptance'}</em>
        `;
        item.addEventListener('click', () => window.openCollaboration(collaboration._id));
        DOM.collaborationList.appendChild(item);
    });

    renderActiveCollaborationRoom();
}

function renderActiveCollaborationRoom() {
    const collaboration = getActiveCollaboration();

    if (!collaboration) {
        DOM.collaborationEmpty.classList.remove('hidden');
        DOM.collaborationRoom.classList.add('hidden');
        DOM.collaborationStatus.textContent = 'No session selected';
        return;
    }

    const isEntrepreneur = localStorage.getItem('role') === 'entrepreneur';
    const canAccept = isEntrepreneur && collaboration.status === 'requested';
    const canChat = collaboration.status === 'accepted';

    DOM.collaborationEmpty.classList.add('hidden');
    DOM.collaborationRoom.classList.remove('hidden');
    DOM.collaborationRoomTitle.textContent = collaboration.pitchId?.title || 'Pitch collaboration';
    DOM.collaborationRoomMeta.textContent = getCollaborationPartyLabel(collaboration);
    DOM.collaborationStatus.textContent = canChat ? 'Live chat active' : 'Waiting for entrepreneur acceptance';
    DOM.collaborationAccept.classList.toggle('hidden', !canAccept);
    DOM.collaborationInput.disabled = !canChat;
    DOM.collaborationFile.disabled = !canChat;
    DOM.collaborationForm.querySelector('button[type="submit"]').disabled = !canChat;
    DOM.collaborationInput.placeholder = canChat ? 'Write a message...' : 'Accept the collaboration to start chatting';
    renderCollaborationMessages();
}

function renderCollaborationMessages() {
    DOM.collaborationMessages.innerHTML = '';

    if (activeMessages.length === 0) {
        DOM.collaborationMessages.innerHTML = '<p class="empty-state">No messages yet.</p>';
        return;
    }

    activeMessages.forEach((message) => {
        const mine = isOwnCollaborationMessage(message);
        const bubble = document.createElement('div');
        bubble.className = `collaboration-message${mine ? ' mine' : ''}`;
        bubble.innerHTML = `
            <span>${escapeHtml(message.senderRole === 'admin' ? 'Government' : 'Entrepreneur')}</span>
            ${message.text ? `<p>${escapeHtml(message.text)}</p>` : ''}
            ${message.file?.url ? `<a href="${escapeHtml(message.file.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(message.file.originalName || 'Attachment')}</a>` : ''}
        `;
        DOM.collaborationMessages.appendChild(bubble);
    });

    DOM.collaborationMessages.scrollTop = DOM.collaborationMessages.scrollHeight;
}

async function fetchCollaborationMessages(id) {
    try {
        const res = await fetch(`${API_BASE}/collaborations/${id}/messages`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await res.json();
        activeMessages = Array.isArray(data) ? data.map((message) => normalizeMessage(message, id)) : [];
        renderActiveCollaborationRoom();
    } catch (error) {
        console.error('Error fetching collaboration messages', error);
    }
}

async function handleCollaborationSubmit(event) {
    event.preventDefault();

    const collaboration = getActiveCollaboration();
    if (!collaboration || collaboration.status !== 'accepted') return;

    const text = DOM.collaborationInput.value.trim();
    const selectedFile = DOM.collaborationFile.files[0];

    if (!text && !selectedFile) return;

    try {
        const body = { text };

        if (selectedFile) {
            body.file = await readFileForUpload(selectedFile);
        }

        const res = await fetch(`${API_BASE}/collaborations/${collaboration._id}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(body)
        });
        const data = await res.json();

        if (!res.ok) {
            alert(data.message || 'Unable to send message');
            return;
        }

        DOM.collaborationInput.value = '';
        DOM.collaborationFile.value = '';
        DOM.collaborationFileName.textContent = '';
        addMessageIfRelevant(normalizeMessage(data, collaboration._id));
    } catch (error) {
        alert('Error sending message');
    }
}

async function acceptActiveCollaboration() {
    const collaboration = getActiveCollaboration();
    if (!collaboration) return;

    try {
        const res = await fetch(`${API_BASE}/collaborations/${collaboration._id}/accept`, {
            method: 'PATCH',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await res.json();

        if (!res.ok) {
            alert(data.message || 'Unable to accept collaboration');
            return;
        }

        upsertCollaboration(data);
        renderCollaborations();
    } catch (error) {
        alert('Error accepting collaboration');
    }
}

function openCollaborationStream() {
    closeCollaborationStream();

    const token = localStorage.getItem('token');
    if (!token || !window.EventSource) return;

    collaborationEvents = new EventSource(`${API_BASE}/collaborations/stream?token=${encodeURIComponent(token)}`);
    collaborationEvents.addEventListener('collaboration:update', (event) => {
        upsertCollaboration(JSON.parse(event.data));
        renderCollaborations();
        renderPitches();
        renderMyPitches();
    });
    collaborationEvents.addEventListener('collaboration:message', (event) => {
        const message = normalizeMessage(JSON.parse(event.data));
        handleIncomingCollaborationMessage(message);
        addMessageIfRelevant(message);
    });
}

function closeCollaborationStream() {
    if (!collaborationEvents) return;

    collaborationEvents.close();
    collaborationEvents = null;
}

function addMessageIfRelevant(message) {
    if (getEntityId(message.collaborationId) !== getEntityId(activeCollaborationId)) return;
    if (activeMessages.some((existing) => getEntityId(existing._id) === getEntityId(message._id))) return;

    activeMessages.push(message);
    renderCollaborationMessages();
}

function handleIncomingCollaborationMessage(message) {
    const collaborationId = getEntityId(message.collaborationId);

    if (!collaborationId || isOwnCollaborationMessage(message)) return;

    const isOpenActiveChat = currentTab === 'collaboration' && collaborationId === getEntityId(activeCollaborationId);

    if (isOpenActiveChat) {
        markCollaborationRead(collaborationId);
        return;
    }

    unreadCollaborationIds.add(collaborationId);
    persistUnreadCollaborations();
    renderCollaborationNavBadge();
}

function markActiveCollaborationRead() {
    if (!activeCollaborationId) return;
    markCollaborationRead(activeCollaborationId);
}

function markCollaborationRead(id) {
    const collaborationId = getEntityId(id);
    if (!collaborationId || !unreadCollaborationIds.has(collaborationId)) return;

    unreadCollaborationIds.delete(collaborationId);
    persistUnreadCollaborations();
    renderCollaborationNavBadge();
}

function loadUnreadCollaborations() {
    unreadCollaborationIds = new Set(JSON.parse(localStorage.getItem(getUnreadCollaborationsKey()) || '[]'));
}

function persistUnreadCollaborations() {
    localStorage.setItem(getUnreadCollaborationsKey(), JSON.stringify([...unreadCollaborationIds]));
}

function getUnreadCollaborationsKey() {
    return `unreadCollaborations:${getUserIdFromToken() || 'guest'}`;
}

function renderCollaborationNavBadge() {
    if (!DOM.collaborationNavBadge) return;

    const unreadCount = unreadCollaborationIds.size;
    DOM.collaborationNavBadge.textContent = unreadCount > 9 ? '9+' : unreadCount;
    DOM.collaborationNavBadge.classList.toggle('hidden', unreadCount === 0);
}

function upsertCollaboration(collaboration) {
    const index = collaborations.findIndex((item) => item._id === collaboration._id);

    if (index >= 0) {
        collaborations[index] = collaboration;
    } else {
        collaborations.unshift(collaboration);
    }

    activeCollaborationId = activeCollaborationId || collaboration._id;
}

function getActiveCollaboration() {
    return collaborations.find((collaboration) => collaboration._id === activeCollaborationId);
}

function normalizeMessage(message, fallbackCollaborationId = '') {
    return {
        ...message,
        _id: getEntityId(message._id) || `local-${Date.now()}`,
        collaborationId: getEntityId(message.collaborationId) || fallbackCollaborationId,
        senderId: getEntityId(message.senderId)
    };
}

function isOwnCollaborationMessage(message) {
    const tokenUserId = getUserIdFromToken();
    const senderId = getEntityId(message.senderId);
    return message.senderRole === localStorage.getItem('role') && (!senderId || senderId === tokenUserId);
}

function getEntityId(value) {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (value._id) return getEntityId(value._id);
    if (value.$oid) return String(value.$oid);
    return String(value);
}

function getCollaborationPartyLabel(collaboration) {
    const role = localStorage.getItem('role');
    const counterpart = role === 'admin' ? collaboration.entrepreneurId : collaboration.adminId;
    return role === 'admin'
        ? `With ${counterpart?.name || 'Entrepreneur'}`
        : `With ${counterpart?.name || 'Government'}`;
}

function readFileForUpload(file) {
    return new Promise((resolve, reject) => {
        if (file.size > 5 * 1024 * 1024) {
            reject(new Error('Files must be 5 MB or smaller'));
            return;
        }

        const reader = new FileReader();
        reader.onload = () => resolve({
            name: file.name,
            type: file.type,
            data: reader.result
        });
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function getUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (!token) return '';

    try {
        return JSON.parse(atob(token.split('.')[1])).id;
    } catch (error) {
        return '';
    }
}

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

function updateNotificationBadge() {
    if (!notificationBadge) return;

    const unreadCount = getNotifications().filter((notification) => !notificationReadIds.has(notification.id)).length;
    notificationBadge.textContent = unreadCount;
    notificationBadge.classList.toggle('hidden', unreadCount === 0);
}

function renderNotifications() {
    if (!DOM.notificationList) return;

    const notifications = getNotifications();
    DOM.notificationList.innerHTML = '';

    if (notifications.length === 0) {
        DOM.notificationList.innerHTML = '<p class="notification-empty">No notifications yet.</p>';
        updateNotificationBadge();
        return;
    }

    notifications.forEach((notification) => {
        const isUnread = !notificationReadIds.has(notification.id);
        const item = document.createElement('article');
        item.className = `notification-item${isUnread ? ' unread' : ''}`;
        item.innerHTML = `
            <div>
                <strong>${escapeHtml(notification.title)}</strong>
                <p>${escapeHtml(notification.body)}</p>
            </div>
            ${isUnread ? `<button type="button" class="mark-read" data-notification-id="${escapeHtml(notification.id)}">Mark as read</button>` : ''}
        `;
        DOM.notificationList.appendChild(item);
    });

    updateNotificationBadge();
}

function getNotifications() {
    const role = localStorage.getItem('role');

    if (role === 'admin') {
        return adminPitches.map((pitch) => ({
            id: `pitch-${pitch._id || pitch.title}`,
            title: 'New pitch in your inbox',
            body: `${pitch.entrepreneurId?.name || 'An entrepreneur'} submitted "${pitch.title || 'a proposal'}".`
        }));
    }

    const pitchStatusNotifications = entrepreneurPitches
        .filter((pitch) => ['approved', 'rejected'].includes(pitch.status))
        .map((pitch) => ({
            id: `pitch-status-${pitch._id || pitch.title}-${pitch.status}`,
            title: pitch.status === 'approved' ? 'Your proposal was approved' : 'Your proposal was rejected',
            body: `"${pitch.title || 'Your proposal'}" is now ${pitch.status}. ${pitch.adminFeedback || ''}`.trim()
        }));

    const challengeNotifications = governmentProblems.map((problem) => ({
        id: `challenge-${problem._id || problem.title}`,
        title: 'New government challenge posted',
        body: `${problem.department || 'A government department'} posted "${problem.title || 'a new challenge'}".`
    }));

    return [...pitchStatusNotifications, ...challengeNotifications];
}

function persistReadNotifications() {
    localStorage.setItem('readNotifications', JSON.stringify([...notificationReadIds]));
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.toggle('light-theme', savedTheme === 'light');
    updateThemeToggleLabel();
}

function toggleTheme() {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateThemeToggleLabel();
}

function updateThemeToggleLabel() {
    if (!DOM.themeToggle) return;

    const isLight = document.body.classList.contains('light-theme');
    DOM.themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
}

function getInitials(name) {
    return String(name || 'User')
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() || '')
        .join('') || 'GE';
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
