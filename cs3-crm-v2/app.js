/**
 * CS3 CRM V3 - Real Functional App
 * With Properties, Capital Tracker, and Investor Management
 */

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
