        // lucide icons initialization
        lucide.createIcons();

        // Smooth scroll for internal anchors
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                e.preventDefault();
                const targetId = a.getAttribute('href');
                document.querySelector(targetId).scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Close mobile menu on link click
                const navMenu = document.getElementById('nav-menu');
                if (navMenu.classList.contains('is-active')) {
                    toggleMobileMenu();
                }
            });
        });

        // Intersection Observer for Staggered Animation
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');

                    const items = entry.target.querySelectorAll('.card, .stat, .reveal-item');
                    items.forEach((item, index) => {
                        item.style.transitionDelay = `${index * 100}ms`;
                        item.classList.add('show');
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.section-wrap, .hero').forEach(el => {
            revealObserver.observe(el);
        });

        // Audience pills/dropdown behaviour
        let currentAudience = 'farmer';
        const roleDropdown = document.getElementById('role-dropdown');
        const roleDropdownBtn = document.getElementById('role-dropdown-btn');
        const dropdownItems = document.querySelectorAll('.dropdown-item');

        // Toggle dropdown
        roleDropdownBtn.addEventListener('click', () => {
            roleDropdown.classList.toggle('is-open');
        });

        // Handle item selection
        dropdownItems.forEach(item => {
            item.addEventListener('click', () => {
                const aud = item.dataset.audience;

                // Update button text
                roleDropdownBtn.querySelector('span').textContent = item.textContent;

                // Update active state
                dropdownItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                // Close dropdown
                roleDropdown.classList.remove('is-open');

                // Call the main audience logic
                setAudience(aud);
            });
        });

        // Close dropdown if clicking outside
        window.addEventListener('click', (e) => {
            if (!roleDropdown.contains(e.target)) {
                roleDropdown.classList.remove('is-open');
            }
        });


        // Language support (EN + Gujarati)
        let lang = 'en'; // <-- DEFAULT LANGUAGE IS SET HERE

        const translations = {
            en: {
                // ... (All existing 'en' translations remain unchanged for brevity) ...
                pageTitle: 'Rupiya.app — Earth → Cloud (Pro Enhanced)',
                navPrototype: 'Earth → Cloud prototype',
                navHome: 'Home', navResidue: 'Residue-Free', navTasks: 'Task Manager', navCarbon: 'Carbon Credits', navFinance: 'Finance',
                pillFarmer: 'Farmers', pillFPO: 'FPOs', pillBuyer: 'Buyers', pillInvestor: 'Investors',
                learnCredits: 'How Carbon Credits Work',
                statFarmers: 'Farmers (target)', statHectares: 'Hectares (target)', statCredit: '/verified credit',
                heroTitle: '<span class="accent">Where soil</span> meets <span class="accent">satellite</span> — turn better farming into real income',
                heroSub_farmer: 'Residue-free farming • Satellite soil testing • Verified carbon credits • Farmer-first finance',
                heroSub_fpo: 'Training & buy-back • Carbon revenue for groups • Supply-chain support',
                heroSub_buyer: 'Traceable residue-free produce • Certifications & procurement',
                heroSub_investor: 'Impact metrics • Carbon inventory • Partnerships',
                joinFarmer: 'Join as Farmer', joinFPO: 'Partner as FPO', contactBuyers: 'Contact for Procurement', contactInvestors: 'Contact for Investors',
                illuSoil: 'Soil Data', illuSatellite: 'Satellite Monitor', illuCarbon: 'Carbon', illuIncome: 'Income', illuCloud: 'Rupiya AI Cloud',
                resTitle: 'Residue-Free Farming — how it works', resSub: 'Satellite soil testing → AI monitoring → Expert advisory → Residue-free inputs → Buy-back',
                resDiagramTitle: 'Soil → Satellite → Proof (interactive)',
                resLayer1: 'Soil Organic Layer (Carbon Storage)', resLayer2: 'Root Zone & Microbial Activity', resLayer3: 'Satellite Imagery & AI Analytics (Verification)',
                keyServicesTitle: 'Key services',
                service1Title: 'AI Soil Analytics', service1Desc: 'Satellite + local sensors → actionable scores',
                service2Title: 'Agronomy Support', service2Desc: 'On-field experts + mobile guidance for implementation',
                service3Title: 'Farm-Gate Buy-back', service3Desc: 'Direct procurement removes middlemen, ensures fair price',
                tasksTitle: 'AI-Driven Task Manager',
                tasksSub: 'Actionable guidance generated from satellite data, weather, and soil health scores.',
                taskListTitle: 'Upcoming Actions (Field 1)',
                progressLabel: 'Compliance Score for Carbon Verification',
                logAction: 'Log New Action/Input',
                task1Title: 'Apply Organic Manure (High Priority)', task1Desc: 'AI indicates low SOC activity; required for Q4 carbon verification.', task1Date: 'Due: Nov 25',
                task2Title: 'Check Irrigation System', task2Desc: 'Satellite detected slight moisture stress in southern quadrant.', task2Date: 'Due: Nov 21',
                task3Title: 'Agronomy Follow-up', task3Desc: 'Review application technique with field agent.', task3Date: 'Due: Nov 28',
                carbonTitle: 'Carbon Credits — simple & farmer-friendly',
                carbonSub: 'How soil carbon increases and how farmers earn ₹800 per verified credit',
                creditWhatTitle: 'What is a carbon credit?',
                creditWhatDesc: 'A verified unit representing stored $\\text{CO}_2$. Regenerative practices increase **Soil Organic Carbon (SOC)** which is verified using $\\text{AI}$ and converted into marketable credits.',
                creditEarnTitle: 'How it earns ₹800',
                creditEarnDesc: 'Each verified credit pays the farmer approximately **₹800**. Verification is conducted through independent, certified partners (e.g., Carboneg) using digital traceability for transparency.',
                targetTitle: 'Target & Scalability',
                targetDesc: 'Our goal is to onboard **50,000+ farmers** across **5,00,000 hectares** in 3 years—providing essential training and continuous field support.',
                calcTitle: 'Farmer Income Calculator',
                labelArea: 'Area (hectares)', labelPractice: 'Practice factor (0.1 - 1)',
                optMinimal: 'Minimal regenerative (0.2)', optGood: 'Good practice (0.5)', optAdvanced: 'Advanced (0.8)',
                calcAssumption: 'Assumption: 1 credit $\\approx$ 1 tonne $\\text{CO}_2$ sequestered; ₹800/credit',
                estimateBtn: 'Estimate Income',
                calcPlaceholder: 'Enter area & practice to estimate',
                calcResultPrefix: 'Estimated income: ₹',
                logActionTitle: 'Log New Action/Input',
                logActionDesc: 'Record your farming activity for verification and compliance tracking.',
                logActionType: 'Action Type',
                logActionDate: 'Date',
                logActionField: 'Field',
                logActionDetails: 'Details',
                logActionSubmit: 'Submit',
                logOptFertilizer: 'Fertilizer Application',
                logOptIrrigation: 'Irrigation',
                logOptPesticide: 'Pesticide Application',
                logOptHarvest: 'Harvest',
                logOptOther: 'Other',
                logOptField1: 'Field 1',
                logOptField2: 'Field 2',
                logOptField3: 'Field 3',
                transparencyTitle: 'Supply Chain Transparency',
                transparencyDesc: 'View the digital ledger (mock) of a verified batch.',
                traceBtn: 'Show Traceability Demo',
                modalTitle: 'Traceability Demo — Sample Batch Ledger',
                modalDesc: 'Scan the QR (mock) or inspect the JSON below. This ledger links the final produce to the verified carbon credits.',
                batchIdText: 'Batch ID',
                modalClose: 'Close',
                financeTitle: 'Financial Inclusivity — future roadmap',
                financeSub: 'Digital recharge, small loans, digital gold, and insurance are planned farmer-first features.',
                finance1Title: 'Digital Payments', finance1Desc: 'Easy mobile top-up, utility bill payments, and merchant transactions within the Rupiya Wallet.',
                finance2Title: 'Credit Access', finance2Desc: 'Collateral-light loans and microfinance options using verified crop data and farm traceability scores.',
                finance3Title: 'Parametric Insurance', finance3Desc: 'Customized products for climate risks like excess rain, heat shock, or specific crop damage events.',
                onboardTitle: 'Ready to onboard and earn?',
                onboardDesc: 'Join our pilot program and start earning revenue from soil health and climate action today.',
                tipL1: 'Soil Organic Carbon (SOC) storage is measured by satellite spectroscopy and validated by ground sensors.',
                tipL2: 'Microbial health and nutrient activity in the root zone ensure healthy, residue-free produce.',
                tipL3: 'AI processes satellite data to provide real-time field scores and proof of regenerative practices.',
                navJourney: 'Farmer Journey',
                journeyTitle: 'Your Journey to Carbon Credits',
                journeySub: 'Simple steps from registration to earning carbon credits',
                journeyStep1Title: 'Registration & Field Mapping',
                journeyStep1Desc: 'Sign up with your mobile number, add your farm details, and map your fields using GPS or satellite imagery. Our team verifies your information.',
                journeyStep2Title: 'Soil Testing & Analysis',
                journeyStep2Desc: 'Satellite-based soil testing analyzes your field\'s organic carbon levels. AI processes the data to create your baseline soil health score.',
                journeyStep3Title: 'AI Recommendations',
                journeyStep3Desc: 'Receive personalized recommendations for regenerative practices: organic inputs, crop rotation, cover crops, and residue management tailored to your field.',
                journeyStep4Title: 'Implementation Support',
                journeyStep4Desc: 'Get on-field support from agronomists, access to quality inputs, and step-by-step mobile guidance. Log your activities through the app.',
                journeyStep5Title: 'Monitoring & Verification',
                journeyStep5Desc: 'Satellite monitoring tracks your progress. AI verifies your practices match recommendations. Regular compliance scores show your carbon credit potential.',
                journeyStep6Title: 'Carbon Credit Generation',
                journeyStep6Desc: 'After 12-18 months of verified practices, your increased soil organic carbon is converted into verified carbon credits by certified partners.',
                journeyStep7Title: 'Payment & Rewards',
                journeyStep7Desc: 'Receive ₹800 per verified credit directly to your bank account within 30 days. Track your earnings and access additional financial services.',
                fpoTitle: 'FPO Partnership Dashboard',
                fpoSub: 'Manage your member farmers, track group performance, and maximize collective carbon credit earnings',
                fpoStat1Label: 'Active Member Farmers',
                fpoStat1Desc: 'Across 15 villages',
                fpoStat2Label: 'Total Carbon Revenue',
                fpoStat2Desc: 'This quarter',
                fpoStat3Label: 'Verified Credits',
                fpoStat3Desc: 'Generated this year',
                fpoStat4Label: 'Hectares Monitored',
                fpoStat4Desc: 'Under FPO management',
                fpoStat5Label: 'Bulk Procurement Value',
                fpoStat5Desc: 'Residue-free produce',
                fpoStat6Label: 'Compliance Score',
                fpoStat6Desc: 'Group average',
                fpoChartTitle: 'Member Growth & Carbon Credits Over Time',
                fpoChartPlaceholder: 'Interactive chart showing member growth and carbon credit generation trends',
                navFPODashboard: 'FPO Dashboard',
                navFPOMembers: 'Member Management',
                navFPOProcurement: 'Bulk Procurement',
                fpoMembersTitle: 'Member Management',
                fpoMembersSub: 'Track and manage your FPO member farmers, their fields, and compliance status',
                fpoMembersActive: 'Active Members',
                fpoMembersActiveDesc: 'Compliant with practices',
                fpoMembersFields: 'Total Fields',
                fpoMembersFieldsDesc: 'Under monitoring',
                fpoMembersCompliance: 'Average Compliance',
                fpoMembersComplianceDesc: 'This quarter',
                fpoMembersTraining: 'Training Sessions',
                fpoMembersTrainingDesc: 'Scheduled this month',
                fpoProcurementTitle: 'Bulk Procurement',
                fpoProcurementSub: 'Manage bulk procurement of residue-free produce from member farmers',
                fpoProcurement1Title: 'Aggregation Hub',
                fpoProcurement1Desc: 'Central collection point for member produce with quality checks and sorting facilities.',
                fpoProcurement2Title: 'Quality Assurance',
                fpoProcurement2Desc: 'Automated quality testing and certification before bulk sale to buyers.',
                fpoProcurement3Title: 'Fair Pricing',
                fpoProcurement3Desc: 'Transparent pricing model ensuring fair returns to all member farmers.',
                navBuyerCatalog: 'Product Catalog',
                navBuyerTraceability: 'Traceability',
                navBuyerProcurement: 'Procurement',
                navBuyerCertifications: 'Certifications',
                buyerCatalogTitle: 'Residue-Free Product Catalog',
                buyerCatalogSub: 'Browse verified residue-free produce with complete traceability',
                productBadgeCertified: 'Certified',
                product1Name: 'Organic Wheat',
                product1Desc: 'Premium quality, residue-free wheat from verified farms',
                product1Price: '₹2,800/quintal',
                product2Name: 'Organic Cotton',
                product2Desc: 'Traceable organic cotton with carbon credit certification',
                product2Price: '₹6,500/quintal',
                product3Name: 'Organic Vegetables',
                product3Desc: 'Fresh, residue-free vegetables from verified farms',
                product3Price: '₹45/kg',
                productViewDetails: 'View Details',
                buyerTraceabilityTitle: 'Complete Traceability Flow',
                buyerTraceabilitySub: 'Track your produce from farm to your facility with complete transparency',
                flowStep1Title: 'Farm Origin',
                flowStep1Desc: 'Verified farm location, soil health, and farming practices',
                flowStep2Title: 'Harvest & Collection',
                flowStep2Desc: 'Timestamped harvest with GPS coordinates and quality checks',
                flowStep3Title: 'Processing',
                flowStep3Desc: 'Certified processing facilities with quality control',
                flowStep4Title: 'Distribution',
                flowStep4Desc: 'Real-time tracking during transportation to your facility',
                flowStep5Title: 'Delivery',
                flowStep5Desc: 'Final delivery with complete documentation and certificates',
                buyerProcurementTitle: 'Procurement Portal',
                buyerProcurementSub: 'Place orders, track deliveries, and manage your procurement pipeline',
                buyerProcurement1Title: 'Order Management',
                buyerProcurement1Desc: 'Create and track bulk orders with automated inventory management.',
                buyerProcurement2Title: 'Delivery Scheduling',
                buyerProcurement2Desc: 'Schedule deliveries based on your production calendar and storage capacity.',
                buyerProcurement3Title: 'Quality Reports',
                buyerProcurement3Desc: 'Access detailed quality reports and certificates for each batch.',
                buyerCertificationsTitle: 'Quality Certifications',
                buyerCertificationsSub: 'Verified certifications for all your procured produce',
                buyerCert1Title: 'Residue-Free Certification',
                buyerCert1Desc: 'Verified zero pesticide residue through lab testing and satellite monitoring.',
                buyerCert2Title: 'Organic Certification',
                buyerCert2Desc: 'Certified organic produce meeting international organic standards.',
                buyerCert3Title: 'Carbon Credit Verified',
                buyerCert3Desc: 'Produce from farms with verified carbon credit generation.',
                navInvestorDashboard: 'Impact Dashboard',
                navInvestorMetrics: 'ROI Metrics',
                navInvestorPortfolio: 'Portfolio',
                navInvestorOpportunities: 'Opportunities',
                investorDashboardTitle: 'Impact Dashboard',
                investorDashboardSub: 'Track environmental and financial impact of your investments',
                investorMetric1Label: 'Farmers Impacted',
                investorMetric1Change: '+15% this quarter',
                investorMetric2Label: 'Tonnes CO₂ Sequestered',
                investorMetric2Change: '+22% this quarter',
                investorMetric3Label: 'Total Investment',
                investorMetric3Change: 'ROI: 18.5%',
                investorMetric4Label: 'Hectares Under Management',
                investorMetric4Change: '+8% expansion',
                investorMetricsTitle: 'ROI & Financial Metrics',
                investorMetricsSub: 'Detailed financial performance and return on investment analytics',
                investorROI1Label: 'Annual ROI',
                investorROI1Desc: 'Based on carbon credits',
                investorROI2Label: 'Revenue Generated',
                investorROI2Desc: 'This fiscal year',
                investorROI3Label: 'Target Achievement',
                investorROI3Desc: 'Carbon credit goals',
                investorROI4Label: 'Avg Revenue/Farmer',
                investorROI4Desc: 'Annual average',
                investorPortfolioTitle: 'Investment Portfolio',
                investorPortfolioSub: 'Manage and track your investment portfolio across different regions and crops',
                investorPortfolio1Title: 'Geographic Distribution',
                investorPortfolio1Desc: 'View investments across different states and regions with performance metrics.',
                investorPortfolio2Title: 'Crop Diversification',
                investorPortfolio2Desc: 'Track investments across different crop types and their carbon potential.',
                investorPortfolio3Title: 'Timeline & Milestones',
                investorPortfolio3Desc: 'Monitor investment timelines, carbon credit generation milestones, and payouts.',
                investorOpportunitiesTitle: 'Investment Opportunities',
                investorOpportunitiesSub: 'Explore new investment opportunities in regenerative agriculture',
                investorOpp1Title: 'FPO Partnerships',
                investorOpp1Desc: 'Invest in FPOs to scale impact across multiple farmers and regions.',
                investorOpp2Title: 'Regional Expansion',
                investorOpp2Desc: 'Fund expansion into new regions with high carbon credit potential.',
                investorOpp3Title: 'Technology Upgrades',
                investorOpp3Desc: 'Invest in AI and satellite technology to improve verification and scaling.',
                farmerActionsTitle: 'Quick Actions & Alerts',
                farmerActionsSub: 'Stay updated with important notifications and take quick actions',
                alertNew: 'NEW',
                farmerAction1Title: 'Weather Alert',
                farmerAction1Desc: 'Heavy rainfall expected in 2 days. Prepare your fields accordingly.',
                farmerAction2Title: 'Upcoming Tasks',
                farmerAction2Desc: '3 tasks due this week. Complete them to maintain compliance score.',
                farmerAction3Title: 'Payment Status',
                farmerAction3Desc: '₹12,000 pending payment. Expected to credit in 5 days.',
                viewDetails: 'View Details',
                viewTasks: 'View Tasks',
                checkPayment: 'Check Payment',
                fpoToolsTitle: 'Member Tools & Reports',
                fpoToolsSub: 'Search members, generate reports, and manage FPO operations',
                searchMemberPlaceholder: 'Search by name, village, or ID...',
                searchBtn: 'Search',
                exportReport: 'Export Report',
                fpoTool1Title: 'Compliance Report',
                fpoTool1Desc: 'Generate detailed compliance reports for all members with export options.',
                fpoTool2Title: 'Performance Analytics',
                fpoTool2Desc: 'View group performance metrics, trends, and improvement areas.',
                fpoTool3Title: 'Bulk Notifications',
                fpoTool3Desc: 'Send announcements and updates to all members via SMS or app.',
                buyerToolsTitle: 'Order Management & Tracking',
                buyerToolsSub: 'Track orders, filter products, and manage your procurement',
                filterAll: 'All Orders',
                filterPending: 'Pending',
                filterProcessing: 'Processing',
                filterShipped: 'Shipped',
                filterDelivered: 'Delivered',
                searchOrderPlaceholder: 'Search orders...',
                filterBtn: 'Filter',
                buyerTool1Title: 'Live Tracking',
                buyerTool1Desc: 'Real-time tracking of your orders from farm to facility with GPS updates.',
                buyerTool2Title: 'Advanced Filters',
                buyerTool2Desc: 'Filter by crop type, certification, region, or carbon credit status.',
                buyerTool3Title: 'Export Data',
                buyerTool3Desc: 'Download order history, certificates, and traceability reports.',
                investorToolsTitle: 'Analytics & Insights',
                investorToolsSub: 'Advanced analytics, charts, and investment insights',
                periodWeek: 'Last Week',
                periodMonth: 'Last Month',
                periodQuarter: 'Last Quarter',
                periodYear: 'Last Year',
                generateReport: 'Generate Report',
                exportData: 'Export Data',
                investorTool1Title: 'ROI Trends',
                investorTool1Desc: 'Interactive charts showing ROI trends over time with projections.',
                investorTool2Title: 'Portfolio Breakdown',
                investorTool2Desc: 'Visual breakdown of investments by region, crop, and performance.',
                investorTool3Title: 'Impact Metrics',
                investorTool3Desc: 'Track environmental impact, carbon sequestration, and farmer benefits.',
            },
            hi: {
                pageTitle: 'रुपिया.ऐप — पृथ्वी → क्लाउड (प्रो एन्हान्सड)',
                navPrototype: 'पृथ्वी → क्लाउड प्रोटोटाइप',
                navHome: 'होम', navResidue: 'अवशेष-मुक्त', navTasks: 'कार्य प्रबंधक', navJourney: 'किसान यात्रा', navCarbon: 'कार्बन क्रेडिट', navFinance: 'वित्त',
                pillFarmer: 'किसान', pillFPO: 'FPOs', pillBuyer: 'खरीदार', pillInvestor: 'निवेशक',
                learnCredits: 'कार्बन क्रेडिट कैसे काम करते हैं',
                statFarmers: 'किसान (लक्ष्य)', statHectares: 'हेक्टेयर (लक्ष्य)', statCredit: '/सत्यापित क्रेडिट',
                heroTitle: '<span class="accent">जहां मिट्टी</span> मिलती है <span class="accent">उपग्रह से</span> — बेहतर खेती को वास्तविक आय में बदलें',
                heroSub_farmer: 'अवशेष-मुक्त खेती • उपग्रह मिट्टी परीक्षण • सत्यापित कार्बन क्रेडिट • किसान-प्रथम वित्त',
                heroSub_fpo: 'प्रशिक्षण और खरीद-वापसी • समूहों के लिए कार्बन राजस्व • आपूर्ति-श्रृंखला सहायता',
                heroSub_buyer: 'ट्रेस करने योग्य अवशेष-मुक्त उत्पाद • प्रमाणपत्र और खरीद',
                heroSub_investor: 'प्रभाव मेट्रिक्स • कार्बन इन्वेंटरी • साझेदारी',
                joinFarmer: 'किसान के रूप में जुड़ें', joinFPO: 'FPO के रूप में साझेदार', contactBuyers: 'खरीद के लिए संपर्क करें', contactInvestors: 'निवेशकों के लिए संपर्क करें',
                illuSoil: 'मिट्टी डेटा', illuSatellite: 'उपग्रह मॉनिटर', illuCarbon: 'कार्बन', illuIncome: 'आय', illuCloud: 'रुपिया AI क्लाउड',
                resTitle: 'अवशेष-मुक्त खेती — यह कैसे काम करती है', resSub: 'उपग्रह मिट्टी परीक्षण → AI निगरानी → विशेषज्ञ सलाह → अवशेष-मुक्त इनपुट → खरीद-वापसी',
                resDiagramTitle: 'मिट्टी → उपग्रह → प्रमाण (इंटरैक्टिव)',
                resLayer1: 'मिट्टी कार्बनिक परत (कार्बन भंडारण)', resLayer2: 'जड़ क्षेत्र और सूक्ष्मजीव गतिविधि', resLayer3: 'उपग्रह इमेजरी और AI एनालिटिक्स (सत्यापन)',
                keyServicesTitle: 'मुख्य सेवाएं',
                service1Title: 'AI मिट्टी एनालिटिक्स', service1Desc: 'उपग्रह + स्थानीय सेंसर → कार्रवाई योग्य स्कोर',
                service2Title: 'कृषि विज्ञान सहायता', service2Desc: 'कार्यान्वयन के लिए मैदानी विशेषज्ञ + मोबाइल मार्गदर्शन',
                service3Title: 'फार्म-गेट खरीद-वापसी', service3Desc: 'प्रत्यक्ष खरीद बिचौलियों को हटाती है, उचित मूल्य सुनिश्चित करती है',
                tasksTitle: 'AI-संचालित कार्य प्रबंधक',
                tasksSub: 'उपग्रह डेटा, मौसम और मिट्टी स्वास्थ्य स्कोर से उत्पन्न कार्रवाई योग्य मार्गदर्शन।',
                taskListTitle: 'आगामी कार्य (फील्ड 1)',
                progressLabel: 'कार्बन सत्यापन के लिए अनुपालन स्कोर',
                logAction: 'नई कार्रवाई/इनपुट लॉग करें',
                task1Title: 'जैविक खाद लागू करें (उच्च प्राथमिकता)', task1Desc: 'AI कम SOC गतिविधि इंगित करता है; Q4 कार्बन सत्यापन के लिए आवश्यक।', task1Date: 'नियत: नवंबर 25',
                task2Title: 'सिंचाई प्रणाली जांचें', task2Desc: 'उपग्रह ने दक्षिणी चतुर्थांश में हल्की नमी तनाव का पता लगाया।', task2Date: 'नियत: नवंबर 21',
                task3Title: 'कृषि विज्ञान फॉलो-अप', task3Desc: 'फील्ड एजेंट के साथ अनुप्रयोग तकनीक की समीक्षा करें।', task3Date: 'नियत: नवंबर 28',
                carbonTitle: 'कार्बन क्रेडिट — सरल और किसान-अनुकूल',
                carbonSub: 'मिट्टी कार्बन कैसे बढ़ता है और किसान ₹800 प्रति सत्यापित क्रेडिट कैसे कमाते हैं',
                creditWhatTitle: 'कार्बन क्रेडिट क्या है?',
                creditWhatDesc: 'संग्रहीत $\\text{CO}_2$ का प्रतिनिधित्व करने वाला सत्यापित इकाई। पुनर्जीवन प्रथाएं **मिट्टी कार्बनिक कार्बन (SOC)** में वृद्धि करती हैं जिसे $\\text{AI}$ का उपयोग करके सत्यापित किया जाता है और विपणन योग्य क्रेडिट में परिवर्तित किया जाता है।',
                creditEarnTitle: 'यह ₹800 कैसे कमाता है',
                creditEarnDesc: 'प्रत्येक सत्यापित क्रेडिट किसान को लगभग **₹800** का भुगतान करता है। पारदर्शिता के लिए डिजिटल ट्रेसबिलिटी का उपयोग करके स्वतंत्र, प्रमाणित भागीदारों (जैसे, कार्बोनेग) द्वारा सत्यापन किया जाता है।',
                targetTitle: 'लक्ष्य और स्केलेबिलिटी',
                targetDesc: 'हमारा लक्ष्य 3 वर्षों में **50,000+ किसानों** को **5,00,000 हेक्टेयर** में ऑनबोर्ड करना है—आवश्यक प्रशिक्षण और निरंतर फील्ड सहायता प्रदान करना।',
                calcTitle: 'किसान आय कैलकुलेटर',
                labelArea: 'क्षेत्र (हेक्टेयर)', labelPractice: 'अभ्यास कारक (0.1 - 1)',
                optMinimal: 'न्यूनतम पुनर्जीवन (0.2)', optGood: 'अच्छा अभ्यास (0.5)', optAdvanced: 'उन्नत (0.8)',
                calcAssumption: 'धारणा: 1 क्रेडिट $\\approx$ 1 टन $\\text{CO}_2$ अलग किया गया; ₹800/क्रेडिट',
                estimateBtn: 'आय का अनुमान',
                calcPlaceholder: 'अनुमान के लिए क्षेत्र और अभ्यास दर्ज करें',
                calcResultPrefix: 'अनुमानित आय: ₹',
                logActionTitle: 'नई कार्रवाई/इनपुट लॉग करें',
                logActionDesc: 'सत्यापन और अनुपालन ट्रैकिंग के लिए अपनी खेती गतिविधि रिकॉर्ड करें।',
                logActionType: 'कार्रवाई प्रकार',
                logActionDate: 'तारीख',
                logActionField: 'फील्ड',
                logActionDetails: 'विवरण',
                logActionSubmit: 'सबमिट करें',
                logOptFertilizer: 'उर्वरक अनुप्रयोग',
                logOptIrrigation: 'सिंचाई',
                logOptPesticide: 'कीटनाशक अनुप्रयोग',
                logOptHarvest: 'फसल',
                logOptOther: 'अन्य',
                logOptField1: 'फील्ड 1',
                logOptField2: 'फील्ड 2',
                logOptField3: 'फील्ड 3',
                transparencyTitle: 'आपूर्ति श्रृंखला पारदर्शिता',
                transparencyDesc: 'सत्यापित बैच का डिजिटल लेजर (मॉक) देखें।',
                traceBtn: 'ट्रेसबिलिटी डेमो दिखाएं',
                modalTitle: 'ट्रेसबिलिटी डेमो — नमूना बैच लेजर',
                modalDesc: 'QR स्कैन करें (मॉक) या नीचे JSON का निरीक्षण करें। यह लेजर अंतिम उत्पाद को सत्यापित कार्बन क्रेडिट से जोड़ता है।',
                batchIdText: 'बैच ID',
                modalClose: 'बंद करें',
                financeTitle: 'वित्तीय समावेश — भविष्य का रोडमैप',
                financeSub: 'डिजिटल रिचार्ज, छोटे ऋण, डिजिटल गोल्ड, और बीमा नियोजित किसान-प्रथम सुविधाएं हैं।',
                finance1Title: 'डिजिटल भुगतान', finance1Desc: 'रुपिया वॉलेट के भीतर आसान मोबाइल टॉप-अप, उपयोगिता बिल भुगतान, और व्यापारी लेनदेन।',
                finance2Title: 'क्रेडिट एक्सेस', finance2Desc: 'सत्यापित फसल डेटा और फार्म ट्रेसबिलिटी स्कोर का उपयोग करके संपार्श्विक-हल्के ऋण और सूक्ष्म वित्त विकल्प।',
                finance3Title: 'पैरामीट्रिक बीमा', finance3Desc: 'अत्यधिक वर्षा, हीट शॉक, या विशिष्ट फसल क्षति घटनाओं जैसे जलवायु जोखिमों के लिए अनुकूलित उत्पाद।',
                onboardTitle: 'ऑनबोर्ड और कमाई करने के लिए तैयार?',
                onboardDesc: 'हमारे पायलट कार्यक्रम में शामिल हों और आज ही मिट्टी स्वास्थ्य और जलवायु कार्रवाई से राजस्व कमाना शुरू करें।',
                tipL1: 'मिट्टी कार्बनिक कार्बन (SOC) भंडारण उपग्रह स्पेक्ट्रोस्कोपी द्वारा मापा जाता है और जमीनी सेंसर द्वारा मान्य किया जाता है।',
                tipL2: 'जड़ क्षेत्र में सूक्ष्मजीव स्वास्थ्य और पोषक तत्व गतिविधि स्वस्थ, अवशेष-मुक्त उत्पाद सुनिश्चित करती है।',
                tipL3: 'AI वास्तविक समय फील्ड स्कोर और पुनर्जीवन प्रथाओं के प्रमाण प्रदान करने के लिए उपग्रह डेटा पर प्रक्रिया करता है।',
                navJourney: 'किसान यात्रा',
                journeyTitle: 'कार्बन क्रेडिट तक आपकी यात्रा',
                journeySub: 'सत्यापित क्रेडिट कमाने के लिए पंजीकरण से सरल कदम',
                journeyStep1Title: 'पंजीकरण और फील्ड मैपिंग',
                journeyStep1Desc: 'अपने मोबाइल नंबर से साइन अप करें, अपने फार्म विवरण जोड़ें, और GPS या उपग्रह इमेजरी का उपयोग करके अपने खेतों को मैप करें। हमारी टीम आपकी जानकारी सत्यापित करती है।',
                journeyStep2Title: 'मिट्टी परीक्षण और विश्लेषण',
                journeyStep2Desc: 'उपग्रह-आधारित मिट्टी परीक्षण आपके खेत के कार्बनिक कार्बन स्तर का विश्लेषण करता है। AI आपके बेसलाइन मिट्टी स्वास्थ्य स्कोर बनाने के लिए डेटा पर प्रक्रिया करता है।',
                journeyStep3Title: 'AI सिफारिशें',
                journeyStep3Desc: 'पुनर्जीवन प्रथाओं के लिए व्यक्तिगत सिफारिशें प्राप्त करें: जैविक इनपुट, फसल रोटेशन, कवर फसलें, और आपके खेत के अनुरूप अवशेष प्रबंधन।',
                journeyStep4Title: 'कार्यान्वयन सहायता',
                journeyStep4Desc: 'कृषि विज्ञानियों से मैदानी सहायता, गुणवत्तापूर्ण इनपुट तक पहुंच, और चरण-दर-चरण मोबाइल मार्गदर्शन प्राप्त करें। ऐप के माध्यम से अपनी गतिविधियों को लॉग करें।',
                journeyStep5Title: 'निगरानी और सत्यापन',
                journeyStep5Desc: 'उपग्रह निगरानी आपकी प्रगति को ट्रैक करती है। AI सत्यापित करता है कि आपकी प्रथाएं सिफारिशों से मेल खाती हैं। नियमित अनुपालन स्कोर आपकी कार्बन क्रेडिट क्षमता दिखाते हैं।',
                journeyStep6Title: 'कार्बन क्रेडिट जनरेशन',
                journeyStep6Desc: '12-18 महीनों के सत्यापित अभ्यास के बाद, आपके बढ़े हुए मिट्टी कार्बनिक कार्बन को प्रमाणित भागीदारों द्वारा सत्यापित कार्बन क्रेडिट में परिवर्तित किया जाता है।',
                journeyStep7Title: 'भुगतान और पुरस्कार',
                journeyStep7Desc: '30 दिनों के भीतर प्रत्येक सत्यापित क्रेडिट के लिए ₹800 सीधे अपने बैंक खाते में प्राप्त करें। अपनी कमाई ट्रैक करें और अतिरिक्त वित्तीय सेवाओं तक पहुंचें।',
                fpoTitle: 'FPO साझेदारी डैशबोर्ड',
                fpoSub: 'अपने सदस्य किसानों का प्रबंधन करें, समूह प्रदर्शन ट्रैक करें, और सामूहिक कार्बन क्रेडिट कमाई को अधिकतम करें',
                fpoStat1Label: 'सक्रिय सदस्य किसान',
                fpoStat1Desc: '15 गांवों में',
                fpoStat2Label: 'कुल कार्बन राजस्व',
                fpoStat2Desc: 'इस तिमाही',
                fpoStat3Label: 'सत्यापित क्रेडिट',
                fpoStat3Desc: 'इस वर्ष उत्पन्न',
                fpoStat4Label: 'हेक्टेयर निगरानी',
                fpoStat4Desc: 'FPO प्रबंधन के तहत',
                fpoStat5Label: 'थोक खरीद मूल्य',
                fpoStat5Desc: 'अवशेष-मुक्त उत्पाद',
                fpoStat6Label: 'अनुपालन स्कोर',
                fpoStat6Desc: 'समूह औसत',
                fpoChartTitle: 'समय के साथ सदस्य वृद्धि और कार्बन क्रेडिट',
                fpoChartPlaceholder: 'सदस्य वृद्धि और कार्बन क्रेडिट जनरेशन रुझान दिखाने वाला इंटरैक्टिव चार्ट',
                navFPODashboard: 'FPO डैशबोर्ड',
                navFPOMembers: 'सदस्य प्रबंधन',
                navFPOProcurement: 'थोक खरीद',
                fpoMembersTitle: 'सदस्य प्रबंधन',
                fpoMembersSub: 'अपने FPO सदस्य किसानों, उनके खेतों और अनुपालन स्थिति को ट्रैक और प्रबंधित करें',
                fpoMembersActive: 'सक्रिय सदस्य',
                fpoMembersActiveDesc: 'प्रथाओं के साथ अनुपालन',
                fpoMembersFields: 'कुल खेत',
                fpoMembersFieldsDesc: 'निगरानी के तहत',
                fpoMembersCompliance: 'औसत अनुपालन',
                fpoMembersComplianceDesc: 'इस तिमाही',
                fpoMembersTraining: 'प्रशिक्षण सत्र',
                fpoMembersTrainingDesc: 'इस महीने निर्धारित',
                fpoProcurementTitle: 'थोक खरीद',
                fpoProcurementSub: 'सदस्य किसानों से अवशेष-मुक्त उत्पाद की थोक खरीद का प्रबंधन करें',
                fpoProcurement1Title: 'एग्रीगेशन हब',
                fpoProcurement1Desc: 'गुणवत्ता जांच और छंटाई सुविधाओं के साथ सदस्य उत्पाद के लिए केंद्रीय संग्रह बिंदु।',
                fpoProcurement2Title: 'गुणवत्ता आश्वासन',
                fpoProcurement2Desc: 'खरीदारों को थोक बिक्री से पहले स्वचालित गुणवत्ता परीक्षण और प्रमाणन।',
                fpoProcurement3Title: 'निष्पक्ष मूल्य निर्धारण',
                fpoProcurement3Desc: 'सभी सदस्य किसानों को निष्पक्ष रिटर्न सुनिश्चित करने वाला पारदर्शी मूल्य निर्धारण मॉडल।',
                navBuyerCatalog: 'उत्पाद कैटलॉग',
                navBuyerTraceability: 'ट्रेसबिलिटी',
                navBuyerProcurement: 'खरीद',
                navBuyerCertifications: 'प्रमाणपत्र',
                buyerCatalogTitle: 'अवशेष-मुक्त उत्पाद कैटलॉग',
                buyerCatalogSub: 'पूर्ण ट्रेसबिलिटी के साथ सत्यापित अवशेष-मुक्त उत्पाद ब्राउज़ करें',
                productBadgeCertified: 'प्रमाणित',
                product1Name: 'जैविक गेहूं',
                product1Desc: 'सत्यापित खेतों से प्रीमियम गुणवत्ता, अवशेष-मुक्त गेहूं',
                product1Price: '₹2,800/क्विंटल',
                product2Name: 'जैविक कपास',
                product2Desc: 'कार्बन क्रेडिट प्रमाणन के साथ ट्रेस करने योग्य जैविक कपास',
                product2Price: '₹6,500/क्विंटल',
                product3Name: 'जैविक सब्जियां',
                product3Desc: 'सत्यापित खेतों से ताजी, अवशेष-मुक्त सब्जियां',
                product3Price: '₹45/किलो',
                productViewDetails: 'विवरण देखें',
                buyerTraceabilityTitle: 'पूर्ण ट्रेसबिलिटी फ्लो',
                buyerTraceabilitySub: 'पूर्ण पारदर्शिता के साथ खेत से अपनी सुविधा तक अपने उत्पाद को ट्रैक करें',
                flowStep1Title: 'खेत मूल',
                flowStep1Desc: 'सत्यापित खेत स्थान, मिट्टी स्वास्थ्य, और खेती प्रथाएं',
                flowStep2Title: 'फसल और संग्रह',
                flowStep2Desc: 'GPS निर्देशांक और गुणवत्ता जांच के साथ समय-चिह्नित फसल',
                flowStep3Title: 'प्रसंस्करण',
                flowStep3Desc: 'गुणवत्ता नियंत्रण के साथ प्रमाणित प्रसंस्करण सुविधाएं',
                flowStep4Title: 'वितरण',
                flowStep4Desc: 'आपकी सुविधा तक परिवहन के दौरान वास्तविक समय ट्रैकिंग',
                flowStep5Title: 'डिलीवरी',
                flowStep5Desc: 'पूर्ण दस्तावेजीकरण और प्रमाणपत्रों के साथ अंतिम डिलीवरी',
                buyerProcurementTitle: 'खरीद पोर्टल',
                buyerProcurementSub: 'ऑर्डर दें, डिलीवरी ट्रैक करें, और अपने खरीद पाइपलाइन का प्रबंधन करें',
                buyerProcurement1Title: 'ऑर्डर प्रबंधन',
                buyerProcurement1Desc: 'स्वचालित इन्वेंटरी प्रबंधन के साथ थोक ऑर्डर बनाएं और ट्रैक करें।',
                buyerProcurement2Title: 'डिलीवरी शेड्यूलिंग',
                buyerProcurement2Desc: 'अपने उत्पादन कैलेंडर और भंडारण क्षमता के आधार पर डिलीवरी शेड्यूल करें।',
                buyerProcurement3Title: 'गुणवत्ता रिपोर्ट',
                buyerProcurement3Desc: 'प्रत्येक बैच के लिए विस्तृत गुणवत्ता रिपोर्ट और प्रमाणपत्र तक पहुंचें।',
                buyerCertificationsTitle: 'गुणवत्ता प्रमाणपत्र',
                buyerCertificationsSub: 'आपके सभी खरीदे गए उत्पादों के लिए सत्यापित प्रमाणपत्र',
                buyerCert1Title: 'अवशेष-मुक्त प्रमाणन',
                buyerCert1Desc: 'प्रयोगशाला परीक्षण और उपग्रह निगरानी के माध्यम से सत्यापित शून्य कीटनाशक अवशेष।',
                buyerCert2Title: 'जैविक प्रमाणन',
                buyerCert2Desc: 'अंतर्राष्ट्रीय जैविक मानकों को पूरा करने वाला प्रमाणित जैविक उत्पाद।',
                buyerCert3Title: 'कार्बन क्रेडिट सत्यापित',
                buyerCert3Desc: 'सत्यापित कार्बन क्रेडिट जनरेशन वाले खेतों से उत्पाद।',
                navInvestorDashboard: 'प्रभाव डैशबोर्ड',
                navInvestorMetrics: 'ROI मेट्रिक्स',
                navInvestorPortfolio: 'पोर्टफोलियो',
                navInvestorOpportunities: 'अवसर',
                investorDashboardTitle: 'प्रभाव डैशबोर्ड',
                investorDashboardSub: 'अपने निवेश के पर्यावरणीय और वित्तीय प्रभाव को ट्रैक करें',
                investorMetric1Label: 'प्रभावित किसान',
                investorMetric1Change: '+15% इस तिमाही',
                investorMetric2Label: 'टन CO₂ अलग किया गया',
                investorMetric2Change: '+22% इस तिमाही',
                investorMetric3Label: 'कुल निवेश',
                investorMetric3Change: 'ROI: 18.5%',
                investorMetric4Label: 'प्रबंधन के तहत हेक्टेयर',
                investorMetric4Change: '+8% विस्तार',
                investorMetricsTitle: 'ROI और वित्तीय मेट्रिक्स',
                investorMetricsSub: 'विस्तृत वित्तीय प्रदर्शन और निवेश पर रिटर्न एनालिटिक्स',
                investorROI1Label: 'वार्षिक ROI',
                investorROI1Desc: 'कार्बन क्रेडिट पर आधारित',
                investorROI2Label: 'राजस्व उत्पन्न',
                investorROI2Desc: 'इस वित्तीय वर्ष',
                investorROI3Label: 'लक्ष्य उपलब्धि',
                investorROI3Desc: 'कार्बन क्रेडिट लक्ष्य',
                investorROI4Label: 'औसत राजस्व/किसान',
                investorROI4Desc: 'वार्षिक औसत',
                investorPortfolioTitle: 'निवेश पोर्टफोलियो',
                investorPortfolioSub: 'विभिन्न क्षेत्रों और फसलों में अपने निवेश पोर्टफोलियो का प्रबंधन और ट्रैक करें',
                investorPortfolio1Title: 'भौगोलिक वितरण',
                investorPortfolio1Desc: 'प्रदर्शन मेट्रिक्स के साथ विभिन्न राज्यों और क्षेत्रों में निवेश देखें।',
                investorPortfolio2Title: 'फसल विविधीकरण',
                investorPortfolio2Desc: 'विभिन्न फसल प्रकारों और उनकी कार्बन क्षमता में निवेश ट्रैक करें।',
                investorPortfolio3Title: 'टाइमलाइन और माइलस्टोन',
                investorPortfolio3Desc: 'निवेश समयसीमा, कार्बन क्रेडिट जनरेशन माइलस्टोन, और भुगतान की निगरानी करें।',
                investorOpportunitiesTitle: 'निवेश अवसर',
                investorOpportunitiesSub: 'पुनर्जीवन कृषि में नए निवेश अवसरों का अन्वेषण करें',
                investorOpp1Title: 'FPO साझेदारी',
                investorOpp1Desc: 'कई किसानों और क्षेत्रों में प्रभाव को बढ़ाने के लिए FPOs में निवेश करें।',
                investorOpp2Title: 'क्षेत्रीय विस्तार',
                investorOpp2Desc: 'उच्च कार्बन क्रेडिट क्षमता वाले नए क्षेत्रों में विस्तार के लिए धन।',
                investorOpp3Title: 'प्रौद्योगिकी अपग्रेड',
                investorOpp3Desc: 'सत्यापन और स्केलिंग में सुधार के लिए AI और उपग्रह प्रौद्योगिकी में निवेश करें।',
            },
            gu: {
                // ... (All existing 'gu' translations remain unchanged for brevity) ...
                pageTitle: 'રૂપિયા.એપ — પૃથ્વી → ક્લાઉડ (પ્રો એન્હાન્સડ)',
                navPrototype: 'પૃથ્વી → ક્લાઉડ પ્રોટોટાઇપ',
                navHome: 'મુખ્ય પૃષ્ઠ', navResidue: 'અવશેષ-મુક્ત', navTasks: 'કાર્ય વ્યવસ્થાપક', navCarbon: 'કાર્બન ક્રેડિટ', navFinance: 'નાણાં',
                pillFarmer: 'ખેડૂતો', pillFPO: 'FPOs', pillBuyer: 'ખરીદદારો', pillInvestor: 'રોકાણકારો',
                learnCredits: 'કાર્બન ક્રેડિટ્સ કેવી રીતે કામ કરે છે',
                statFarmers: 'ખેડૂતો (લક્ષ્ય)', statHectares: 'હેક્ટર (લક્ષ્ય)', statCredit: '/પ્રમાણિત ક્રેડિટ',
                heroTitle: '<span class="accent">જ્યાં જમીન</span> મળે છે <span class="accent">સેટેલાઇટને</span> — સારી ખેતીને વાસ્તવિક આવકમાં ફેરવો',
                heroSub_farmer: 'અવશેષ-મુક્ત ખેતી • સેટેલાઇટ જમીન પરીક્ષણ • પ્રમાણિત કાર્બન ક્રેડિટ • ખેડૂત-પ્રથમ ધિરાણ',
                heroSub_fpo: 'તાલીમ અને બાય-બેક • જૂથો માટે કાર્બન આવક • સપ્લાય-ચેઇન સપોર્ટ',
                heroSub_buyer: 'ટ્રેસેબલ અવશેષ-મુક્ત ઉત્પાદન • પ્રમાણપત્રો અને ખરીદી',
                heroSub_investor: 'અસર મેટ્રિક્સ • કાર્બન ઇન્વેન્ટરી • ભાગીદારી',
                joinFarmer: 'ખેડૂત તરીકે જોડાઓ', joinFPO: 'FPO તરીકે ભાગીદાર', contactBuyers: 'ખરીદી માટે સંપર્ક કરો', contactInvestors: 'રોકાણકારો માટે સંપર્ક કરો',
                illuSoil: 'જમીન ડેટા', illuSatellite: 'સેટેલાઇટ મોનિટર', illuCarbon: 'કાર્બન', illuIncome: 'આવક', illuCloud: 'રૂપિયા AI ક્લાઉડ',
                resTitle: 'અવશેષ-મુક્ત ખેતી — તે કેવી રીતે કાર્ય કરે છે', resSub: 'સેટેલાઇટ જમીન પરીક્ષણ → AI મોનિટરિંગ → નિષ્ણાત સલાહ → અવશેષ-મુક્ત ઇનપુટ્સ → બાય-બેક',
                resDiagramTitle: 'જમીન → સેટેલાઇટ → પુરાવો (ઇન્ટરેક્ટિવ)',
                resLayer1: 'જમીન ઓર્ગેનિક લેયર (કાર્બન સંગ્રહ)', resLayer2: 'મૂળ ઝોન અને માઇક્રોબાયલ પ્રવૃત્તિ', resLayer3: 'સેટેલાઇટ ઇમેજરી અને AI એનાલિટિક્સ (ચકાસણી)',
                keyServicesTitle: 'મુખ્ય સેવાઓ',
                service1Title: 'AI જમીન એનાલિટિક્સ', service1Desc: 'સેટેલાઇટ + સ્થાનિક સેન્સર → કાર્યવાહી યોગ્ય સ્કોર્સ',
                service2Title: 'કૃષિશાસ્ત્ર સપોર્ટ', service2Desc: 'અમલ માટે ઓન-ફિલ્ડ નિષ્ણાતો + મોબાઇલ માર્ગદર્શન',
                service3Title: 'ફાર્મ-ગેટ બાય-બેક', service3Desc: 'સીધી ખરીદી વચેટિયાઓને દૂર કરે છે, વાજબી ભાવની ખાતરી આપે છે',
                tasksTitle: 'AI-સંચાલિત કાર્ય વ્યવસ્થાપક',
                tasksSub: 'સેટેલાઇટ ડેટા, હવામાન અને જમીનના સ્વાસ્થ્ય સ્કોર્સમાંથી જનરેટ કરાયેલ કાર્યવાહી યોગ્ય માર્ગદર્શન.',
                taskListTitle: 'આગામી ક્રિયાઓ (ક્ષેત્ર 1)',
                progressLabel: 'કાર્બન ચકાસણી માટે પાલન સ્કોર',
                logAction: 'નવી ક્રિયા/ઇનપુટ લોગ કરો',
                task1Title: 'ઓર્ગેનિક ખાતર લાગુ કરો (ઉચ્ચ પ્રાથમિકતા)', task1Desc: 'AI ઓછી SOC પ્રવૃત્તિ સૂચવે છે; Q4 કાર્બન ચકાસણી માટે જરૂરી છે.', task1Date: 'નિયત: નવે 25',
                task2Title: 'સિંચાઈ સિસ્ટમ તપાસો', task2Desc: 'સેટેલાઇટે દક્ષિણ ચતુર્થાંશમાં સહેજ ભેજનું તાણ શોધી કાઢ્યું.', task2Date: 'નિયત: નવે 21',
                task3Title: 'કૃષિશાસ્ત્ર ફોલો-અપ', task3Desc: 'ફીલ્ડ એજન્ટ સાથે એપ્લિકેશન તકનીકની સમીક્ષા કરો.', task3Date: 'નિયત: નવે 28',
                carbonTitle: 'કાર્બન ક્રેડિટ્સ — સરળ અને ખેડૂત-મૈત્રીપૂર્ણ',
                carbonSub: 'જમીનનો કાર્બન કેવી રીતે વધે છે અને ખેડૂતો કેવી રીતે ₹800 પ્રતિ પ્રમાણિત ક્રેડિટ કમાય છે',
                creditWhatTitle: 'કાર્બન ક્રેડિટ શું છે?',
                creditWhatDesc: 'સંગ્રહિત $\\text{CO}_2$ નું પ્રતિનિધિત્વ કરતું પ્રમાણિત એકમ. પુનર્જીવિત પ્રથાઓ **જમીન ઓર્ગેનિક કાર્બન (SOC)** માં વધારો કરે છે જે $\\text{AI}$ નો ઉપયોગ કરીને પ્રમાણિત થાય છે અને માર્કેટેબલ ક્રેડિટ્સમાં રૂપાંતરિત થાય છે.',
                creditEarnTitle: 'તે ₹800 કેવી રીતે કમાય છે',
                creditEarnDesc: 'દરેક પ્રમાણિત ક્રેડિટ ખેડૂતને આશરે **₹800** ચૂકવે છે. પારદર્શિતા માટે ડિજિટલ ટ્રેસેબિલિટીનો ઉપયોગ કરીને સ્વતંત્ર, પ્રમાણિત ભાગીદારો (દા.ત., કાર્બોનેગ) દ્વારા ચકાસણી કરવામાં આવે છે.',
                targetTitle: 'લક્ષ્ય અને સ્કેલેબિલિટી',
                targetDesc: 'અમારો ધ્યેય 3 વર્ષમાં **50,000+ ખેડૂતોને** **5,00,000 હેક્ટર** માં ઓનબોર્ડ કરવાનો છે—જરૂરી તાલીમ અને સતત ફિલ્ડ સપોર્ટ પ્રદાન કરવો.',
                calcTitle: 'ખેડૂત આવક કેલ્ક્યુલેટર',
                labelArea: 'વિસ્તાર (હેક્ટર)', labelPractice: 'પ્રેક્ટિસ પરિબળ (0.1 - 1)',
                optMinimal: 'ન્યૂનતમ પુનર્જીવિત (0.2)', optGood: 'સારી પ્રેક્ટિસ (0.5)', optAdvanced: 'અદ્યતન (0.8)',
                calcAssumption: 'ધારણા: 1 ક્રેડિટ $\\approx$ 1 ટન $\\text{CO}_2$ અલગ કરેલ; ₹800/ક્રેડિટ',
                estimateBtn: 'આવકનો અંદાજ',
                calcPlaceholder: 'અંદાજ માટે વિસ્તાર અને પ્રેક્ટિસ દાખલ કરો',
                calcResultPrefix: 'અંદાજિત આવક: ₹',
                logActionTitle: 'નવી ક્રિયા/ઇનપુટ લોગ કરો',
                logActionDesc: 'ચકાસણી અને પાલન ટ્રેકિંગ માટે તમારી ખેતીની પ્રવૃત્તિ રેકોર્ડ કરો.',
                logActionType: 'ક્રિયા પ્રકાર',
                logActionDate: 'તારીખ',
                logActionField: 'ક્ષેત્ર',
                logActionDetails: 'વિગતો',
                logActionSubmit: 'સબમિટ કરો',
                logOptFertilizer: 'ખાતર એપ્લિકેશન',
                logOptIrrigation: 'સિંચાઈ',
                logOptPesticide: 'કીટનાશક એપ્લિકેશન',
                logOptHarvest: 'કાપણી',
                logOptOther: 'અન્ય',
                logOptField1: 'ક્ષેત્ર 1',
                logOptField2: 'ક્ષેત્ર 2',
                logOptField3: 'ક્ષેત્ર 3',
                transparencyTitle: 'સપ્લાય ચેઇન પારદર્શિતા',
                transparencyDesc: 'પ્રમાણિત બેચનો ડિજિટલ લેજર (મોક) જુઓ.',
                traceBtn: 'ટ્રેસેબિલિટી ડેમો બતાવો',
                modalTitle: 'ટ્રેસેબિલિટી ડેમો — નમૂના બેચ લેજર',
                modalDesc: 'QR સ્કેન કરો (મોક) અથવા નીચેના JSONનું નિરીક્ષણ કરો. આ લેજર અંતિમ ઉત્પાદનને પ્રમાણિત કાર્બન ક્રેડિટ્સ સાથે જોડે છે.',
                batchIdText: 'બેચ ID',
                modalClose: 'બંધ કરો',
                financeTitle: 'નાણાકીય સમાવેશ — ભાવિ રોડમેપ',
                financeSub: 'ડિજિટલ રિચાર્જ, નાની લોન, ડિજિટલ ગોલ્ડ અને વીમો આયોજિત ખેડૂત-પ્રથમ સુવિધાઓ છે.',
                finance1Title: 'ડિજિટલ ચૂકવણી', finance1Desc: 'રૂપિયા વૉલેટમાં સરળ મોબાઇલ ટોપ-અપ, યુટિલિટી બિલ ચૂકવણી અને વેપારી વ્યવહારો.',
                finance2Title: 'ક્રેડિટ ઍક્સેસ', finance2Desc: 'પ્રમાણિત પાક ડેટા અને ફાર્મ ટ્રેસેબિલિટી સ્કોર્સનો ઉપયોગ કરીને કોલેટરલ-લાઇટ લોન અને માઇક્રોફાઇનાન્સ વિકલ્પો.',
                finance3Title: 'પેરામેટ્રિક વીમો', finance3Desc: 'વધારે વરસાદ, હીટ શોક અથવા ચોક્કસ પાકના નુકસાનની ઘટનાઓ માટે કસ્ટમાઇઝ્ડ ઉત્પાદનો.',
                onboardTitle: 'ઓનબોર્ડ અને કમાણી કરવા તૈયાર છો?',
                onboardDesc: 'અમારા પાઇલટ પ્રોગ્રામમાં જોડાઓ અને આજે જ જમીનના સ્વાસ્થ્ય અને આબોહવા કાર્યમાંથી આવક મેળવવાનું શરૂ કરો.',
                tipL1: 'સોઇલ ઓર્ગેનિક કાર્બન (SOC) સંગ્રહ સેટેલાઇટ સ્પેક્ટ્રોસ્કોપી દ્વારા માપવામાં આવે છે અને ગ્રાઉન્ડ સેન્સર દ્વારા માન્ય કરવામાં આવે છે.',
                tipL2: 'મૂળ ઝોનમાં માઇક્રોબાયલ સ્વાસ્થ્ય અને પોષક પ્રવૃત્તિ તંદુરસ્ત, અવશેષ-મુક્ત ઉત્પાદનની ખાતરી આપે છે.',
                tipL3: 'AI રિયલ-ટાઇમ ફીલ્ડ સ્કોર્સ અને પુનર્જીવિત પ્રથાઓના પુરાવા પ્રદાન કરવા માટે સેટેલાઇટ ડેટા પર પ્રક્રિયા કરે છે.',
                navJourney: 'ખેડૂત યાત્રા',
                journeyTitle: 'કાર્બન ક્રેડિટ તમારી યાત્રા',
                journeySub: 'કાર્બન ક્રેડિટ કમાવા માટે નોંધણીથી સરળ પગલાં',
                journeyStep1Title: 'નોંધણી અને ફીલ્ડ મેપિંગ',
                journeyStep1Desc: 'તમારા મોબાઇલ નંબરથી સાઇન અપ કરો, તમારી ફાર્મ વિગતો ઉમેરો, અને GPS અથવા સેટેલાઇટ ઇમેજરીનો ઉપયોગ કરીને તમારા ખેતરોને મેપ કરો. અમારી ટીમ તમારી માહિતી ચકાસે છે.',
                journeyStep2Title: 'જમીન પરીક્ષણ અને વિશ્લેષણ',
                journeyStep2Desc: 'સેટેલાઇટ-આધારિત જમીન પરીક્ષણ તમારા ખેતરના કાર્બનિક કાર્બન સ્તરનું વિશ્લેષણ કરે છે. AI તમારો બેસલાઇન જમીન સ્વાસ્થ્ય સ્કોર બનાવવા માટે ડેટા પર પ્રક્રિયા કરે છે.',
                journeyStep3Title: 'AI ભલામણો',
                journeyStep3Desc: 'પુનર્જીવિત પ્રથાઓ માટે વ્યક્તિગત ભલામણો પ્રાપ્ત કરો: કાર્બનિક ઇનપુટ્સ, પાક પરિભ્રમણ, કવર પાક, અને તમારા ખેતર માટે અનુકૂળ અવશેષ વ્યવસ્થાપન.',
                journeyStep4Title: 'અમલીકરણ સપોર્ટ',
                journeyStep4Desc: 'કૃષિશાસ્ત્રીઓ પાસેથી ઓન-ફીલ્ડ સપોર્ટ, ગુણવત્તાપૂર્ણ ઇનપુટ્સની પહોંચ, અને પગલું-દર-પગલું મોબાઇલ માર્ગદર્શન મેળવો. એપ્લિકેશન દ્વારા તમારી પ્રવૃત્તિઓ લોગ કરો.',
                journeyStep5Title: 'મોનિટરિંગ અને ચકાસણી',
                journeyStep5Desc: 'સેટેલાઇટ મોનિટરિંગ તમારી પ્રગતિને ટ્રેક કરે છે. AI ચકાસે છે કે તમારી પ્રથાઓ ભલામણો સાથે મેળ ખાય છે. નિયમિત પાલન સ્કોર તમારી કાર્બન ક્રેડિટ સંભાવના દર્શાવે છે.',
                journeyStep6Title: 'કાર્બન ક્રેડિટ જનરેશન',
                journeyStep6Desc: '12-18 મહિનાના ચકાસાયેલા અભ્યાસ પછી, તમારા વધેલા જમીન કાર્બનિક કાર્બનને પ્રમાણિત ભાગીદારો દ્વારા ચકાસાયેલા કાર્બન ક્રેડિટમાં રૂપાંતરિત કરવામાં આવે છે.',
                journeyStep7Title: 'ચૂકવણી અને પુરસ્કાર',
                journeyStep7Desc: '30 દિવસની અંદર દરેક ચકાસાયેલા ક્રેડિટ માટે ₹800 સીધા તમારા બેંક એકાઉન્ટમાં પ્રાપ્ત કરો. તમારી કમાણી ટ્રેક કરો અને વધારાની નાણાકીય સેવાઓની પહોંચ મેળવો.',
                fpoTitle: 'FPO ભાગીદારી ડેશબોર્ડ',
                fpoSub: 'તમારા સભ્ય ખેડૂતોનું સંચાલન કરો, જૂથ પ્રદર્શન ટ્રેક કરો, અને સામૂહિક કાર્બન ક્રેડિટ કમાણીને મહત્તમ કરો',
                fpoStat1Label: 'સક્રિય સભ્ય ખેડૂતો',
                fpoStat1Desc: '15 ગામોમાં',
                fpoStat2Label: 'કુલ કાર્બન આવક',
                fpoStat2Desc: 'આ ત્રિમાસિક',
                fpoStat3Label: 'ચકાસાયેલા ક્રેડિટ',
                fpoStat3Desc: 'આ વર્ષે જનરેટ થયેલ',
                fpoStat4Label: 'હેક્ટર મોનિટરિંગ',
                fpoStat4Desc: 'FPO સંચાલન હેઠળ',
                fpoStat5Label: 'થોક ખરીદી મૂલ્ય',
                fpoStat5Desc: 'અવશેષ-મુક્ત ઉત્પાદન',
                fpoStat6Label: 'પાલન સ્કોર',
                fpoStat6Desc: 'જૂથ સરેરાશ',
                fpoChartTitle: 'સમય સાથે સભ્ય વૃદ્ધિ અને કાર્બન ક્રેડિટ',
                fpoChartPlaceholder: 'સભ્ય વૃદ્ધિ અને કાર્બન ક્રેડિટ જનરેશન વલણો દર્શાવતો ઇન્ટરેક્ટિવ ચાર્ટ',
                navFPODashboard: 'FPO ડેશબોર્ડ',
                navFPOMembers: 'સભ્ય વ્યવસ્થાપન',
                navFPOProcurement: 'થોક ખરીદી',
                fpoMembersTitle: 'સભ્ય વ્યવસ્થાપન',
                fpoMembersSub: 'તમારા FPO સભ્ય ખેડૂતો, તેમના ખેતરો અને અનુપાલન સ્થિતિને ટ્રેક અને વ્યવસ્થાપિત કરો',
                fpoMembersActive: 'સક્રિય સભ્યો',
                fpoMembersActiveDesc: 'પ્રથાઓ સાથે અનુપાલન',
                fpoMembersFields: 'કુલ ખેતરો',
                fpoMembersFieldsDesc: 'નિરીક્ષણ હેઠળ',
                fpoMembersCompliance: 'સરેરાશ અનુપાલન',
                fpoMembersComplianceDesc: 'આ ત્રિમાસિક',
                fpoMembersTraining: 'તાલીમ સત્રો',
                fpoMembersTrainingDesc: 'આ મહિનામાં શેડ્યૂલ',
                fpoProcurementTitle: 'થોક ખરીદી',
                fpoProcurementSub: 'સભ્ય ખેડૂતો પાસેથી અવશેષ-મુક્ત ઉત્પાદનની થોક ખરીદીનું વ્યવસ્થાપન કરો',
                fpoProcurement1Title: 'એગ્રિગેશન હબ',
                fpoProcurement1Desc: 'ગુણવત્તા તપાસ અને સોર્ટિંગ સુવિધાઓ સાથે સભ્ય ઉત્પાદન માટે કેન્દ્રીય સંગ્રહ બિંદુ.',
                fpoProcurement2Title: 'ગુણવત્તા ખાતરી',
                fpoProcurement2Desc: 'ખરીદદારોને થોક વેચાણ પહેલાં સ્વચાલિત ગુણવત્તા પરીક્ષણ અને પ્રમાણપત્ર.',
                fpoProcurement3Title: 'ઉચિત કિંમત',
                fpoProcurement3Desc: 'બધા સભ્ય ખેડૂતોને ઉચિત વળતરની ખાતરી આપતું પારદર્શક કિંમત મોડેલ.',
                navBuyerCatalog: 'ઉત્પાદન કેટલોગ',
                navBuyerTraceability: 'ટ્રેસબિલિટી',
                navBuyerProcurement: 'ખરીદી',
                navBuyerCertifications: 'પ્રમાણપત્રો',
                buyerCatalogTitle: 'અવશેષ-મુક્ત ઉત્પાદન કેટલોગ',
                buyerCatalogSub: 'સંપૂર્ણ ટ્રેસબિલિટી સાથે ચકાસાયેલ અવશેષ-મુક્ત ઉત્પાદન બ્રાઉઝ કરો',
                productBadgeCertified: 'પ્રમાણિત',
                product1Name: 'ઓર્ગેનિક ઘઉં',
                product1Desc: 'ચકાસાયેલ ખેતરોમાંથી પ્રીમિયમ ગુણવત્તા, અવશેષ-મુક્ત ઘઉં',
                product1Price: '₹2,800/ક્વિન્ટલ',
                product2Name: 'ઓર્ગેનિક કપાસ',
                product2Desc: 'કાર્બન ક્રેડિટ પ્રમાણપત્ર સાથે ટ્રેસ કરી શકાય તેવું ઓર્ગેનિક કપાસ',
                product2Price: '₹6,500/ક્વિન્ટલ',
                product3Name: 'ઓર્ગેનિક શાકભાજી',
                product3Desc: 'ચકાસાયેલ ખેતરોમાંથી તાજી, અવશેષ-મુક્ત શાકભાજી',
                product3Price: '₹45/કિલો',
                productViewDetails: 'વિગતો જુઓ',
                buyerTraceabilityTitle: 'સંપૂર્ણ ટ્રેસબિલિટી ફ્લો',
                buyerTraceabilitySub: 'સંપૂર્ણ પારદર્શિતા સાથે ખેતરથી તમારી સુવિધા સુધી તમારા ઉત્પાદનને ટ્રેક કરો',
                flowStep1Title: 'ખેતર મૂળ',
                flowStep1Desc: 'ચકાસાયેલ ખેતર સ્થાન, માટી સ્વાસ્થ્ય, અને ખેતી પ્રથાઓ',
                flowStep2Title: 'કાપણી અને સંગ્રહ',
                flowStep2Desc: 'GPS કોઓર્ડિનેટ્સ અને ગુણવત્તા તપાસ સાથે સમય-ચિહ્નિત કાપણી',
                flowStep3Title: 'પ્રક્રિયા',
                flowStep3Desc: 'ગુણવત્તા નિયંત્રણ સાથે પ્રમાણિત પ્રક્રિયા સુવિધાઓ',
                flowStep4Title: 'વિતરણ',
                flowStep4Desc: 'તમારી સુવિધા સુધી પરિવહન દરમિયાન વાસ્તવિક સમય ટ્રેકિંગ',
                flowStep5Title: 'ડિલિવરી',
                flowStep5Desc: 'સંપૂર્ણ દસ્તાવેજીકરણ અને પ્રમાણપત્રો સાથે અંતિમ ડિલિવરી',
                buyerProcurementTitle: 'ખરીદી પોર્ટલ',
                buyerProcurementSub: 'ઓર્ડર મૂકો, ડિલિવરી ટ્રેક કરો, અને તમારા ખરીદી પાઇપલાઇનનું વ્યવસ્થાપન કરો',
                buyerProcurement1Title: 'ઓર્ડર વ્યવસ્થાપન',
                buyerProcurement1Desc: 'સ્વચાલિત ઇન્વેન્ટરી વ્યવસ્થાપન સાથે થોક ઓર્ડર બનાવો અને ટ્રેક કરો.',
                buyerProcurement2Title: 'ડિલિવરી શેડ્યૂલિંગ',
                buyerProcurement2Desc: 'તમારા ઉત્પાદન કેલેન્ડર અને સ્ટોરેજ ક્ષમતાના આધારે ડિલિવરી શેડ્યૂલ કરો.',
                buyerProcurement3Title: 'ગુણવત્તા અહેવાલો',
                buyerProcurement3Desc: 'દરેક બેચ માટે વિગતવાર ગુણવત્તા અહેવાલો અને પ્રમાણપત્રોની પહોંચ.',
                buyerCertificationsTitle: 'ગુણવત્તા પ્રમાણપત્રો',
                buyerCertificationsSub: 'તમારા બધા ખરીદેલા ઉત્પાદનો માટે ચકાસાયેલ પ્રમાણપત્રો',
                buyerCert1Title: 'અવશેષ-મુક્ત પ્રમાણપત્ર',
                buyerCert1Desc: 'લેબ પરીક્ષણ અને ઉપગ્રહ નિરીક્ષણ દ્વારા ચકાસાયેલ શૂન્ય કીટનાશક અવશેષ.',
                buyerCert2Title: 'ઓર્ગેનિક પ્રમાણપત્ર',
                buyerCert2Desc: 'આંતરરાષ્ટ્રીય ઓર્ગેનિક માનકોને પૂર્ણ કરતું પ્રમાણિત ઓર્ગેનિક ઉત્પાદન.',
                buyerCert3Title: 'કાર્બન ક્રેડિટ ચકાસાયેલ',
                buyerCert3Desc: 'ચકાસાયેલ કાર્બન ક્રેડિટ જનરેશન સાથે ખેતરોમાંથી ઉત્પાદન.',
                navInvestorDashboard: 'પ્રભાવ ડેશબોર્ડ',
                navInvestorMetrics: 'ROI મેટ્રિક્સ',
                navInvestorPortfolio: 'પોર્ટફોલિયો',
                navInvestorOpportunities: 'તકો',
                investorDashboardTitle: 'પ્રભાવ ડેશબોર્ડ',
                investorDashboardSub: 'તમારા રોકાણોના પર્યાવરણીય અને નાણાકીય પ્રભાવને ટ્રેક કરો',
                investorMetric1Label: 'પ્રભાવિત ખેડૂતો',
                investorMetric1Change: '+15% આ ત્રિમાસિક',
                investorMetric2Label: 'ટન CO₂ અલગ કર્યું',
                investorMetric2Change: '+22% આ ત્રિમાસિક',
                investorMetric3Label: 'કુલ રોકાણ',
                investorMetric3Change: 'ROI: 18.5%',
                investorMetric4Label: 'વ્યવસ્થાપન હેઠળ હેક્ટર',
                investorMetric4Change: '+8% વિસ્તરણ',
                investorMetricsTitle: 'ROI અને નાણાકીય મેટ્રિક્સ',
                investorMetricsSub: 'વિગતવાર નાણાકીય પ્રદર્શન અને રોકાણ પર વળતર એનાલિટિક્સ',
                investorROI1Label: 'વાર્ષિક ROI',
                investorROI1Desc: 'કાર્બન ક્રેડિટ પર આધારિત',
                investorROI2Label: 'રોકાણ જનરેટ',
                investorROI2Desc: 'આ નાણાકીય વર્ષ',
                investorROI3Label: 'લક્ષ્ય પ્રાપ્તિ',
                investorROI3Desc: 'કાર્બન ક્રેડિટ લક્ષ્યો',
                investorROI4Label: 'સરેરાશ રોકાણ/ખેડૂત',
                investorROI4Desc: 'વાર્ષિક સરેરાશ',
                investorPortfolioTitle: 'રોકાણ પોર્ટફોલિયો',
                investorPortfolioSub: 'વિવિધ પ્રદેશો અને પાકોમાં તમારા રોકાણ પોર્ટફોલિયોનું વ્યવસ્થાપન અને ટ્રેક કરો',
                investorPortfolio1Title: 'ભૌગોલિક વિતરણ',
                investorPortfolio1Desc: 'પ્રદર્શન મેટ્રિક્સ સાથે વિવિધ રાજ્યો અને પ્રદેશોમાં રોકાણ જુઓ.',
                investorPortfolio2Title: 'પાક વિવિધતા',
                investorPortfolio2Desc: 'વિવિધ પાક પ્રકારો અને તેમની કાર્બન સંભાવના માં રોકાણ ટ્રેક કરો.',
                investorPortfolio3Title: 'સમયરેખા અને માઇલસ્ટોન',
                investorPortfolio3Desc: 'રોકાણ સમયરેખા, કાર્બન ક્રેડિટ જનરેશન માઇલસ્ટોન, અને ચૂકવણીનું નિરીક્ષણ કરો.',
                investorOpportunitiesTitle: 'રોકાણ તકો',
                investorOpportunitiesSub: 'પુનર્જીવન ખેતીમાં નવી રોકાણ તકોનું અન્વેષણ કરો',
                investorOpp1Title: 'FPO ભાગીદારી',
                investorOpp1Desc: 'બહુવિધ ખેડૂતો અને પ્રદેશોમાં પ્રભાવને સ્કેલ કરવા માટે FPOs માં રોકાણ કરો.',
                investorOpp2Title: 'પ્રાદેશિક વિસ્તરણ',
                investorOpp2Desc: 'ઉચ્ચ કાર્બન ક્રેડિટ સંભાવના સાથે નવા પ્રદેશોમાં વિસ્તરણ માટે ભંડોળ.',
                investorOpp3Title: 'ટેકનોલોજી અપગ્રેડ',
                investorOpp3Desc: 'ચકાસણી અને સ્કેલિંગમાં સુધારા માટે AI અને ઉપગ્રહ ટેકનોલોજીમાં રોકાણ કરો.',
                farmerActionsTitle: 'ઝડપી ક્રિયાઓ અને સતર્ક',
                farmerActionsSub: 'મહત્વપૂર્ણ સૂચનાઓ સાથે અપડેટ રહો અને ઝડપી ક્રિયાઓ કરો',
                alertNew: 'નવું',
                farmerAction1Title: 'હવામાન સતર્ક',
                farmerAction1Desc: '2 દિવસમાં ભારે વરસાદની અપેક્ષા. તદનુસાર તમારા ખેતરો તૈયાર કરો.',
                farmerAction2Title: 'આગામી કાર્યો',
                farmerAction2Desc: 'આ સપ્તાહમાં 3 કાર્યો નિર્ધારિત છે. પાલન સ્કોર જાળવવા માટે તેમને પૂર્ણ કરો.',
                farmerAction3Title: 'ચુકવણી સ્થિતિ',
                farmerAction3Desc: '₹12,000 બાકી ચુકવણી. 5 દિવસમાં ક્રેડિટ થવાની અપેક્ષા.',
                viewDetails: 'વિગતો જુઓ',
                viewTasks: 'કાર્યો જુઓ',
                checkPayment: 'ચુકવણી તપાસો',
                fpoToolsTitle: 'સભ્ય સાધનો અને અહેવાલો',
                fpoToolsSub: 'સભ્યોને શોધો, અહેવાલો જનરેટ કરો, અને FPO કામગીરીનું વ્યવસ્થાપન કરો',
                searchMemberPlaceholder: 'નામ, ગામ, અથવા ID દ્વારા શોધો...',
                searchBtn: 'શોધો',
                exportReport: 'અહેવાલ નિકાસ કરો',
                fpoTool1Title: 'પાલન અહેવાલ',
                fpoTool1Desc: 'નિકાસ વિકલ્પો સાથે બધા સભ્યો માટે વિગતવાર પાલન અહેવાલો જનરેટ કરો.',
                fpoTool2Title: 'પ્રદર્શન એનાલિટિક્સ',
                fpoTool2Desc: 'જૂથ પ્રદર્શન મેટ્રિક્સ, વલણો, અને સુધારાના ક્ષેત્રો જુઓ.',
                fpoTool3Title: 'થોક સૂચનાઓ',
                fpoTool3Desc: 'SMS અથવા એપ્લિકેશન દ્વારા બધા સભ્યોને જાહેરાતો અને અપડેટ્સ મોકલો.',
                buyerToolsTitle: 'ઓર્ડર વ્યવસ્થાપન અને ટ્રેકિંગ',
                buyerToolsSub: 'ઓર્ડર ટ્રેક કરો, ઉત્પાદનો ફિલ્ટર કરો, અને તમારી ખરીદીનું વ્યવસ્થાપન કરો',
                filterAll: 'બધા ઓર્ડર',
                filterPending: 'બાકી',
                filterProcessing: 'પ્રક્રિયા',
                filterShipped: 'મોકલ્યું',
                filterDelivered: 'પહોંચાડ્યું',
                searchOrderPlaceholder: 'ઓર્ડર શોધો...',
                filterBtn: 'ફિલ્ટર',
                buyerTool1Title: 'લાઇવ ટ્રેકિંગ',
                buyerTool1Desc: 'GPS અપડેટ્સ સાથે ખેતરથી સુવિધા સુધી તમારા ઓર્ડરનું વાસ્તવિક સમય ટ્રેકિંગ.',
                buyerTool2Title: 'અદ્યતન ફિલ્ટર',
                buyerTool2Desc: 'પાક પ્રકાર, પ્રમાણપત્ર, પ્રદેશ, અથવા કાર્બન ક્રેડિટ સ્થિતિ દ્વારા ફિલ્ટર કરો.',
                buyerTool3Title: 'ડેટા નિકાસ',
                buyerTool3Desc: 'ઓર્ડર ઇતિહાસ, પ્રમાણપત્રો, અને ટ્રેસબિલિટી અહેવાલો ડાઉનલોડ કરો.',
                investorToolsTitle: 'એનાલિટિક્સ અને અંતર્દ્રષ્ટિ',
                investorToolsSub: 'અદ્યતન એનાલિટિક્સ, ચાર્ટ્સ, અને રોકાણ અંતર્દ્રષ્ટિ',
                periodWeek: 'છેલ્લું અઠવાડિયું',
                periodMonth: 'છેલ્લો મહિનો',
                periodQuarter: 'છેલ્લો ત્રિમાસિક',
                periodYear: 'છેલ્લું વર્ષ',
                generateReport: 'અહેવાલ જનરેટ કરો',
                exportData: 'ડેટા નિકાસ કરો',
                investorTool1Title: 'ROI વલણો',
                investorTool1Desc: 'અનુમાનો સાથે સમય સાથે ROI વલણો દર્શાવતા ઇન્ટરેક્ટિવ ચાર્ટ્સ.',
                investorTool2Title: 'પોર્ટફોલિયો બ્રેકડાઉન',
                investorTool2Desc: 'પ્રદેશ, પાક, અને પ્રદર્શન દ્વારા રોકાણનું દ્રશ્ય બ્રેકડાઉન.',
                investorTool3Title: 'પ્રભાવ મેટ્રિક્સ',
                investorTool3Desc: 'પર્યાવરણીય પ્રભાવ, કાર્બન અલગતા, અને ખેડૂત લાભો ટ્રેક કરો.',
            }
        };


        // --- Core Translation Logic ---
        function translatePage(newLang) {
            lang = newLang;
            const currentTranslations = translations[lang];

            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (currentTranslations[key]) {
                    el.textContent = currentTranslations[key];
                }
            });

            document.querySelectorAll('[data-i18n-html]').forEach(el => {
                const key = el.getAttribute('data-i18n-html');
                if (currentTranslations[key]) {
                    el.innerHTML = currentTranslations[key];
                    lucide.createIcons();
                }
            });

            document.querySelectorAll('[data-i18n-prepend]').forEach(el => {
                const key = el.getAttribute('data-i18n-prepend');
                const originalText = el.dataset.originalText || el.textContent.split(': ')[1];
                if (!el.dataset.originalText) {
                    el.dataset.originalText = originalText;
                }
                if (currentTranslations[key] && originalText) {
                    el.textContent = currentTranslations[key] + ': ' + originalText;
                }
            });

            document.querySelectorAll('#practice option').forEach(option => {
                const key = option.getAttribute('data-i18n');
                if (currentTranslations[key]) {
                    option.textContent = currentTranslations[key];
                }
            });

            // Translate log action modal
            document.querySelectorAll('#actionType option').forEach(option => {
                const key = option.getAttribute('data-i18n');
                if (currentTranslations[key]) {
                    option.textContent = currentTranslations[key];
                }
            });

            document.querySelectorAll('#actionField option').forEach(option => {
                const key = option.getAttribute('data-i18n');
                if (currentTranslations[key]) {
                    option.textContent = currentTranslations[key];
                }
            });

            document.title = currentTranslations.pageTitle;

            document.querySelectorAll('.lang-switch button').forEach(button => {
                button.classList.toggle('active', button.id.endsWith(lang));
            });

            const currentAud = document.querySelector('.dropdown-item.active') ? document.querySelector('.dropdown-item.active').dataset.audience : 'farmer';
            setAudience(currentAud);

            calculateIncome();
            renderTasks(); // Render tasks upon language change
            updateProgress(); // Update progress on language change
        }
        // --- End Core Translation Logic ---

        // --- TRACEABILITY DEMO FUNCTIONS (UPDATED) ---
        function loadTraceabilityDemo() {
            // 1. Mock data for the ledger
            const ledgerData = [
                // Added FarmerZone for better context
                { batch: 'WHEAT-B001', farmer: '4589', zone: 'Karnal', practice: 'No-Till Farming', credits: 1.2, date: '2025-09-15', status: 'Verified' },
                { batch: 'COTTON-C012', farmer: '1234', zone: 'Surendranagar', practice: 'Cover Cropping', credits: 0.8, date: '2025-05-20', status: 'Verified' },
                { batch: 'VEG-X901', farmer: '7701', zone: 'Pune', practice: 'Water Conservation', credits: 0.6, date: '2025-08-01', status: 'Verified' },
            ];

            const ledgerBody = document.getElementById('ledgerBody');
            if (!ledgerBody) return;

            // 2. Build the improved ledger table HTML
            let tableHTML = `
        <table class="ledger-table">
            <thead>
                <tr>
                    <th>Batch ID</th>
                    <th>Regen Practice</th>
                    <th>Farmer / Zone</th>
                    <th>Credits (tCO2e)</th>
                    <th>Verification Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;

            ledgerData.forEach(item => {
                tableHTML += `
            <tr>
                <td><strong>${item.batch}</strong></td>
                <td>${item.practice}</td>
                <td>F-${item.farmer} (${item.zone})</td>
                <td class="highlight-green">${item.credits.toFixed(2)}</td>
                <td>${item.date}</td>
                <td>
                    <span class="badge-verified">
                        <i data-lucide="shield-check"></i> 
                        ${item.status}
                    </span>
                </td>
            </tr>
        `;
            });

            tableHTML += '</tbody></table>';

            // 3. Inject content and show modal
            ledgerBody.innerHTML = tableHTML;
            document.getElementById('traceabilityModal').style.display = 'block';

            // Call Lucide to render the new icon inside the modal
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
        // --- END TRACEABILITY DEMO FUNCTIONS ---
        // --- END TRACEABILITY DEMO FUNCTIONS ---
        // 1. Connect the Traceability Demo button to the new function
        document.getElementById('traceabilityDemoBtn').addEventListener('click', loadTraceabilityDemo);

        // 2. Hook for the modal close button (This ensures the 'x' icon works)
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal').style.display = 'none';
            });
        });

        function setAudience(aud) {
            currentAudience = aud;

            const currentAudItem = document.querySelector(`.dropdown-item[data-audience="${aud}"]`);
            if (currentAudItem) {
                roleDropdownBtn.querySelector('span').textContent = currentAudItem.textContent;
                dropdownItems.forEach(i => i.classList.remove('active'));
                currentAudItem.classList.add('active');
            }

            document.getElementById('hero-sub').innerText = translations[lang]['heroSub_' + aud];
            if (aud === 'farmer') {
                document.getElementById('joinBtn').innerText = translations[lang].joinFarmer;
                document.getElementById('join2').innerText = translations[lang].joinFarmer;
            } else if (aud === 'fpo') {
                document.getElementById('joinBtn').innerText = translations[lang].joinFPO;
                document.getElementById('join2').innerText = translations[lang].joinFPO;
            } else if (aud === 'buyer') {
                document.getElementById('joinBtn').innerText = translations[lang].contactBuyers;
                document.getElementById('join2').innerText = translations[lang].contactBuyers;
            } else {
                document.getElementById('joinBtn').innerText = translations[lang].contactInvestors;
                document.getElementById('join2').innerText = translations[lang].contactInvestors;
            }

            // Role-based section visibility
            document.querySelectorAll('[data-role]').forEach(section => {
                const roles = section.getAttribute('data-role');

                // 1. Check for the next element (the divider)
                const nextElement = section.nextElementSibling;
                const isDivider = nextElement && nextElement.classList.contains('section-divider');

                let isVisible = roles === 'all' || roles.split(',').includes(aud);

                if (isVisible) {
                    section.style.display = 'block';
                    section.classList.remove('hidden');

                    // 2. Show the divider if the section is visible
                    if (isDivider) {
                        nextElement.style.display = 'block';
                    }
                } else {
                    section.style.display = 'none';
                    section.classList.add('hidden');

                    // 3. Hide the divider if the section is hidden
                    if (isDivider) {
                        nextElement.style.display = 'none';
                    }
                }
            });

            // Role-based navigation visibility
            document.querySelectorAll('.nav-link-role').forEach(link => {
                const linkRole = link.getAttribute('data-role');
                if (linkRole === 'all') {
                    link.classList.remove('hidden');
                } else {
                    const linkRoleArray = linkRole.split(',');
                    if (linkRoleArray.includes(aud)) {
                        link.classList.remove('hidden');
                    } else {
                        link.classList.add('hidden');
                    }
                }
            });

            // Scroll to top when role changes
            window.scrollTo({ top: 0, behavior: 'smooth' });

            if (aud === 'investor' && typeof updateInvestorChart === 'function') {
                updateInvestorChart();
            }
        }

        // Tooltip Logic
        const tooltip = document.getElementById('res-tooltip');
        const layerMap = { 'l1': 'tipL1', 'l2': 'tipL2', 'l3': 'tipL3' };

        function showTooltip(key) {
            tooltip.textContent = translations[lang][key];
            tooltip.style.display = 'block';
            setTimeout(() => { tooltip.style.opacity = 1; }, 10);
        }
        function hideTooltip() {
            tooltip.style.opacity = 0;
            setTimeout(() => { tooltip.style.display = 'none'; }, 300);
        }
        document.querySelectorAll('.layer').forEach(layer => {
            layer.addEventListener('mouseover', (e) => showTooltip(layerMap[e.currentTarget.id]));
            layer.addEventListener('mouseout', hideTooltip);
        });

        // Carbon Calculator Logic
        const areaInput = document.getElementById('area');
        const practiceSelect = document.getElementById('practice');
        const calcResult = document.getElementById('calcResult');

        function calculateIncome() {
            const area = parseFloat(areaInput.value);
            const practiceFactor = parseFloat(practiceSelect.value);
            const creditValue = 800;
            const baseCreditsPerHectare = 0.5;

            if (isNaN(area) || area <= 0) {
                calcResult.innerHTML = `<span class="result-placeholder">${translations[lang].calcPlaceholder}</span>`;
                calcResult.classList.remove('has-value');
                return;
            }

            const estimatedCredits = area * baseCreditsPerHectare * practiceFactor;
            const income = estimatedCredits * creditValue;

            calcResult.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <div style="font-size: 1.5rem; color: var(--earth-green);">${translations[lang].calcResultPrefix}${Math.round(income).toLocaleString('en-IN')}</div>
                    <div style="font-size: 0.85rem; color: #666; font-weight: 500;">
                        ~${estimatedCredits.toFixed(1)} credits × ₹${creditValue}
                    </div>
                </div>
            `;
            calcResult.classList.add('has-value');

            // Trigger animation
            setTimeout(() => calcResult.classList.remove('has-value'), 500);
        }

        // Real-time calculation
        areaInput.addEventListener('input', calculateIncome);
        areaInput.addEventListener('change', calculateIncome);
        practiceSelect.addEventListener('change', calculateIncome);

        // Initial calculation if default values exist
        if (areaInput.value || practiceSelect.value) {
            calculateIncome();
        }

        // Traceability Modal Logic
        const traceModal = document.getElementById('traceModal');
        const traceJson = document.getElementById('traceJson');
        const sampleJson = {
            "batchID": "RUP-2025-001", "farmerID": "F-8924", "location": "Gujarat, India",
            "crop": "Cotton", "hectares": 1.5, "verificationDate": "2025-10-20",
            "verifiedCredits": "750", "buyer": "Globeco Foods Inc.", "soilCarbonImprovement": "+0.4% SOC",
            "traceLink": "blockchain.rupiya.app/2025-001"
        };

        function showTrace() {
            traceJson.textContent = JSON.stringify(sampleJson, null, 2);
            traceModal.style.display = 'flex';
            setTimeout(() => traceModal.querySelector('.modal').classList.add('active'), 10);
        }
        function closeTrace() {
            traceModal.querySelector('.modal').classList.remove('active');
            setTimeout(() => {
                traceModal.style.display = 'none';
                lucide.createIcons();
            }, 300);
        }
        document.getElementById('traceBtn').addEventListener('click', showTrace);
        document.getElementById('traceModal').addEventListener('click', (e) => {
            if (e.target.id === 'traceModal') closeTrace();
        });

        // --- NEW: ENHANCED TASK MANAGER LOGIC ---

        // 1. Task Data Model with Status and Weight
        let tasks = [
            { id: 1, key: 'task1', icon: 'zap', priority: 'high', completed: false, weight: 0.5 }, // High priority tasks weight more
            { id: 2, key: 'task2', icon: 'droplet', priority: 'medium', completed: false, weight: 0.3 },
            { id: 3, key: 'task3', icon: 'users', priority: 'medium', completed: false, weight: 0.2 },
        ];

        // 2. Function to Update the Progress Circle
        function updateProgress() {
            const totalWeight = tasks.reduce((sum, task) => sum + task.weight, 0);
            const completedWeight = tasks.filter(t => t.completed).reduce((sum, task) => sum + task.weight, 0);

            // Calculate progress percentage, capped at 100%
            const complianceScore = Math.min(100, Math.round((completedWeight / totalWeight) * 100));

            document.getElementById('progressPercent').textContent = `${complianceScore}%`;

            // Update Lottie Animation (Basic: just color change)
            const progressAnim = document.getElementById('progressAnimation');
            if (complianceScore >= 80) {
                progressAnim.style.filter = 'hue-rotate(0deg)'; // Green/Success
            } else if (complianceScore >= 50) {
                progressAnim.style.filter = 'hue-rotate(-40deg)'; // Yellow/Warning
            } else {
                progressAnim.style.filter = 'hue-rotate(-80deg)'; // Red/Low
            }

            // Optional: Update the Lottie file or state based on score (more complex Lottie feature)
            // For this demo, simple hue rotation will suffice.
        }

        // 3. Function to Handle Task Completion Click
        function toggleTask(taskId) {
            const taskIndex = tasks.findIndex(t => t.id === taskId);
            if (taskIndex !== -1) {
                tasks[taskIndex].completed = !tasks[taskIndex].completed;
                renderTasks();
                updateProgress();
            }
        }

        // 4. Function to Render the Tasks (Updated)
        function renderTasks() {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';

            if (tasks.length === 0) {
                taskList.innerHTML = `
                    <div style="text-align: center; padding: 40px; color: #999;">
                        <i data-lucide="check-circle" style="width: 48px; height: 48px; margin: 0 auto 16px; display: block; opacity: 0.5;"></i>
                        <p style="margin: 0;">No tasks available</p>
                    </div>
                `;
                lucide.createIcons();
                return;
            }

            tasks.forEach((task, index) => {
                const currentTranslations = translations[lang];

                const taskCard = document.createElement('div');
                taskCard.className = `task-card ${task.priority === 'high' ? 'high-priority' : ''}`;
                taskCard.dataset.taskId = task.id;
                taskCard.style.opacity = task.completed ? '0.6' : '1';
                taskCard.style.transitionDelay = `${index * 50}ms`;

                if (task.completed) {
                    taskCard.style.background = 'linear-gradient(90deg, #e8f5e9, #ffffff)';
                }

                // Add click listener to toggle the task
                taskCard.addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleTask(task.id);
                });

                // Determine icon based on status
                const iconName = task.completed ? 'check-circle-2' : task.icon;
                const iconColor = task.completed ? '#4CAF50' : task.priority === 'high' ? '#f44336' : 'var(--earth-green)';

                const iconElement = document.createElement('i');
                iconElement.setAttribute('data-lucide', iconName);
                iconElement.style.width = '28px';
                iconElement.style.height = '28px';
                iconElement.style.color = iconColor;
                iconElement.style.flexShrink = '0';

                const contentDiv = document.createElement('div');
                contentDiv.className = 'content';
                contentDiv.style.flex = '1';

                const titleElement = document.createElement('h4');
                titleElement.textContent = task.customTitle || currentTranslations[`${task.key}Title`] || 'Task';
                if (task.completed) {
                    titleElement.style.textDecoration = 'line-through';
                    titleElement.style.opacity = '0.7';
                }

                const descElement = document.createElement('p');
                descElement.textContent = task.customDesc || currentTranslations[`${task.key}Desc`] || '';
                if (task.completed) {
                    descElement.style.opacity = '0.6';
                }

                const dateElement = document.createElement('div');
                dateElement.className = 'date';
                dateElement.textContent = task.customDate || currentTranslations[`${task.key}Date`] || '';

                contentDiv.appendChild(titleElement);
                contentDiv.appendChild(descElement);

                taskCard.appendChild(iconElement);
                taskCard.appendChild(contentDiv);
                taskCard.appendChild(dateElement);

                taskList.appendChild(taskCard);
            });

            // Re-initialize lucide icons for the new elements
            lucide.createIcons();
        }

        // Log Action Modal Functions
        const logActionModal = document.getElementById('logActionModal');
        const logActionForm = document.getElementById('logActionForm');

        function showLogAction() {
            // Set today's date as default
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('actionDate').value = today;

            logActionModal.style.display = 'flex';
            setTimeout(() => logActionModal.querySelector('.modal').classList.add('active'), 10);
            lucide.createIcons();
        }

        function closeLogAction() {
            logActionModal.querySelector('.modal').classList.remove('active');
            setTimeout(() => {
                logActionModal.style.display = 'none';
                logActionForm.reset();
            }, 300);
        }

        // Handle form submission
        logActionForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const actionType = document.getElementById('actionType').value;
            const actionDate = document.getElementById('actionDate').value;
            const actionField = document.getElementById('actionField').value;
            const actionDetails = document.getElementById('actionDetails').value;

            // Create a new task from the logged action
            const actionTypeMap = {
                'fertilizer': { icon: 'leaf', priority: 'high' },
                'irrigation': { icon: 'droplet', priority: 'medium' },
                'pesticide': { icon: 'shield-alert', priority: 'high' },
                'harvest': { icon: 'wheat', priority: 'medium' },
                'other': { icon: 'file-text', priority: 'medium' }
            };

            const actionInfo = actionTypeMap[actionType] || { icon: 'file-text', priority: 'medium' };

            const newTask = {
                id: Date.now(), // Use timestamp as unique ID
                key: 'taskCustom',
                icon: actionInfo.icon,
                priority: actionInfo.priority,
                completed: false,
                weight: actionInfo.priority === 'high' ? 0.4 : 0.2,
                customTitle: `${actionType.charAt(0).toUpperCase() + actionType.slice(1)} - ${actionField}`,
                customDesc: actionDetails,
                customDate: `Logged: ${new Date(actionDate).toLocaleDateString()}`
            };

            tasks.unshift(newTask); // Add to beginning

            // Show success message
            const submitBtn = logActionForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '✓ Logged!';
            submitBtn.style.background = 'var(--leaf)';

            setTimeout(() => {
                closeLogAction();
                renderTasks();
                updateProgress();
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
            }, 1000);
        });

        // Close modal when clicking outside
        logActionModal.addEventListener('click', (e) => {
            if (e.target.id === 'logActionModal') {
                closeLogAction();
            }
        });

        // Bind log action button
        document.getElementById('logActionBtn')?.addEventListener('click', showLogAction);

        // --- END ENHANCED TASK MANAGER LOGIC ---

        // --- NEW FUNCTIONAL FEATURES ---

        // FPO Member Search Functionality
        const memberSearchBtn = document.getElementById('memberSearch')?.nextElementSibling;
        if (memberSearchBtn) {
            memberSearchBtn.addEventListener('click', () => {
                const searchTerm = document.getElementById('memberSearch')?.value;
                if (searchTerm) {
                    alert(`Searching for: ${searchTerm}\n(Feature will show member results)`);
                }
            });
        }

        // Buyer Order Filter Functionality
        const orderFilterBtn = document.getElementById('filterBtn');
        if (orderFilterBtn) {
            orderFilterBtn.addEventListener('click', () => {
                const filter = document.getElementById('orderFilter')?.value;
                const search = document.getElementById('orderSearch')?.value;
                alert(`Filtering orders:\nStatus: ${filter}\nSearch: ${search}\n(Feature will filter order list)`);
            });
        }

        // Investor Report Generation
        const generateReportBtn = document.getElementById('generateReport');
        if (generateReportBtn) {
            generateReportBtn.addEventListener('click', () => {
                const period = document.getElementById('chartPeriod')?.value;
                alert(`Generating report for: ${period}\n(Feature will generate analytics report)`);
            });
        }

        // Quick Action Buttons for Farmers
        document.querySelectorAll('[data-i18n="viewDetails"], [data-i18n="viewTasks"], [data-i18n="checkPayment"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.textContent.trim();
                if (action.includes('Details')) {
                    alert('Weather Alert Details:\nHeavy rainfall (50-70mm) expected in 2 days.\nRecommendation: Cover exposed soil, check drainage.');
                } else if (action.includes('Tasks')) {
                    document.getElementById('tasks')?.scrollIntoView({ behavior: 'smooth' });
                } else if (action.includes('Payment')) {
                    alert('Payment Status:\n₹12,000 pending from last carbon credit verification.\nExpected credit date: 5 days from today.');
                }
            });
        });


        // --- Language Switch Binding ---
        document.getElementById('lang-en').addEventListener('click', () => translatePage('en'));
        document.getElementById('lang-hi').addEventListener('click', () => translatePage('hi'));
        document.getElementById('lang-gu').addEventListener('click', () => translatePage('gu'));

        // --- 2. Mobile Menu Toggle ---
        const menuToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        function toggleMobileMenu(e) {
            if (e) e.stopPropagation();
            if (!menuToggle || !navMenu) return;

            const isCurrentlyOpen = navMenu.classList.contains('is-active');

            if (isCurrentlyOpen) {
                navMenu.classList.remove('is-active');
                menuToggle.setAttribute('data-lucide', 'menu');
                document.body.style.overflow = '';
            } else {
                navMenu.classList.add('is-active');
                menuToggle.setAttribute('data-lucide', 'x');
                document.body.style.overflow = 'hidden';
            }

            lucide.createIcons();
        }

        // Initialize menu toggle
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleMobileMenu(e);
            });

            // Ensure icon is initialized
            lucide.createIcons();
        }

        // Close menu when a link is clicked (for mobile UX)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu && navMenu.classList.contains('is-active')) {
                    toggleMobileMenu();
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu && navMenu.classList.contains('is-active')) {
                if (!navMenu.contains(e.target) &&
                    !menuToggle.contains(e.target) &&
                    e.target !== menuToggle) {
                    toggleMobileMenu();
                }
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu && navMenu.classList.contains('is-active')) {
                toggleMobileMenu();
            }
        });


        // --- INITIALIZATION (Default English) ---
        document.addEventListener('DOMContentLoaded', (event) => {
            // Initialize lucide icons first
            lucide.createIcons();

            translatePage(lang);
            const currentAudiencePill = document.querySelector('.dropdown-item.active');
            // Initialize role-based visibility with default role (farmer)
            const currentAud = currentAudiencePill ? currentAudiencePill.dataset.audience : 'farmer';
            setAudience(currentAud);
            calculateIncome();
            renderTasks();
            updateProgress(); // Initialize progress on load

            // Re-initialize icons after translations (for journey and FPO sections)
            setTimeout(() => {
                lucide.createIcons();
            }, 100);

            // Ensure mobile menu toggle is visible on mobile
            const checkMobileMenu = () => {
                if (window.innerWidth <= 768) {
                    const toggle = document.getElementById('mobile-menu-toggle');
                    if (toggle) {
                        toggle.style.display = 'flex';
                    }
                } else {
                    const toggle = document.getElementById('mobile-menu-toggle');
                    if (toggle) {
                        toggle.style.display = 'none';
                    }
                    // Close menu if open when resizing to desktop
                    const navMenu = document.getElementById('nav-menu');
                    if (navMenu && navMenu.classList.contains('is-active')) {
                        navMenu.classList.remove('is-active');
                        document.body.style.overflow = '';
                        if (toggle) {
                            toggle.setAttribute('data-lucide', 'menu');
                            lucide.createIcons();
                        }
                    }
                }
            };

            checkMobileMenu();
            window.addEventListener('resize', checkMobileMenu);
        });
        // --- 5. SVG Tooltip Logic (Interactive Layer Data) ---
        const svgLayersData = {
            'l1': 'The **Soil Organic Layer** is key for carbon storage. Our deep-scanning satellite analysis estimates carbon content based on historical and current farm practices.',
            'l2': 'The **Root Zone** shows active health (nutrients, microbial). AI monitors spectral data for nutrient deficiencies and crop stress, guiding timely interventions.',
            'l3': 'The **Satellite Imagery & AI Layer** provides real-time verification of practices (e.g., zero tillage, residue management) required for carbon credit validation and residue-free certification.'
        };

        const resSvg = document.getElementById('res-svg');
        const resTooltip = document.getElementById('res-tooltip');
        const svgContainer = document.querySelector('.svg-container');

        if (resSvg && resTooltip && svgContainer) {
            Object.keys(svgLayersData).forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.addEventListener('mouseover', function (e) {
                        resTooltip.style.display = 'block';
                        // Replace ** with <strong> for bolding
                        resTooltip.innerHTML = svgLayersData[id].replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

                        // Simple positioning logic (adjusting for parent container)
                        const svgRect = resSvg.getBoundingClientRect();
                        const layerRect = element.getBoundingClientRect();
                        const containerRect = svgContainer.getBoundingClientRect();

                        // Position tooltip above the middle of the layer
                        let top = (layerRect.top - containerRect.top) - resTooltip.offsetHeight - 10;
                        let left = (layerRect.left - containerRect.left) + (layerRect.width / 2) - (resTooltip.offsetWidth / 2);

                        // Clamp left position to prevent going off edges
                        left = Math.max(10, Math.min(left, containerRect.width - resTooltip.offsetWidth - 10));

                        // Ensure top is positive
                        if (top < 10) top = layerRect.bottom - containerRect.top + 10;

                        resTooltip.style.top = `${top}px`;
                        resTooltip.style.left = `${left}px`;
                    });

                    element.addEventListener('mouseout', function () {
                        resTooltip.style.display = 'none';
                    });
                }
            });
        }
        // --- 6. Scroll Reveal Animation Logic (Simple Intersection Observer) ---
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('show');
                        observer.unobserve(entry.target); // Stop observing once revealed
                    }, delay);
                }
            });
        }, {
            threshold: 0.1, // Start animation when 10% of the item is visible
            rootMargin: '0px 0px -50px 0px' // Slightly reduce viewport area
        });

        document.querySelectorAll('.reveal-item, .card, .section-wrap, .hero').forEach(element => {
            observer.observe(element);
        });

        // --- 7. Finance Calculator Logic ---
        document.getElementById('calculateBtn')?.addEventListener('click', () => {
            const acreage = parseFloat(document.getElementById('acreage').value);
            const crop = document.getElementById('crop').value;
            const resultElement = document.getElementById('calcResult');

            if (isNaN(acreage) || acreage <= 0) {
                resultElement.innerHTML = 'Please enter a valid acreage.';
                return;
            }

            let incomePerAcre = 0;
            let baseYieldFactor = 0;

            // Simplified hypothetical income model (in Rupees)
            switch (crop) {
                case 'cotton':
                    incomePerAcre = 20000;
                    baseYieldFactor = 1.2;
                    break;
                case 'wheat':
                    incomePerAcre = 15000;
                    baseYieldFactor = 0.8;
                    break;
                case 'vegetables':
                    incomePerAcre = 25000;
                    baseYieldFactor = 1.5;
                    break;
            }

            // Enhanced Income = (Base Yield * Acreage) + (Carbon Credits @ ₹800/unit * 0.4 units/acre)
            const baseIncome = incomePerAcre * acreage;
            const carbonIncome = acreage * 0.4 * 800;
            const totalEnhancedIncome = Math.round(baseIncome * baseYieldFactor + carbonIncome);

            // Format result as Indian Rupee Lakhs
            const lakhs = (totalEnhancedIncome / 100000).toFixed(2);

            resultElement.innerHTML = `Your **Potential Enhanced Income** is **₹ ${lakhs} Lakh** (approx).<br>
                                       *(${Math.round(carbonIncome)} from Carbon Credits)*`;
        });

        let investorChart = null; // Global variable to hold the Chart.js instance
        // --- ENHANCED COLOR DEFINITIONS (Using your CSS variables) ---
        const COLOR_LEAF = '#6ECB63';
        const COLOR_NAVY = '#1f2937';
        const COLOR_ACCENT = '#ffc107';
        const COLOR_WATER = 'rgba(0, 123, 255, 0.8)';

        // --- DYNAMIC DATA STRUCTURE BY PERIOD ---
        const DATA_BY_PERIOD = {
            // ⚡ Last Week Data (Lowest Values)
            'week': {
                kpi: { totalRevenue: 500000, totalFarmers: 250, co2Sequestered: 500 },
                financial_growth: {
                    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
                    datasets: [{ label: 'Revenue (₹)', data: [5, 7, 6, 8, 9, 10, 12] }, { label: 'Investment (₹)', data: [10, 10, 10, 12, 12, 12, 15] }]
                },
                environmental_impact: {
                    labels: ['Day 1', 'Day 3', 'Day 5', 'Day 7'],
                    datasets: [{ label: 'CO₂ Sequestered (kg)', data: [50, 70, 80, 100] }, { label: 'Water Saved (L)', data: [20, 30, 40, 50] }]
                },
                farmer_onboarding: {
                    labels: ['Small', 'Medium', 'Large'],
                    datasets: [{ data: [50, 35, 15] }]
                }
            },
            // ⚡ Last Month Data (Moderate Values)
            'month': {
                kpi: { totalRevenue: 1000000, totalFarmers: 500, co2Sequestered: 1000 },
                financial_growth: {
                    labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'],
                    datasets: [{ label: 'Revenue (₹)', data: [20, 35, 50, 70] }, { label: 'Investment (₹)', data: [50, 50, 70, 70] }]
                },
                environmental_impact: {
                    labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'],
                    datasets: [{ label: 'CO₂ Sequestered (Tonnes)', data: [100, 250, 400, 600] }, { label: 'Water Saved (ML)', data: [5, 10, 15, 20] }]
                },
                farmer_onboarding: {
                    labels: ['Small', 'Medium', 'Large'],
                    datasets: [{ data: [55, 30, 15] }]
                }
            },
            // ⚡ Last Quarter Data (Default/Medium-High Values)
            'quarter': {
                kpi: { totalRevenue: 5000000, totalFarmers: 1000, co2Sequestered: 3000 },
                financial_growth: {
                    labels: ['Month 1', 'Month 2', 'Month 3'],
                    datasets: [{ label: 'Revenue (₹ Lakhs)', data: [50, 80, 110] }, { label: 'Investment (₹ Lakhs)', data: [150, 150, 200] }]
                },
                environmental_impact: {
                    labels: ['Month 1', 'Month 2', 'Month 3'],
                    datasets: [{ label: 'CO₂ Sequestered (Tonnes)', data: [1500, 2500, 3000] }, { label: 'Water Saved (ML)', data: [50, 75, 90] }]
                },
                farmer_onboarding: {
                    labels: ['Small Farms (<2 Ha)', 'Medium Farms (2-5 Ha)', 'Large FPOs (>5 Ha)'],
                    datasets: [{ data: [60, 25, 15] }]
                }
            },
            // ⚡ Last Year Data (Highest Values)
            'year': {
                kpi: { totalRevenue: 15000000, totalFarmers: 3500, co2Sequestered: 8000 },
                financial_growth: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    datasets: [{ label: 'Revenue (₹ Lakhs)', data: [50, 120, 250, 400] }, { label: 'Investment (₹ Lakhs)', data: [300, 300, 350, 450] }]
                },
                environmental_impact: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    datasets: [{ label: 'CO₂ Sequestered (Tonnes)', data: [2500, 4000, 5500, 8000] }, { label: 'Water Saved (ML)', data: [100, 180, 250, 350] }]
                },
                farmer_onboarding: {
                    labels: ['Small Farms (<2 Ha)', 'Medium Farms (2-5 Ha)', 'Large FPOs (>5 Ha)'],
                    datasets: [{ data: [50, 30, 20] }]
                }
            }
        };


        // Mock Data for Investor Analysis (Specialized for Risk, Return, and Impact)
        const investorData = {
            // 1. FINANCIAL GROWTH VS INVESTMENT (Line Chart Focus: Risk/Return)
            financial_growth: {
                labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
                datasets: [
                    {
                        label: 'Platform Revenue (₹ Lakhs)',
                        data: [50, 80, 110, 150],
                        borderColor: COLOR_LEAF, // Primary Brand Color
                        backgroundColor: 'rgba(76, 175, 80, 0.5)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 5,
                        pointBackgroundColor: COLOR_LEAF
                    },
                    {
                        label: 'Investment Raised (Cumulative ₹ Lakhs)',
                        data: [150, 150, 200, 200],
                        borderColor: '#6c757d', // Muted Gray for reference data
                        backgroundColor: 'transparent',
                        borderDash: [5, 5],
                        tension: 0.2,
                        pointRadius: 3
                    }
                ]
            },
            // 2. ENVIRONMENTAL IMPACT (Bar Chart Focus: ESG Metrics)
            environmental_impact: {
                labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
                datasets: [
                    {
                        label: 'CO₂ Sequestered (Tonnes)',
                        data: [1500, 2500, 3000, 4000],
                        backgroundColor: COLOR_LEAF,
                        yAxisID: 'y' // Uses the left axis
                    },
                    {
                        label: 'Water Saved (Mega Liters)',
                        data: [50, 75, 90, 120],
                        backgroundColor: COLOR_WATER,
                        yAxisID: 'y1' // Uses the right axis
                    }
                ]
            },
            // 3. FARMER ONBOARDING (Pie Chart Focus: Scalability/Risk Distribution)
            farmer_onboarding: {
                labels: ['Small Farms (<2 Ha)', 'Medium Farms (2-5 Ha)', 'Large FPOs (>5 Ha)'],
                datasets: [{
                    data: [55, 30, 15], // Distribution percentages
                    backgroundColor: [COLOR_LEAF, COLOR_NAVY, COLOR_ACCENT], // High contrast distribution
                    hoverOffset: 10,
                    borderWidth: 2
                }]
            }
        };


        // --- CHART.JS RENDER FUNCTION ---
        function renderInvestorGraph() {
            // ⚡ Correct IDs from the HTML fix
            const dataSeriesSelect = document.getElementById('data-series');
            const graphTypeSelect = document.getElementById('graph-type-select');
            const investorChartCanvas = document.getElementById('investorChartCanvas'); // Correct Canvas ID
            const timePeriodSelect = document.getElementById('chartPeriod');

            if (!dataSeriesSelect || !graphTypeSelect || !investorChartCanvas || typeof Chart === 'undefined') {
                return;
            }

            let selectedSeriesKey = dataSeriesSelect.value;
            let selectedGraphType = graphTypeSelect.value;


            if (investorChart) {
                investorChart.destroy();
            }
            // Override pie chart to doughnut for modern aesthetic
            if (selectedGraphType === 'pie') {
                selectedGraphType = 'doughnut';
            }

            // ⚡ FIX 1: If PIE/DOUGHNUT is selected, auto-select the DISTRIBUTION data
            // if (selectedGraphType === 'doughnut') {
            //     selectedSeriesKey = 'farmer_onboarding';
            //     dataSeriesSelect.value = selectedSeriesKey; // Update dropdown selection visually
            // }

            //old
            // const data = JSON.parse(JSON.stringify(investorData[selectedSeriesKey]));
            // NEW: Access the DATA_BY_PERIOD object using the selected period and series key
            // NEW (CORRECT):
            const selectedPeriod = timePeriodSelect.value;

            // Ensure data exists for the selected period/series before parsing
            if (!DATA_BY_PERIOD[selectedPeriod] || !DATA_BY_PERIOD[selectedPeriod][selectedSeriesKey]) {
                // Handle error or display a message if data is missing
                console.error(`Data not found for Period: ${selectedPeriod} and Series: ${selectedSeriesKey}`);
                return;
            }

            // Data is now pulled correctly from the period-based structure
            const data = JSON.parse(JSON.stringify(DATA_BY_PERIOD[selectedPeriod][selectedSeriesKey]));

            // --- Dynamic Chart Options ---
            let options = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20, // Space out the legend items
                            font: { size: 12, family: 'Inter' }
                        }
                    },
                    title: {
                        display: true,
                        text: dataSeriesSelect.options[dataSeriesSelect.selectedIndex].text + ' Analysis',
                        font: { size: 16, weight: 'bold', family: 'Poppins' }
                    },
                    tooltip: {
                        backgroundColor: COLOR_NAVY, // Dark tooltip background
                        titleFont: { family: 'Poppins' }
                    }
                },
                scales: {}, // Scales will be overwritten below if needed
                // indexAxis: 'x',
                cutout: selectedGraphType === 'doughnut' ? '75%' : '0%', // Doughnut specific option ,
            };

            // --- ⚡ CRUCIAL FIX: Ensure scales are only defined for bar/line charts ---
            if (selectedGraphType === 'doughnut') {
                delete options.scales; // Safely removes the scales property if it exists
            } else if (selectedSeriesKey === 'environmental_impact') {
                // Dual Axis configuration
                options.scales = {
                    y: { grid: { color: 'rgba(0, 0, 0, 0.05)' }, title: { display: true, text: 'CO₂ Sequestered (Tonnes)', color: COLOR_LEAF } },
                    y1: { type: 'linear', display: true, position: 'right', min: 0, grid: { drawOnChartArea: false }, title: { display: true, text: 'Water Saved (ML)', color: COLOR_WATER } }
                };
            } else if (selectedSeriesKey === 'financial_growth') {
                // Single Axis configuration
                options.scales = {
                    y: { beginAtZero: true, grid: { color: 'rgba(0, 0, 0, 0.05)' }, title: { display: true, text: 'Value (₹ Lakhs)' } },
                    x: { grid: { display: false } }
                };
            }

            // --- Create Gradient for Area Chart (Financial Growth) ---
            if (selectedSeriesKey === 'financial_growth' && selectedGraphType === 'line') {
                const ctx = investorChartCanvas.getContext('2d');
                const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                gradient.addColorStop(0, 'rgba(76, 175, 80, 0.4)'); // Top: lighter green
                gradient.addColorStop(1, 'rgba(76, 175, 80, 0.05)'); // Bottom: almost transparent

                // Apply gradient to the primary dataset
                data.datasets[0].backgroundColor = gradient;
                data.datasets[0].fill = 'origin'; // Ensure it fills the area
            }

            // --- Configure Axes based on Data Series ---
            if (selectedSeriesKey === 'environmental_impact') {
                // Dual Axis for CO2 (Tons) and Water (ML)
                options.scales = {
                    y: {
                        type: 'linear', display: true, position: 'left', min: 0,
                        grid: { color: 'rgba(0, 0, 0, 0.05)' }, // Light grid lines
                        title: { display: true, text: 'CO₂ Sequestered (Tonnes)', color: COLOR_LEAF }
                    },
                    y1: {
                        type: 'linear', display: true, position: 'right', min: 0,
                        grid: { drawOnChartArea: false },
                        title: { display: true, text: 'Water Saved (ML)', color: COLOR_WATER }
                    }
                };
            } else if (selectedSeriesKey === 'financial_growth') {
                // Single Axis for Financials
                options.scales = {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0, 0, 0, 0.05)' },
                        title: { display: true, text: 'Value (₹ Lakhs)' }
                    },
                    x: {
                        grid: { display: false } // Remove vertical grid lines
                    }
                };
            }
            // Pie charts have no scales defined

            // --- Create the new Chart instance ---
            investorChart = new Chart(investorChartCanvas, {
                type: selectedGraphType,
                data: data,
                options: options
            });
        }
        // --- FINAL EVENT LISTENERS ---

        // 1. Link dropdown changes to the render function (instant analysis)
        document.getElementById('data-series')?.addEventListener('change', renderInvestorGraph);
        document.getElementById('graph-type-select')?.addEventListener('change', renderInvestorGraph);

        // 2. Link the button to the render function (as a manual trigger/fallback)
        document.getElementById('generate-graph')?.addEventListener('click', renderInvestorGraph);

        // 3. Initial render when the Investor role is loaded (This assumes you correctly placed 
        //    the Chart.js script tag in the <head> which is best practice)
        window.addEventListener('load', renderInvestorGraph);

        // --- DYNAMIC KPI UPDATE LOGIC (DEBUGGED) ---
        // --- ANIMATION LOGIC (Robust Fix) ---
        function animateCount(targetElement, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                const currentValue = Math.floor(easedProgress * (end - start) + start);

                let formattedValue;

                // ⚡ SIMPLIFIED FORMATTING INSIDE LOOP TO AVOID CRASHES
                if (targetElement.id === 'kpi-financial-value') {
                    formattedValue = `₹ ${(currentValue / 100000).toFixed(1)} Lakh`;
                } else if (targetElement.id === 'kpi-impact-value') {
                    formattedValue = `${currentValue.toLocaleString('en-IN')} Tonnes`;
                } else {
                    formattedValue = currentValue.toLocaleString('en-IN');
                }

                targetElement.textContent = formattedValue;

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    // ⚡ FINAL PRECISE FORMATTING
                    if (targetElement.id === 'kpi-financial-value') {
                        targetElement.textContent = `₹ ${(end / 100000).toFixed(2)} Lakh`;
                    } else if (targetElement.id === 'kpi-impact-value') {
                        targetElement.textContent = `${end.toLocaleString('en-IN')} Tonnes`;
                    } else {
                        targetElement.textContent = end.toLocaleString('en-IN');
                    }
                }
            };
            window.requestAnimationFrame(step);
        }

        // --- KPI UPDATE FUNCTION (Period-Aware) ---
        function updateInvestorKPIs() {
            const timePeriodSelect = document.getElementById('chartPeriod');
            if (!timePeriodSelect) return;

            const selectedPeriod = timePeriodSelect.value;
            const kpiData = DATA_BY_PERIOD[selectedPeriod].kpi; // ⚡ PULL DATA FROM NEW STRUCTURE

            const financialEl = document.getElementById('kpi-financial').querySelector('.kpi-value');
            const farmersEl = document.getElementById('kpi-farmers').querySelector('.kpi-value');
            const impactEl = document.getElementById('kpi-impact').querySelector('.kpi-value');

            // Set temporary IDs
            financialEl.id = 'kpi-financial-value';
            farmersEl.id = 'kpi-farmers-value';
            impactEl.id = 'kpi-impact-value';

            const duration = 1500;

            // Execute animations with new period data
            animateCount(financialEl, 0, kpiData.totalRevenue, duration);
            animateCount(farmersEl, 0, kpiData.totalFarmers, duration);
            animateCount(impactEl, 0, kpiData.co2Sequestered, duration);
        }

        // --- FINAL EVENT LISTENERS (CLEANED UP) ---

        // 1. Dropdown listeners: These trigger an update instantly when changed
        document.getElementById('data-series')?.addEventListener('change', renderInvestorGraph);
        document.getElementById('graph-type-select')?.addEventListener('change', renderInvestorGraph);

        // ⚡ FIX: This is the listener for your period dropdown (chartPeriod)
        document.getElementById('chartPeriod')?.addEventListener('change', renderInvestorGraph);

        // 2. ⚡ FIX: This ensures the "Generate Report" button explicitly triggers the render function
        const btn = document.getElementById('generate-report-btn');
        if (btn) {
            btn.addEventListener('click', () => {
                renderInvestorGraph();
                updateInvestorKPIs();
            });
        }


        // Fallback/Legacy button listener (optional, remove if you deleted the 'Analyze Data' button)
        document.getElementById('generate-graph')?.addEventListener('click', renderInvestorGraph);


        // 3. Initial load listener
        window.addEventListener('load', () => {
            // Calling renderInvestorGraph() on load will trigger the first data load and animation.
            renderInvestorGraph();
        });

        // --- APPLY COLORS TO PERIOD DATA (Auto-enhancement for all charts) ---
function applyChartColors() {

    const applyEnvImpactColors = (env) => {
        if (!env || !env.datasets) return;

        // CO2 Bar
        env.datasets[0].backgroundColor = COLOR_LEAF;
        env.datasets[0].borderColor = COLOR_LEAF;
        env.datasets[0].borderWidth = 1.5;
        env.datasets[0].yAxisID = 'y';

        // Water Bar
        env.datasets[1].backgroundColor = COLOR_WATER;
        env.datasets[1].borderColor = COLOR_WATER;
        env.datasets[1].borderWidth = 1.5;
        env.datasets[1].yAxisID = 'y1';
    };

    const applyFinancialColors = (fin) => {
        if (!fin || !fin.datasets) return;

        // Revenue Line
        fin.datasets[0].borderColor = COLOR_LEAF;
        fin.datasets[0].backgroundColor = 'rgba(76,175,80,0.15)';
        fin.datasets[0].pointBackgroundColor = COLOR_LEAF;

        // Investment Line
        fin.datasets[1].borderColor = COLOR_NAVY;
        fin.datasets[1].borderDash = [5, 5];
        fin.datasets[1].backgroundColor = '#1A3C57';
        fin.datasets[1].pointBackgroundColor = COLOR_NAVY;
    };

    const applyFarmerPieColors = (pie) => {
        if (!pie || !pie.datasets) return;

        pie.datasets[0].backgroundColor = [
           ' #6ECB63',
            '#F4D35E',
            '#4DB6E2'
        ];
        pie.datasets[0].borderColor = "#ffffff";
        pie.datasets[0].borderWidth = 2;
    };

    // Apply to every period
    for (const periodKey in DATA_BY_PERIOD) {
        const period = DATA_BY_PERIOD[periodKey];

        applyEnvImpactColors(period.environmental_impact);
        applyFinancialColors(period.financial_growth);
        applyFarmerPieColors(period.farmer_onboarding);
    }
}

// 🚀 Run this before first chart render
applyChartColors();

                  // ---- Sample / default data (you can replace with fetch from your API) ----
  const defaultLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const defaultMembers = [120, 180, 260, 350, 420, 510, 600];
  const defaultCredits = [20, 45, 70, 100, 160, 220, 300]; // in tonnes or credits

  // ---- Create chart ----
  const ctx = document.getElementById('fpoChart').getContext('2d');

  // Keep global ref for updates
  let fpoChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: defaultLabels,
      datasets: [
        {
          label: 'Member Growth',
          data: defaultMembers,
          yAxisID: 'yMembers',
          borderWidth: 3,
          fill: true,
          backgroundColor: (ctx) => {
            // subtle gradient
            const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
            g.addColorStop(0, 'rgba(10,125,62,0.15)');
            g.addColorStop(1, 'rgba(10,125,62,0.02)');
            return g;
          },
          borderColor: 'rgba(10,125,62,1)',
          pointRadius: 3,
          tension: 0.4,
        },
        {
          label: 'Carbon Credits Generated',
          data: defaultCredits,
          yAxisID: 'yCredits',
          borderWidth: 3,
          borderDash: [6,4],
          borderColor: 'rgba(6,86,132,1)',
          pointRadius: 3,
          fill: false,
          tension: 0.4,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: false
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            // example format: show units for credits
            label: function(context) {
              const label = context.dataset.label || '';
              const value = context.parsed.y;
              if (context.dataset.yAxisID === 'yCredits') {
                return label + ': ' + value + ' tCO₂eq'; // change unit as needed
              }
              return label + ': ' + value;
            }
          }
        },
        legend: {
          position: 'top',
          labels: {boxWidth: 12, padding: 12}
        }
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      },
      scales: {
        x: {
          grid: {display:false},
          ticks: {maxRotation: 0, autoSkip: true}
        },
        yMembers: {
          type: 'linear',
          position: 'left',
          beginAtZero: true,
          title: {display:true, text:'Members'},
          grid: {color: 'rgba(0,0,0,0.04)'}
        },
        yCredits: {
          type: 'linear',
          position: 'right',
          beginAtZero: true,
          title: {display:true, text:'Carbon Credits (tCO₂eq)'},
          grid: {drawOnChartArea: false}
        }
      }
    }
  });

  // ---- Helper: update chart with new data object ----
  // expected format:
  // { labels: [...], members: [...], credits: [...], totals: { memberCount: 1247, verifiedCredits: 3120, revenue: '₹2.4L' } }
  function updateFpoChart(data = {}) {
    // defensive: fall back to defaults
    const labels = Array.isArray(data.labels) ? data.labels : defaultLabels;
    const members = Array.isArray(data.members) ? data.members : defaultMembers;
    const credits = Array.isArray(data.credits) ? data.credits : defaultCredits;

    fpoChart.data.labels = labels;
    fpoChart.data.datasets[0].data = members;
    fpoChart.data.datasets[1].data = credits;
    fpoChart.update();

    // optional: update stat cards if totals provided
    if (data.totals) {
      if (data.totals.memberCount != null) {
        const el = document.getElementById('fpo-member-count');
        if (el) el.textContent = data.totals.memberCount.toLocaleString();
      }
      // add other stat updates similarly (verified credits, revenue, etc.)
      if (data.totals.verifiedCredits != null) {
        const el = document.querySelector('.fpo-stat-card .fpo-stat-value'); // adjust selector to proper stat card
        // better: add ids to each stat card to update specifically — e.g. id="verified-credits"
      }
    }
  }

  // ---- Example: fetch live data from your backend and push to chart ----
  // Replace '/api/fpo-metrics' with your real endpoint.
  async function loadFpoData() {
    try {
      const res = await fetch('/api/fpo-metrics'); // expected to return JSON in the shape used above
      if (!res.ok) throw new Error('Network error');
      const json = await res.json();

      // Example transform if your backend has a different shape:
      // const payload = {
      //   labels: json.months,
      //   members: json.member_growth,
      //   credits: json.carbon_credits,
      //   totals: json.totals
      // };
      // For now assume the API returns the same format:
      updateFpoChart(json);
    } catch (err) {
      console.warn('Could not load FPO data, using defaults:', err);
      // still keep defaults loaded
    }
  }

  // call on load (you can also call conditionally when section becomes visible)
  loadFpoData();

  // If your dashboard hides/shows sections, call updateFpoChart() whenever new data available or when section becomes visible.



  // Back to Top - neon + bounce
(function () {
  const btn = document.getElementById('backToTop') || document.getElementById('backToTop') /* fallback id */;
  if (!btn) return;

  // render lucide icon (in case loaded earlier)
  if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }

  let shownOnce = false;
  const SHOW_SCROLL_Y = 350; // px when button appears
  const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function onScroll() {
    if (window.scrollY > SHOW_SCROLL_Y) {
      if (!btn.classList.contains('show')) {
        btn.classList.add('show');
        // add bounce if reduced-motion not requested
        if (!REDUCE_MOTION) {
          // small delay so show transition completes
          setTimeout(() => btn.classList.add('bounce'), 260);
        }
      }
      shownOnce = true;
    } else {
      btn.classList.remove('bounce');
      btn.classList.remove('show');
    }
  }

  // initial check
  onScroll();

  // throttle scroll handler lightly
  let scrollTimer = null;
  window.addEventListener('scroll', () => {
    if (scrollTimer !== null) {
      clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(() => {
      onScroll();
      scrollTimer = null;
    }, 60);
  }, { passive: true });

  // click to top (smooth)
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    // temporarily remove bounce while scrolling (prevents jump)
    if (!REDUCE_MOTION) btn.classList.remove('bounce');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // re-add bounce after scroll ends (approx)
    if (!REDUCE_MOTION) {
      setTimeout(() => {
        if (btn.classList.contains('show')) btn.classList.add('bounce');
      }, 800);
    }
  });

  // keyboard: Enter/Space triggers click (button native does this but keep defensive)
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') btn.click();
  });

  // ensure icon re-renders after potential DOM changes
  if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }
})();






/* ---------- Product catalog modal (single, isolated, robust) ---------- */
(function () {
    const catalog = document.querySelector('.buyer-catalog');
    if (!catalog) return;
    
    // remove any previous instance we created earlier
    const prev = document.getElementById('product-modal');
    if (prev) prev.remove();
    
    // build modal DOM (isolated class names)
    const modal = document.createElement('div');
  modal.id = 'product-modal';
  modal.className = 'product-modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="pmodal-backdrop" id="product-modal-backdrop" aria-hidden="true"></div>
    <div class="pmodal-card" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="pmodal-title" tabindex="-1">
      <button class="pmodal-close" aria-label="Close product details">&times;</button>
      <div class="pmodal-body">
      <div class="pmodal-image"><img src="" alt="" /></div>
      <div class="pmodal-info">
      <h3 id="pmodal-title"></h3>
      <p class="pmodal-cert"></p>
      <p class="pmodal-desc"></p>
      <div class="pmodal-meta">
      <strong class="pmodal-price"></strong>
      <span class="pmodal-origin muted"></span>
      </div>
      <div style="margin-top:12px">
      <button class="btn pmodal-buy">Request Quote</button>
      <button class="btn ghost pmodal-contact">Contact Seller</button>
      </div>
      </div>
      </div>
      </div>
      `;
  document.body.appendChild(modal);
  
  // references
  const backdrop = modal.querySelector('.pmodal-backdrop');
  const card = modal.querySelector('.pmodal-card');
  
  // ensure modal hidden initially
  modal.style.display = 'none';
  
  // focus trap helpers
  function trapFocus(container) {
    const focusable = container.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    function handler(e) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    container._trap = handler;
    container.addEventListener('keydown', handler);
}
function releaseFocus(container) {
    if (container._trap) container.removeEventListener('keydown', container._trap);
    container._trap = null;
  }
  
  // open / close
  function openModal(data) {
    modal.setAttribute('data-open', 'true');
    modal.setAttribute('aria-hidden', 'false');
    card.setAttribute('aria-hidden', 'false');
    
    // fill
    const img = modal.querySelector('.pmodal-image img');
    img.src = data.img || '';
    img.alt = data.name || '';
    modal.querySelector('#pmodal-title').textContent = data.name || '';
    modal.querySelector('.pmodal-cert').textContent = data.cert || '';
    modal.querySelector('.pmodal-desc').textContent = data.desc || '';
    modal.querySelector('.pmodal-price').textContent = data.price || '';
    modal.querySelector('.pmodal-origin').textContent = data.origin ? ' • ' + data.origin : '';
    
    // show
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    document.body.style.overflow = 'hidden';
    card.focus();
    trapFocus(card);
}

function closeModal() {
    modal.removeAttribute('data-open');
    modal.setAttribute('aria-hidden', 'true');
    card.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
    document.body.style.overflow = '';
    // clear image
    const img = modal.querySelector('.pmodal-image img');
    if (img) img.src = '';
    releaseFocus(card);
}

// open handler (delegated)
catalog.addEventListener('click', (e) => {
    const btn = e.target.closest('.view-details');
    if (!btn) return;
    const productCard = btn.closest('.product-card');
    if (!productCard) return;
    
    const data = {
      id: productCard.dataset.id || '',
      name: productCard.dataset.name || productCard.querySelector('.product-title')?.textContent || '',
      price: productCard.dataset.price || productCard.querySelector('.product-price')?.textContent || '',
      origin: productCard.dataset.origin || '',
      cert: productCard.dataset.cert || '',
      desc: productCard.dataset.desc || productCard.querySelector('.product-short')?.textContent || '',
      img: productCard.querySelector('.product-image img')?.src || ''
    };
    openModal(data);
  });
  
  // robust close (delegated on modal)
  modal.addEventListener('click', (e) => {
    if (e.target.classList && e.target.classList.contains('pmodal-backdrop')) { closeModal(); return; }
    if (e.target.closest && e.target.closest('.pmodal-close')) { closeModal(); return; }
  });
  
  // Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('data-open')) closeModal();
});

// isolated CSS injection so styles don't collide
if (!document.getElementById('pmodal-styles')) {
    const s = document.createElement('style');
    s.id = 'pmodal-styles';
    s.textContent = `
      .product-modal { position:fixed; inset:0; z-index:1400; display:flex; align-items:center; justify-content:center; pointer-events:none; }
      .product-modal[data-open] { pointer-events:auto; }
      .product-modal .pmodal-backdrop { position:absolute; inset:0; background:rgba(4,10,6,0.6); }
      .product-modal .pmodal-card { position:relative; width:min(980px,96%); background:white; border-radius:12px; padding:18px; z-index:2; box-shadow:0 20px 50px rgba(0,0,0,0.3); outline:none; }
      .product-modal .pmodal-close { position:absolute; top:12px; right:12px; border:none; background:transparent; font-size:22px; cursor:pointer; }
      .product-modal .pmodal-body { display:flex; gap:16px; align-items:flex-start; }
      .product-modal .pmodal-image { width:44%; max-width:420px; border-radius:8px; overflow:hidden; }
      .product-modal .pmodal-image img { width:100%; height:100%; object-fit:cover; display:block; }
      .product-modal .pmodal-info { width:56%; }
      .product-modal .pmodal-info h3 { margin-top:0; color:var(--earth-green); }
      .product-modal .pmodal-cert { font-weight:700; color:#2b6b44; margin:6px 0; }
      .product-modal .pmodal-desc { color:#334; }
      .product-modal .pmodal-meta { margin-top:10px; display:flex; gap:12px; align-items:center; }
      .product-modal .muted { color:#6b766f; font-size:0.95rem; }
      @media (max-width:880px) { .product-modal .pmodal-body { flex-direction:column; } .product-modal .pmodal-image, .product-modal .pmodal-info { width:100%; } }
      `;
      document.head.appendChild(s);
    }
})();


// TRACEABILITY GRID POPUP
(function() {
    const traceData = {
        farm: {
            title: "Farm Origin (Source Verification)",
            desc: "Farmer identity, GPS location, soil health baseline and organic compliance checks.",
            images: ["images/farm_soil.jpg","images/field_geotag.jpg","images/lab_report.jpg"],
            timeline: [
                "Farmer Registered — Verified KYC",
                "Soil Sample Collected — SOC 1.9%",
                "Field Geotagged — GPS Lock"
            ]
        },
        harvest: {
            title: "Harvest & Collection",
            desc: "Crop harvested with timestamps, moisture reading, and grain quality visual verification.",
            images: ["images/harvest_collection.jpg","images/moisture_check.jpg"],
            timeline: [
                "Harvest Started — 8:40 AM",
                "Moisture Check — 12%",
                "Collection Center Received — 4:30 PM"
            ]
        },
        processing: {
            title: "Processing",
            desc: "Cleaning, grading, sorting and FSSAI-compliant processing with batch linking.",
            images: ["images/processing_facility.jpg","images/lab_report.jpg"],
            timeline: [
                "Batch Assigned: RUP-2025-0012",
                "Sorting & Cleaning Completed",
                "Lab Report — Residue Free"
            ]
        },
        transport: {
            title: "Distribution (Logistics)",
            desc: "Cold-chain / truck tracking, temperature logs, geo-fenced route compliance.",
            images: ["images/truck_tracking.jpg","images/temperature_log.jpg"],
            timeline: [
                "Truck Dispatched — 6:00 AM",
                "Live GPS: En-route",
                "ETA to Buyer — 2:40 PM"
            ]
        },
        delivery: {
            title: "Delivery & Documentation",
            desc: "Final handover with invoice, certification bundle, buyer confirmation.",
            images: ["images/delivery_docs.jpg","images/lab_report.jpg"],
            timeline: [
                "Arrived at Buyer Gate",
                "QC Check — Passed",
                "Delivery Completed — Receipt Generated"
            ]
        }
    };

    const modal = document.getElementById("trace-modal");
    const modalTitle = document.getElementById("tmodal-title");
    const modalDesc = document.getElementById("tmodal-desc");
    const evidence = document.querySelector(".tmodal-evidence");
    const timeline = document.getElementById("tmodal-timeline");

    document.querySelectorAll(".trace-card").forEach(card => {
        card.addEventListener("click", () => {
            const step = card.dataset.step;
            const info = traceData[step];

            modalTitle.textContent = info.title;
            modalDesc.textContent = info.desc;

            evidence.innerHTML = info.images
                .map(img => `<img src="${img}" alt="Evidence">`)
                .join("");

            timeline.innerHTML = `<ul>` + info.timeline.map(t => `<li>✔ ${t}</li>`).join("") + `</ul>`;

            modal.setAttribute("aria-hidden","false");
        });
    });

    // Close modal
    document.querySelector(".tmodal-close").addEventListener("click", () => {
        modal.setAttribute("aria-hidden","true");
    });
    document.querySelector(".tmodal-backdrop").addEventListener("click", () => {
        modal.setAttribute("aria-hidden","true");
    });
})();



    // --- Utility Function (Retained) ---
    function calculateAndShowResult(calcId, calculationFn) {
        document.getElementById(calcId).onclick = () => {
            const resultElement = document.getElementById(calcId.replace('-calc', '-result'));
            const resultText = calculationFn();
            
            resultElement.textContent = resultText;
            resultElement.style.display = 'block';
            
            // Re-trigger animation
            resultElement.classList.remove('result-animate');
            void resultElement.offsetWidth; 
            resultElement.classList.add('result-animate');
        };
    }

    // --- Tab and Card Toggle Logic (Retained) ---
    const tabs = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.role-section');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const role = tab.dataset.role;
            tabs.forEach(t=> t.classList.remove('active'));
            tab.classList.add('active');
            sections.forEach(s => s.style.display = s.dataset.role === role ? 'grid' : 'none'); 

            document.querySelectorAll('.card').forEach(card => {
                card.classList.remove('is-active');
                const result = card.querySelector('[id$="-result"]');
                if (result) result.style.display = 'none';
            });
        });
    });

    const clickableCards = document.querySelectorAll('.clickable-card');
    clickableCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('input, select, button')) {
                return; 
            }
            
            const parentSection = this.closest('.role-section');
            if (parentSection) {
                 parentSection.querySelectorAll('.card.is-active').forEach(activeCard => {
                    if (activeCard !== this) {
                        activeCard.classList.remove('is-active');
                        const result = activeCard.querySelector('[id$="-result"]');
                        if (result) result.style.display = 'none';
                    }
                });
            }

            this.classList.toggle('is-active');

            if (!this.classList.contains('is-active')) {
                const result = this.querySelector('[id$="-result"]');
                if (result) result.style.display = 'none';
            }
        });
    });

    // --- ALL CALCULATOR FUNCTIONS (Retained) ---

    // Farmer Credit Calculator
    calculateAndShowResult('farmer-credit-calc', () => {
        const area = parseFloat(document.getElementById('farmer-credit-area').value) || 0;
        const yieldPerAcre = parseFloat(document.getElementById('farmer-credit-yield').value) || 0;
        const creditBase = (area * yieldPerAcre * 35000); 
        const credit = (creditBase * 0.70).toFixed(0); 
        return `💰 Max Credit Approved: **₹${parseInt(credit).toLocaleString('en-IN')}**. Annual Interest Rate (W.E.F.): 7.0%.`;
    });

    // Farmer Gold Simulator
    calculateAndShowResult('farmer-gold-calc', () => {
        const amt = parseFloat(document.getElementById('farmer-gold-amount').value) || 0;
        const goldPrice = 6300; 
        const goldGrams = (amt / goldPrice).toFixed(3);
        return `💎 Transaction successful. Gold credited: **${goldGrams}g** (99.9% purity). Securely held in Rupiya Vault.`;
    });

    // Farmer Insurance Estimate
    calculateAndShowResult('farmer-insurance-calc', () => {
        const area = parseFloat(document.getElementById('farmer-insurance-area').value) || 0;
        const premium = (area * 1950).toFixed(0); 
        const coverage = (area * 30000);
        return `🛡️ Annual Premium: **₹${parseInt(premium).toLocaleString('en-IN')}**. Guaranteed Coverage: ₹${coverage.toLocaleString('en-IN')}. Policy ID: AGRI-${Math.floor(Math.random() * 10000)}.`;
    });

    // Farmer Rupiya Pay Simulator
    calculateAndShowResult('farmer-pay-calc', () => {
        const type = document.getElementById('farmer-pay-type').value;
        const amt = parseFloat(document.getElementById('farmer-pay-amount').value) || 0;
        let transactionPartner = type.includes('seed') ? 'Agri-Dealer, Sikar' : 'Farm Labourer, Account *8012';
        return `✅ Payment Complete. **₹${amt.toLocaleString('en-IN')}** paid instantly to ${transactionPartner}. UPI Reference: UTD${Math.floor(Math.random() * 900000 + 100000)}.`;
    });

    // Farmer Input Cost Tracker 
    calculateAndShowResult('farmer-costs-calc', () => {
        const area = parseFloat(document.getElementById('farmer-costs-area').value) || 0;
        const cropIntensity = document.getElementById('farmer-costs-crop').value;
        let costPerAcre = 0; let laborPct = 0; let seedPct = 0;
        
        if (cropIntensity === 'low') { costPerAcre = 8000; laborPct = 0.4; seedPct = 0.3; }
        else if (cropIntensity === 'medium') { costPerAcre = 15000; laborPct = 0.5; seedPct = 0.25; }
        else { costPerAcre = 25000; laborPct = 0.6; seedPct = 0.15; }

        const totalCost = (area * costPerAcre).toFixed(0);
        const laborCost = (totalCost * laborPct).toFixed(0);
        const seedCost = (totalCost * seedPct).toFixed(0);

        return `💵 Estimated Total Cost: **₹${parseInt(totalCost).toLocaleString('en-IN')}**. Major components: Labor (₹${parseInt(laborCost).toLocaleString('en-IN')}), Seeds/Inputs (₹${parseInt(seedCost).toLocaleString('en-IN')}).`;
    });

    // Farmer Price Volatility Alert 
    calculateAndShowResult('farmer-volatility-calc', () => {
        const commodity = document.getElementById('farmer-volatility-commodity').value;
        const time = parseInt(document.getElementById('farmer-volatility-time').value) || 3;
        
        let avgPrice = 0; let volatilityFactor = 0;
        if (commodity === 'wheat') { avgPrice = 2400; volatilityFactor = 0.08; } 
        else if (commodity === 'cotton') { avgPrice = 7000; volatilityFactor = 0.15; } 
        else { avgPrice = 2000; volatilityFactor = 0.10; }

        const maxSwing = avgPrice * volatilityFactor * (time / 6); 
        const minPrice = avgPrice - maxSwing;
        const maxPrice = avgPrice + maxSwing;

        return `⚠️ Projected Price Range (${commodity.toUpperCase()} / Quintal) in ${time} months: **₹${minPrice.toFixed(0)} - ₹${maxPrice.toFixed(0)}**. Market risk: ${Math.round(volatilityFactor * 100)}%.`;
    });

    // FPO Revenue Forecast 
    calculateAndShowResult('fpo-revenue-calc', () => {
        const members = parseInt(document.getElementById('fpo-members').value) || 0;
        const yieldPerMember = parseFloat(document.getElementById('fpo-yield').value) || 0;
        const totalYield = members * yieldPerMember;
        const totalCarbonIncome = totalYield * 450; 
        const totalSaleValue = totalYield * 35000; 
        const totalRevenue = totalSaleValue + totalCarbonIncome;
        return `📈 Total FPO Revenue Forecast: **₹${totalRevenue.toLocaleString('en-IN')}**. Total Volume: ${totalYield.toFixed(1)} tons.`;
    });

    // FPO Equipment Loan Calculator 
    calculateAndShowResult('fpo-loan-calc', () => {
        const principal = parseFloat(document.getElementById('fpo-loan-amount').value) || 0;
        const years = parseInt(document.getElementById('fpo-loan-years').value) || 5;
        const rate = 0.12; 
        const n = years * 12; 
        const r = rate / 12; 
        
        const emi = principal * r * Math.pow((1 + r), n) / (Math.pow((1 + r), n) - 1);
        const totalPayment = emi * n;
        const totalInterest = totalPayment - principal;

        if (emi > 0) {
            return `💸 Monthly EMI: **₹${emi.toFixed(0).toLocaleString('en-IN')}** for ${years} years. Total Interest: ₹${totalInterest.toFixed(0).toLocaleString('en-IN')}.`;
        } else {
            return `Error: Please enter a valid loan amount.`;
        }
    });
    
    // FPO Carbon Credit Earning Forecast 
    calculateAndShowResult('fpo-carbon-calc', () => {
        const acres = parseFloat(document.getElementById('fpo-carbon-acres').value) || 0;
        const practice = document.getElementById('fpo-carbon-practice').value;
        
        let tonsPerAcre = (practice === 'zero') ? 1.5 : 1.0; 
        const carbonPrice = 850; 
        
        const totalTons = acres * tonsPerAcre;
        const projectedIncome = totalTons * carbonPrice;
        const practiceName = practice === 'zero' ? 'Zero Tillage' : 'Cover Cropping';

        return `🌱 Projected Carbon Income (1 Yr): **₹${projectedIncome.toLocaleString('en-IN')}**. Practice: ${practiceName}. Estimated reduction: ${totalTons.toFixed(0)} tonnes CO2e.`;
    });

    // Investor Impact & ROI Simulation 
    calculateAndShowResult('investor-calc', () => {
        const amt = parseFloat(document.getElementById('investor-amount').value) || 0;
        const roi = (amt * 0.145).toFixed(0); 
        const impact = (amt / 10000 * 65).toFixed(0); 
        const region = document.getElementById('investor-region').value === 'north' ? 'Northern' : 'Southern';

        return `🎯 Est. ROI (1 Yr, Gross): **14.5% (₹${parseInt(roi).toLocaleString('en-IN')})**. Impact covers ${region} region, offsetting ${impact} tonnes CO2.`;
    });

    // Investor ESG Impact Score 
    calculateAndShowResult('investor-esg-calc', () => {
        const sector = document.getElementById('investor-esg-sector').value;
        const size = parseFloat(document.getElementById('investor-esg-size').value) || 5.0; 

        let baseScore = 75; 
        if (sector === 'water') { baseScore += 5; } else if (sector === 'soil') { baseScore += 3; } else { baseScore += 7; }
        
        const finalScore = Math.min(95, Math.max(60, baseScore + Math.floor(size / 5))).toFixed(0);
        const focusText = sector === 'community' ? 'Social Impact (S)' : 'Environmental Focus (E)';
        
        return `🌟 ESG Impact Score: **${finalScore}/100**. Primary driver is high **${focusText}**. Report Link: RPY-ESG-${Math.floor(Math.random() * 1000)}.`;
    });
