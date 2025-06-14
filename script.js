// Global variables
let currentSection = 'navigation';
let isDarkMode = false;
let isInitialized = false;

// Initialize the application
function initializeApp() {
    if (isInitialized) return;
    
    console.log('Initializing application...');
    
    hideLoadingScreen();
    animateScoreRing();
    setupEventListeners();
    setupIntersectionObserver();
    setupParallaxEffects();
    animateOnLoad();
    
    isInitialized = true;
    console.log('Application initialized successfully');
}

// Hide loading screen with smooth transition
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

// Animate the score ring in hero section
function animateScoreRing() {
    setTimeout(() => {
        const scoreProgress = document.querySelector('.score-progress');
        if (scoreProgress) {
            const scoreValue = 3.0;
            const maxScore = 5.0;
            const percentage = (scoreValue / maxScore) * 100;
            const circumference = 2 * Math.PI * 45;
            const strokeDasharray = (percentage / 100) * circumference;
            
            scoreProgress.style.strokeDasharray = `${strokeDasharray} ${circumference}`;
            scoreProgress.style.transition = 'stroke-dasharray 2s ease-in-out';
        }
    }, 1000);
}

// Setup all event listeners
function setupEventListeners() {
    // Navigation items click handlers
    document.addEventListener('click', function(e) {
        // Ensure e.target exists and has closest method
        if (!e.target || typeof e.target.closest !== 'function') {
            return;
        }

        // Handle navigation item clicks
        const navItem = e.target.closest('.nav-item');
        if (navItem && navItem.dataset && navItem.dataset.section) {
            const section = navItem.dataset.section;
            showSection(section);
            return;
        }

        // Handle back button clicks
        const backBtn = e.target.closest('.back-btn');
        if (backBtn) {
            showNavigation();
            return;
        }

        // Handle hero action buttons
        const heroBtn = e.target.closest('.hero-btn');
        if (heroBtn) {
            const onclick = heroBtn.getAttribute('onclick');
            if (onclick) {
                try {
                    eval(onclick);
                } catch (error) {
                    console.error('Error executing onclick:', error);
                }
            }
            return;
        }
    });

    // Add hover effects with proper event delegation
    document.addEventListener('mouseenter', function(e) {
        if (!e.target || typeof e.target.closest !== 'function') {
            return;
        }

        const navItem = e.target.closest('.nav-item');
        if (navItem) {
            navItem.style.transform = 'translateY(-8px) scale(1.02)';
            navItem.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
            return;
        }

        const statCard = e.target.closest('.stat-card');
        if (statCard) {
            statCard.style.transform = 'translateY(-8px) scale(1.05)';
            return;
        }
    }, true);
    
    document.addEventListener('mouseleave', function(e) {
        if (!e.target || typeof e.target.closest !== 'function') {
            return;
        }

        const navItem = e.target.closest('.nav-item');
        if (navItem) {
            navItem.style.transform = 'translateY(0) scale(1)';
            navItem.style.boxShadow = '';
            return;
        }

        const statCard = e.target.closest('.stat-card');
        if (statCard) {
            statCard.style.transform = 'translateY(0) scale(1)';
            return;
        }
    }, true);

    // Progress bars animation on scroll
    setupScrollAnimations();

    // Smooth scroll for anchor links
    setupSmoothScroll();

    // Keyboard navigation
    setupKeyboardNavigation();
}1)';
            navItem.style.boxShadow = '';
        }

        const statCard = e.target.closest('.stat-card');
        if (statCard) {
            statCard.style.transform = 'translateY(0) scale(1)';
        }
    }, true);

    // Progress bars animation on scroll
    setupScrollAnimations();

    // Smooth scroll for anchor links
    setupSmoothScroll();

    // Keyboard navigation
    setupKeyboardNavigation();
}

// Show specific section content
function showSection(sectionName) {
    console.log(`Showing section: ${sectionName}`);
    
    // Hide navigation sections
    const navigationSection = document.querySelector('.navigation-section');
    const summarySection = document.querySelector('.summary-section');
    const contentSections = document.getElementById('content-sections');
    
    if (navigationSection) navigationSection.style.display = 'none';
    if (summarySection) summarySection.style.display = 'none';
    if (contentSections) contentSections.style.display = 'block';

    // Hide all content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(`${sectionName}-content`);
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.classList.add('active');
        
        // Smooth scroll to section
        setTimeout(() => {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    currentSection = sectionName;
    
    // Trigger animations for the new section
    setTimeout(() => {
        animateProgressBars();
        animateOnSectionChange();
    }, 300);
}

// Show navigation (back to main menu)
function showNavigation() {
    console.log('Showing navigation');
    
    const navigationSection = document.querySelector('.navigation-section');
    const summarySection = document.querySelector('.summary-section');
    const contentSections = document.getElementById('content-sections');
    
    if (navigationSection) navigationSection.style.display = 'block';
    if (summarySection) summarySection.style.display = 'block';
    if (contentSections) contentSections.style.display = 'none';

    currentSection = 'navigation';
    
    // Scroll back to navigation
    setTimeout(() => {
        if (navigationSection) {
            navigationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    console.log(`Scrolling to section: ${sectionId}`);
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// Setup smooth scrolling for all anchor links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup keyboard navigation for accessibility
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key to go back to navigation
        if (e.key === 'Escape' && currentSection !== 'navigation') {
            showNavigation();
        }
        
        // Arrow keys for navigation between sections
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const sections = ['overview', 'curriculum', 'quality', 'results', 'development'];
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

// Animate progress bars when they come into view
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.bar-fill');
    progressBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage') || bar.style.width;
        if (percentage) {
            const numericPercentage = parseFloat(percentage);
            
            // Reset width first
            bar.style.width = '0%';
            bar.style.transition = 'none';
            
            // Animate to target width
            requestAnimationFrame(() => {
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-in-out';
                    bar.style.width = numericPercentage + '%';
                }, 100);
            });
        }
    });
}

// Setup scroll animations
function setupScrollAnimations() {
    // Throttled scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            handleScroll();
        }, 16); // ~60fps
    });
}

// Handle scroll events
function handleScroll() {
    const scrolled = window.pageYOffset;
    
    // Parallax effect for floating shapes
    const shapes = document.querySelectorAll('.floating-shape');
    shapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        const rotation = scrolled * 0.05;
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg)`;
    });

    // Animate particles
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const speed = 0.02 + (index * 0.01);
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });

    // Update progress bars in view
    updateProgressBarsInView();
}

// Setup intersection observer for scroll animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger specific animations based on element type
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

    // Observe all animatable elements
    const elementsToObserve = document.querySelectorAll(
        '.card, .stat-card, .nav-item, .achievement-item, .summary-item'
    );
    
    elementsToObserve.forEach(el => {
        observer.observe(el);
    });
}

// Setup parallax effects
function setupParallaxEffects() {
    // Add initial transforms to floating shapes
    const shapes = document.querySelectorAll('.floating-shape');
    shapes.forEach((shape, index) => {
        shape.style.willChange = 'transform';
        shape.style.transition = 'none';
    });

    // Add particles animation
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        particle.style.animationDelay = `${index * 0.5}s`;
        particle.style.animationDuration = `${3 + index}s`;
    });
}

// Animate elements on load
function animateOnLoad() {
    // Add staggered animations to initial elements
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

// Get initial transform for animation
function getInitialTransform(element) {
    if (element.classList.contains('animate-slide-up')) {
        return 'translateY(30px)';
    }
    if (element.classList.contains('animate-scale-in')) {
        return 'scale(0.9)';
    }
    return 'translateY(20px)';
}

// Animate stat cards
function animateStatCard(card) {
    const number = card.querySelector('.stat-number');
    if (number) {
        const finalValue = parseInt(number.textContent) || 0;
        let currentValue = 0;
        const increment = finalValue / 30; // 30 frames animation
        
        const animate = () => {
            currentValue += increment;
            if (currentValue < finalValue) {
                number.textContent = Math.floor(currentValue);
                requestAnimationFrame(animate);
            } else {
                number.textContent = finalValue;
            }
        };
        
        animate();
    }
}

// Update progress bars that are in view
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

// Animate on section change
function animateOnSectionChange() {
    const activeSection = document.querySelector('.content-section.active');
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

// Theme toggle functionality
function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    
    const themeToggle = document.querySelector('.theme-toggle i');
    if (themeToggle) {
        themeToggle.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // Save theme preference
    localStorage.setItem('darkMode', isDarkMode);
    
    // Show feedback
    showToast(isDarkMode ? 'เปลี่ยนเป็นโหมดมืด' : 'เปลี่ยนเป็นโหมดสว่าง');
}

// Export to PDF functionality
function exportToPDF() {
    showToast('กำลังเตรียม PDF...', 'info');
    
    // In a real implementation, you would use a library like html2pdf
    // For demonstration, we'll simulate the process
    setTimeout(() => {
        showToast('PDF พร้อมแล้ว! (ฟีเจอร์จำลอง)', 'success');
    }, 2000);
}

// Show toast notification
function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${getToastIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Hide toast after delay
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, 3000);
}

// Get icon for toast type
function getToastIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Initialize theme on load
function initializeTheme() {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
        isDarkMode = savedTheme === 'true';
        document.body.classList.toggle('dark-mode', isDarkMode);
        
        const themeToggle = document.querySelector('.theme-toggle i');
        if (themeToggle) {
            themeToggle.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// Print functionality
function printReport() {
    // Hide navigation and show all content for printing
    const navigationSection = document.querySelector('.navigation-section');
    const summarySection = document.querySelector('.summary-section');
    const contentSections = document.getElementById('content-sections');
    
    // Store current state
    const originalNavDisplay = navigationSection?.style.display;
    const originalSummaryDisplay = summarySection?.style.display;
    const originalContentDisplay = contentSections?.style.display;
    
    // Show all content for printing
    if (navigationSection) navigationSection.style.display = 'none';
    if (summarySection) summarySection.style.display = 'block';
    if (contentSections) {
        contentSections.style.display = 'block';
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'block';
        });
    }
    
    // Print
    window.print();
    
    // Restore original state
    setTimeout(() => {
        if (navigationSection) navigationSection.style.display = originalNavDisplay;
        if (summarySection) summarySection.style.display = originalSummaryDisplay;
        if (contentSections) contentSections.style.display = originalContentDisplay;
        
        // Hide content sections again if we were in navigation mode
        if (currentSection === 'navigation') {
            document.querySelectorAll('.content-section').forEach(section => {
                section.style.display = 'none';
            });
        }
    }, 100);
}

// Utility function to debounce events
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Performance monitoring
function initializePerformanceMonitoring() {
    // Log performance metrics
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page load performance:', {
            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
            total: perfData.loadEventEnd - perfData.fetchStart
        });
    });
}

// Error handling
function setupErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('JavaScript error:', e.error);
        showToast('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', 'error');
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
        showToast('เกิดข้อผิดพลาดในการโหลดข้อมูล', 'error');
    });
}

// Search functionality (for future enhancement)
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        const debouncedSearch = debounce((query) => {
            performSearch(query);
        }, 300);
        
        searchInput.addEventListener('input', (e) => {
            debouncedSearch(e.target.value);
        });
    }
}

// Perform search (placeholder for future implementation)
function performSearch(query) {
    if (query.length < 2) return;
    
    // This would search through all content sections
    console.log('Searching for:', query);
    // Implementation would go here
}

// Accessibility enhancements
function enhanceAccessibility() {
    // Add ARIA labels dynamically
    document.querySelectorAll('.nav-item').forEach((item, index) => {
        if (!item.getAttribute('aria-label')) {
            const title = item.querySelector('h3')?.textContent;
            item.setAttribute('aria-label', `ไปยังหน้า ${title}`);
        }
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
    });
    
    // Add keyboard support for interactive elements
    document.querySelectorAll('[role="button"]').forEach(element => {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    setupErrorHandling();
    initializePerformanceMonitoring();
    enhanceAccessibility();
    initializeSearch();
});

// Expose global functions
window.showSection = showSection;
window.showNavigation = showNavigation;
window.scrollToSection = scrollToSection;
window.exportToPDF = exportToPDF;
window.toggleTheme = toggleTheme;
window.initializeApp = initializeApp;

// Auto-initialize if components are already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM is already loaded
    setTimeout(initializeApp, 100);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        showSection,
        showNavigation,
        scrollToSection,
        exportToPDF,
        toggleTheme
    };
}