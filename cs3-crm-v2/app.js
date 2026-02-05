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
    
    // REAL INVESTORS - Loaded from cs3-real-investors.js
    // 450 investors, $74M+ total capital
    // source: 'aspire' = Aspire Community investor, 'cs3' = CS3 direct investor
    investors: (typeof CS3RealInvestors !== 'undefined') ? CS3RealInvestors : [
        // Fallback sample data if real data not loaded
        { id: 1, name: 'Carlos Salguero', email: 'carlos@cs3investments.com', totalInvested: 4439750, properties: ['McKenzie', 'Winding Springs', 'Reserve', 'Legacy Townhomes', 'Legends', 'Lakeland', 'Gateway Village'], dealCount: 7, type: 'individual', status: 'funded', source: 'cs3', tier: 'vip' }
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

async function sendToGemini() {
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
    
    // Show loading indicator
    const loadingId = 'loading-' + Date.now();
    chatHistory.innerHTML += `
        <div id="${loadingId}" style="background: #f0f4f8; padding: 16px; border-radius: 12px; margin-bottom: 12px;">
            <p>🤖 <em>Thinking...</em></p>
        </div>
    `;
    chatHistory.scrollTop = chatHistory.scrollHeight;
    
    try {
        // Call REAL Gemini API via Worker
        const response = await fetch('https://jesus-dashboard-worker.throbbing-mode-0605.workers.dev/gemini', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        
        const data = await response.json();
        
        // Remove loading indicator
        document.getElementById(loadingId)?.remove();
        
        if (data.success && data.response) {
            // Format the response (convert markdown-style formatting)
            const formattedResponse = data.response
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\n/g, '<br>');
            
            chatHistory.innerHTML += `
                <div class="ai-message" style="background: linear-gradient(135deg, #f0f4f8, #e8f4f8); padding: 16px; border-radius: 12px; margin-bottom: 12px; border-left: 4px solid #4285f4;">
                    <div style="font-size: 11px; color: #4285f4; margin-bottom: 8px; font-weight: 500;">✨ Gemini 2.0 Flash</div>
                    <p style="margin: 0; line-height: 1.6;">${formattedResponse}</p>
                </div>
            `;
        } else {
            chatHistory.innerHTML += `
                <div class="ai-message" style="background: #fef2f2; padding: 16px; border-radius: 12px; margin-bottom: 12px; border-left: 4px solid #ef4444;">
                    <p>❌ Error: ${data.error || 'Failed to get response'}</p>
                </div>
            `;
        }
    } catch (error) {
        document.getElementById(loadingId)?.remove();
        chatHistory.innerHTML += `
            <div class="ai-message" style="background: #fef2f2; padding: 16px; border-radius: 12px; margin-bottom: 12px; border-left: 4px solid #ef4444;">
                <p>❌ Connection error: ${error.message}</p>
            </div>
        `;
    }
    
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

// ============================================
// CRM AI FUNCTIONS (CS3 Context-Aware)
// ============================================

function openCrmAiChat() {
    // Create modal if it doesn't exist
    let modal = document.getElementById('crmAiModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'crmAiModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 700px; height: 80vh;">
                <div class="modal-header" style="background: linear-gradient(135deg, #004f59, #00838f);">
                    <h2 style="color: white;"><i class="fas fa-building"></i> CRM AI - CS3 Assistant</h2>
                    <button class="close-btn" onclick="closeCrmAiChat()" style="color: white;">&times;</button>
                </div>
                <div class="modal-body" style="display: flex; flex-direction: column; height: calc(100% - 140px); padding: 0;">
                    <div id="crmAiChatHistory" style="flex: 1; overflow-y: auto; padding: 20px;">
                        <div style="background: linear-gradient(135deg, #e0f7fa, #b2ebf2); padding: 16px; border-radius: 12px; margin-bottom: 12px; border-left: 4px solid #004f59;">
                            <p style="margin: 0;">👋 Hi! I'm your <strong>CS3 CRM AI</strong>. I know everything about your investors, properties, and capital raises. Ask me:</p>
                            <ul style="margin: 10px 0 0 20px; padding: 0;">
                                <li>Give me a summary of our investors</li>
                                <li>How is the Winding Springs raise going?</li>
                                <li>Who are our VIP investors?</li>
                                <li>What's our repeat investor rate?</li>
                            </ul>
                        </div>
                    </div>
                    <div style="padding: 16px; border-top: 1px solid #e5e7eb; background: #f9fafb;">
                        <div style="display: flex; gap: 10px;">
                            <input type="text" id="crmAiInput" class="form-input" placeholder="Ask about CS3 data..." style="flex: 1;" onkeypress="if(event.key==='Enter')sendToCrmAi()">
                            <button class="btn btn-primary" onclick="sendToCrmAi()" style="background: linear-gradient(135deg, #004f59, #00838f);">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                        <div style="display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap;">
                            <button class="btn btn-small btn-outline" onclick="crmAiQuickAction('summary')">📊 Investor Summary</button>
                            <button class="btn btn-small btn-outline" onclick="crmAiQuickAction('raise')">💰 Raise Status</button>
                            <button class="btn btn-small btn-outline" onclick="crmAiQuickAction('vip')">👑 VIP Investors</button>
                            <button class="btn btn-small btn-outline" onclick="crmAiQuickAction('metrics')">📈 Key Metrics</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    modal.style.display = 'flex';
}

function closeCrmAiChat() {
    document.getElementById('crmAiModal').style.display = 'none';
}

async function sendToCrmAi() {
    const input = document.getElementById('crmAiInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    const chatHistory = document.getElementById('crmAiChatHistory');
    
    // Add user message
    chatHistory.innerHTML += `
        <div style="background: #004f59; color: white; padding: 12px 16px; border-radius: 12px; margin-bottom: 12px; margin-left: 40px;">
            ${message}
        </div>
    `;
    
    input.value = '';
    
    // Show loading indicator
    const loadingId = 'crm-loading-' + Date.now();
    chatHistory.innerHTML += `
        <div id="${loadingId}" style="background: #e0f7fa; padding: 16px; border-radius: 12px; margin-bottom: 12px; border-left: 4px solid #004f59;">
            <p>🏢 <em>Analyzing CS3 data...</em></p>
        </div>
    `;
    chatHistory.scrollTop = chatHistory.scrollHeight;
    
    // Gather REAL CRM data to send to AI
    const crmData = gatherCrmData();
    
    try {
        // Call CRM AI endpoint with REAL data
        const response = await fetch('https://jesus-dashboard-worker.throbbing-mode-0605.workers.dev/crm-ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, crmData })
        });
        
        const data = await response.json();
        
        // Remove loading indicator
        document.getElementById(loadingId)?.remove();
        
        if (data.success && data.response) {
            // Format the response
            const formattedResponse = data.response
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\n/g, '<br>');
            
            chatHistory.innerHTML += `
                <div style="background: linear-gradient(135deg, #e0f7fa, #b2ebf2); padding: 16px; border-radius: 12px; margin-bottom: 12px; border-left: 4px solid #004f59;">
                    <div style="font-size: 11px; color: #004f59; margin-bottom: 8px; font-weight: 500;">🏢 CS3 CRM AI</div>
                    <p style="margin: 0; line-height: 1.6;">${formattedResponse}</p>
                </div>
            `;
        } else {
            chatHistory.innerHTML += `
                <div style="background: #fef2f2; padding: 16px; border-radius: 12px; margin-bottom: 12px; border-left: 4px solid #ef4444;">
                    <p>❌ Error: ${data.error || 'Failed to get response'}</p>
                </div>
            `;
        }
    } catch (error) {
        document.getElementById(loadingId)?.remove();
        chatHistory.innerHTML += `
            <div style="background: #fef2f2; padding: 16px; border-radius: 12px; margin-bottom: 12px; border-left: 4px solid #ef4444;">
                <p>❌ Connection error: ${error.message}</p>
            </div>
        `;
    }
    
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function crmAiQuickAction(action) {
    const input = document.getElementById('crmAiInput');
    
    switch(action) {
        case 'summary':
            input.value = 'Give me a summary of our investors and their distribution across tiers';
            break;
        case 'raise':
            input.value = 'How is the Winding Springs capital raise going? What percentage are we at?';
            break;
        case 'vip':
            input.value = 'Who are our VIP investors and how much capital do they represent?';
            break;
        case 'metrics':
            input.value = 'What are our key metrics? Average investment, repeat rate, referral conversions?';
            break;
    }
    
    sendToCrmAi();
}

// Gather REAL data from CRM to send to AI
function gatherCrmData() {
    // Get investors data
    const investors = CS3Data.investors || [];
    const properties = CS3Data.properties || [];
    const raiseInvestors = CS3Data.raiseInvestors || [];
    
    // Calculate real stats
    const totalInvestors = investors.length;
    const totalInvested = investors.reduce((sum, inv) => sum + (inv.totalInvested || 0), 0);
    const avgInvestment = totalInvestors > 0 ? totalInvested / totalInvestors : 0;
    
    // ASPIRE vs CS3 breakdown
    const aspireInvestors = investors.filter(inv => inv.source === 'aspire');
    const cs3Investors = investors.filter(inv => inv.source === 'cs3');
    
    const aspireStats = {
        count: aspireInvestors.length,
        totalRaise: aspireInvestors.reduce((sum, inv) => sum + (inv.totalInvested || 0), 0),
        avgInvestment: aspireInvestors.length > 0 ? aspireInvestors.reduce((sum, inv) => sum + (inv.totalInvested || 0), 0) / aspireInvestors.length : 0
    };
    
    const cs3Stats = {
        count: cs3Investors.length,
        totalRaise: cs3Investors.reduce((sum, inv) => sum + (inv.totalInvested || 0), 0),
        avgInvestment: cs3Investors.length > 0 ? cs3Investors.reduce((sum, inv) => sum + (inv.totalInvested || 0), 0) / cs3Investors.length : 0
    };
    
    // Calculate tier breakdown
    const tiers = {
        firstTime: investors.filter(inv => (inv.dealCount || 1) === 1),
        repeat: investors.filter(inv => (inv.dealCount || 1) >= 2 && (inv.dealCount || 1) <= 3),
        loyal: investors.filter(inv => (inv.dealCount || 1) >= 4 && (inv.dealCount || 1) <= 5),
        vip: investors.filter(inv => (inv.dealCount || 1) >= 6)
    };
    
    // Get current raise data (Winding Springs)
    const windingSprings = properties.find(p => p.id === 'winding-springs');
    const raiseData = windingSprings?.raise || { goal: 0, committed: 0, collected: 0 };
    
    // Get partnership data from inputs if they exist
    const aspireAmount = parseFloat(document.getElementById('aspireAmount')?.value?.replace(/[$,]/g, '') || 0);
    const cs3Amount = parseFloat(document.getElementById('cs3Amount')?.value?.replace(/[$,]/g, '') || 0);
    
    // Build comprehensive data object
    return {
        overview: {
            totalInvestors,
            totalInvested,
            avgInvestment,
            totalUnits: properties.reduce((sum, p) => sum + (p.units || 0), 0),
            totalProperties: properties.length
        },
        // ASPIRE vs CS3 Stats
        aspireStats,
        cs3Stats,
        investors: investors.map(inv => ({
            name: inv.name,
            email: inv.email,
            totalInvested: inv.totalInvested,
            dealCount: inv.dealCount || inv.properties?.length || 1,
            type: inv.type,
            source: inv.source || 'cs3', // aspire or cs3
            properties: inv.properties
        })),
        tiers: {
            firstTime: { count: tiers.firstTime.length, capital: tiers.firstTime.reduce((s, i) => s + i.totalInvested, 0) },
            repeat: { count: tiers.repeat.length, capital: tiers.repeat.reduce((s, i) => s + i.totalInvested, 0) },
            loyal: { count: tiers.loyal.length, capital: tiers.loyal.reduce((s, i) => s + i.totalInvested, 0) },
            vip: { count: tiers.vip.length, capital: tiers.vip.reduce((s, i) => s + i.totalInvested, 0) }
        },
        properties: properties.map(p => ({
            name: p.name,
            location: p.location,
            units: p.units,
            status: p.status,
            aum: p.aum,
            investors: p.investors,
            coC: p.coC
        })),
        currentRaise: {
            property: 'Winding Springs',
            goal: raiseData.goal,
            committed: raiseData.committed,
            collected: raiseData.collected,
            percentComplete: raiseData.goal > 0 ? ((raiseData.collected / raiseData.goal) * 100).toFixed(1) : 0,
            investorsInRaise: raiseInvestors.length
        },
        partnership: {
            aspire: aspireAmount,
            cs3: cs3Amount,
            total: aspireAmount + cs3Amount
        },
        referrals: {
            total: ReferralsData?.stats?.total || 0,
            converted: ReferralsData?.stats?.converted || 0,
            capital: ReferralsData?.stats?.capital || 0
        }
    };
}

// ============================================
// PARTNERSHIP TRACKING (Aspire Community + CS3)
// ============================================

const PartnershipData = {
    aspire: { amount: 3200000, investors: 28 },
    cs3: { amount: 3600000, investors: 32 }
};

function recalculatePartnership() {
    // Parse input values
    const aspireInput = document.getElementById('aspireAmount');
    const cs3Input = document.getElementById('cs3Amount');
    
    let aspireAmount = parseFloat(aspireInput.value.replace(/[$,]/g, '')) || 0;
    let cs3Amount = parseFloat(cs3Input.value.replace(/[$,]/g, '')) || 0;
    
    const total = aspireAmount + cs3Amount;
    const aspirePercent = total > 0 ? ((aspireAmount / total) * 100).toFixed(1) : 0;
    const cs3Percent = total > 0 ? ((cs3Amount / total) * 100).toFixed(1) : 0;
    
    // Update displays
    document.getElementById('aspirePercent').textContent = `${aspirePercent}% of total raise`;
    document.getElementById('cs3Percent').textContent = `${cs3Percent}% of total raise`;
    document.getElementById('totalPartnership').textContent = formatCurrency(total);
    
    // Update progress bars
    document.getElementById('aspireBar').style.width = `${aspirePercent}%`;
    document.getElementById('aspireBar').textContent = `Aspire ${aspirePercent}%`;
    document.getElementById('cs3Bar').style.width = `${cs3Percent}%`;
    document.getElementById('cs3Bar').textContent = `CS3 ${cs3Percent}%`;
    
    // Save to local storage
    PartnershipData.aspire.amount = aspireAmount;
    PartnershipData.cs3.amount = cs3Amount;
    saveToLocalStorage('partnershipData', PartnershipData);
    
    // Show save confirmation
    showSaveIndicator();
}

function recalculateCapital() {
    const retirementInput = document.getElementById('retirementAmount');
    const cashInput = document.getElementById('cashAmount');
    
    let retirementAmount = parseFloat(retirementInput.value.replace(/[$,]/g, '')) || 0;
    let cashAmount = parseFloat(cashInput.value.replace(/[$,]/g, '')) || 0;
    
    const total = retirementAmount + cashAmount;
    const retirementPercent = total > 0 ? ((retirementAmount / total) * 100).toFixed(0) : 0;
    const cashPercent = total > 0 ? ((cashAmount / total) * 100).toFixed(0) : 0;
    
    // Update details
    document.getElementById('retirementDetail').textContent = `${retirementPercent}% of collected • 18 investors`;
    document.getElementById('cashDetail').textContent = `${cashPercent}% of collected • 42 investors`;
    
    // Save
    saveToLocalStorage('capitalBreakdown', { retirement: retirementAmount, cash: cashAmount });
    showSaveIndicator();
}

// ============================================
// REFERRALS DATA & FUNCTIONS
// ============================================

const ReferralsData = {
    stats: { total: 47, converted: 28, capital: 8400000 },
    topReferrers: [
        { id: 1, name: 'John Smith', referrals: 7, converted: 5, capital: 1250000, lastReferral: '2026-01-28' },
        { id: 2, name: 'Pacific Trust Fund', referrals: 5, converted: 4, capital: 950000, lastReferral: '2026-01-15' },
        { id: 3, name: 'Chen Family Office', referrals: 4, converted: 3, capital: 720000, lastReferral: '2026-01-20' },
        { id: 4, name: 'Maria Garcia', referrals: 4, converted: 3, capital: 680000, lastReferral: '2026-02-01' },
        { id: 5, name: 'Robert Chen', referrals: 3, converted: 2, capital: 450000, lastReferral: '2025-12-15' }
    ],
    allReferrals: [
        { id: 1, referredBy: 'John Smith', name: 'Michael Johnson', email: 'mjohnson@email.com', phone: '(555) 123-4567', status: 'converted', interest: 'high', date: '2026-01-28', investment: 250000 },
        { id: 2, referredBy: 'John Smith', name: 'Sarah Williams', email: 'swilliams@email.com', phone: '(555) 234-5678', status: 'interested', interest: 'medium', date: '2026-01-25', investment: 0 },
        { id: 3, referredBy: 'Pacific Trust', name: 'David Lee', email: 'dlee@company.com', phone: '(555) 345-6789', status: 'converted', interest: 'high', date: '2026-01-20', investment: 350000 },
        { id: 4, referredBy: 'Maria Garcia', name: 'Jennifer Chen', email: 'jchen@email.com', phone: '(555) 456-7890', status: 'contacted', interest: 'medium', date: '2026-02-01', investment: 0 },
        { id: 5, referredBy: 'Chen Family', name: 'Andrew Taylor', email: 'ataylor@business.com', phone: '(555) 567-8901', status: 'new', interest: 'low', date: '2026-02-03', investment: 0 },
        { id: 6, referredBy: 'Robert Chen', name: 'Michelle Brown', email: 'mbrown@email.com', phone: '(555) 678-9012', status: 'converted', interest: 'high', date: '2025-12-15', investment: 150000 },
        { id: 7, referredBy: 'John Smith', name: 'Christopher Davis', email: 'cdavis@corp.com', phone: '(555) 789-0123', status: 'declined', interest: 'low', date: '2025-11-28', investment: 0 }
    ]
};

function loadReferrals() {
    loadTopReferrers();
    loadAllReferrals();
}

function loadTopReferrers() {
    const container = document.getElementById('topReferrersList');
    if (!container) return;
    
    const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
    
    container.innerHTML = ReferralsData.topReferrers.map((ref, i) => `
        <tr>
            <td style="font-size: 20px;">${medals[i]}</td>
            <td><strong>${ref.name}</strong></td>
            <td style="text-align: center;"><span class="badge">${ref.referrals}</span></td>
            <td style="text-align: center;"><span class="badge success">${ref.converted}</span></td>
            <td style="font-weight: 600; color: var(--cs3-teal);">${formatCurrency(ref.capital)}</td>
            <td>${ref.lastReferral}</td>
            <td>
                <button class="btn btn-small btn-outline" onclick="thankReferrer('${ref.name}')"><i class="fas fa-gift"></i></button>
                <button class="btn btn-small btn-outline" onclick="viewReferrerDetails('${ref.id}')"><i class="fas fa-eye"></i></button>
            </td>
        </tr>
    `).join('');
}

function loadAllReferrals() {
    const container = document.getElementById('allReferralsList');
    if (!container) return;
    
    const statusColors = {
        'new': 'warning',
        'contacted': 'info',
        'interested': 'primary',
        'converted': 'success',
        'declined': 'danger'
    };
    
    const interestIcons = {
        'high': '🔥',
        'medium': '⭐',
        'low': '❄️'
    };
    
    container.innerHTML = ReferralsData.allReferrals.map(ref => `
        <tr>
            <td>${ref.referredBy}</td>
            <td><strong>${ref.name}</strong></td>
            <td>${ref.email}</td>
            <td>${ref.phone}</td>
            <td><span class="badge ${statusColors[ref.status]}">${ref.status.toUpperCase()}</span></td>
            <td style="text-align: center;">${interestIcons[ref.interest]} ${ref.interest}</td>
            <td>${ref.date}</td>
            <td style="font-weight: 600; color: var(--cs3-teal);">${ref.investment > 0 ? formatCurrency(ref.investment) : '-'}</td>
            <td>
                <button class="btn btn-small btn-outline" onclick="editReferral(${ref.id})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-small btn-outline" onclick="contactReferral(${ref.id})"><i class="fas fa-phone"></i></button>
            </td>
        </tr>
    `).join('');
}

function filterReferrals() {
    const search = document.getElementById('referralSearch')?.value.toLowerCase() || '';
    const status = document.getElementById('referralStatusFilter')?.value || 'all';
    
    const filtered = ReferralsData.allReferrals.filter(ref => {
        const matchesSearch = ref.name.toLowerCase().includes(search) || 
                             ref.referredBy.toLowerCase().includes(search) ||
                             ref.email.toLowerCase().includes(search);
        const matchesStatus = status === 'all' || ref.status === status;
        return matchesSearch && matchesStatus;
    });
    
    const container = document.getElementById('allReferralsList');
    if (!container) return;
    
    const statusColors = { 'new': 'warning', 'contacted': 'info', 'interested': 'primary', 'converted': 'success', 'declined': 'danger' };
    const interestIcons = { 'high': '🔥', 'medium': '⭐', 'low': '❄️' };
    
    container.innerHTML = filtered.map(ref => `
        <tr>
            <td>${ref.referredBy}</td>
            <td><strong>${ref.name}</strong></td>
            <td>${ref.email}</td>
            <td>${ref.phone}</td>
            <td><span class="badge ${statusColors[ref.status]}">${ref.status.toUpperCase()}</span></td>
            <td style="text-align: center;">${interestIcons[ref.interest]} ${ref.interest}</td>
            <td>${ref.date}</td>
            <td style="font-weight: 600; color: var(--cs3-teal);">${ref.investment > 0 ? formatCurrency(ref.investment) : '-'}</td>
            <td>
                <button class="btn btn-small btn-outline" onclick="editReferral(${ref.id})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-small btn-outline" onclick="contactReferral(${ref.id})"><i class="fas fa-phone"></i></button>
            </td>
        </tr>
    `).join('');
}

function showAddReferralModal() {
    const html = `
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header">
                <h2><i class="fas fa-share-alt"></i> Log New Referral</h2>
                <button class="close-btn" onclick="closeModal('addReferralModal')">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Referred By *</label>
                    <select id="referredBy" class="form-input">
                        <option value="">Select investor...</option>
                        ${CS3Data.investors.map(inv => `<option value="${inv.name}">${inv.name}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Referral Name *</label>
                    <input type="text" id="referralName" class="form-input" placeholder="Full name">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" id="referralEmail" class="form-input" placeholder="email@example.com">
                    </div>
                    <div class="form-group">
                        <label>Phone</label>
                        <input type="tel" id="referralPhone" class="form-input" placeholder="(555) 123-4567">
                    </div>
                </div>
                <div class="form-group">
                    <label>Interest Level</label>
                    <select id="referralInterest" class="form-input">
                        <option value="high">🔥 High - Ready to invest</option>
                        <option value="medium">⭐ Medium - Interested</option>
                        <option value="low">❄️ Low - Just exploring</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Notes</label>
                    <textarea id="referralNotes" class="form-input" rows="3" placeholder="Any additional context..."></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeModal('addReferralModal')">Cancel</button>
                <button class="btn btn-primary" onclick="saveReferral()"><i class="fas fa-save"></i> Save Referral</button>
            </div>
        </div>
    `;
    
    showDynamicModal('addReferralModal', html);
}

function saveReferral() {
    const referredBy = document.getElementById('referredBy')?.value;
    const name = document.getElementById('referralName')?.value;
    const email = document.getElementById('referralEmail')?.value;
    const phone = document.getElementById('referralPhone')?.value;
    const interest = document.getElementById('referralInterest')?.value;
    const notes = document.getElementById('referralNotes')?.value;
    
    if (!referredBy || !name) {
        alert('Please fill in required fields');
        return;
    }
    
    const newReferral = {
        id: ReferralsData.allReferrals.length + 1,
        referredBy,
        name,
        email,
        phone,
        status: 'new',
        interest,
        date: new Date().toISOString().split('T')[0],
        investment: 0,
        notes
    };
    
    ReferralsData.allReferrals.unshift(newReferral);
    ReferralsData.stats.total++;
    
    // Update display
    document.getElementById('totalReferrals').textContent = ReferralsData.stats.total;
    loadReferrals();
    closeModal('addReferralModal');
    
    alert('✅ Referral saved! AI will auto-generate follow-up tasks.');
}

function thankReferrer(name) {
    alert(`Scheduling thank-you for ${name}...\n\nOptions:\n• Send thank-you email\n• Send gift card ($50-$500)\n• Schedule appreciation call\n• Feature in newsletter`);
}

function viewReferrerDetails(id) {
    const referrer = ReferralsData.topReferrers.find(r => r.id == id);
    if (!referrer) return;
    
    alert(`${referrer.name}\n\n📊 Referral Stats:\n• Total Referrals: ${referrer.referrals}\n• Converted: ${referrer.converted}\n• Capital Generated: ${formatCurrency(referrer.capital)}\n• Last Referral: ${referrer.lastReferral}`);
}

function editReferral(id) {
    const ref = ReferralsData.allReferrals.find(r => r.id == id);
    if (!ref) return;
    
    alert(`Editing ${ref.name}...\n\nThis would open an edit modal for the referral details.`);
}

function contactReferral(id) {
    const ref = ReferralsData.allReferrals.find(r => r.id == id);
    if (!ref) return;
    
    alert(`Contacting ${ref.name}...\n\nOptions:\n• Call: ${ref.phone}\n• Email: ${ref.email}\n• Schedule meeting`);
}

function startReferralCampaign() {
    alert('🚀 Starting Referral Outreach Campaign...\n\nAI will:\n1. Identify 5 high-satisfaction investors\n2. Generate personalized referral ask emails\n3. Schedule follow-up reminders\n4. Track responses automatically');
}

function scheduleThankYou(investorId) {
    alert('📅 Scheduling thank-you for top referrer...\n\nOptions queued:\n• Thank-you email\n• $100 Amazon gift card\n• Personal call from Carlos');
}

// ============================================
// INLINE EDITING & SAVE
// ============================================

function saveEdit(element, fieldId) {
    const value = element.textContent.trim();
    console.log(`Saving ${fieldId}: ${value}`);
    
    // Save to localStorage
    const editData = JSON.parse(localStorage.getItem('cs3EditedData') || '{}');
    editData[fieldId] = value;
    localStorage.setItem('cs3EditedData', JSON.stringify(editData));
    
    showSaveIndicator();
}

function showSaveIndicator() {
    // Create or show save indicator
    let indicator = document.getElementById('saveIndicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'saveIndicator';
        indicator.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background: var(--success); color: white; padding: 12px 20px; border-radius: 8px; font-weight: 500; z-index: 10000; display: none; animation: slideIn 0.3s ease;';
        indicator.innerHTML = '<i class="fas fa-check"></i> Saved';
        document.body.appendChild(indicator);
    }
    
    indicator.style.display = 'block';
    setTimeout(() => indicator.style.display = 'none', 2000);
}

function showDynamicModal(id, html) {
    let modal = document.getElementById(id);
    if (!modal) {
        modal = document.createElement('div');
        modal.id = id;
        modal.className = 'modal';
        modal.style.cssText = 'display: flex; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 10000; align-items: center; justify-content: center;';
        document.body.appendChild(modal);
    }
    modal.innerHTML = html;
    modal.style.display = 'flex';
}

// ============================================
// LOCAL STORAGE HELPERS
// ============================================

function saveToLocalStorage(key, data) {
    localStorage.setItem(`cs3_${key}`, JSON.stringify(data));
}

function loadFromLocalStorage(key) {
    const data = localStorage.getItem(`cs3_${key}`);
    return data ? JSON.parse(data) : null;
}

// Load saved data on init
function loadSavedData() {
    // Load partnership data
    const savedPartnership = loadFromLocalStorage('partnershipData');
    if (savedPartnership) {
        PartnershipData.aspire = savedPartnership.aspire;
        PartnershipData.cs3 = savedPartnership.cs3;
    }
    
    // Load edited fields
    const editData = JSON.parse(localStorage.getItem('cs3EditedData') || '{}');
    Object.keys(editData).forEach(fieldId => {
        const el = document.getElementById(fieldId);
        if (el) {
            if (el.tagName === 'INPUT') {
                el.value = editData[fieldId];
            } else {
                el.textContent = editData[fieldId];
            }
        }
    });
}

// Update navigation to include referrals
const originalLoadPageData = loadPageData;
loadPageData = function(page) {
    if (page === 'referrals') {
        loadReferrals();
    } else {
        originalLoadPageData(page);
    }
};

// Initialize saved data on load
document.addEventListener('DOMContentLoaded', loadSavedData);

// ============================================
// AGENT COMMAND CENTER FUNCTIONS
// ============================================

const AgentData = {
    agents: [
        { id: 'router', name: 'Router Agent', icon: '🧭', status: 'active', actions: 156, description: 'Routes tasks to specialized agents' },
        { id: 'new-lead', name: 'New Lead Agent', icon: '🌱', status: 'active', actions: 12, description: 'Handles new investor inquiries' },
        { id: 'outreach', name: 'Outreach Agent', icon: '📢', status: 'active', actions: 28, description: 'Proactive investor outreach' },
        { id: 'call-prep', name: 'Call Prep Agent', icon: '📋', status: 'active', actions: 8, description: 'Generates pre-call briefs' },
        { id: 'doc-shepherd', name: 'Doc Shepherd', icon: '📄', status: 'warning', actions: 15, description: 'Manages document collection' },
        { id: 'funding-closer', name: 'Funding Closer', icon: '💰', status: 'warning', actions: 6, description: 'Closes committed investments' },
        { id: 'investor-updates', name: 'Investor Updates', icon: '📊', status: 'active', actions: 45, description: 'Sends portfolio updates' },
        { id: 'daily-report', name: 'Daily Report', icon: '📈', status: 'active', actions: 2, description: 'Generates executive reports' },
        { id: 'exec-assistant', name: 'Exec Assistant', icon: '👔', status: 'active', actions: 18, description: 'Supports leadership team' },
        { id: 'prospecting', name: 'Prospecting Agent', icon: '🎯', status: 'active', actions: 22, description: 'Finds new investors' },
        { id: 'referral', name: 'Referral Agent', icon: '🤝', status: 'active', actions: 9, description: 'Manages referral program' },
        { id: 'newsletter', name: 'Newsletter Agent', icon: '📰', status: 'active', actions: 4, description: 'Creates newsletters' }
    ],
    activityLog: []
};

function loadAgents() {
    // Update stats
    const active = AgentData.agents.filter(a => a.status === 'active').length;
    const pending = AgentData.agents.filter(a => a.status === 'warning').length;
    const totalActions = AgentData.agents.reduce((sum, a) => sum + a.actions, 0);
    
    document.getElementById('agentsActive').textContent = active;
    document.getElementById('agentsPending').textContent = pending;
    document.getElementById('agentsTodayActions').textContent = totalActions;
}

function triggerAgent(agentId) {
    const agent = AgentData.agents.find(a => a.id === agentId);
    if (!agent) return;
    
    // Show executing state
    const card = document.querySelector(`.agent-card[data-agent="${agentId}"]`);
    if (card) {
        card.style.boxShadow = '0 0 20px rgba(255,161,0,0.5)';
        setTimeout(() => card.style.boxShadow = '', 2000);
    }
    
    // Simulate agent execution
    const actions = {
        'router': 'Analyzing incoming tasks and routing to appropriate agents...',
        'new-lead': 'Sending welcome sequences to new leads...',
        'outreach': 'Identifying dormant investors and initiating re-engagement...',
        'call-prep': 'Generating pre-call briefs for upcoming meetings...',
        'doc-shepherd': 'Sending W-9 and accreditation reminders...',
        'funding-closer': 'Following up with committed but unfunded investors...',
        'investor-updates': 'Preparing portfolio update emails...',
        'daily-report': 'Generating executive daily report...',
        'exec-assistant': 'Checking calendars and preparing materials...',
        'prospecting': 'Researching potential new investors...',
        'referral': 'Identifying investors for referral requests...',
        'newsletter': 'Drafting next newsletter content...'
    };
    
    alert(`${agent.icon} ${agent.name} Triggered!\n\n${actions[agentId]}\n\nThis will execute via the CRM AI backend.`);
    
    // Log activity
    addAgentActivity(agent.icon, `${agent.name} was manually triggered`);
}

function viewAgentLog(agentId) {
    const agent = AgentData.agents.find(a => a.id === agentId);
    if (!agent) return;
    
    alert(`${agent.icon} ${agent.name} - Activity Log\n\n• Total actions: ${agent.actions}\n• Status: ${agent.status}\n• Description: ${agent.description}\n\nFull log would show recent executions, success rates, and errors.`);
}

function configureAgent(agentId) {
    const agent = AgentData.agents.find(a => a.id === agentId);
    if (!agent) return;
    
    alert(`⚙️ Configure ${agent.name}\n\nSettings:\n• Auto-trigger: ON\n• Schedule: Every 4 hours\n• Notifications: Email + Telegram\n• Max actions per day: 50\n\nFull configuration panel coming soon!`);
}

function refreshAgentStatus() {
    alert('🔄 Refreshing all agent statuses...\n\nConnecting to agent backend to get real-time status.');
    loadAgents();
}

function runAllAgents() {
    alert('🚀 Running All Agents!\n\nThis will trigger all 12 agents in sequence:\n\n1. Router analyzes queue\n2. New Lead welcomes inquiries\n3. Outreach contacts dormant investors\n4. Call Prep generates briefs\n5. Doc Shepherd sends reminders\n6. Funding Closer follows up\n7. Investor Updates sends portfolio news\n8. Daily Report generates summary\n9. Exec Assistant prepares materials\n10. Prospecting researches leads\n11. Referral identifies opportunities\n12. Newsletter drafts content\n\nExecuting via CRM AI...');
}

function executeAgentCommand() {
    const input = document.getElementById('agentCommand');
    const command = input.value.trim();
    
    if (!command) {
        alert('Please enter a command');
        return;
    }
    
    // Route to CRM AI
    alert(`🤖 Executing Command:\n\n"${command}"\n\nRouting to appropriate agent via CRM AI...`);
    
    // Open CRM AI and send command
    openCrmAiChat();
    setTimeout(() => {
        const crmInput = document.getElementById('crmAiInput');
        if (crmInput) {
            crmInput.value = command;
            sendToCrmAi();
        }
    }, 500);
    
    input.value = '';
}

function quickAgentCommand(command) {
    document.getElementById('agentCommand').value = command;
    executeAgentCommand();
}

function addAgentActivity(icon, message) {
    const log = document.getElementById('agentActivityLog');
    if (!log) return;
    
    const entry = document.createElement('div');
    entry.style.cssText = 'display: flex; gap: 12px; padding: 12px; background: var(--bg-primary); border-radius: 8px; margin-bottom: 8px;';
    entry.innerHTML = `
        <span style="font-size: 20px;">${icon}</span>
        <div style="flex: 1;">
            <p style="margin: 0; font-weight: 500;">${message}</p>
            <p style="margin: 0; font-size: 12px; color: var(--text-secondary);">Just now</p>
        </div>
    `;
    log.insertBefore(entry, log.firstChild);
}

function loadAgentActivity() {
    alert('🔄 Loading latest agent activity from backend...');
}

// Update navigation to include agents page
const originalLoadPageDataAgents = loadPageData;
loadPageData = function(page) {
    if (page === 'agents') {
        loadAgents();
    } else if (page === 'referrals') {
        loadReferrals();
    } else {
        originalLoadPageDataAgents(page);
    }
};

// ============================================
// INVESTOR TIER FUNCTIONS
// ============================================

function getInvestorTier(dealCount) {
    if (dealCount >= 6) return { tier: 'vip', icon: '👑', label: 'VIP', color: '#ec4899' };
    if (dealCount >= 4) return { tier: 'loyal', icon: '🌳', label: 'Loyal', color: '#f59e0b' };
    if (dealCount >= 2) return { tier: 'repeat', icon: '🌿', label: 'Repeat', color: '#22c55e' };
    return { tier: 'first-time', icon: '🌱', label: 'First-Time', color: '#0ea5e9' };
}

function filterByTier(tier) {
    navigateTo('investors');
    setTimeout(() => filterInvestorsByTier(tier), 100);
}

function filterInvestorsByTier(tier) {
    // Update button states
    document.querySelectorAll('.tier-filter').forEach(btn => {
        btn.classList.remove('active', 'btn-primary');
        btn.classList.add('btn-outline');
    });
    const activeBtn = document.querySelector(`.tier-filter[data-tier="${tier}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active', 'btn-primary');
        activeBtn.classList.remove('btn-outline');
    }
    
    // Filter and display
    const filtered = tier === 'all' 
        ? CS3Data.investors 
        : CS3Data.investors.filter(inv => getInvestorTier(inv.dealCount || 1).tier === tier);
    
    displayInvestorsWithTier(filtered);
}

function displayInvestorsWithTier(investors) {
    const container = document.getElementById('allInvestorsList');
    if (!container) return;
    
    container.innerHTML = investors.map(inv => {
        const tierInfo = getInvestorTier(inv.dealCount || inv.properties?.length || 1);
        const avgPerDeal = inv.dealCount ? formatCurrency(inv.totalInvested / inv.dealCount) : '-';
        
        return `
            <tr>
                <td><span style="background: ${tierInfo.color}20; color: ${tierInfo.color}; padding: 4px 10px; border-radius: 20px; font-size: 12px;">${tierInfo.icon} ${tierInfo.label}</span></td>
                <td><strong>${inv.name}</strong></td>
                <td>${inv.email}</td>
                <td style="font-weight: 600; color: var(--cs3-teal);">${formatCurrency(inv.totalInvested)}</td>
                <td style="text-align: center;"><span class="badge">${inv.dealCount || inv.properties?.length || 1}</span></td>
                <td>${avgPerDeal}</td>
                <td><span class="badge ${inv.type === 'entity' ? 'primary' : inv.type === 'sdira' ? 'warning' : ''}">${inv.type.toUpperCase()}</span></td>
                <td><span class="badge success">Active</span></td>
                <td>
                    <button class="btn btn-small btn-outline" onclick="viewInvestor(${inv.id})"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-small btn-outline" onclick="editInvestor(${inv.id})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-small btn-outline" onclick="callInvestor('${inv.name}')"><i class="fas fa-phone"></i></button>
                </td>
            </tr>
        `;
    }).join('');
}

function filterInvestors() {
    const search = document.getElementById('investorSearch')?.value.toLowerCase() || '';
    const typeFilter = document.getElementById('investorTypeFilter')?.value || 'all';
    
    const filtered = CS3Data.investors.filter(inv => {
        const matchesSearch = inv.name.toLowerCase().includes(search) || inv.email.toLowerCase().includes(search);
        const matchesType = typeFilter === 'all' || inv.type === typeFilter;
        return matchesSearch && matchesType;
    });
    
    displayInvestorsWithTier(filtered);
}

// Update loadInvestors to use new display function
function loadInvestors() {
    displayInvestorsWithTier(CS3Data.investors);
}

function viewInvestor(id) {
    const inv = CS3Data.investors.find(i => i.id === id);
    if (!inv) return;
    
    const tierInfo = getInvestorTier(inv.dealCount || 1);
    
    alert(`${inv.name}\n\n${tierInfo.icon} ${tierInfo.label} Investor\n\n📊 Investment Summary:\n• Total Invested: ${formatCurrency(inv.totalInvested)}\n• Deals: ${inv.dealCount || inv.properties?.length || 1}\n• Avg per Deal: ${formatCurrency(inv.totalInvested / (inv.dealCount || 1))}\n• Type: ${inv.type.toUpperCase()}\n\n📧 ${inv.email}`);
}

function editInvestor(id) {
    alert(`Opening edit modal for investor ID: ${id}...`);
}

function callInvestor(name) {
    alert(`Initiating call with ${name}...`);
}

// ============================================
// CAPITAL ANALYTICS FUNCTIONS
// ============================================

function followUpPending() {
    alert('📧 Sending follow-up emails to 12 committed investors who haven\'t funded yet...\n\nTotal pending capital: $1.0M\n\nAI will:\n1. Generate personalized follow-up emails\n2. Include funding instructions\n3. Schedule reminder calls');
}

function calculateCapitalAnalytics() {
    const investors = CS3Data.investors;
    const totalInvested = investors.reduce((sum, inv) => sum + inv.totalInvested, 0);
    const avgInvestment = totalInvested / investors.length;
    
    // Calculate tier stats
    const tierStats = {
        'first-time': { count: 0, capital: 0 },
        'repeat': { count: 0, capital: 0 },
        'loyal': { count: 0, capital: 0 },
        'vip': { count: 0, capital: 0 }
    };
    
    investors.forEach(inv => {
        const tier = getInvestorTier(inv.dealCount || 1).tier;
        tierStats[tier].count++;
        tierStats[tier].capital += inv.totalInvested;
    });
    
    return { totalInvested, avgInvestment, tierStats };
}

// Update raise investors table to include tier
function loadRaiseInvestors() {
    const container = document.getElementById('raiseInvestorsList');
    if (!container) return;
    
    container.innerHTML = CS3Data.raiseInvestors.map(inv => {
        // Find the investor in main list to get their tier
        const mainInvestor = CS3Data.investors.find(i => i.name === inv.name);
        const tierInfo = getInvestorTier(mainInvestor?.dealCount || 1);
        
        const statusClass = inv.status === 'funded' ? 'success' : inv.status === 'committed' ? 'warning' : '';
        
        return `
            <tr>
                <td><strong>${inv.name}</strong></td>
                <td><span style="background: ${tierInfo.color}20; color: ${tierInfo.color}; padding: 2px 8px; border-radius: 12px; font-size: 11px;">${tierInfo.icon}</span></td>
                <td style="font-weight: 600; color: var(--cs3-teal);">${formatCurrency(inv.amount)}</td>
                <td><span class="badge ${inv.type === 'sdira' ? 'warning' : ''}">${inv.type.toUpperCase()}</span></td>
                <td><span class="badge ${statusClass}">${inv.status.toUpperCase()}</span></td>
                <td>${inv.committedDate}</td>
                <td>${inv.fundedDate || '-'}</td>
            </tr>
        `;
    }).join('');
}
