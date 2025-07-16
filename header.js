// Header Module - Loads and manages the navigation header
class HeaderManager {
    constructor() {
        this.navbar = null;
        this.hamburger = null;
        this.navMenu = null;
        this.navLinks = null;
    }

    // Load header HTML and inject it into the page
    async loadHeader() {
        try {
            const response = await fetch('header.html');
            const headerHTML = await response.text();
            
            // Find the header container
            const headerContainer = document.getElementById('header-container');
            if (!headerContainer) {
                console.error('Header container not found! Make sure you have <div id="header-container"></div> in your HTML.');
                return;
            }
            
            // Inject header HTML
            headerContainer.innerHTML = headerHTML;
            
            // Initialize navigation functionality
            this.initializeNavigation();
            
        } catch (error) {
            console.error('Failed to load header:', error);
        }
    }

    // Initialize all navigation functionality
    initializeNavigation() {
        // Get DOM elements
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');

        // Initialize all navigation features
        this.initializeScrollEffect();
        this.initializeMobileMenu();
        this.initializeSmoothScrolling();
        this.initializeActiveNavHighlighting();
        this.initializeLogoFallback();
        this.updateNavigationForPage();
    }

    // Navbar scroll effect
    initializeScrollEffect() {
        if (!this.navbar) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu functionality
    initializeMobileMenu() {
        if (!this.hamburger || !this.navMenu) return;

        // Mobile menu toggle
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
            
            // Animate hamburger bars
            const bars = this.hamburger.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (this.hamburger.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });

        // Close mobile menu when clicking on a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
                
                // Reset hamburger bars
                const bars = this.hamburger.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            });
        });
    }

    // Smooth scrolling for navigation links
    initializeSmoothScrolling() {
        if (!this.navLinks) return;

        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Highlight active navigation link
    initializeActiveNavHighlighting() {
        if (!this.navLinks) return;

        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Logo fallback handling
    initializeLogoFallback() {
        const logoImage = document.querySelector('.logo-image');
        const logoText = document.querySelector('.logo-text');
        const footerLogoImage = document.querySelector('.footer-logo-image');
        const footerLogoText = document.querySelector('.footer-logo-text');
        
        // Handle main logo fallback
        if (logoImage) {
            logoImage.addEventListener('error', () => {
                logoImage.style.display = 'none';
                if (logoText) logoText.style.display = 'inline';
            });
            
            logoImage.addEventListener('load', () => {
                if (logoText) logoText.style.display = 'none';
            });
        }
        
        // Handle footer logo fallback
        if (footerLogoImage) {
            footerLogoImage.addEventListener('error', () => {
                footerLogoImage.style.display = 'none';
                if (footerLogoText) footerLogoText.style.display = 'block';
            });
            
            footerLogoImage.addEventListener('load', () => {
                if (footerLogoText) footerLogoText.style.display = 'none';
            });
        }
    }

    // Update navigation links for different page contexts
    updateNavigationForPage() {
        if (!this.navLinks) return;

        // Check if we're on the home page by looking at the URL
        const isHomePage = window.location.pathname === '/' || 
                          window.location.pathname.endsWith('/index.html') || 
                          window.location.pathname.endsWith('/');

        if (isHomePage) {
            // On home page, navigation links work as anchor links
            return;
        }

        // On other pages, update links to go back to home page
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                link.setAttribute('href', `index.html${href}`);
            }
        });

        // Update logo link to go back to home
        const logoLink = document.querySelector('.nav-logo a');
        if (logoLink) {
            logoLink.setAttribute('href', 'index.html');
        }
    }
}

// Initialize header when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    const headerManager = new HeaderManager();
    await headerManager.loadHeader();
});

// Export for use in other scripts
window.HeaderManager = HeaderManager; 