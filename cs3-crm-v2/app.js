/**
 * CS3 CRM V3 - Real Functional App
 * With Properties, Capital Tracker, and Investor Management
 */

// ============================================
// FIREBASE CONFIG (Replace with your config)
// ============================================

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "cs3-crm.firebaseapp.com",
    projectId: "cs3-crm",
    storageBucket: "cs3-crm.appspot.com",
    messagingSenderId: "000000000000",
    appId: "1:000000000000:web:0000000000000000000000"
};

// Initialize Firebase (commented out until real config is added)
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// const auth = firebase.auth();

// ============================================
// CURRENT USER (Will be set by auth)
// ============================================

let currentUser = {
    id: 'al-liao',
    name: 'Al Liao',
    email: 'al@cs3investments.com',
    role: 'Director of Investor Relations',
    avatar: 'AL',
    integrations: {
        email: { connected: false, account: null },
        telegram: { connected: false, account: null },
        whatsapp: { connected: false, account: null },
        zoom: { connected: false, account: null },
        calendar: { connected: false, account: null },
        ai: { connected: false, account: null },
        voice: { connected: false, account: null }
    }
};

// ============================================
// TEAM DATA
// ============================================

const teamMembers = [
    {
        id: 'carlos-salguero',
        name: 'Carlos Salguero',
        email: 'carlos@cs3investments.com',
        role: 'Founder & President',
        avatar: 'CS',
        integrations: { email: true, telegram: true, whatsapp: true, zoom: true, calendar: true, ai: true, voice: true },
        stats: { calls: 45, emails: 120, investors: 85 }
    },
    {
        id: 'al-liao',
        name: 'Al Liao',
        email: 'al@cs3investments.com',
        role: 'Director of IR',
        avatar: 'AL',
        integrations: { email: true, telegram: true, whatsapp: false, zoom: true, calendar: true, ai: true, voice: true },
        stats: { calls: 67, emails: 210, investors: 150 }
    },
    {
        id: 'brandon-ford',
        name: 'Brandon Ford',
        email: 'brandon@cs3investments.com',
        role: 'Finance Director',
        avatar: 'BF',
        integrations: { email: true, telegram: false, whatsapp: false, zoom: true, calendar: true, ai: false, voice: false },
        stats: { calls: 12, emails: 89, investors: 0 }
    },
    {
        id: 'grace-wilson',
        name: 'Grace Wilson',
        email: 'grace@cs3investments.com',
        role: 'Asset Management',
        avatar: 'GW',
        integrations: { email: true, telegram: true, whatsapp: true, zoom: true, calendar: true, ai: true, voice: false },
        stats: { calls: 28, emails: 156, investors: 45 }
    },
    {
        id: 'eric-tung',
        name: 'Eric Tung',
        email: 'eric@cs3investments.com',
        role: 'Project Director',
        avatar: 'ET',
        integrations: { email: true, telegram: false, whatsapp: false, zoom: true, calendar: true, ai: false, voice: false },
        stats: { calls: 8, emails: 42, investors: 0 }
    },
    {
        id: 'ricardo-salguero',
        name: 'Ricardo Salguero',
        email: 'ricardo@cs3investments.com',
        role: 'Chief Marketing Officer',
        avatar: 'RS',
        integrations: { email: true, telegram: true, whatsapp: true, zoom: true, calendar: true, ai: true, voice: true },
        stats: { calls: 22, emails: 178, investors: 30 }
    }
];

// ============================================
// DATA STORE (Will connect to Firestore)
// ============================================

const CS3Data = {
    properties: [
        {
            id: 'mckenzie',
            name: 'McKenzie STL',
            location: 'St. Louis, MO',
            units: 251,
            status: 'active', // active, raising, exited
            aum: 28500000,
            investors: 187,
            coC: 8.1,
            acquired: '2023-06-15',
            website: 'mckenziestl.com'
        },
        {
            id: 'legacy',
            name: 'Legacy Townhomes',
            location: 'Manchester, TN',
            units: 120,
            status: 'active',
            aum: 18200000,
            investors: 142,
            coC: 7.5,
            acquired: '2023-09-01',
            website: 'legacy-townhomes.com'
        },
        {
            id: 'reserve',
            name: 'The Reserve at Cool Springs',
            location: 'Elizabethtown, KY',
            units: 200,
            status: 'active',
            aum: 22100000,
            investors: 156,
            coC: 7.8,
            acquired: '2024-01-15',
            website: 'thereserveatcoolsprings.com'
        },
        {
            id: 'winding-springs',
            name: 'Winding Springs',
            location: 'Elizabethtown, KY',
            units: 180,
            status: 'raising',
            aum: 0,
            investors: 60,
            coC: 0,
            acquired: null,
            website: null,
            raise: {
                goal: 10000000,
                committed: 7800000,
                collected: 6800000,
                retirementAmount: 2400000,
                retirementInvestors: 18,
                cashAmount: 4400000,
                cashInvestors: 42
            }
        },
        {
            id: 'gateway-village',
            name: 'Gateway Village',
            location: 'Murfreesboro, TN',
            units: 150,
            status: 'raising',
            aum: 0,
            investors: 0,
            coC: 0,
            acquired: null,
            website: 'thegatewayvillage.com',
            raise: {
                goal: 8000000,
                committed: 0,
                collected: 0,
                retirementAmount: 0,
                retirementInvestors: 0,
                cashAmount: 0,
                cashInvestors: 0
            }
        }
    ],
    
    investors: [
        { id: 1, name: 'Pacific Trust Fund', email: 'contact@pacifictrust.com', totalInvested: 2500000, properties: ['mckenzie', 'legacy'], type: 'entity', status: 'active' },
        { id: 2, name: 'Chen Family Office', email: 'investments@chenfamily.com', totalInvested: 1800000, properties: ['reserve', 'mckenzie'], type: 'entity', status: 'active' },
        { id: 3, name: 'Smith Holdings LLC', email: 'john@smithholdings.com', totalInvested: 1200000, properties: ['legacy', 'reserve'], type: 'entity', status: 'active' },
        { id: 4, name: 'Johnson Capital', email: 'mike@johnsoncap.com', totalInvested: 950000, properties: ['mckenzie'], type: 'cash', status: 'active' },
        { id: 5, name: 'Williams Group', email: 'sarah@williamsgroup.com', totalInvested: 875000, properties: ['reserve'], type: 'sdira', status: 'active' },
        { id: 6, name: 'Robert Chen', email: 'robert.chen@gmail.com', totalInvested: 500000, properties: ['winding-springs'], type: 'cash', status: 'active' },
        { id: 7, name: 'Maria Garcia', email: 'mgarcia@outlook.com', totalInvested: 350000, properties: ['winding-springs'], type: 'sdira', status: 'active' },
        { id: 8, name: 'David Kim', email: 'dkim@techcorp.com', totalInvested: 250000, properties: ['winding-springs'], type: 'solo401k', status: 'active' },
        { id: 9, name: 'Lisa Thompson', email: 'lisa.t@email.com', totalInvested: 200000, properties: ['winding-springs'], type: 'cash', status: 'active' },
        { id: 10, name: 'James Wilson', email: 'jwilson@business.com', totalInvested: 150000, properties: ['winding-springs'], type: 'cash', status: 'active' }
    ],
    
    raiseInvestors: [
        { name: 'Robert Chen', amount: 500000, type: 'cash', status: 'funded', committedDate: '2025-11-15', fundedDate: '2025-11-22' },
        { name: 'Maria Garcia', amount: 350000, type: 'sdira', status: 'funded', committedDate: '2025-11-18', fundedDate: '2025-12-01' },
        { name: 'David Kim', amount: 250000, type: 'solo401k', status: 'funded', committedDate: '2025-11-20', fundedDate: '2025-12-05' },
        { name: 'Lisa Thompson', amount: 200000, type: 'cash', status: 'funded', committedDate: '2025-11-25', fundedDate: '2025-11-28' },
        { name: 'James Wilson', amount: 150000, type: 'cash', status: 'committed', committedDate: '2025-12-01', fundedDate: null },
        { name: 'Sarah Miller', amount: 300000, type: 'sdira', status: 'committed', committedDate: '2025-12-10', fundedDate: null },
        { name: 'Michael Brown', amount: 400000, type: 'cash', status: 'pending', committedDate: '2026-01-15', fundedDate: null }
    ]
};

// ============================================
// NAVIGATION
// ============================================

function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Show target page
    const targetPage = document.getElementById(`${page}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update nav
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    document.querySelector(`.nav-item[data-page="${page}"]`)?.classList.add('active');
    
    // Load page data
    loadPageData(page);
}

function loadPageData(page) {
    switch(page) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'properties':
            loadProperties();
            break;
        case 'capital':
            loadCapitalTracker();
            break;
        case 'investors':
            loadInvestors();
            break;
        case 'pipeline':
            loadPipeline();
            break;
        case 'team':
            loadTeamPage();
            break;
        case 'profile':
            loadProfilePage();
            break;
        case 'compliance':
            loadCompliancePage();
            break;
        case 'communications':
            loadCommunications();
            break;
        case 'distributions':
            loadDistributions();
            break;
        case 'reports':
            loadReports();
            break;
        case 'tasks':
            loadTasks();
            break;
    }
}

// ============================================
// DASHBOARD
// ============================================

function loadDashboard() {
    // Update stats
    const totalInvestors = CS3Data.investors.length;
    const totalAUM = CS3Data.properties.reduce((sum, p) => sum + p.aum, 0);
    const totalUnits = CS3Data.properties.reduce((sum, p) => sum + p.units, 0);
    
    document.getElementById('statInvestors').textContent = totalInvestors;
    document.getElementById('statAUM').textContent = formatCurrency(totalAUM);
    document.getElementById('statUnits').textContent = totalUnits.toLocaleString();
    
    // Load dashboard properties
    const propertiesContainer = document.getElementById('dashboardProperties');
    if (propertiesContainer) {
        propertiesContainer.innerHTML = CS3Data.properties.slice(0, 4).map(p => createPropertyCard(p)).join('');
    }
    
    // Update capital tracker for current raise
    const currentRaise = CS3Data.properties.find(p => p.status === 'raising' && p.raise);
    if (currentRaise && currentRaise.raise) {
        const r = currentRaise.raise;
        const progress = (r.collected / r.goal) * 100;
        
        document.getElementById('raiseProgress').style.width = `${progress}%`;
        document.getElementById('raiseProgressText').textContent = `${Math.round(progress)}% Complete`;
        document.getElementById('raiseGoalText').textContent = `${formatCurrency(r.goal)} Goal`;
        
        document.getElementById('goalAmount').textContent = formatCurrency(r.goal);
        document.getElementById('committedAmount').textContent = formatCurrency(r.committed);
        document.getElementById('collectedAmount').textContent = formatCurrency(r.collected);
        document.getElementById('remainingAmount').textContent = formatCurrency(r.goal - r.collected);
    }
}

// ============================================
// PROPERTIES
// ============================================

function loadProperties(filter = 'all') {
    const container = document.getElementById('propertiesGrid');
    if (!container) return;
    
    let properties = CS3Data.properties;
    
    if (filter !== 'all') {
        properties = properties.filter(p => p.status === filter);
    }
    
    container.innerHTML = properties.map(p => createPropertyCard(p, true)).join('');
}

function createPropertyCard(property, detailed = false) {
    const statusLabels = {
        'active': '🟢 Active',
        'raising': '🟡 Raising',
        'exited': '⚪ Exited'
    };
    
    const statusClasses = {
        'active': 'active',
        'raising': 'raising',
        'exited': 'exited'
    };
    
    return `
        <div class="property-card">
            <div class="property-header">
                <h4>${property.name}</h4>
                <div class="property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${property.location}
                </div>
            </div>
            <div class="property-body">
                <div class="property-stats">
                    <div class="property-stat">
                        <div class="property-stat-value">${property.units}</div>
                        <div class="property-stat-label">Units</div>
                    </div>
                    <div class="property-stat">
                        <div class="property-stat-value">${property.investors}</div>
                        <div class="property-stat-label">Investors</div>
                    </div>
                    <div class="property-stat">
                        <div class="property-stat-value">${property.coC > 0 ? property.coC + '%' : '-'}</div>
                        <div class="property-stat-label">CoC</div>
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span class="property-status ${statusClasses[property.status]}">${statusLabels[property.status]}</span>
                    ${property.aum > 0 ? `<span style="font-weight: 600; color: var(--cs3-teal);">${formatCurrency(property.aum)}</span>` : ''}
                </div>
                ${property.status === 'raising' && property.raise ? `
                    <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border-color);">
                        <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 8px;">Capital Progress</div>
                        <div class="progress-bar-container" style="height: 10px;">
                            <div class="progress-bar-fill" style="width: ${(property.raise.collected / property.raise.goal) * 100}%;"></div>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-top: 6px; font-size: 12px;">
                            <span>${formatCurrency(property.raise.collected)} collected</span>
                            <span>${formatCurrency(property.raise.goal)} goal</span>
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// Property filter buttons
document.querySelectorAll('.property-filter').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.property-filter').forEach(b => {
            b.classList.remove('btn-primary');
            b.classList.add('btn-outline');
        });
        this.classList.remove('btn-outline');
        this.classList.add('btn-primary');
        loadProperties(this.dataset.filter);
    });
});

// ============================================
// CAPITAL TRACKER
// ============================================

function loadCapitalTracker() {
    loadDealData();
}

function loadDealData() {
    const dealId = document.getElementById('dealSelector')?.value || 'winding-springs';
    const property = CS3Data.properties.find(p => p.id === dealId);
    
    if (!property) return;
    
    // Update header
    document.getElementById('dealName').textContent = `${property.name} Capital Raise`;
    
    // Update status
    const statusEl = document.getElementById('dealStatus');
    if (property.status === 'raising') {
        statusEl.textContent = '🟡 Currently Raising';
        statusEl.className = 'property-status raising';
    } else if (property.status === 'active') {
        statusEl.textContent = '✅ Complete';
        statusEl.className = 'property-status active';
    }
    
    if (property.raise) {
        const r = property.raise;
        const progress = r.goal > 0 ? (r.collected / r.goal) * 100 : 0;
        
        // Progress bar
        document.getElementById('capitalProgress').style.width = `${progress}%`;
        document.getElementById('capitalProgressText').textContent = `${Math.round(progress)}% of Goal`;
        document.getElementById('capitalGoalText').textContent = `${formatCurrency(r.goal)} Goal`;
        
        // Stats
        document.getElementById('capitalGoal').textContent = formatCurrency(r.goal);
        document.getElementById('capitalCommitted').textContent = formatCurrency(r.committed);
        document.getElementById('capitalCollected').textContent = formatCurrency(r.collected);
        document.getElementById('capitalRemaining').textContent = formatCurrency(r.goal - r.collected);
        
        // Breakdown
        document.getElementById('retirementAmount').textContent = formatCurrency(r.retirementAmount);
        document.getElementById('retirementDetail').textContent = `${r.collected > 0 ? Math.round((r.retirementAmount / r.collected) * 100) : 0}% of collected • ${r.retirementInvestors} investors`;
        
        document.getElementById('cashAmount').textContent = formatCurrency(r.cashAmount);
        document.getElementById('cashDetail').textContent = `${r.collected > 0 ? Math.round((r.cashAmount / r.collected) * 100) : 0}% of collected • ${r.cashInvestors} investors`;
    }
    
    // Load investors in this raise
    loadRaiseInvestors(dealId);
}

function loadRaiseInvestors(dealId) {
    const container = document.getElementById('raiseInvestorsList');
    if (!container) return;
    
    const statusBadges = {
        'funded': '<span class="status-badge active">✅ Funded</span>',
        'committed': '<span class="status-badge pending">📝 Committed</span>',
        'pending': '<span class="status-badge" style="background: #f3f4f6;">⏳ Pending</span>'
    };
    
    const typeLabels = {
        'cash': '💵 Cash',
        'sdira': '🏦 SDIRA',
        'solo401k': '📊 Solo 401k',
        'entity': '🏢 Entity'
    };
    
    container.innerHTML = CS3Data.raiseInvestors.map(inv => `
        <tr>
            <td><strong>${inv.name}</strong></td>
            <td>${formatCurrency(inv.amount)}</td>
            <td>${typeLabels[inv.type] || inv.type}</td>
            <td>${statusBadges[inv.status]}</td>
            <td>${inv.committedDate || '-'}</td>
            <td>${inv.fundedDate || '-'}</td>
        </tr>
    `).join('');
}

// ============================================
// INVESTORS
// ============================================

function loadInvestors() {
    const container = document.getElementById('allInvestorsList');
    if (!container) return;
    
    const typeLabels = {
        'cash': '💵 Cash',
        'sdira': '🏦 SDIRA',
        'solo401k': '📊 Solo 401k',
        'entity': '🏢 Entity'
    };
    
    container.innerHTML = CS3Data.investors.map(inv => {
        const propertyNames = inv.properties.map(pId => {
            const prop = CS3Data.properties.find(p => p.id === pId);
            return prop ? prop.name : pId;
        }).join(', ');
        
        return `
            <tr>
                <td><strong>${inv.name}</strong></td>
                <td>${inv.email}</td>
                <td>${formatCurrency(inv.totalInvested)}</td>
                <td>${propertyNames}</td>
                <td>${typeLabels[inv.type] || inv.type}</td>
                <td><span class="status-badge ${inv.status}">${inv.status}</span></td>
                <td>
                    <button class="btn btn-small btn-outline" onclick="viewInvestor(${inv.id})">View</button>
                </td>
            </tr>
        `;
    }).join('');
}

function viewInvestor(id) {
    const investor = CS3Data.investors.find(i => i.id === id);
    if (investor) {
        alert(`Investor: ${investor.name}\nEmail: ${investor.email}\nTotal Invested: ${formatCurrency(investor.totalInvested)}`);
    }
}

// ============================================
// PIPELINE
// ============================================

function loadPipeline() {
    // This would load from Firestore in production
    const pipelineData = {
        leads: ['New Lead 1', 'New Lead 2', 'New Lead 3'],
        engaged: ['Engaged 1', 'Engaged 2'],
        committed: ['Committed 1'],
        funded: ['Funded 1']
    };
    
    ['leads', 'engaged', 'committed', 'funded'].forEach(stage => {
        const container = document.getElementById(`pipeline${stage.charAt(0).toUpperCase() + stage.slice(1)}`);
        if (container) {
            container.innerHTML = pipelineData[stage].map(name => `
                <div style="padding: 12px; background: var(--bg-primary); border-radius: 8px; margin-bottom: 8px;">
                    <strong>${name}</strong>
                </div>
            `).join('') || '<p style="color: var(--text-secondary); font-size: 13px;">No items</p>';
        }
    });
}

// ============================================
// MODALS
// ============================================

function showAddInvestorModal() {
    document.getElementById('addInvestorModal').style.display = 'flex';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

function addInvestor() {
    const name = document.getElementById('investorName').value;
    const email = document.getElementById('investorEmail').value;
    const phone = document.getElementById('investorPhone').value;
    const type = document.getElementById('investorType').value;
    
    if (!name || !email) {
        alert('Please fill in required fields');
        return;
    }
    
    // Add to local data (would save to Firestore in production)
    const newInvestor = {
        id: CS3Data.investors.length + 1,
        name,
        email,
        phone,
        totalInvested: 0,
        properties: [],
        type,
        status: 'prospect'
    };
    
    CS3Data.investors.push(newInvestor);
    
    // Clear form
    document.getElementById('investorName').value = '';
    document.getElementById('investorEmail').value = '';
    document.getElementById('investorPhone').value = '';
    
    // Close modal
    closeModal('addInvestorModal');
    
    // Refresh
    loadInvestors();
    
    alert(`Added investor: ${name}`);
}

// ============================================
// UTILITIES
// ============================================

function formatCurrency(amount) {
    if (amount >= 1000000) {
        return '$' + (amount / 1000000).toFixed(1) + 'M';
    } else if (amount >= 1000) {
        return '$' + (amount / 1000).toFixed(0) + 'K';
    }
    return '$' + amount.toLocaleString();
}

function refreshData() {
    const currentPage = document.querySelector('.page.active')?.id?.replace('-page', '');
    if (currentPage) {
        loadPageData(currentPage);
    }
    console.log('Data refreshed');
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Set up navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            if (page) {
                navigateTo(page);
            }
        });
    });
    
    // Load dashboard
    loadDashboard();
    
    console.log('CS3 CRM V3 Loaded');
});

// Close modal on outside click
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// ============================================
// AUTHENTICATION
// ============================================

function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        alert('Please enter email and password');
        return;
    }
    
    // For demo, accept any email/password
    // In production, this would use Firebase Auth
    console.log('Login attempt:', email);
    
    // Find user by email or create demo user
    const user = teamMembers.find(m => m.email === email) || {
        name: email.split('@')[0],
        email: email,
        role: 'Team Member',
        avatar: email.substring(0, 2).toUpperCase()
    };
    
    currentUser = {
        ...user,
        integrations: user.integrations || {}
    };
    
    // Hide login, show app
    document.getElementById('loginPage').style.display = 'none';
    document.querySelector('.app-container').style.display = 'flex';
    
    // Update UI with user info
    updateUserUI();
    loadDashboard();
    
    // Save to localStorage
    localStorage.setItem('cs3_user', JSON.stringify(currentUser));
}

function handleGoogleLogin() {
    // In production, this would use Firebase Google Auth
    alert('Google Sign-In coming soon! For now, use email/password.');
}

function handleLogout() {
    localStorage.removeItem('cs3_user');
    currentUser = null;
    document.getElementById('loginPage').style.display = 'flex';
    document.querySelector('.app-container').style.display = 'none';
}

function checkAuth() {
    const savedUser = localStorage.getItem('cs3_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        document.getElementById('loginPage').style.display = 'none';
        document.querySelector('.app-container').style.display = 'flex';
        updateUserUI();
        return true;
    }
    return false;
}

function updateUserUI() {
    // Update sidebar user info
    const avatarEl = document.querySelector('.user-avatar');
    const nameEl = document.querySelector('.user-name');
    const roleEl = document.querySelector('.user-role');
    
    if (avatarEl && currentUser) {
        avatarEl.textContent = currentUser.avatar || currentUser.name.substring(0, 2).toUpperCase();
    }
    if (nameEl && currentUser) {
        nameEl.textContent = currentUser.name;
    }
    if (roleEl && currentUser) {
        roleEl.textContent = currentUser.role;
    }
}

// ============================================
// TEAM PAGE
// ============================================

function loadTeamPage() {
    const container = document.getElementById('teamGrid');
    if (!container) return;
    
    // Update stats
    document.getElementById('teamCount').textContent = teamMembers.length;
    
    const totalIntegrations = teamMembers.reduce((sum, m) => {
        return sum + Object.values(m.integrations).filter(v => v === true).length;
    }, 0);
    document.getElementById('integrationsActive').textContent = totalIntegrations;
    
    container.innerHTML = teamMembers.map(member => {
        const integrationIcons = [
            { key: 'email', icon: 'fa-envelope', color: '#ea4335' },
            { key: 'telegram', icon: 'fa-telegram', color: '#0088cc', brand: true },
            { key: 'whatsapp', icon: 'fa-whatsapp', color: '#25d366', brand: true },
            { key: 'zoom', icon: 'fa-video', color: '#2d8cff' },
            { key: 'calendar', icon: 'fa-calendar', color: '#4285f4' },
            { key: 'ai', icon: 'fa-robot', color: '#bca460' },
            { key: 'voice', icon: 'fa-phone-alt', color: '#004f59' }
        ];
        
        const badges = integrationIcons.map(int => {
            const connected = member.integrations[int.key];
            return `<span class="integration-badge ${connected ? 'connected' : 'disconnected'}">
                <i class="${int.brand ? 'fab' : 'fas'} ${int.icon}" style="color: ${connected ? int.color : '#999'};"></i>
            </span>`;
        }).join('');
        
        return `
            <div class="team-member-card">
                <div class="team-member-header">
                    <div class="team-member-avatar">${member.avatar}</div>
                    <div class="team-member-info">
                        <h4>${member.name}</h4>
                        <p>${member.role}</p>
                    </div>
                </div>
                <div class="team-member-body">
                    <div class="team-member-integrations">
                        ${badges}
                    </div>
                    <div class="team-member-stats">
                        <div class="team-stat">
                            <div class="team-stat-value">${member.stats.calls}</div>
                            <div class="team-stat-label">Calls</div>
                        </div>
                        <div class="team-stat">
                            <div class="team-stat-value">${member.stats.emails}</div>
                            <div class="team-stat-label">Emails</div>
                        </div>
                        <div class="team-stat">
                            <div class="team-stat-value">${member.stats.investors}</div>
                            <div class="team-stat-label">Investors</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function showInviteTeamModal() {
    document.getElementById('inviteTeamModal').style.display = 'flex';
}

function sendTeamInvite() {
    const name = document.getElementById('inviteName').value;
    const email = document.getElementById('inviteEmail').value;
    const role = document.getElementById('inviteRole').value;
    
    if (!name || !email) {
        alert('Please fill in required fields');
        return;
    }
    
    // In production, this would send an actual invite
    alert(`Invitation sent to ${name} (${email}) as ${role}`);
    
    closeModal('inviteTeamModal');
    document.getElementById('inviteName').value = '';
    document.getElementById('inviteEmail').value = '';
}

// ============================================
// PROFILE PAGE
// ============================================

function loadProfilePage() {
    if (!currentUser) return;
    
    document.getElementById('profileAvatar').textContent = currentUser.avatar || 'U';
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileRole').textContent = currentUser.role;
    document.getElementById('profileEmail').textContent = currentUser.email;
    
    // Load integration statuses
    const integrations = currentUser.integrations || {};
    const intTypes = ['email', 'telegram', 'whatsapp', 'zoom', 'calendar', 'ai', 'voice'];
    
    intTypes.forEach(type => {
        const item = document.getElementById(`int-${type}`);
        if (item) {
            const connected = integrations[type]?.connected || false;
            const statusEl = item.querySelector('.integration-status');
            const btn = item.querySelector('button');
            
            if (connected) {
                item.classList.add('connected');
                statusEl.className = 'integration-status connected';
                statusEl.textContent = `Connected: ${integrations[type].account || 'Account'}`;
                btn.textContent = 'Disconnect';
                btn.className = 'btn btn-small btn-outline';
                btn.onclick = () => disconnectIntegration(type);
            } else {
                item.classList.remove('connected');
                statusEl.className = 'integration-status disconnected';
                statusEl.textContent = 'Not connected';
                btn.innerHTML = '<i class="fas fa-plug"></i> Connect';
                btn.className = 'btn btn-small btn-primary';
                btn.onclick = () => connectIntegration(type);
            }
        }
    });
}

function showEditProfileModal() {
    document.getElementById('editName').value = currentUser?.name || '';
    document.getElementById('editPhone').value = currentUser?.phone || '';
    document.getElementById('editRole').value = currentUser?.role || '';
    document.getElementById('editProfileModal').style.display = 'flex';
}

function saveProfile() {
    const name = document.getElementById('editName').value;
    const phone = document.getElementById('editPhone').value;
    
    if (currentUser) {
        currentUser.name = name;
        currentUser.phone = phone;
        currentUser.avatar = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        
        localStorage.setItem('cs3_user', JSON.stringify(currentUser));
        updateUserUI();
        loadProfilePage();
    }
    
    closeModal('editProfileModal');
    alert('Profile updated!');
}

// ============================================
// INTEGRATIONS
// ============================================

function connectIntegration(type) {
    const titles = {
        email: 'Connect Email (Gmail)',
        telegram: 'Connect Telegram',
        whatsapp: 'Connect WhatsApp',
        zoom: 'Connect Zoom',
        calendar: 'Connect Google Calendar',
        ai: 'Connect AI Platform (Gemini)',
        voice: 'Connect Google Voice'
    };
    
    const bodies = {
        email: `
            <p style="margin-bottom: 20px;">Connect your Gmail account to send and receive emails directly from the CRM.</p>
            <div class="form-group">
                <label class="form-label">Gmail Address</label>
                <input type="email" class="form-input" id="intEmail" placeholder="your@gmail.com">
            </div>
            <button class="btn btn-primary" style="width: 100%;" onclick="completeIntegration('email')">
                <i class="fab fa-google"></i> Connect with Google
            </button>
        `,
        telegram: `
            <p style="margin-bottom: 20px;">Connect your Telegram to receive notifications and send messages.</p>
            <div class="form-group">
                <label class="form-label">Telegram Username</label>
                <input type="text" class="form-input" id="intTelegram" placeholder="@username">
            </div>
            <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 20px;">
                You'll receive a verification code via Telegram bot.
            </p>
            <button class="btn btn-primary" style="width: 100%;" onclick="completeIntegration('telegram')">
                <i class="fab fa-telegram"></i> Connect Telegram
            </button>
        `,
        whatsapp: `
            <p style="margin-bottom: 20px;">Connect WhatsApp Business for investor messaging.</p>
            <div class="form-group">
                <label class="form-label">WhatsApp Phone Number</label>
                <input type="tel" class="form-input" id="intWhatsapp" placeholder="+1 (555) 123-4567">
            </div>
            <button class="btn btn-primary" style="width: 100%;" onclick="completeIntegration('whatsapp')">
                <i class="fab fa-whatsapp"></i> Connect WhatsApp
            </button>
        `,
        zoom: `
            <p style="margin-bottom: 20px;">Connect Zoom to schedule and track investor meetings.</p>
            <button class="btn btn-primary" style="width: 100%;" onclick="completeIntegration('zoom')">
                <i class="fas fa-video"></i> Connect with Zoom
            </button>
        `,
        calendar: `
            <p style="margin-bottom: 20px;">Sync your Google Calendar to track meetings and follow-ups.</p>
            <button class="btn btn-primary" style="width: 100%;" onclick="completeIntegration('calendar')">
                <i class="fab fa-google"></i> Connect Google Calendar
            </button>
        `,
        ai: `
            <p style="margin-bottom: 20px;">Connect Google Gemini AI for intelligent insights and automation.</p>
            <div class="form-group">
                <label class="form-label">API Key (optional)</label>
                <input type="password" class="form-input" id="intAiKey" placeholder="Your Gemini API key">
            </div>
            <button class="btn btn-primary" style="width: 100%;" onclick="completeIntegration('ai')">
                <i class="fas fa-robot"></i> Connect AI Platform
            </button>
        `,
        voice: `
            <p style="margin-bottom: 20px;">Connect Google Voice for call tracking and recording.</p>
            <div class="form-group">
                <label class="form-label">Google Voice Number</label>
                <input type="tel" class="form-input" id="intVoice" placeholder="+1 (555) 123-4567">
            </div>
            <button class="btn btn-primary" style="width: 100%;" onclick="completeIntegration('voice')">
                <i class="fas fa-phone-alt"></i> Connect Google Voice
            </button>
        `
    };
    
    document.getElementById('connectModalTitle').textContent = titles[type] || 'Connect Integration';
    document.getElementById('connectModalBody').innerHTML = bodies[type] || '<p>Integration not available</p>';
    document.getElementById('connectModalBody').dataset.type = type;
    document.getElementById('connectIntegrationModal').style.display = 'flex';
}

function completeIntegration(type) {
    // Get any input values based on type
    let account = '';
    
    switch(type) {
        case 'email':
            account = document.getElementById('intEmail')?.value || 'Gmail';
            break;
        case 'telegram':
            account = document.getElementById('intTelegram')?.value || '@user';
            break;
        case 'whatsapp':
            account = document.getElementById('intWhatsapp')?.value || 'WhatsApp';
            break;
        case 'voice':
            account = document.getElementById('intVoice')?.value || 'Voice';
            break;
        default:
            account = 'Connected';
    }
    
    // Update user integrations
    if (!currentUser.integrations) {
        currentUser.integrations = {};
    }
    
    currentUser.integrations[type] = {
        connected: true,
        account: account,
        connectedAt: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('cs3_user', JSON.stringify(currentUser));
    
    // Close modal and refresh
    closeModal('connectIntegrationModal');
    loadProfilePage();
    
    alert(`${type.charAt(0).toUpperCase() + type.slice(1)} connected successfully!`);
}

function disconnectIntegration(type) {
    if (confirm(`Disconnect ${type}?`)) {
        if (currentUser.integrations) {
            currentUser.integrations[type] = { connected: false, account: null };
            localStorage.setItem('cs3_user', JSON.stringify(currentUser));
            loadProfilePage();
        }
    }
}

// ============================================
// COMPLIANCE DATA
// ============================================

const complianceData = {
    w9: [
        { id: 1, name: 'Pacific Trust Fund', email: 'contact@pacifictrust.com', properties: ['mckenzie', 'legacy'], status: 'collected', date: '2025-06-15' },
        { id: 2, name: 'Chen Family Office', email: 'investments@chenfamily.com', properties: ['reserve', 'mckenzie'], status: 'collected', date: '2025-08-20' },
        { id: 3, name: 'Smith Holdings LLC', email: 'john@smithholdings.com', properties: ['legacy', 'reserve'], status: 'collected', date: '2025-07-10' },
        { id: 4, name: 'Johnson Capital', email: 'mike@johnsoncap.com', properties: ['mckenzie'], status: 'pending', date: null },
        { id: 5, name: 'Williams Group', email: 'sarah@williamsgroup.com', properties: ['reserve'], status: 'collected', date: '2025-09-05' },
        { id: 6, name: 'Robert Chen', email: 'robert.chen@gmail.com', properties: ['winding-springs'], status: 'pending', date: null },
        { id: 7, name: 'Maria Garcia', email: 'mgarcia@outlook.com', properties: ['winding-springs'], status: 'collected', date: '2025-12-01' },
        { id: 8, name: 'David Kim', email: 'dkim@techcorp.com', properties: ['winding-springs'], status: 'pending', date: null },
        { id: 9, name: 'Lisa Thompson', email: 'lisa.t@email.com', properties: ['winding-springs'], status: 'collected', date: '2025-11-28' },
        { id: 10, name: 'James Wilson', email: 'jwilson@business.com', properties: ['winding-springs'], status: 'pending', date: null }
    ],
    accreditation: [
        { id: 1, name: 'Pacific Trust Fund', method: 'CPA Letter', status: 'verified', verifiedDate: '2025-06-15', expiryDate: '2026-06-15' },
        { id: 2, name: 'Chen Family Office', method: 'Third Party (VerifyInvestor)', status: 'verified', verifiedDate: '2025-08-20', expiryDate: '2026-08-20' },
        { id: 3, name: 'Smith Holdings LLC', method: 'Attorney Letter', status: 'verified', verifiedDate: '2025-07-10', expiryDate: '2026-07-10' },
        { id: 4, name: 'Johnson Capital', method: 'Self-Certification', status: 'expiring', verifiedDate: '2025-02-15', expiryDate: '2026-02-15' },
        { id: 5, name: 'Williams Group', method: 'CPA Letter', status: 'verified', verifiedDate: '2025-09-05', expiryDate: '2026-09-05' },
        { id: 6, name: 'Robert Chen', method: 'Third Party (VerifyInvestor)', status: 'pending', verifiedDate: null, expiryDate: null },
        { id: 7, name: 'Maria Garcia', method: 'Self-Certification', status: 'verified', verifiedDate: '2025-12-01', expiryDate: '2026-12-01' },
        { id: 8, name: 'David Kim', method: 'Pending', status: 'pending', verifiedDate: null, expiryDate: null },
        { id: 9, name: 'Lisa Thompson', method: 'CPA Letter', status: 'expiring', verifiedDate: '2025-02-20', expiryDate: '2026-02-20' },
        { id: 10, name: 'James Wilson', method: 'Self-Certification', status: 'verified', verifiedDate: '2025-11-25', expiryDate: '2026-11-25' }
    ]
};

// ============================================
// COMPLIANCE PAGE
// ============================================

function loadCompliancePage() {
    loadW9List();
    loadAccredList();
    updateComplianceStats();
}

function showComplianceTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.compliance-tab').forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline');
    });
    document.querySelector(`.compliance-tab[data-tab="${tab}"]`).classList.remove('btn-outline');
    document.querySelector(`.compliance-tab[data-tab="${tab}"]`).classList.add('btn-primary');
    
    // Show/hide content
    document.querySelectorAll('.compliance-tab-content').forEach(content => {
        content.style.display = 'none';
    });
    document.getElementById(`${tab}-tab`).style.display = 'block';
}

function loadW9List(filter = 'all', propertyFilter = 'all') {
    const container = document.getElementById('w9List');
    if (!container) return;
    
    let data = complianceData.w9;
    
    if (filter !== 'all') {
        data = data.filter(item => item.status === filter);
    }
    
    if (propertyFilter !== 'all') {
        data = data.filter(item => item.properties.includes(propertyFilter));
    }
    
    const statusBadges = {
        'collected': '<span class="status-badge active">✅ Collected</span>',
        'pending': '<span class="status-badge pending">⏳ Pending</span>',
        'expired': '<span class="status-badge" style="background: rgba(239,68,68,0.1); color: var(--danger);">❌ Expired</span>'
    };
    
    container.innerHTML = data.map(item => {
        const propertyNames = item.properties.map(pId => {
            const prop = CS3Data.properties.find(p => p.id === pId);
            return prop ? prop.name : pId;
        }).join(', ');
        
        return `
            <tr>
                <td><input type="checkbox" class="w9-checkbox" data-id="${item.id}"></td>
                <td><strong>${item.name}</strong></td>
                <td>${item.email}</td>
                <td>${propertyNames}</td>
                <td>${statusBadges[item.status]}</td>
                <td>${item.date || '-'}</td>
                <td>
                    ${item.status === 'pending' ? `
                        <button class="btn btn-small btn-outline" onclick="sendW9Reminder(${item.id})">
                            <i class="fas fa-bell"></i> Remind
                        </button>
                        <button class="btn btn-small btn-primary" onclick="markW9Collected(${item.id})">
                            <i class="fas fa-check"></i> Mark Collected
                        </button>
                    ` : `
                        <button class="btn btn-small btn-outline" onclick="viewW9(${item.id})">
                            <i class="fas fa-eye"></i> View
                        </button>
                    `}
                </td>
            </tr>
        `;
    }).join('');
}

function loadAccredList(filter = 'all') {
    const container = document.getElementById('accredList');
    if (!container) return;
    
    let data = complianceData.accreditation;
    
    if (filter !== 'all') {
        data = data.filter(item => item.status === filter);
    }
    
    const statusBadges = {
        'verified': '<span class="status-badge active">✅ Verified</span>',
        'pending': '<span class="status-badge pending">⏳ Pending</span>',
        'expiring': '<span class="status-badge" style="background: rgba(245,158,11,0.1); color: var(--warning);">⚠️ Expiring Soon</span>',
        'expired': '<span class="status-badge" style="background: rgba(239,68,68,0.1); color: var(--danger);">❌ Expired</span>'
    };
    
    container.innerHTML = data.map(item => `
        <tr>
            <td><input type="checkbox" class="accred-checkbox" data-id="${item.id}"></td>
            <td><strong>${item.name}</strong></td>
            <td>${item.method}</td>
            <td>${statusBadges[item.status]}</td>
            <td>${item.verifiedDate || '-'}</td>
            <td>${item.expiryDate || '-'}</td>
            <td>
                ${item.status === 'pending' ? `
                    <button class="btn btn-small btn-outline" onclick="sendAccredReminder(${item.id})">
                        <i class="fas fa-bell"></i> Remind
                    </button>
                    <button class="btn btn-small btn-primary" onclick="markAccredVerified(${item.id})">
                        <i class="fas fa-check"></i> Verify
                    </button>
                ` : item.status === 'expiring' ? `
                    <button class="btn btn-small btn-outline" onclick="sendRenewalReminder(${item.id})">
                        <i class="fas fa-redo"></i> Send Renewal
                    </button>
                ` : `
                    <button class="btn btn-small btn-outline" onclick="viewAccred(${item.id})">
                        <i class="fas fa-eye"></i> View
                    </button>
                `}
            </td>
        </tr>
    `).join('');
}

function updateComplianceStats() {
    const w9Collected = complianceData.w9.filter(i => i.status === 'collected').length;
    const w9Pending = complianceData.w9.filter(i => i.status === 'pending').length;
    const accredVerified = complianceData.accreditation.filter(i => i.status === 'verified').length;
    const accredExpiring = complianceData.accreditation.filter(i => i.status === 'expiring').length;
    
    // Update badge
    const badge = document.getElementById('complianceBadge');
    if (badge) {
        const totalPending = w9Pending + accredExpiring;
        badge.textContent = totalPending;
        badge.style.display = totalPending > 0 ? 'inline' : 'none';
    }
}

function filterW9() {
    const status = document.getElementById('w9Filter').value;
    const property = document.getElementById('w9PropertyFilter').value;
    loadW9List(status, property);
}

function filterAccred() {
    const status = document.getElementById('accredFilter').value;
    loadAccredList(status);
}

function sendW9Reminder(id) {
    const item = complianceData.w9.find(i => i.id === id);
    if (item) {
        alert(`W-9 reminder sent to ${item.name} (${item.email})`);
    }
}

function markW9Collected(id) {
    const item = complianceData.w9.find(i => i.id === id);
    if (item) {
        item.status = 'collected';
        item.date = new Date().toISOString().split('T')[0];
        loadW9List();
        updateComplianceStats();
        alert(`W-9 marked as collected for ${item.name}`);
    }
}

function sendAccredReminder(id) {
    const item = complianceData.accreditation.find(i => i.id === id);
    if (item) {
        alert(`Accreditation reminder sent to ${item.name}`);
    }
}

function markAccredVerified(id) {
    const item = complianceData.accreditation.find(i => i.id === id);
    if (item) {
        item.status = 'verified';
        item.verifiedDate = new Date().toISOString().split('T')[0];
        const expiry = new Date();
        expiry.setFullYear(expiry.getFullYear() + 1);
        item.expiryDate = expiry.toISOString().split('T')[0];
        loadAccredList();
        updateComplianceStats();
        alert(`Accreditation verified for ${item.name}`);
    }
}

function sendRenewalReminder(id) {
    const item = complianceData.accreditation.find(i => i.id === id);
    if (item) {
        alert(`Renewal reminder sent to ${item.name}`);
    }
}

function sendComplianceReminders() {
    const pendingW9 = complianceData.w9.filter(i => i.status === 'pending');
    const expiringAccred = complianceData.accreditation.filter(i => i.status === 'expiring' || i.status === 'pending');
    
    const total = pendingW9.length + expiringAccred.length;
    
    if (total === 0) {
        alert('No pending compliance items!');
        return;
    }
    
    if (confirm(`Send reminders to ${total} investors?\n- ${pendingW9.length} pending W-9\n- ${expiringAccred.length} accreditation issues`)) {
        alert(`Reminders sent to ${total} investors!`);
    }
}

function selectAllW9(checkbox) {
    document.querySelectorAll('.w9-checkbox').forEach(cb => {
        cb.checked = checkbox.checked;
    });
}

function selectAllAccred(checkbox) {
    document.querySelectorAll('.accred-checkbox').forEach(cb => {
        cb.checked = checkbox.checked;
    });
}

function viewW9(id) {
    const item = complianceData.w9.find(i => i.id === id);
    if (item) {
        alert(`W-9 for ${item.name}\nCollected: ${item.date}\nEmail: ${item.email}`);
    }
}

function viewAccred(id) {
    const item = complianceData.accreditation.find(i => i.id === id);
    if (item) {
        alert(`Accreditation for ${item.name}\nMethod: ${item.method}\nVerified: ${item.verifiedDate}\nExpires: ${item.expiryDate}`);
    }
}

// ============================================
// COMMUNICATIONS DATA & FUNCTIONS
// ============================================

const communicationsData = [
    { id: 1, date: '2026-02-04 14:30', type: 'call', investor: 'Pacific Trust Fund', subject: 'Q4 Distribution follow-up', duration: 23, sentiment: 'positive', followup: '2026-02-11' },
    { id: 2, date: '2026-02-04 11:00', type: 'email', investor: 'Chen Family Office', subject: 'Winding Springs Investment Update', duration: null, sentiment: 'positive', followup: null },
    { id: 3, date: '2026-02-03 16:45', type: 'call', investor: 'Smith Holdings LLC', subject: 'New opportunity discussion', duration: 45, sentiment: 'positive', followup: '2026-02-10' },
    { id: 4, date: '2026-02-03 10:00', type: 'meeting', investor: 'Johnson Capital', subject: 'Portfolio review meeting', duration: 60, sentiment: 'neutral', followup: '2026-02-17' },
    { id: 5, date: '2026-02-02 15:30', type: 'call', investor: 'Williams Group', subject: 'Accreditation renewal', duration: 12, sentiment: 'positive', followup: null },
    { id: 6, date: '2026-02-02 09:00', type: 'email', investor: 'Robert Chen', subject: 'Welcome to CS3!', duration: null, sentiment: 'positive', followup: '2026-02-09' },
    { id: 7, date: '2026-02-01 14:00', type: 'call', investor: 'Maria Garcia', subject: 'SDIRA funding questions', duration: 18, sentiment: 'neutral', followup: '2026-02-08' },
    { id: 8, date: '2026-02-01 11:30', type: 'email', investor: 'David Kim', subject: 'Solo 401k documentation', duration: null, sentiment: 'positive', followup: null }
];

function loadCommunications(filter = 'all') {
    const container = document.getElementById('communicationsList');
    if (!container) return;
    
    let data = communicationsData;
    if (filter !== 'all') {
        data = data.filter(c => c.type === filter);
    }
    
    const typeBadges = {
        'call': '<span class="comm-type-badge call">📞 Call</span>',
        'email': '<span class="comm-type-badge email">📧 Email</span>',
        'meeting': '<span class="comm-type-badge meeting">🎥 Meeting</span>'
    };
    
    const sentimentIcons = {
        'positive': '😊',
        'neutral': '😐',
        'negative': '😟'
    };
    
    container.innerHTML = data.map(comm => `
        <tr>
            <td>${comm.date}</td>
            <td>${typeBadges[comm.type]}</td>
            <td><strong>${comm.investor}</strong></td>
            <td>${comm.subject}</td>
            <td>${comm.duration ? comm.duration + ' min' : '-'}</td>
            <td>${sentimentIcons[comm.sentiment]} ${comm.sentiment}</td>
            <td>${comm.followup || '-'}</td>
            <td>
                <button class="btn btn-small btn-outline" onclick="viewCommunication(${comm.id})">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function showCommTab(tab) {
    document.querySelectorAll('.comm-tab').forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline');
    });
    document.querySelector(`.comm-tab[data-tab="${tab}"]`).classList.remove('btn-outline');
    document.querySelector(`.comm-tab[data-tab="${tab}"]`).classList.add('btn-primary');
    
    const filter = tab === 'calls' ? 'call' : tab === 'emails' ? 'email' : tab === 'meetings' ? 'meeting' : 'all';
    loadCommunications(filter);
}

function showLogCallModal() {
    populateInvestorDropdowns();
    document.getElementById('logCallModal').style.display = 'flex';
}

function showComposeEmailModal() {
    populateInvestorDropdowns();
    document.getElementById('composeEmailModal').style.display = 'flex';
}

function saveCall() {
    const investor = document.getElementById('callInvestor').value;
    const type = document.getElementById('callType').value;
    const duration = document.getElementById('callDuration').value;
    const summary = document.getElementById('callSummary').value;
    const sentiment = document.getElementById('callSentiment').value;
    const followup = document.getElementById('callFollowup').value;
    
    if (!investor) {
        alert('Please select an investor');
        return;
    }
    
    const newCall = {
        id: communicationsData.length + 1,
        date: new Date().toISOString().slice(0, 16).replace('T', ' '),
        type: 'call',
        investor: investor,
        subject: type + ' call',
        duration: parseInt(duration),
        sentiment: sentiment,
        followup: followup || null
    };
    
    communicationsData.unshift(newCall);
    closeModal('logCallModal');
    loadCommunications();
    alert('Call logged successfully!');
}

function sendEmail() {
    const to = document.getElementById('emailTo').value;
    const subject = document.getElementById('emailSubject').value;
    const body = document.getElementById('emailBody').value;
    
    if (!to || !subject || !body) {
        alert('Please fill in all fields');
        return;
    }
    
    const newEmail = {
        id: communicationsData.length + 1,
        date: new Date().toISOString().slice(0, 16).replace('T', ' '),
        type: 'email',
        investor: to,
        subject: subject,
        duration: null,
        sentiment: 'positive',
        followup: null
    };
    
    communicationsData.unshift(newEmail);
    closeModal('composeEmailModal');
    loadCommunications();
    alert('Email sent successfully!');
}

function viewCommunication(id) {
    const comm = communicationsData.find(c => c.id === id);
    if (comm) {
        alert(`${comm.type.toUpperCase()}: ${comm.investor}\n\nDate: ${comm.date}\nSubject: ${comm.subject}\nDuration: ${comm.duration || 'N/A'}\nSentiment: ${comm.sentiment}\nFollow-up: ${comm.followup || 'None'}`);
    }
}

function filterCommunications() {
    // Implement search and filter
    loadCommunications();
}

// ============================================
// DISTRIBUTIONS DATA & FUNCTIONS
// ============================================

const distributionsData = [
    { id: 1, period: 'Q4 2025', property: 'mckenzie', propertyName: 'McKenzie STL', amount: 892450, investors: 187, date: '2026-01-15', coc: 8.1, status: 'complete' },
    { id: 2, period: 'Q4 2025', property: 'legacy', propertyName: 'Legacy Townhomes', amount: 654230, investors: 142, date: '2026-01-15', coc: 7.5, status: 'complete' },
    { id: 3, period: 'Q4 2025', property: 'reserve', propertyName: 'The Reserve', amount: 723890, investors: 156, date: '2026-01-15', coc: 7.8, status: 'complete' },
    { id: 4, period: 'Q4 2025', property: 'winding-springs', propertyName: 'Winding Springs', amount: 529430, investors: 138, date: '2026-01-15', coc: 6.9, status: 'complete' },
    { id: 5, period: 'Q3 2025', property: 'mckenzie', propertyName: 'McKenzie STL', amount: 856320, investors: 185, date: '2025-10-15', coc: 7.9, status: 'complete' },
    { id: 6, period: 'Q3 2025', property: 'legacy', propertyName: 'Legacy Townhomes', amount: 621450, investors: 140, date: '2025-10-15', coc: 7.3, status: 'complete' }
];

function loadDistributions(propertyFilter = 'all') {
    const container = document.getElementById('distributionsList');
    if (!container) return;
    
    let data = distributionsData;
    if (propertyFilter !== 'all') {
        data = data.filter(d => d.property === propertyFilter);
    }
    
    container.innerHTML = data.map(dist => `
        <tr>
            <td>${dist.period}</td>
            <td>${dist.propertyName}</td>
            <td><strong>${formatCurrency(dist.amount)}</strong></td>
            <td>${dist.investors}</td>
            <td>${dist.date}</td>
            <td>${dist.coc}%</td>
            <td><span class="status-badge active">✅ Complete</span></td>
            <td>
                <button class="btn btn-small btn-outline" onclick="viewDistribution(${dist.id})">
                    <i class="fas fa-eye"></i> View
                </button>
            </td>
        </tr>
    `).join('');
    
    // Load property performance cards
    loadPropertyDistributions();
}

function loadPropertyDistributions() {
    const container = document.getElementById('propertyDistributions');
    if (!container) return;
    
    const properties = ['mckenzie', 'legacy', 'reserve', 'winding-springs'];
    const totals = {};
    
    properties.forEach(prop => {
        const propDists = distributionsData.filter(d => d.property === prop);
        totals[prop] = propDists.reduce((sum, d) => sum + d.amount, 0);
    });
    
    const maxTotal = Math.max(...Object.values(totals));
    
    container.innerHTML = CS3Data.properties.filter(p => ['mckenzie', 'legacy', 'reserve', 'winding-springs'].includes(p.id)).map(prop => `
        <div class="card" style="padding: 20px;">
            <h4 style="margin-bottom: 12px;">${prop.name}</h4>
            <div style="font-size: 28px; font-weight: 700; color: var(--cs3-teal); margin-bottom: 4px;">${formatCurrency(totals[prop.id] || 0)}</div>
            <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">${prop.coC}% CoC</div>
            <div class="chart-bar-h">
                <div class="chart-fill-h success" style="width: ${((totals[prop.id] || 0) / maxTotal * 100)}%;"></div>
            </div>
        </div>
    `).join('');
}

function filterDistributions() {
    const filter = document.getElementById('distPropertyFilter').value;
    loadDistributions(filter);
}

function viewDistribution(id) {
    const dist = distributionsData.find(d => d.id === id);
    if (dist) {
        alert(`Distribution: ${dist.period} - ${dist.propertyName}\n\nAmount: ${formatCurrency(dist.amount)}\nInvestors: ${dist.investors}\nCoC: ${dist.coc}%\nProcessed: ${dist.date}`);
    }
}

function showProcessDistributionModal() {
    alert('Distribution processing coming soon!');
}

// ============================================
// TASKS DATA & FUNCTIONS
// ============================================

const tasksData = [
    { id: 1, title: 'Follow up with Pacific Trust Fund', investor: 'Pacific Trust Fund', type: 'call', priority: 'high', dueDate: '2026-02-04', status: 'pending', notes: 'Discuss Q1 investment plans' },
    { id: 2, title: 'Send Winding Springs update to Chen Family', investor: 'Chen Family Office', type: 'email', priority: 'medium', dueDate: '2026-02-05', status: 'pending', notes: '' },
    { id: 3, title: 'Review Smith Holdings subscription docs', investor: 'Smith Holdings LLC', type: 'document', priority: 'high', dueDate: '2026-02-03', status: 'overdue', notes: 'Check entity structure' },
    { id: 4, title: 'Schedule meeting with Johnson Capital', investor: 'Johnson Capital', type: 'meeting', priority: 'medium', dueDate: '2026-02-06', status: 'pending', notes: '' },
    { id: 5, title: 'Collect W-9 from Robert Chen', investor: 'Robert Chen', type: 'document', priority: 'high', dueDate: '2026-02-02', status: 'overdue', notes: 'Sent 2 reminders already' },
    { id: 6, title: 'Send welcome email to Maria Garcia', investor: 'Maria Garcia', type: 'email', priority: 'low', dueDate: '2026-02-04', status: 'completed', notes: '' },
    { id: 7, title: 'Prepare pre-call brief for Williams Group', investor: 'Williams Group', type: 'other', priority: 'medium', dueDate: '2026-02-07', status: 'pending', notes: '' },
    { id: 8, title: 'Process Lisa Thompson accreditation renewal', investor: 'Lisa Thompson', type: 'document', priority: 'high', dueDate: '2026-02-03', status: 'overdue', notes: 'Expiring in 2 weeks' }
];

function loadTasks(filter = 'all') {
    const container = document.getElementById('tasksList');
    if (!container) return;
    
    const today = new Date().toISOString().split('T')[0];
    const weekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    let data = tasksData;
    
    switch(filter) {
        case 'overdue':
            data = data.filter(t => t.status === 'overdue' || (t.status === 'pending' && t.dueDate < today));
            break;
        case 'today':
            data = data.filter(t => t.dueDate === today && t.status !== 'completed');
            break;
        case 'week':
            data = data.filter(t => t.dueDate <= weekFromNow && t.status !== 'completed');
            break;
        case 'completed':
            data = data.filter(t => t.status === 'completed');
            break;
    }
    
    const typeIcons = {
        'call': '📞',
        'email': '📧',
        'meeting': '🎥',
        'document': '📄',
        'other': '📌'
    };
    
    const priorityColors = {
        'high': 'var(--danger)',
        'medium': 'var(--warning)',
        'low': 'var(--success)'
    };
    
    container.innerHTML = data.length === 0 ? '<p style="color: var(--text-secondary); text-align: center; padding: 40px;">No tasks found</p>' : data.map(task => {
        const isOverdue = task.status === 'overdue' || (task.status === 'pending' && task.dueDate < today);
        const isCompleted = task.status === 'completed';
        
        return `
            <div class="task-item ${isOverdue ? 'overdue' : ''} ${isCompleted ? 'completed' : ''}">
                <input type="checkbox" class="task-checkbox" ${isCompleted ? 'checked' : ''} onchange="toggleTask(${task.id})">
                <div class="task-content">
                    <div class="task-title">${task.title}</div>
                    <div class="task-meta">
                        <span>${typeIcons[task.type]} ${task.type}</span>
                        <span style="color: ${priorityColors[task.priority]};">● ${task.priority}</span>
                        <span>📅 ${task.dueDate}</span>
                        ${task.investor ? `<span>👤 ${task.investor}</span>` : ''}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="btn btn-small btn-outline" onclick="editTask(${task.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-small btn-outline" onclick="deleteTask(${task.id})" style="color: var(--danger);">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    // Update stats
    updateTaskStats();
}

function updateTaskStats() {
    const today = new Date().toISOString().split('T')[0];
    const weekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const overdue = tasksData.filter(t => t.status === 'overdue' || (t.status === 'pending' && t.dueDate < today)).length;
    const dueToday = tasksData.filter(t => t.dueDate === today && t.status !== 'completed').length;
    const dueWeek = tasksData.filter(t => t.dueDate <= weekFromNow && t.status !== 'completed').length;
    const completed = tasksData.filter(t => t.status === 'completed').length;
    
    document.getElementById('taskOverdue').textContent = overdue;
    document.getElementById('taskToday').textContent = dueToday;
    document.getElementById('taskWeek').textContent = dueWeek;
    document.getElementById('taskCompleted').textContent = completed;
}

function filterTasks(filter) {
    document.querySelectorAll('.task-filter').forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline');
    });
    document.querySelector(`.task-filter[data-filter="${filter}"]`).classList.remove('btn-outline');
    document.querySelector(`.task-filter[data-filter="${filter}"]`).classList.add('btn-primary');
    
    loadTasks(filter);
}

function showAddTaskModal() {
    populateInvestorDropdowns();
    document.getElementById('taskDueDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('addTaskModal').style.display = 'flex';
}

function saveTask() {
    const title = document.getElementById('taskTitle').value;
    const investor = document.getElementById('taskInvestor').value;
    const type = document.getElementById('taskType').value;
    const priority = document.getElementById('taskPriority').value;
    const dueDate = document.getElementById('taskDueDate').value;
    const notes = document.getElementById('taskNotes').value;
    
    if (!title || !dueDate) {
        alert('Please fill in required fields');
        return;
    }
    
    const newTask = {
        id: tasksData.length + 1,
        title: title,
        investor: investor || null,
        type: type,
        priority: priority,
        dueDate: dueDate,
        status: 'pending',
        notes: notes
    };
    
    tasksData.unshift(newTask);
    closeModal('addTaskModal');
    loadTasks();
    alert('Task added!');
}

function toggleTask(id) {
    const task = tasksData.find(t => t.id === id);
    if (task) {
        task.status = task.status === 'completed' ? 'pending' : 'completed';
        loadTasks();
    }
}

function editTask(id) {
    alert('Edit task coming soon!');
}

function deleteTask(id) {
    if (confirm('Delete this task?')) {
        const index = tasksData.findIndex(t => t.id === id);
        if (index > -1) {
            tasksData.splice(index, 1);
            loadTasks();
        }
    }
}

// ============================================
// REPORTS FUNCTIONS
// ============================================

function loadReports() {
    loadTopInvestors();
}

function loadTopInvestors() {
    const container = document.getElementById('topInvestorsList');
    if (!container) return;
    
    const sorted = [...CS3Data.investors].sort((a, b) => b.totalInvested - a.totalInvested).slice(0, 5);
    const medals = ['🥇', '🥈', '🥉', '4', '5'];
    
    container.innerHTML = sorted.map((inv, i) => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--bg-primary); border-radius: 8px; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 20px; width: 30px; text-align: center;">${medals[i]}</span>
                <span style="font-weight: 500;">${inv.name}</span>
            </div>
            <span style="font-weight: 700; color: var(--cs3-teal);">${formatCurrency(inv.totalInvested)}</span>
        </div>
    `).join('');
}

function exportReport() {
    alert('Report export coming soon!');
}

// ============================================
// HELPER: Populate Investor Dropdowns
// ============================================

function populateInvestorDropdowns() {
    const dropdowns = ['callInvestor', 'emailTo', 'taskInvestor'];
    
    dropdowns.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            const firstOption = el.options[0].outerHTML;
            el.innerHTML = firstOption + CS3Data.investors.map(inv => 
                `<option value="${inv.name}">${inv.name}</option>`
            ).join('');
        }
    });
}

// ============================================
// GEMINI AI FUNCTIONS
// ============================================

function openGeminiChat() {
    document.getElementById('geminiModal').style.display = 'flex';
}

function sendToGemini() {
    const input = document.getElementById('geminiInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    const chatHistory = document.getElementById('geminiChatHistory');
    
    // Add user message
    chatHistory.innerHTML += `
        <div style="background: var(--cs3-teal); color: white; padding: 12px 16px; border-radius: 12px; margin-bottom: 12px; margin-left: 40px;">
            ${message}
        </div>
    `;
    
    input.value = '';
    
    // Simulate AI response (in production, this would call Gemini API)
    setTimeout(() => {
        const responses = [
            "Based on your investor data, I recommend focusing on the 15 investors who haven't been contacted in 60+ days. Would you like me to draft a re-engagement email template?",
            "Looking at your pipeline, you have $2.1M in committed capital that hasn't been funded yet. I suggest prioritizing follow-ups with those investors.",
            "Your current capital raise is at 68% of goal. Based on historical patterns, you might want to increase outreach to your referral network.",
            "I've analyzed the sentiment from recent calls - 94% positive. Great work! The most common topics discussed were distribution timing and new opportunities."
        ];
        
        const response = responses[Math.floor(Math.random() * responses.length)];
        
        chatHistory.innerHTML += `
            <div class="ai-message" style="background: #f0f4f8; padding: 16px; border-radius: 12px; margin-bottom: 12px;">
                <p>🤖 ${response}</p>
            </div>
        `;
        
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }, 1000);
    
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function geminiQuickAction(action) {
    const input = document.getElementById('geminiInput');
    
    switch(action) {
        case 'precall':
            input.value = 'Generate a pre-call brief for my next scheduled investor call';
            break;
        case 'email':
            input.value = 'Draft a follow-up email for an investor who expressed interest in Winding Springs';
            break;
        case 'insights':
            input.value = 'What insights can you give me about my current investor pipeline?';
            break;
    }
    
    sendToGemini();
}

function createReengagementCampaign() {
    alert('Creating re-engagement campaign for 15 dormant investors...\n\nThis would:\n1. Generate personalized email templates\n2. Schedule follow-up calls\n3. Track engagement metrics');
}

function viewHighPotential() {
    alert('High Potential Investors:\n\n1. Pacific Trust Fund - Interested in +$500K\n2. Chen Family Office - Interested in +$300K\n3. Smith Holdings - Interested in +$400K\n4. Johnson Capital - Interested in +$250K\n...\n\nTotal Potential: $2.4M');
}
