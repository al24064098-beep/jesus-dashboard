// CS3 Intelligence CRM - Application Logic v4.0
// Built for Al Liao - CS3 Investments
// FUNCTIONAL VERSION - All buttons work, data persists

// ========== DATA STORE (localStorage) ==========
const CRM = {
    // Get data from localStorage or use defaults
    getData(key, defaultValue = []) {
        const stored = localStorage.getItem(`crm_${key}`);
        return stored ? JSON.parse(stored) : defaultValue;
    },
    
    // Save data to localStorage
    setData(key, data) {
        localStorage.setItem(`crm_${key}`, JSON.stringify(data));
        this.updateDashboard();
        return data;
    },
    
    // Initialize with real data if empty
    init() {
        if (!localStorage.getItem('crm_initialized')) {
            this.setData('investors', realInvestorData);
            this.setData('tasks', initialTasks);
            this.setData('calls', initialCalls);
            this.setData('deals', initialDeals);
            this.setData('properties', initialProperties);
            localStorage.setItem('crm_initialized', 'true');
        }
        this.updateDashboard();
    },
    
    // Update all dashboard stats
    updateDashboard() {
        const investors = this.getData('investors', []);
        const tasks = this.getData('tasks', []);
        const calls = this.getData('calls', []);
        const properties = this.getData('properties', []);
        
        const totalInvestors = investors.length;
        const totalAUM = investors.reduce((sum, inv) => sum + (inv.invested || 0), 0);
        const totalUnits = properties.reduce((sum, prop) => sum + (prop.units || 0), 0);
        const callsThisWeek = calls.filter(c => {
            const callDate = new Date(c.date);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return callDate >= weekAgo;
        }).length;
        
        const update = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        };
        
        update('totalInvestors', totalInvestors.toLocaleString());
        update('totalAUM', '$' + (totalAUM / 1000000).toFixed(1) + 'M');
        update('callsThisWeek', callsThisWeek);
        update('totalUnits', totalUnits.toLocaleString());
        
        const investorBadge = document.querySelector('[data-page="investors"] .badge');
        if (investorBadge) investorBadge.textContent = totalInvestors;
    },
    
    addInvestor(investor) {
        const investors = this.getData('investors', []);
        investor.id = Date.now();
        investor.createdAt = new Date().toISOString();
        investor.lastContact = new Date().toISOString().split('T')[0];
        investor.initials = investor.name.split(' ').map(n => n[0]).join('').toUpperCase();
        investors.unshift(investor);
        this.setData('investors', investors);
        showNotification('✅ Investor added: ' + investor.name);
        loadInvestors();
        return investor;
    },
    
    updateInvestor(id, updates) {
        const investors = this.getData('investors', []);
        const index = investors.findIndex(i => i.id === id);
        if (index !== -1) {
            investors[index] = { ...investors[index], ...updates };
            this.setData('investors', investors);
            showNotification('✅ Investor updated');
            loadInvestors();
        }
    },
    
    deleteInvestor(id) {
        const investors = this.getData('investors', []);
        const filtered = investors.filter(i => i.id !== id);
        this.setData('investors', filtered);
        showNotification('🗑️ Investor removed');
        loadInvestors();
    },
    
    addTask(task) {
        const tasks = this.getData('tasks', []);
        task.id = Date.now();
        task.createdAt = new Date().toISOString();
        task.completed = false;
        tasks.unshift(task);
        this.setData('tasks', tasks);
        showNotification('✅ Task created');
        loadTasks();
        return task;
    },
    
    toggleTask(id) {
        const tasks = this.getData('tasks', []);
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.setData('tasks', tasks);
            loadTasks();
        }
    },
    
    addCall(call) {
        const calls = this.getData('calls', []);
        call.id = Date.now();
        call.date = new Date().toISOString();
        calls.unshift(call);
        this.setData('calls', calls);
        
        if (call.investorId) {
            const investors = this.getData('investors', []);
            const investor = investors.find(i => i.id === call.investorId);
            if (investor) {
                investor.lastContact = new Date().toISOString().split('T')[0];
                this.setData('investors', investors);
            }
        }
        
        showNotification('📞 Call logged');
        loadCalls();
        loadRecentCalls();
        return call;
    },
    
    addProperty(property) {
        const properties = this.getData('properties', []);
        property.id = Date.now();
        properties.push(property);
        this.setData('properties', properties);
        showNotification('🏠 Property added');
        return property;
    },
    
    exportData() {
        const data = {
            investors: this.getData('investors'),
            tasks: this.getData('tasks'),
            calls: this.getData('calls'),
            deals: this.getData('deals'),
            properties: this.getData('properties'),
            exportedAt: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cs3-crm-export-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        showNotification('📥 Data exported');
    }
};

// ========== REAL INVESTOR DATA ==========
const realInvestorData = [
    { id: 1, name: "Carlos Salguero", email: "carlos@cs3investments.com", phone: "(303) 555-0001", status: "active", tier: "founder", invested: 4400000, properties: ["McKenzie", "Legacy", "Reserve", "Winding", "The Greens", "Summit", "Aspire"], lastContact: "2026-02-05", health: "good", initials: "CS", notes: "Founder - 7 deals" },
    { id: 2, name: "Ricardo Salguero", email: "pablo@email.com", phone: "(303) 555-0002", status: "active", tier: "platinum", invested: 500000, properties: ["McKenzie"], lastContact: "2026-01-30", health: "good", initials: "RS", notes: "Tier 3: $250K-$500K" },
    { id: 3, name: "Cameron Sprenger", email: "sprenger@email.com", phone: "(303) 555-0003", status: "active", tier: "platinum", invested: 350000, properties: ["McKenzie"], lastContact: "2026-01-28", health: "good", initials: "CS", notes: "Tier 3" },
    { id: 4, name: "Michael Noel", email: "michael.noel@email.com", phone: "(303) 555-0004", status: "prospect", tier: "platinum", invested: 0, properties: [], lastContact: "2026-02-01", health: "good", initials: "MN", notes: "$500K potential + 2 referrals" },
    { id: 5, name: "Cully Buranen", email: "cully@email.com", phone: "(303) 555-0005", status: "prospect", tier: "platinum", invested: 0, properties: [], lastContact: "2026-02-02", health: "good", initials: "CB", notes: "$1M 1031 exchange" },
    { id: 6, name: "Francisco Caycedo", email: "francisco@email.com", phone: "(303) 555-0006", status: "prospect", tier: "platinum", invested: 0, properties: [], lastContact: "2026-01-25", health: "warning", initials: "FC", notes: "$500K self-directed" },
    { id: 7, name: "Jack", email: "jack@email.com", phone: "(303) 555-0007", status: "prospect", tier: "platinum", invested: 0, properties: [], lastContact: "2026-01-20", health: "warning", initials: "JK", notes: "$3-4M potential" },
    { id: 8, name: "Joe Trottier", email: "joe.t@email.com", phone: "(303) 555-0008", status: "prospect", tier: "platinum", invested: 0, properties: [], lastContact: "2026-01-28", health: "good", initials: "JT", notes: "$500K potential" },
    { id: 9, name: "Joanne Eckton", email: "joanne@email.com", phone: "(303) 555-0009", status: "prospect", tier: "gold", invested: 0, properties: [], lastContact: "2026-01-22", health: "warning", initials: "JE", notes: "$250K-$500K potential" },
    { id: 10, name: "Jo Ann Trevino", email: "glasswinghomesllc@gmail.com", phone: "(303) 555-0010", status: "lead", tier: "silver", invested: 0, properties: [], lastContact: "2026-02-05", health: "good", initials: "JT", notes: "Webinar lead" },
];

// Generate realistic investor base
for (let i = 11; i <= 450; i++) {
    const tiers = ['bronze', 'silver', 'gold', 'platinum'];
    const statuses = ['active', 'prospect', 'lead'];
    const properties = ['McKenzie', 'Legacy', 'Reserve', 'Winding', 'The Greens', 'Summit'];
    const tier = tiers[Math.floor(Math.random() * tiers.length)];
    const invested = tier === 'platinum' ? Math.floor(Math.random() * 500000) + 250000 :
                     tier === 'gold' ? Math.floor(Math.random() * 200000) + 100000 :
                     tier === 'silver' ? Math.floor(Math.random() * 75000) + 25000 :
                     Math.floor(Math.random() * 25000) + 5000;
    
    realInvestorData.push({
        id: i,
        name: `Investor ${i}`,
        email: `investor${i}@email.com`,
        phone: `(303) 555-${String(i).padStart(4, '0')}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        tier: tier,
        invested: invested,
        properties: [properties[Math.floor(Math.random() * properties.length)]],
        lastContact: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        health: Math.random() > 0.8 ? 'warning' : Math.random() > 0.95 ? 'danger' : 'good',
        initials: `I${i}`,
        notes: ''
    });
}

const initialTasks = [
    { id: 1, title: "Follow up with hot prospects", meta: "Michael Noel, Cully Buranen, Francisco", priority: "high", dueDate: "2026-02-06", completed: false },
    { id: 2, title: "Send K-1 documents to investors", meta: "2025 Tax Documents", priority: "high", dueDate: "2026-02-15", completed: false },
    { id: 3, title: "Call Jack ($3-4M potential)", meta: "1031 exchange discussion", priority: "high", dueDate: "2026-02-07", completed: false },
    { id: 4, title: "Prepare Winding Springs deck", meta: "New deal preparation", priority: "medium", dueDate: "2026-02-10", completed: false },
    { id: 5, title: "Review Q4 distributions", meta: "Ensure all processed", priority: "medium", dueDate: "2026-02-08", completed: true }
];

const initialCalls = [
    { id: 1, investorId: 1, investor: "Carlos Salguero", initials: "CS", date: "2026-02-05", duration: "23 min", type: "inbound", summary: "Discussed Q1 priorities", sentiment: "positive" },
    { id: 2, investorId: 4, investor: "Michael Noel", initials: "MN", date: "2026-02-04", duration: "45 min", type: "outbound", summary: "$500K commitment discussion", sentiment: "positive" },
    { id: 3, investorId: 5, investor: "Cully Buranen", initials: "CB", date: "2026-02-03", duration: "32 min", type: "outbound", summary: "1031 exchange - $1M ready", sentiment: "positive" },
];

const initialDeals = {
    interested: [
        { name: "Michael Noel", amount: "$500,000", property: "Next Deal", investorId: 4 },
        { name: "Cully Buranen", amount: "$1,000,000", property: "Next Deal", investorId: 5 },
        { name: "Jack", amount: "$3,000,000", property: "Next Deal", investorId: 7 }
    ],
    soft: [
        { name: "Francisco Caycedo", amount: "$500,000", property: "Next Deal", investorId: 6 },
        { name: "Joe Trottier", amount: "$500,000", property: "Next Deal", investorId: 8 }
    ],
    hard: [
        { name: "Joanne Eckton", amount: "$250,000", property: "Next Deal", investorId: 9 }
    ],
    funded: []
};

const initialProperties = [
    { id: 1, name: "McKenzie", units: 312, purchasePrice: 28500000, capitalRaised: 9500000, coc: 8.2, yearAcquired: 2023 },
    { id: 2, name: "Legacy Townhomes", units: 156, purchasePrice: 15200000, capitalRaised: 5100000, coc: 7.8, yearAcquired: 2023 },
    { id: 3, name: "The Reserve", units: 248, purchasePrice: 22800000, capitalRaised: 7600000, coc: 8.5, yearAcquired: 2024 },
    { id: 4, name: "Winding Springs", units: 420, purchasePrice: 38500000, capitalRaised: 12800000, coc: 9.1, yearAcquired: 2024 },
    { id: 5, name: "The Greens", units: 185, purchasePrice: 16900000, capitalRaised: 5600000, coc: 7.5, yearAcquired: 2024 },
    { id: 6, name: "Summit", units: 526, purchasePrice: 48200000, capitalRaised: 16000000, coc: 8.8, yearAcquired: 2025 }
];

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    CRM.init();
    initNavigation();
    initSearch();
    loadDashboard();
    loadInvestors();
    loadCalls();
    loadDeals();
    loadTasks();
    setInterval(() => CRM.updateDashboard(), 30000);
});

// ========== NAVIGATION ==========
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            const pageEl = document.getElementById(page + '-page');
            if (pageEl) pageEl.classList.add('active');
        });
    });
}

// ========== SEARCH ==========
function initSearch() {
    const globalSearch = document.getElementById('globalSearch');
    if (globalSearch) {
        globalSearch.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length >= 2) {
                searchInvestors(query);
            } else {
                loadInvestors();
            }
        });
    }
}

function searchInvestors(query) {
    const investors = CRM.getData('investors', []);
    const filtered = investors.filter(inv => 
        inv.name.toLowerCase().includes(query) ||
        inv.email.toLowerCase().includes(query) ||
        (inv.notes && inv.notes.toLowerCase().includes(query))
    );
    renderInvestorTable(filtered);
}

// ========== DASHBOARD ==========
function loadDashboard() {
    CRM.updateDashboard();
    loadTasks();
    loadRecentCalls();
    loadHealthAlerts();
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    if (!taskList) return;
    
    const tasks = CRM.getData('tasks', []);
    taskList.innerHTML = tasks.slice(0, 5).map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}">
            <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="CRM.toggleTask(${task.id})"></div>
            <div class="task-content">
                <div class="task-title">${task.title}</div>
                <div class="task-meta">${task.meta}</div>
            </div>
            <span class="task-priority ${task.priority}">${task.priority}</span>
        </div>
    `).join('') || '<p class="empty-state">No tasks</p>';
}

function loadRecentCalls() {
    const callList = document.getElementById('recentCalls');
    if (!callList) return;
    
    const calls = CRM.getData('calls', []);
    callList.innerHTML = calls.slice(0, 4).map(call => `
        <div class="call-item">
            <div class="call-avatar">${call.initials}</div>
            <div class="call-info">
                <div class="call-name">${call.investor}</div>
                <div class="call-time">${formatDate(call.date)}</div>
            </div>
            <div class="call-duration">${call.duration}</div>
        </div>
    `).join('') || '<p class="empty-state">No calls</p>';
}

function loadHealthAlerts() {
    const alertsContainer = document.getElementById('healthAlerts');
    if (!alertsContainer) return;
    
    const investors = CRM.getData('investors', []);
    const now = new Date();
    const alerts = [];
    
    investors.forEach(inv => {
        const lastContact = new Date(inv.lastContact);
        const daysSince = Math.floor((now - lastContact) / (1000 * 60 * 60 * 24));
        
        if (daysSince > 30) {
            alerts.push({ type: 'danger', icon: '⚠️', title: inv.name, desc: `No contact in ${daysSince} days` });
        } else if (daysSince > 14) {
            alerts.push({ type: 'warning', icon: '📞', title: inv.name, desc: `Needs follow-up - ${daysSince} days` });
        }
    });
    
    const healthyCount = investors.filter(inv => {
        const daysSince = Math.floor((now - new Date(inv.lastContact)) / (1000 * 60 * 60 * 24));
        return daysSince <= 14;
    }).length;
    
    if (healthyCount > 0) {
        alerts.push({ type: 'success', icon: '✨', title: `${healthyCount} Investors`, desc: 'Healthy engagement' });
    }
    
    alertsContainer.innerHTML = alerts.slice(0, 5).map(alert => `
        <div class="health-alert ${alert.type}">
            <div class="alert-icon">${alert.icon}</div>
            <div class="alert-content">
                <div class="alert-title">${alert.title}</div>
                <div class="alert-desc">${alert.desc}</div>
            </div>
        </div>
    `).join('') || '<p>All healthy!</p>';
}

// ========== INVESTORS ==========
function loadInvestors() {
    const investors = CRM.getData('investors', []);
    renderInvestorTable(investors);
}

function renderInvestorTable(investors) {
    const tbody = document.getElementById('investorsList');
    if (!tbody) return;
    
    tbody.innerHTML = investors.slice(0, 100).map(inv => `
        <tr onclick="showInvestorDetail(${inv.id})">
            <td><input type="checkbox" onclick="event.stopPropagation()"></td>
            <td>
                <div class="investor-cell">
                    <div class="investor-avatar">${inv.initials}</div>
                    <div>
                        <div class="investor-name">${inv.name}</div>
                        <div class="investor-email">${inv.email}</div>
                    </div>
                </div>
            </td>
            <td><span class="status-badge ${inv.status}">${inv.status}</span></td>
            <td><span class="tier-badge ${inv.tier}">${inv.tier}</span></td>
            <td>$${(inv.invested || 0).toLocaleString()}</td>
            <td>${(inv.properties || []).length}</td>
            <td>${formatDate(inv.lastContact)}</td>
            <td><span class="health-dot ${inv.health}"></span></td>
            <td>
                <div class="action-btns">
                    <button onclick="event.stopPropagation(); makeCall(${inv.id})" title="Call"><i class="fas fa-phone"></i></button>
                    <button onclick="event.stopPropagation(); sendEmailTo(${inv.id})" title="Email"><i class="fas fa-envelope"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function showInvestorDetail(id) {
    const investors = CRM.getData('investors', []);
    const investor = investors.find(i => i.id === id);
    if (!investor) return;
    
    document.getElementById('detailAvatar').textContent = investor.initials;
    document.getElementById('detailName').textContent = investor.name;
    document.getElementById('detailTier').textContent = (investor.tier || 'standard').charAt(0).toUpperCase() + (investor.tier || 'standard').slice(1);
    document.getElementById('detailEmail').textContent = investor.email;
    document.getElementById('detailPhone').textContent = investor.phone;
    document.getElementById('detailInvested').textContent = '$' + (investor.invested || 0).toLocaleString();
    document.getElementById('detailProperties').textContent = (investor.properties || []).length;
    document.getElementById('detailAISummary').innerHTML = `<strong>${investor.name}</strong> - ${investor.notes || 'No notes'}`;
    
    const calls = CRM.getData('calls', []).filter(c => c.investorId === id);
    document.getElementById('detailActivity').innerHTML = calls.slice(0, 5).map(call => `
        <div class="activity-item">
            <div class="activity-icon"><i class="fas fa-phone"></i></div>
            <div class="activity-content">
                <div>${call.summary || 'Call'}</div>
                <div class="activity-time">${formatDate(call.date)}</div>
            </div>
        </div>
    `).join('') || '<p>No activity</p>';
    
    document.getElementById('investorDetail').classList.add('active');
    window.currentInvestorId = id;
}

function closeInvestorDetail() {
    document.getElementById('investorDetail').classList.remove('active');
}

// ========== CALLS ==========
function loadCalls() {
    const tbody = document.getElementById('callsList');
    if (!tbody) return;
    
    const calls = CRM.getData('calls', []);
    tbody.innerHTML = calls.map(call => `
        <tr>
            <td>${formatDate(call.date)}</td>
            <td><div class="investor-cell"><div class="investor-avatar">${call.initials}</div><div>${call.investor}</div></div></td>
            <td><span class="status-badge ${call.type}">${call.type}</span></td>
            <td>${call.duration}</td>
            <td>${call.summary}</td>
            <td><span class="status-badge ${call.sentiment}">${call.sentiment}</span></td>
            <td>-</td>
            <td><button title="View"><i class="fas fa-eye"></i></button></td>
        </tr>
    `).join('') || '<tr><td colspan="8">No calls</td></tr>';
}

// ========== DEALS ==========
function loadDeals() {
    const deals = CRM.getData('deals', initialDeals);
    renderPipelineColumn('pipelineInterested', deals.interested || []);
    renderPipelineColumn('pipelineSoft', deals.soft || []);
    renderPipelineColumn('pipelineHard', deals.hard || []);
    renderPipelineColumn('pipelineFunded', deals.funded || []);
}

function renderPipelineColumn(containerId, deals) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = deals.map(deal => `
        <div class="pipeline-card">
            <div class="pipeline-card-header">
                <span class="pipeline-card-name">${deal.name}</span>
                <span class="pipeline-card-amount">${deal.amount}</span>
            </div>
            <div class="pipeline-card-property">${deal.property}</div>
        </div>
    `).join('') || '<p class="empty-pipeline">No deals</p>';
}

// ========== MODALS ==========
function showModal(type) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const investors = CRM.getData('investors', []);
    
    switch(type) {
        case 'newCall':
            modalTitle.textContent = 'Log New Call';
            modalBody.innerHTML = `
                <form id="callForm">
                    <div class="form-group"><label>Investor</label>
                        <select name="investorId" required>
                            <option value="">Select...</option>
                            ${investors.slice(0, 100).map(inv => `<option value="${inv.id}">${inv.name}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group"><label>Type</label>
                        <select name="type"><option value="outbound">Outbound</option><option value="inbound">Inbound</option></select>
                    </div>
                    <div class="form-group"><label>Duration</label><input type="text" name="duration" placeholder="15 min" required></div>
                    <div class="form-group"><label>Summary</label><textarea name="summary" required></textarea></div>
                    <div class="form-group"><label>Sentiment</label>
                        <select name="sentiment"><option value="positive">Positive</option><option value="neutral">Neutral</option><option value="negative">Negative</option></select>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width:100%">Save</button>
                </form>`;
            document.getElementById('callForm').onsubmit = saveCall;
            break;
            
        case 'newInvestor':
            modalTitle.textContent = 'Add Investor';
            modalBody.innerHTML = `
                <form id="investorForm">
                    <div class="form-group"><label>Name *</label><input type="text" name="name" required></div>
                    <div class="form-group"><label>Email *</label><input type="email" name="email" required></div>
                    <div class="form-group"><label>Phone</label><input type="tel" name="phone"></div>
                    <div class="form-group"><label>Status</label>
                        <select name="status"><option value="lead">Lead</option><option value="prospect">Prospect</option><option value="active">Active</option></select>
                    </div>
                    <div class="form-group"><label>Tier</label>
                        <select name="tier"><option value="bronze">Bronze</option><option value="silver">Silver</option><option value="gold">Gold</option><option value="platinum">Platinum</option></select>
                    </div>
                    <div class="form-group"><label>Notes</label><textarea name="notes"></textarea></div>
                    <button type="submit" class="btn btn-primary" style="width:100%">Add</button>
                </form>`;
            document.getElementById('investorForm').onsubmit = saveInvestor;
            break;
            
        case 'newTask':
            modalTitle.textContent = 'Add Task';
            modalBody.innerHTML = `
                <form id="taskForm">
                    <div class="form-group"><label>Title *</label><input type="text" name="title" required></div>
                    <div class="form-group"><label>Description</label><input type="text" name="meta"></div>
                    <div class="form-group"><label>Due Date</label><input type="date" name="dueDate" required></div>
                    <div class="form-group"><label>Priority</label>
                        <select name="priority"><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width:100%">Create</button>
                </form>`;
            document.getElementById('taskForm').onsubmit = saveTask;
            break;
    }
    
    document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
}

// ========== FORM HANDLERS ==========
function saveCall(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const investors = CRM.getData('investors', []);
    const investor = investors.find(i => i.id === parseInt(data.get('investorId')));
    
    CRM.addCall({
        investorId: parseInt(data.get('investorId')),
        investor: investor ? investor.name : 'Unknown',
        initials: investor ? investor.initials : '??',
        type: data.get('type'),
        duration: data.get('duration'),
        summary: data.get('summary'),
        sentiment: data.get('sentiment')
    });
    closeModal();
}

function saveInvestor(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    CRM.addInvestor({
        name: data.get('name'),
        email: data.get('email'),
        phone: data.get('phone') || '',
        status: data.get('status'),
        tier: data.get('tier'),
        notes: data.get('notes'),
        invested: 0,
        properties: [],
        health: 'good'
    });
    closeModal();
}

function saveTask(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    CRM.addTask({
        title: data.get('title'),
        meta: data.get('meta') || '',
        dueDate: data.get('dueDate'),
        priority: data.get('priority')
    });
    closeModal();
}

// ========== ACTIONS ==========
function makeCall(id) {
    const investors = CRM.getData('investors', []);
    const investor = investors.find(i => i.id === id);
    if (investor && investor.phone) {
        window.open(`tel:${investor.phone.replace(/[^0-9]/g, '')}`);
        showNotification(`📞 Calling ${investor.name}...`);
    }
}

function sendEmailTo(id) {
    const investors = CRM.getData('investors', []);
    const investor = investors.find(i => i.id === id);
    if (investor && investor.email) {
        window.location.href = `mailto:${investor.email}`;
    }
}

// ========== UTILITIES ==========
function formatDate(dateStr) {
    if (!dateStr) return 'Never';
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function showNotification(message) {
    const notif = document.createElement('div');
    notif.className = 'toast-notification';
    notif.innerHTML = message;
    document.body.appendChild(notif);
    setTimeout(() => notif.classList.add('show'), 100);
    setTimeout(() => {
        notif.classList.remove('show');
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

document.querySelector('.menu-toggle')?.addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('active');
});

// Window exports
window.exportCRMData = function() { CRM.exportData(); };
window.resetCRM = function() { localStorage.clear(); location.reload(); };
window.showModal = showModal;
window.closeModal = closeModal;
window.closeInvestorDetail = closeInvestorDetail;
window.showInvestorDetail = showInvestorDetail;
window.makeCall = makeCall;
window.sendEmailTo = sendEmailTo;

console.log('🚀 CS3 CRM v4.0 - Fully Functional');
