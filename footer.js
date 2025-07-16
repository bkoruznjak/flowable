// Footer Module - Loads and manages the footer
class FooterManager {
    constructor() {
        // Footer manager is simpler than header since footer has no complex interactions
    }

    // Load footer HTML and inject it into the page
    async loadFooter() {
        try {
            const response = await fetch('footer.html');
            const footerHTML = await response.text();
            
            // Find the footer container
            const footerContainer = document.getElementById('footer-container');
            if (!footerContainer) {
                console.error('Footer container not found! Make sure you have <div id="footer-container"></div> in your HTML.');
                return;
            }
            
            // Inject footer HTML
            footerContainer.innerHTML = footerHTML;
            
            // Initialize footer functionality
            this.initializeFooter();
            
        } catch (error) {
            console.error('Failed to load footer:', error);
        }
    }

    // Initialize footer functionality
    initializeFooter() {
        // Initialize logo fallback for footer
        this.initializeFooterLogoFallback();
        
        // Set current year dynamically
        this.setCurrentYear();
    }

    // Set the current year in the copyright
    setCurrentYear() {
        const currentYearElement = document.getElementById('current-year');
        if (currentYearElement) {
            const currentYear = new Date().getFullYear();
            currentYearElement.textContent = currentYear;
        }
    }

    // Logo fallback handling for footer
    initializeFooterLogoFallback() {
        const footerLogoImage = document.querySelector('.footer-logo-image');
        const footerLogoText = document.querySelector('.footer-logo-text');
        
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
}

// Initialize footer when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    const footerManager = new FooterManager();
    await footerManager.loadFooter();
});

// Export for use in other scripts
window.FooterManager = FooterManager; 