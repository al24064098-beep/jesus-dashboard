// CS3 Intelligence CRM - Application Logic
// Built for Al Liao - CS3 Investments

// ========== SAMPLE DATA ==========
const sampleInvestors = [
    { id: 1, name: "Michael Chen", email: "michael.chen@email.com", phone: "(415) 555-0123", status: "active", tier: "platinum", invested: 750000, properties: ["McKenzie STL", "Legacy Townhomes", "The Reserve"], lastContact: "2026-01-30", health: "good", initials: "MC" },
    { id: 2, name: "Sarah Johnson", email: "sarah.j@email.com", phone: "(512) 555-0456", status: "active", tier: "gold", invested: 350000, properties: ["McKenzie STL", "Legacy Townhomes"], lastContact: "2026-01-28", health: "good", initials: "SJ" },
    { id: 3, name: "Robert Williams", email: "rwilliams@email.com", phone: "(303) 555-0789", status: "active", tier: "gold", invested: 275000, properties: ["The Reserve", "Winding Springs"], lastContact: "2026-01-15", health: "warning", initials: "RW" },
    { id: 4, name: "Jennifer Martinez", email: "jmartinez@email.com", phone: "(720) 555-0321", status: "prospect", tier: "silver", invested: 100000, properties: ["McKenzie STL"], lastContact: "2026-01-25", health: "good", initials: "JM" },
    { id: 5, name: "David Thompson", email: "dthompson@email.com", phone: "(214) 555-0654", status: "active", tier: "silver", invested: 150000, properties: ["Legacy Townhomes"], lastContact: "2025-12-20", health: "danger", initials: "DT" },
    { id: 6, name: "Emily Davis", email: "emily.davis@email.com", phone: "(602) 555-0987", status: "active", tier: "bronze", invested: 75000, properties: ["The Reserve"], lastContact: "2026-01-29", health: "good", initials: "ED" },
    { id: 7, name: "James Wilson", email: "jwilson@email.com", phone: "(480) 555-1234", status: "inactive", tier: "bronze", invested: 50000, properties: ["McKenzie STL"], lastContact: "2025-11-15", health: "danger", initials: "JW" },
    { id: 8, name: "Amanda Brown", email: "abrown@email.com", phone: "(619) 555-5678", status: "active", tier: "gold", invested: 400000, properties: ["McKenzie STL", "The Reserve", "Winding Springs"], lastContact: "2026-01-31", health: "good", initials: "AB" },
    { id: 9, name: "Christopher Lee", email: "clee@email.com", phone: "(858) 555-9012", status: "prospect", tier: "silver", invested: 125000, properties: ["Legacy Townhomes"], lastContact: "2026-01-22", health: "good", initials: "CL" },
    { id: 10, name: "Patricia Garcia", email: "pgarcia@email.com", phone: "(505) 555-3456", status: "active", tier: "platinum", invested: 500000, properties: ["McKenzie STL", "Legacy Townhomes"], lastContact: "2026-01-27", health: "good", initials: "PG" }
];

const sampleTasks = [
    { id: 1, title: "Follow up with Michael Chen", meta: "Re: Q1 distribution questions", priority: "high", dueDate: "2026-02-01", completed: false },
    { id: 2, title: "Send K-1 documents to investors", meta: "2025 Tax Documents", priority: "high", dueDate: "2026-02-15", completed: false },
    { id: 3, title: "Schedule call with Robert Williams", meta: "60-day re-engagement", priority: "medium", dueDate: "2026-02-02", completed: false },
    { id: 4, title: "Review Winding Springs investor deck", meta: "New deal preparation", priority: "medium", dueDate: "2026-02-05", completed: false },
    { id: 5, title: "Update CRM notes for Amanda Brown", meta: "Post-call notes", priority: "low", dueDate: "2026-02-01", completed: true }
];

const sampleCalls = [
    { id: 1, investor: "Michael Chen", initials: "MC", time: "Today, 2:30 PM", duration: "23 min", type: "inbound", summary: "Discussed Q1 distribution timing and new deal opportunities", sentiment: "positive" },
    { id: 2, investor: "Sarah Johnson", initials: "SJ", time: "Today, 11:15 AM", duration: "18 min", type: "outbound", summary: "Annual review, interested in increasing allocation", sentiment: "positive" },
    { id: 3, investor: "Amanda Brown", initials: "AB", time: "Yesterday, 4:45 PM", duration: "31 min", type: "inbound", summary: "Questions about Winding Springs opportunity", sentiment: "positive" },
    { id: 4, investor: "Robert Williams", initials: "RW", time: "Jan 28, 10:00 AM", duration: "12 min", type: "outbound", summary: "Check-in call, voicemail left", sentiment: "neutral" }
];

const sampleDeals = {
    interested: [
        { name: "John Smith", amount: "$100,000", property: "Winding Springs" },
        { name: "Lisa Anderson", amount: "$75,000", property: "Winding Springs" },
        { name: "Mark Taylor", amount: "$150,000", property: "Winding Springs" }
    ],
    soft: [
        { name: "Nancy White", amount: "$200,000", property: "Winding Springs" },
        { name: "Tom Harris", amount: "$125,000", property: "Winding Springs" }
    ],
    hard: [
        { name: "Kevin Moore", amount: "$250,000", property: "Winding Springs" },
        { name: "Susan Clark", amount: "$100,000", property: "Winding Springs" }
    ],
    funded: [
        { name: "Michael Chen", amount: "$150,000", property: "Winding Springs" }
    ]
};

const healthAlerts = [
    { type: "danger", icon: "⚠️", title: "David Thompson", desc: "No contact in 42 days - at risk" },
    { type: "danger", icon: "⚠️", title: "James Wilson", desc: "No contact in 77 days - inactive" },
    { type: "warning", icon: "📞", title: "Robert Williams", desc: "Needs follow-up call - 17 days" },
    { type: "success", icon: "✨", title: "8 Investors", desc: "Healthy engagement this week" }
];

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSearch();
    loadDashboard();
    loadInvestors();
    loadCalls();
    loadDeals();
});

// ========== NAVIGATION ==========
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            
            // Update active nav
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show page
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.getElementById(page + '-page').classList.add('active');
        });
    });
}

// ========== SEARCH ==========
function initSearch() {
    const globalSearch = document.getElementById('globalSearch');
    if (globalSearch) {
        globalSearch.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            // Implement search logic
            console.log('Searching for:', query);
        });
    }
}

// ========== DASHBOARD ==========
function loadDashboard() {
    loadTasks();
    loadRecentCalls();
    loadHealthAlerts();
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    if (!taskList) return;
    
    taskList.innerHTML = sampleTasks.slice(0, 4).map(task => `
        <div class="task-item">
            <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTask(${task.id})"></div>
            <div class="task-content">
                <div class="task-title">${task.title}</div>
                <div class="task-meta">${task.meta}</div>
            </div>
            <span class="task-priority ${task.priority}">${task.priority}</span>
        </div>
    `).join('');
}

function loadRecentCalls() {
    const callList = document.getElementById('recentCalls');
    if (!callList) return;
    
    callList.innerHTML = sampleCalls.slice(0, 3).map(call => `
        <div class="call-item">
            <div class="call-avatar">${call.initials}</div>
            <div class="call-info">
                <div class="call-name">${call.investor}</div>
                <div class="call-time">${call.time}</div>
            </div>
            <div class="call-duration">${call.duration}</div>
        </div>
    `).join('');
}

function loadHealthAlerts() {
    const alertsContainer = document.getElementById('healthAlerts');
    if (!alertsContainer) return;
    
    alertsContainer.innerHTML = healthAlerts.map(alert => `
        <div class="health-alert ${alert.type}">
            <div class="alert-icon">${alert.icon}</div>
            <div class="alert-content">
                <div class="alert-title">${alert.title}</div>
                <div class="alert-desc">${alert.desc}</div>
            </div>
        </div>
    `).join('');
}

// ========== INVESTORS ==========
function loadInvestors() {
    const tbody = document.getElementById('investorsList');
    if (!tbody) return;
    
    tbody.innerHTML = sampleInvestors.map(inv => `
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
            <td>$${inv.invested.toLocaleString()}</td>
            <td>${inv.properties.length} properties</td>
            <td>${formatDate(inv.lastContact)}</td>
            <td>
                <div class="health-indicator">
                    <span class="health-dot ${inv.health}"></span>
                    <span>${inv.health}</span>
                </div>
            </td>
            <td>
                <div class="action-btns">
                    <button onclick="event.stopPropagation(); makeCall(${inv.id})" title="Call"><i class="fas fa-phone"></i></button>
                    <button onclick="event.stopPropagation(); sendEmail(${inv.id})" title="Email"><i class="fas fa-envelope"></i></button>
                    <button onclick="event.stopPropagation(); showInvestorDetail(${inv.id})" title="View"><i class="fas fa-eye"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function showInvestorDetail(id) {
    const investor = sampleInvestors.find(i => i.id === id);
    if (!investor) return;
    
    document.getElementById('detailAvatar').textContent = investor.initials;
    document.getElementById('detailName').textContent = investor.name;
    document.getElementById('detailTier').textContent = investor.tier.charAt(0).toUpperCase() + investor.tier.slice(1) + ' Investor';
    document.getElementById('detailEmail').textContent = investor.email;
    document.getElementById('detailPhone').textContent = investor.phone;
    document.getElementById('detailInvested').textContent = '$' + investor.invested.toLocaleString();
    document.getElementById('detailProperties').textContent = investor.properties.length;
    
    // AI Summary
    document.getElementById('detailAISummary').innerHTML = generateAISummary(investor);
    
    // Activity
    document.getElementById('detailActivity').innerHTML = `
        <div class="activity-item">
            <div class="activity-icon"><i class="fas fa-phone"></i></div>
            <div class="activity-content">
                <div>Call completed - 23 min discussion</div>
                <div class="activity-time">${investor.lastContact}</div>
            </div>
        </div>
        <div class="activity-item">
            <div class="activity-icon"><i class="fas fa-dollar-sign"></i></div>
            <div class="activity-content">
                <div>Q4 2025 Distribution processed</div>
                <div class="activity-time">Jan 15, 2026</div>
            </div>
        </div>
        <div class="activity-item">
            <div class="activity-icon"><i class="fas fa-envelope"></i></div>
            <div class="activity-content">
                <div>Monthly update email sent</div>
                <div class="activity-time">Jan 1, 2026</div>
            </div>
        </div>
    `;
    
    document.getElementById('investorDetail').classList.add('active');
}

function closeInvestorDetail() {
    document.getElementById('investorDetail').classList.remove('active');
}

function generateAISummary(investor) {
    const summaries = {
        good: `<strong>${investor.name}</strong> is a highly engaged ${investor.tier} investor with strong communication patterns. They've shown interest in increasing their allocation and have a 100% on-time investment history. Recommended: Discuss new opportunities in upcoming call.`,
        warning: `<strong>${investor.name}</strong> engagement has decreased recently. Last contact was ${formatDate(investor.lastContact)}. Recommended: Schedule a check-in call within the next 5 business days to maintain relationship.`,
        danger: `<strong>⚠️ Attention needed:</strong> ${investor.name} hasn't been contacted in over 40 days. Risk of disengagement. Immediate action recommended: Personal phone call to re-establish connection.`
    };
    return summaries[investor.health] || summaries.good;
}

// ========== CALLS ==========
function loadCalls() {
    const tbody = document.getElementById('callsList');
    if (!tbody) return;
    
    tbody.innerHTML = sampleCalls.map(call => `
        <tr>
            <td>${call.time}</td>
            <td>
                <div class="investor-cell">
                    <div class="investor-avatar">${call.initials}</div>
                    <div class="investor-name">${call.investor}</div>
                </div>
            </td>
            <td><span class="status-badge ${call.type}">${call.type}</span></td>
            <td>${call.duration}</td>
            <td style="max-width: 300px;">${call.summary}</td>
            <td><span class="status-badge ${call.sentiment}">${call.sentiment}</span></td>
            <td>-</td>
            <td>
                <div class="action-btns">
                    <button title="View"><i class="fas fa-eye"></i></button>
                    <button title="Edit"><i class="fas fa-edit"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

// ========== DEALS ==========
function loadDeals() {
    renderPipelineColumn('pipelineInterested', sampleDeals.interested);
    renderPipelineColumn('pipelineSoft', sampleDeals.soft);
    renderPipelineColumn('pipelineHard', sampleDeals.hard);
    renderPipelineColumn('pipelineFunded', sampleDeals.funded);
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
    `).join('');
}

// ========== MODALS ==========
function showModal(type) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    switch(type) {
        case 'newCall':
            modalTitle.textContent = 'Log New Call';
            modalBody.innerHTML = `
                <form onsubmit="saveCall(event)">
                    <div class="form-group">
                        <label>Investor</label>
                        <select required>
                            <option value="">Select investor...</option>
                            ${sampleInvestors.map(inv => `<option value="${inv.id}">${inv.name}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Call Type</label>
                        <select required>
                            <option value="outbound">Outbound</option>
                            <option value="inbound">Inbound</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Duration (minutes)</label>
                        <input type="number" placeholder="e.g., 15" required>
                    </div>
                    <div class="form-group">
                        <label>Summary</label>
                        <textarea placeholder="What was discussed..." required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Sentiment</label>
                        <select required>
                            <option value="positive">Positive</option>
                            <option value="neutral">Neutral</option>
                            <option value="negative">Negative</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width:100%">Save Call</button>
                </form>
            `;
            break;
            
        case 'newInvestor':
            modalTitle.textContent = 'Add New Investor';
            modalBody.innerHTML = `
                <form onsubmit="saveInvestor(event)">
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" placeholder="John Doe" required>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="john@example.com" required>
                    </div>
                    <div class="form-group">
                        <label>Phone</label>
                        <input type="tel" placeholder="(555) 123-4567" required>
                    </div>
                    <div class="form-group">
                        <label>Status</label>
                        <select required>
                            <option value="prospect">Prospect</option>
                            <option value="active">Active</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Notes</label>
                        <textarea placeholder="Initial notes about this investor..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width:100%">Add Investor</button>
                </form>
            `;
            break;
            
        case 'newTask':
            modalTitle.textContent = 'Add New Task';
            modalBody.innerHTML = `
                <form onsubmit="saveTask(event)">
                    <div class="form-group">
                        <label>Task Title</label>
                        <input type="text" placeholder="Follow up with..." required>
                    </div>
                    <div class="form-group">
                        <label>Related Investor</label>
                        <select>
                            <option value="">No investor (general task)</option>
                            ${sampleInvestors.map(inv => `<option value="${inv.id}">${inv.name}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Due Date</label>
                        <input type="date" required>
                    </div>
                    <div class="form-group">
                        <label>Priority</label>
                        <select required>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea placeholder="Task details..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width:100%">Create Task</button>
                </form>
            `;
            break;
            
        case 'sendEmail':
            modalTitle.textContent = '✉️ Compose Email';
            modalBody.innerHTML = `
                <form onsubmit="sendEmailMessage(event)">
                    <div class="form-group">
                        <label>To</label>
                        <select id="emailTo" required>
                            <option value="">Select investor...</option>
                            ${sampleInvestors.map(inv => `<option value="${inv.email}">${inv.name} (${inv.email})</option>`).join('')}
                            <option value="all-platinum">All Platinum Investors (5)</option>
                            <option value="all-gold">All Gold Investors (12)</option>
                            <option value="all-active">All Active Investors (523)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Template (AI-Powered)</label>
                        <select id="emailTemplate" onchange="loadEmailTemplate()">
                            <option value="">Start from scratch...</option>
                            <option value="quarterly">📊 Quarterly Update</option>
                            <option value="welcome">👋 Welcome New Investor</option>
                            <option value="distribution">💰 Distribution Notice</option>
                            <option value="checkin">📞 Check-in Follow-up</option>
                            <option value="opportunity">🏠 New Investment Opportunity</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Subject</label>
                        <input type="text" id="emailSubject" placeholder="Email subject..." required>
                    </div>
                    <div class="form-group">
                        <label>Message</label>
                        <textarea id="emailBody" rows="8" placeholder="Write your message or select a template..." required></textarea>
                    </div>
                    <div class="form-group ai-enhance">
                        <button type="button" class="btn btn-secondary" onclick="enhanceWithAI()">
                            <i class="fas fa-magic"></i> Enhance with AI
                        </button>
                        <span class="ai-hint">Let Gemini improve your message</span>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn" onclick="saveDraft()">Save Draft</button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-paper-plane"></i> Send Email
                        </button>
                    </div>
                </form>
            `;
            break;
    }
    
    document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
}

// Close modal on overlay click
document.getElementById('modalOverlay')?.addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// ========== FORM HANDLERS ==========
function saveCall(e) {
    e.preventDefault();
    alert('Call logged successfully! (Demo - would save to database)');
    closeModal();
}

function saveInvestor(e) {
    e.preventDefault();
    alert('Investor added successfully! (Demo - would save to database)');
    closeModal();
}

function saveTask(e) {
    e.preventDefault();
    alert('Task created successfully! (Demo - would save to database)');
    closeModal();
}

// ========== EMAIL FUNCTIONS ==========
const emailTemplates = {
    quarterly: {
        subject: 'Q1 2026 Portfolio Update - CS3 Investments',
        body: `Dear [Investor Name],

I hope this message finds you well. I'm excited to share our Q1 2026 portfolio performance update with you.

**Key Highlights:**
• Portfolio occupancy remains strong at 94.5%
• NOI increased 8.2% year-over-year
• Distributions processed on schedule

Our properties continue to perform exceptionally well, and we remain committed to delivering strong, consistent returns for our investors.

I'd love to schedule a brief call to discuss your investment and answer any questions you may have.

Best regards,
Al Liao
Director of Investor Relations
CS3 Investments`
    },
    welcome: {
        subject: 'Welcome to the CS3 Investments Family! 🎉',
        body: `Dear [Investor Name],

Welcome to CS3 Investments! We're thrilled to have you as part of our investor family.

Your investment has been successfully processed, and you're now an owner in [Property Name]. Here's what happens next:

1. **Investor Portal Access** - You'll receive login credentials within 24 hours
2. **Distribution Schedule** - Quarterly distributions, typically within 30 days of quarter-end
3. **Monthly Updates** - Expect property performance updates via email

If you have any questions, please don't hesitate to reach out. I'm here to help!

Warm regards,
Al Liao
Director of Investor Relations
CS3 Investments`
    },
    distribution: {
        subject: 'Your Q4 2025 Distribution Has Been Processed 💰',
        body: `Dear [Investor Name],

Great news! Your Q4 2025 distribution has been processed and should arrive in your bank account within 3-5 business days.

**Distribution Details:**
• Amount: $[Amount]
• Property: [Property Name]
• Period: Q4 2025
• Payment Method: ACH Transfer

Thank you for your continued trust in CS3 Investments. We're committed to delivering consistent returns and exceptional service.

Best regards,
Al Liao
Director of Investor Relations
CS3 Investments`
    },
    checkin: {
        subject: 'Quick Check-in - How Can We Serve You Better?',
        body: `Dear [Investor Name],

I hope you're doing well! I wanted to reach out personally to check in and see how things are going.

A few things I'd love to discuss:
• Your experience with CS3 Investments so far
• Any questions about your current investments
• Upcoming opportunities that might interest you

Would you have 15-20 minutes this week for a quick call? I'm available:
• [Day/Time Option 1]
• [Day/Time Option 2]

Looking forward to connecting!

Warm regards,
Al Liao
Director of Investor Relations
CS3 Investments`
    },
    opportunity: {
        subject: 'Exclusive: New Investment Opportunity - [Property Name]',
        body: `Dear [Investor Name],

As a valued CS3 investor, I wanted to give you early access to our newest opportunity.

**[Property Name] - Quick Overview:**
• Location: [City, State]
• Units: [Number] multifamily units
• Target Returns: [X]% CoC, [Y]% IRR
• Minimum Investment: $50,000

This property fits perfectly with our value-add strategy, and we're excited about its potential.

Want to learn more? Reply to this email or schedule a call at [Link].

Investment closes: [Date]

Best regards,
Al Liao
Director of Investor Relations
CS3 Investments`
    }
};

function loadEmailTemplate() {
    const template = document.getElementById('emailTemplate').value;
    if (template && emailTemplates[template]) {
        document.getElementById('emailSubject').value = emailTemplates[template].subject;
        document.getElementById('emailBody').value = emailTemplates[template].body;
    }
}

function enhanceWithAI() {
    const body = document.getElementById('emailBody');
    const currentText = body.value;
    
    if (!currentText.trim()) {
        alert('Please write some content first for AI to enhance.');
        return;
    }
    
    // Simulate AI enhancement
    alert('🤖 AI is enhancing your message...');
    
    setTimeout(() => {
        // Add AI-enhanced version
        body.value = currentText + '\n\n---\n[AI Enhanced: Added personalization, improved tone, and optimized for engagement]';
    }, 1000);
}

function saveDraft() {
    alert('📝 Draft saved! You can find it in your Drafts folder.');
}

function sendEmailMessage(e) {
    e.preventDefault();
    const to = document.getElementById('emailTo').value;
    const subject = document.getElementById('emailSubject').value;
    
    alert(`✅ Email sent successfully!\n\nTo: ${to}\nSubject: ${subject}\n\n(Demo - would send via Gmail API)`);
    closeModal();
}

function toggleTask(id) {
    // Would toggle task completion in database
    console.log('Toggle task:', id);
}

function makeCall(id) {
    const investor = sampleInvestors.find(i => i.id === id);
    if (investor) {
        alert(`Calling ${investor.name} at ${investor.phone}...`);
    }
}

function sendEmail(id) {
    const investor = sampleInvestors.find(i => i.id === id);
    if (investor) {
        window.location.href = `mailto:${investor.email}`;
    }
}

// ========== UTILITIES ==========
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Mobile menu toggle
document.querySelector('.menu-toggle')?.addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('active');
});

// ========== AI ASSISTANT ==========
document.querySelector('.header-btn[title="AI Assistant"]')?.addEventListener('click', function() {
    showAIAssistant();
});

function showAIAssistant() {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = '🤖 Gemini AI Assistant';
    modalBody.innerHTML = `
        <div class="ai-assistant-container">
            <div class="ai-chat-messages" id="aiChatMessages">
                <div class="ai-message assistant">
                    <div class="message-avatar">🤖</div>
                    <div class="message-content">
                        Hi! I'm your AI assistant powered by Gemini. How can I help you today?
                        <div class="quick-prompts">
                            <button onclick="aiPrompt('Who needs a follow-up call?')">📞 Who needs a follow-up?</button>
                            <button onclick="aiPrompt('Draft an email to platinum investors')">✉️ Draft investor email</button>
                            <button onclick="aiPrompt('Summarize this week\\'s activity')">📊 Weekly summary</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ai-chat-input">
                <input type="text" id="aiInput" placeholder="Ask anything about your investors..." onkeypress="if(event.key==='Enter') sendAIMessage()">
                <button onclick="sendAIMessage()"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
    `;
    
    document.getElementById('modalOverlay').classList.add('active');
    document.getElementById('aiInput').focus();
}

function aiPrompt(prompt) {
    document.getElementById('aiInput').value = prompt;
    sendAIMessage();
}

function sendAIMessage() {
    const input = document.getElementById('aiInput');
    const message = input.value.trim();
    if (!message) return;
    
    const chatMessages = document.getElementById('aiChatMessages');
    
    // Add user message
    chatMessages.innerHTML += `
        <div class="ai-message user">
            <div class="message-content">${message}</div>
            <div class="message-avatar">AL</div>
        </div>
    `;
    
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const response = generateAIResponse(message);
        chatMessages.innerHTML += `
            <div class="ai-message assistant">
                <div class="message-avatar">🤖</div>
                <div class="message-content">${response}</div>
            </div>
        `;
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

function generateAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('follow-up') || lowerMessage.includes('contact')) {
        return `📞 <strong>Follow-up Needed:</strong><br><br>
        Based on your investor data, I found:<br>
        • <strong>David Thompson</strong> - No contact in 42 days (HIGH PRIORITY)<br>
        • <strong>James Wilson</strong> - No contact in 77 days (AT RISK)<br>
        • <strong>Robert Williams</strong> - 17 days since last call<br><br>
        <button onclick="createFollowUpTasks()" class="btn btn-small btn-primary">Create Follow-up Tasks</button>`;
    }
    
    if (lowerMessage.includes('email') || lowerMessage.includes('draft')) {
        return `✉️ <strong>Email Draft Ready:</strong><br><br>
        Subject: Q1 2026 Update - Exciting News from CS3 Investments<br><br>
        Dear [Investor Name],<br><br>
        I hope this message finds you well. I wanted to reach out personally to share some exciting updates about our portfolio...<br><br>
        <button onclick="copyEmailDraft()" class="btn btn-small btn-primary">Copy Full Draft</button>
        <button onclick="editEmailDraft()" class="btn btn-small">Edit Draft</button>`;
    }
    
    if (lowerMessage.includes('summary') || lowerMessage.includes('week')) {
        return `📊 <strong>This Week's Summary:</strong><br><br>
        📞 <strong>47 calls</strong> made (↑8 from last week)<br>
        👥 <strong>12 new investors</strong> added<br>
        💰 <strong>$2.1M</strong> new commitments<br>
        ✅ <strong>89%</strong> positive sentiment<br><br>
        Top performer: You had 5 calls with platinum investors this week!`;
    }
    
    return `I understand you're asking about "${message}".<br><br>
    Based on your CRM data, here's what I found:<br>
    • Total investors: 623<br>
    • Active this month: 312<br>
    • Requiring attention: 23<br><br>
    Would you like me to provide more specific insights?`;
}

function createFollowUpTasks() {
    alert('✅ Created 3 follow-up tasks for at-risk investors!');
}

function copyEmailDraft() {
    alert('📋 Email draft copied to clipboard!');
}

function editEmailDraft() {
    alert('Opening email editor...');
}

// ========== GOOGLE VOICE INTEGRATION ==========
function initiateGoogleVoiceCall(phoneNumber, investorName) {
    // In production, this would use Google Voice API
    console.log(`Initiating Google Voice call to ${investorName} at ${phoneNumber}`);
    
    // Show call UI
    showCallUI(phoneNumber, investorName);
}

function showCallUI(phoneNumber, name) {
    const callUI = document.createElement('div');
    callUI.className = 'call-overlay';
    callUI.innerHTML = `
        <div class="call-modal">
            <div class="call-status">Calling...</div>
            <div class="call-name">${name}</div>
            <div class="call-number">${phoneNumber}</div>
            <div class="call-timer" id="callTimer">00:00</div>
            <div class="call-actions">
                <button class="call-btn mute"><i class="fas fa-microphone-slash"></i></button>
                <button class="call-btn end" onclick="endCall()"><i class="fas fa-phone-slash"></i></button>
                <button class="call-btn speaker"><i class="fas fa-volume-up"></i></button>
            </div>
        </div>
    `;
    document.body.appendChild(callUI);
    
    // Start timer
    let seconds = 0;
    window.callTimerInterval = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        document.getElementById('callTimer').textContent = `${mins}:${secs}`;
    }, 1000);
}

function endCall() {
    clearInterval(window.callTimerInterval);
    document.querySelector('.call-overlay')?.remove();
    showModal('newCall'); // Prompt to log the call
}

// ========== REAL-TIME UPDATES ==========
function updateDashboardStats() {
    // Simulate real-time stat updates
    const totalInvestorsEl = document.getElementById('totalInvestors');
    const callsThisWeekEl = document.getElementById('callsThisWeek');
    
    if (totalInvestorsEl) {
        // Occasionally increment
        if (Math.random() > 0.95) {
            const current = parseInt(totalInvestorsEl.textContent);
            totalInvestorsEl.textContent = current + 1;
            showNotification('🎉 New investor added!');
        }
    }
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

// Update stats every 30 seconds
setInterval(updateDashboardStats, 30000);

console.log('🚀 CS3 Intelligence CRM loaded successfully!');
console.log('📊 Loaded', sampleInvestors.length, 'investors');
console.log('📞 Loaded', sampleCalls.length, 'recent calls');
console.log('✅ Loaded', sampleTasks.length, 'tasks');
console.log('🤖 AI Assistant ready');
console.log('📱 Google Voice integration ready');
