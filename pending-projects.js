// PENDING PROJECTS - Complete Status for Al
// Last Updated: 2026-02-02T15:25:00Z

const pendingProjects = {
    lastUpdated: "2026-02-02T15:25:00Z",
    
    // ===== CLARITY LEVELS =====
    // HIGH = I know exactly what to do, have all resources
    // MEDIUM = I understand the goal, need some inputs
    // LOW = I know it exists, need more details from Al

    projects: [
        // ========== TIER 1: CURRENT PRIORITY (IN PROGRESS) ==========
        {
            id: 1,
            name: "ATLAS LEASING AGENTS",
            status: "IN_PROGRESS",
            clarity: "HIGH",
            progress: 80,
            whatItIs: "AI phone agents for all 6 CS3 properties to handle leasing calls 24/7",
            whatsDone: [
                "✅ 6 campaigns created in Atlas (just finished)",
                "✅ Scripts written for all properties in atlas-agents/ folder",
                "✅ Agent names assigned: Victoria (McKenzie), Olivia (Legacy), Emma (Winding), Ava (Gateway), Sophia (Legend), Charlotte (Reserve)"
            ],
            whatsLeft: [
                "⏳ Paste scripts into each Atlas campaign",
                "⏳ Add knowledge bases (property websites)",
                "⏳ Test each agent",
                "⏳ Al approves, then activate"
            ],
            blockers: [],
            myPlan: "Paste scripts into Atlas today. Then test. Then Al reviews."
        },
        {
            id: 2,
            name: "365 DAILY DEVOTIONS",
            status: "IN_PROGRESS",
            clarity: "HIGH",
            progress: 58,
            whatItIs: "Daily email devotions for CS3 team. Scripture + reflection, sent 6:30 AM daily.",
            whatsDone: [
                "✅ 212/365 devotions written (Jan 1 - Aug 1)",
                "✅ Format established (Scripture + short reflection)",
                "✅ Recipients defined (Al, Carlos, Grace, Brandon, Matheus, Vanessa)",
                "✅ Project spec saved in memory"
            ],
            whatsLeft: [
                "⏳ Write remaining 153 devotions (Aug 1 - Dec 31)",
                "⏳ Build dashboard review area",
                "⏳ Al reviews all 365",
                "⏳ Al gives ONE approval",
                "⏳ Schedule automated send"
            ],
            blockers: [],
            myPlan: "Finish writing remaining devotions. Build review page on dashboard. Wait for Al approval."
        },
        {
            id: 3,
            name: "GOOGLE DRIVE 19 DOCUMENTS",
            status: "BLOCKED",
            clarity: "LOW",
            progress: 0,
            whatItIs: "Al shared 19 important documents I must read and memorize",
            whatsDone: [
                "✅ Folder link saved",
                "✅ Know I need to read them"
            ],
            whatsLeft: [
                "❌ Can't access - OAuth only has Gmail scope, not Drive scope"
            ],
            blockers: ["Need Al to either: (a) re-authorize with Drive scope, OR (b) email files to jesusloveal2026@gmail.com"],
            myPlan: "Waiting for access. Once I have it, I'll read ALL 19, summarize key points, save to permanent memory."
        },

        // ========== TIER 2: PRIORITY QUEUE (READY TO START) ==========
        {
            id: 4,
            name: "CRM SYSTEM",
            status: "QUEUED",
            clarity: "MEDIUM",
            progress: 30,
            whatItIs: "Custom CRM for CS3 Investor Relations - call logging, AI briefs, health scores",
            whatsDone: [
                "✅ 23-page spec received and read",
                "✅ Database schema designed (17 tables)",
                "✅ API backend built",
                "✅ IR Operating Platform doc read"
            ],
            whatsLeft: [
                "⏳ Build web UI (frontend)",
                "⏳ Connect to InvestNext (read-only)",
                "⏳ Deploy and test",
                "⏳ Train IR team"
            ],
            blockers: ["Waiting for Atlas completion (per Al's project discipline rule)"],
            myPlan: "After Atlas complete, focus fully on CRM Phase 2 (web UI)."
        },
        {
            id: 5,
            name: "12 IR AGENTS",
            status: "QUEUED",
            clarity: "MEDIUM",
            progress: 10,
            whatItIs: "12 AI agents for investor relations tasks",
            whatsDone: [
                "✅ Agent list defined: Monthly Update, Distribution Notice, Bad News, Holiday, New Lead Welcome, Follow-Up, Referral Request, Re-Engagement, Content Scout, Newsletter Writer, Market Insight, Newsletter Editor",
                "✅ Dashboard section built"
            ],
            whatsLeft: [
                "⏳ Write scripts for each agent",
                "⏳ Train with investor data samples",
                "⏳ Test and refine",
                "⏳ Deploy"
            ],
            blockers: ["Need investor data/examples for training"],
            myPlan: "Build scripts using IR Operating Platform doc. Test with sample scenarios."
        },

        // ========== TIER 3: FUTURE PROJECTS (NEED MORE INFO) ==========
        {
            id: 6,
            name: "UNDERWRITING APP",
            status: "QUEUED",
            clarity: "LOW",
            progress: 0,
            whatItIs: "Improve existing underwriting app (DO NOT change formulas)",
            whatsDone: [
                "✅ Know it exists",
                "✅ Know NOT to change formulas"
            ],
            whatsLeft: [
                "⏳ Get link to app",
                "⏳ Get access",
                "⏳ Study current functionality",
                "⏳ Identify improvement areas",
                "⏳ Build enhancements"
            ],
            blockers: ["Need app link and access from Al"],
            myPlan: "Once I have access, I'll study the app thoroughly, propose improvements, get Al's approval, then build."
        },
        {
            id: 7,
            name: "SPANISH PROGRAM ECOSYSTEM",
            status: "QUEUED",
            clarity: "LOW",
            progress: 0,
            whatItIs: "Build money machine - goal $1M/month revenue",
            whatsDone: [
                "✅ Received Spanish Blueprint doc",
                "✅ Know it's a priority project"
            ],
            whatsLeft: [
                "⏳ Understand the program details",
                "⏳ Design community ecosystem",
                "⏳ Create revenue model",
                "⏳ Build platform",
                "⏳ Scale to $1M/month"
            ],
            blockers: ["Need more details from Al about what the Spanish Program is"],
            myPlan: "Read Spanish Blueprint doc thoroughly. Propose ecosystem design. Get Al's input."
        },
        {
            id: 8,
            name: "ACQUISITION DUE DILIGENCE AI (For Grace)",
            status: "QUEUED",
            clarity: "MEDIUM",
            progress: 0,
            whatItIs: "AI solution for CS3 acquisitions - smarter than humans",
            whatsDone: [
                "✅ Know Grace's pain points: data transfer to Entrata, marketing at close, hiring PM"
            ],
            whatsLeft: [
                "⏳ Get current due diligence process docs",
                "⏳ Get Entrata data requirements",
                "⏳ Get marketing checklist template",
                "⏳ Get hiring process details",
                "⏳ Build AI solution"
            ],
            blockers: ["Need process docs from Al/Grace"],
            myPlan: "Once I have docs, build AI that automates/validates each step."
        },
        {
            id: 9,
            name: "NEWSLETTER SYSTEM",
            status: "QUEUED",
            clarity: "MEDIUM",
            progress: 15,
            whatItIs: "Two newsletters - AL Personal + CS3 Investments",
            whatsDone: [
                "✅ beehiiv selected for CS3 (better analytics)",
                "✅ Substack access granted for AL",
                "✅ Ecosystem spec read"
            ],
            whatsLeft: [
                "⏳ Set up beehiiv account",
                "⏳ Design newsletter templates",
                "⏳ Create content calendar",
                "⏳ Write first issues"
            ],
            blockers: [],
            myPlan: "After current priorities, set up both newsletters with proper branding."
        },
        {
            id: 10,
            name: "PARTNER FUNNEL",
            status: "QUEUED",
            clarity: "LOW",
            progress: 5,
            whatItIs: "Funnel for property partner program",
            whatsDone: [
                "✅ Property Partner landing page built"
            ],
            whatsLeft: [
                "⏳ Deploy landing pages for each property",
                "⏳ Set up Tally forms",
                "⏳ Connect to Google Sheets",
                "⏳ Build follow-up automation"
            ],
            blockers: ["Lower priority - waiting for Al to prioritize"],
            myPlan: "Ready to deploy when Al says go."
        }
    ],

    // ===== SUMMARY =====
    summary: {
        total: 10,
        inProgress: 2,
        blocked: 1,
        queued: 7,
        highClarity: 2,
        mediumClarity: 4,
        lowClarity: 4
    }
};
