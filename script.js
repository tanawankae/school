let currentSection = 'overview';
let isInitialized = false;

function initializeApp() {
    if (isInitialized) return;
    console.log('Initializing application...');
    
    loadComponentsAndSections().then(() => {
        hideLoadingScreen();
        animateScoreRing();
        setupEventListeners();
        setupIntersectionObserver();
        setupParallaxEffects();
        animateOnLoad();
        setupErrorHandling();
        initializePerformanceMonitoring();
        initializeCharts();
        enhanceAccessibility();
        showSection('overview'); // Set overview as default section
        isInitialized = true;
        console.log('Application initialized successfully');
    }).catch(error => {
        console.error('Initialization failed:', error);
    });
}

async function loadComponentsAndSections() {
    const components = ['navbar', 'hero', 'intro', 'stats', 'navigation', 'summary', 'footer'];
    const sections = ['overview', 'curriculum', 'quality', 'results', 'development', 'accreditation'];

    for (const component of components) {
        try {
            const response = await fetch(`components/${component}.html`);
            if (!response.ok) throw new Error(`Failed to load ${component}.html`);
            const content = await response.text();
            const target = document.getElementById(component);
            if (target) target.innerHTML = content;
        } catch (error) {
            console.error(`Error loading ${component}.html:`, error);
        }
    }

    for (const section of sections) {
        try {
            const response = await fetch(`sections/${section}.html`);
            if (!response.ok) throw new Error(`Failed to load ${section}.html`);
            const content = await response.text();
            const target = document.getElementById(`${section}-content`);
            if (target) target.innerHTML = content;
        } catch (error) {
            console.error(`Error loading ${section}.html:`, error);
        }
    }
}

function initializeCharts() {
    const charts = [
        {
            id: 'studentCountChart',
            type: 'line',
            data: {
                labels: ['2564', '2565', '2566'],
                datasets: [{
                    label: 'จำนวนนักศึกษา',
                    data: [427, 460, 452],
                    borderColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim(),
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: false, suggestedMin: 400, suggestedMax: 500 } },
                plugins: { legend: { display: false } }
            }
        },
        {
            id: 'retentionRateChart',
            type: 'line',
            data: {
                labels: ['2560', '2561', '2562'],
                datasets: [{
                    label: 'อัตราการคงอยู่ (%)',
                    data: [97.89, 97.50, 100],
                    borderColor: getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim(),
                    backgroundColor: 'rgba(118, 75, 162, 0.2)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: false, suggestedMin: 95, suggestedMax: 100 } },
                plugins: { legend: { display: false } }
            }
        },
        {
            id: 'licensePassRateChart',
            type: 'line',
            data: {
                labels: ['2564', '2565', '2566'],
                datasets: [{
                    label: 'สอบใบประกอบวิชาชีพ (%)',
                    data: [59.21, 59.65, 67.24],
                    borderColor: getComputedStyle(document.documentElement).getPropertyValue('--success-color').trim(),
                    backgroundColor: 'rgba(74, 222, 128, 0.2)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: false, suggestedMin: 50, suggestedMax: 70 } },
                plugins: { legend: { display: false } }
            }
        },
        {
            id: 'satisfactionChart',
            type: 'line',
            data: {
                labels: ['2564', '2565', '2566'],
                datasets: [{
                    label: 'ความพึงพอใจ',
                    data: [4.48, 4.43, 4.46],
                    borderColor: getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim(),
                    backgroundColor: 'rgba(240, 147, 251, 0.2)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: false, suggestedMin: 4.3, suggestedMax: 4.5 } },
                plugins: { legend: { display: false } }
            }
        }
    ];

    charts.forEach(chart => {
        const canvas = document.getElementById(chart.id);
        if (canvas) {
            new Chart(canvas, {
                type: chart.type,
                data: chart.data,
                options: chart.options
            });
        }
    });
}

function hideLoadingScreen() {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transition = 'opacity 0.5s ease-in-out';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 2000);
}

function animateScoreRing() {
    const scoreProgress = document.querySelector('.score-progress');
    if (!scoreProgress) return;
    setTimeout(() => {
        const scoreValue = 3.5;
        const maxScore = 5.0;
        const percentage = (scoreValue / maxScore) * 100;
        const circumference = 2 * Math.PI * 90;
        const strokeDasharray = (percentage / 100) * circumference;
        
        scoreProgress.style.strokeDasharray = `${strokeDasharray} ${circumference}`;
        scoreProgress.style.transition = 'stroke-dasharray 2s ease-in-out';
    }, 1000);

    document.querySelectorAll('.aun-gauge').forEach(gauge => {
        const score = parseFloat(gauge.dataset.score);
        const maxScore = 7;
        const percentage = (score / maxScore) * 100;
        const circumference = 2 * Math.PI * 45;
        const strokeDasharray = (percentage / 100) * circumference;
        const progress = gauge.querySelector('.gauge-progress');
        if (progress) {
            progress.style.strokeDasharray = `${strokeDasharray} ${circumference}`;
            progress.style.transition = 'stroke-dasharray 1.5s ease-in-out';
        }
    });
}

function setupEventListeners() {
    document.addEventListener('click', function(e) {
        if (!e.target || typeof e.target.closest !== 'function') return;

        const navItem = e.target.closest('.nav-item, .tab-btn');
        if (navItem && navItem.dataset.section) {
            showSection(navItem.dataset.section);
            return;
        }

        const backBtn = e.target.closest('.back-btn');
        if (backBtn) {
            showNavigation();
            return;
        }

        const heroBtn = e.target.closest('.hero-btn');
        if (heroBtn && heroBtn.dataset.section) {
            scrollToSection(heroBtn.dataset.section);
            return;
        }
    });

    document.addEventListener('mouseenter', function(e) {
        if (!e.target || typeof e.target.closest !== 'function') return;
        const navItem = e.target.closest('.nav-item, .tab-btn');
        if (navItem) {
            navItem.style.transform = 'translateY(-8px) scale(1.02)';
        }
        const statCard = e.target.closest('.stat-card');
        if (statCard) {
            statCard.style.transform = 'translateY(-8px)';
        }
    }, true);

    document.addEventListener('mouseleave', function(e) {
        if (!e.target || typeof e.target.closest !== 'function') return;
        const navItem = e.target.closest('.nav-item, .tab-btn');
        if (navItem) {
            navItem.style.transform = 'translateY(0) scale(1)';
        }
        const statCard = e.target.closest('.stat-card');
        if (statCard) {
            statCard.style.transform = 'translateY(0)';
        }
    }, true);

    setupScrollAnimations();
    setupSmoothScroll();
    setupKeyboardNavigation();
}

function showSection(sectionName) {
    console.log(`Showing section: ${sectionName}`);
    
    const navigationSection = document.querySelector('.tab-nav');
    const summarySection = document.querySelector('#summary');
    const contentSections = document.getElementById('content-sections');
    
    if (navigationSection) navigationSection.style.display = 'flex';
    if (summarySection) summarySection.style.display = 'none';
    if (contentSections) contentSections.style.display = 'block';

    document.querySelectorAll('.tab-content').forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active');
        section.setAttribute('aria-hidden', 'true');
    });

    const targetSection = document.getElementById(`${sectionName}-content`);
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.classList.add('active');
        targetSection.setAttribute('aria-hidden', 'false');
        setTimeout(() => {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    document.querySelectorAll('.tab-btn').forEach(button => {
        button.classList.remove('active');
        button.setAttribute('aria-selected', 'false');
    });

    const targetButton = document.querySelector(`.tab-btn[data-section="${sectionName}"]`);
    if (targetButton) {
        targetButton.classList.add('active');
        targetButton.setAttribute('aria-selected', 'true');
    }

    currentSection = sectionName;
    setTimeout(() => {
        animateProgressBars();
        animateOnSectionChange();
    }, 300);
}

function showNavigation() {
    console.log('Showing navigation');
    
    const navigationSection = document.querySelector('.tab-nav');
    const summarySection = document.querySelector('#summary');
    const contentSections = document.getElementById('content-sections');
    
    if (navigationSection) navigationSection.style.display = 'flex';
    if (summarySection) summarySection.style.display = 'block';
    if (contentSections) contentSections.style.display = 'none';

    currentSection = 'navigation';
    if (navigationSection) {
        setTimeout(() => {
            navigationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && currentSection !== 'navigation') {
            showNavigation();
        }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const sections = ['overview', 'curriculum', 'quality', 'results', 'development', 'accreditation'];
            const currentIndex = sections.indexOf(currentSection);
            if (currentIndex !== -1) {
                let newIndex;
                if (e.key === 'ArrowLeft') {
                    newIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
                } else {
                    newIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
                }
                showSection(sections[newIndex]);
            }
        }
    });
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.bar-fill');
    progressBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage') || bar.style.width;
        if (percentage) {
            const numericPercentage = parseFloat(percentage);
            bar.style.width = '0%';
            bar.style.transition = 'none';
            requestAnimationFrame(() => {
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-in-out';
                    bar.style.width = numericPercentage + '%';
                }, 100);
            });
        }
    });
}

function setupScrollAnimations() {
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            handleScroll();
        }, 16);
    });
}

function handleScroll() {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.floating-shape');
    shapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        const rotation = scrolled * 0.05;
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg)`;
    });
    updateProgressBarsInView();
}

function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                if (entry.target.classList.contains('stat-card')) {
                    animateStatCard(entry.target);
                }
                if (entry.target.querySelector('.bar-fill')) {
                    setTimeout(() => {
                        animateProgressBars();
                    }, 200);
                }
            }
        });
    }, observerOptions);
    document.querySelectorAll('.card, .stat-card, .nav-item, .achievement-item, .summary-item').forEach(el => {
        observer.observe(el);
    });
}

function setupParallaxEffects() {
    const shapes = document.querySelectorAll('.floating-shape');
    shapes.forEach((shape, index) => {
        shape.style.willChange = 'transform';
        shape.style.transition = 'none';
    });
}

function animateOnLoad() {
    const elementsToAnimate = document.querySelectorAll('.animate-slide-up, .animate-fade-in, .animate-scale-in');
    elementsToAnimate.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = getInitialTransform(element);
        setTimeout(() => {
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'none';
        }, 100 + (index * 100));
    });
}

function getInitialTransform(element) {
    if (element.classList.contains('animate-slide-up')) return 'translateY(30px)';
    if (element.classList.contains('animate-scale-in')) return 'scale(0.9)';
    return 'translateY(20px)';
}

function animateStatCard(card) {
    const number = card.querySelector('.stat-number');
    if (number) {
        const finalValue = parseFloat(number.textContent) || 0;
        let currentValue = 0;
        const increment = finalValue / 30;
        const animate = () => {
            currentValue += increment;
            if (currentValue < finalValue) {
                number.textContent = finalValue % 1 === 0 ? Math.floor(currentValue) : currentValue.toFixed(2);
                requestAnimationFrame(animate);
            } else {
                number.textContent = finalValue % 1 === 0 ? finalValue : finalValue.toFixed(2);
            }
        };
        animate();
    }
}

function updateProgressBarsInView() {
    const progressBars = document.querySelectorAll('.bar-fill');
    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInView && !bar.classList.contains('animated')) {
            bar.classList.add('animated');
            const percentage = bar.getAttribute('data-percentage') || bar.style.width;
            if (percentage) {
                bar.style.width = parseFloat(percentage) + '%';
            }
        }
    });
}

function animateOnSectionChange() {
    const activeSection = document.querySelector('.tab-content.active');
    if (activeSection) {
        const animatableElements = activeSection.querySelectorAll('.card, .achievement-item, .innovation-item');
        animatableElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}

function setupErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('JavaScript error:', e.error);
    });
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
    });
}

function initializePerformanceMonitoring() {
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page load performance:', {
            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
            total: perfData.loadEventEnd - perfData.fetchStart
        });
    });
}

function enhanceAccessibility() {
    document.querySelectorAll('.nav-item, .tab-btn').forEach((item, index) => {
        if (!item.getAttribute('aria-label')) {
            const title = item.querySelector('h3, span')?.textContent;
            item.setAttribute('aria-label', `ไปยังหน้า ${title}`);
        }
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
    });
    document.querySelectorAll('[role="button"]').forEach(element => {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

window.showSection = showSection;
window.showNavigation = showNavigation;
window.scrollToSection = scrollToSection;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        showSection,
        showNavigation,
        scrollToSection
    };
}