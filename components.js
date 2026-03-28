
/**
 * AXIS PHYSIOTHERAPY - Component Loader & Logic
 * This script handles:
 * 1. Loading shared HTML files (Header, Footer, Reviews)
 * 2. Form Submission logic for Careers
 * 3. Lucide Icon initialization
 */

async function loadAxisComponents() {
    const components = [
        { id: 'header-placeholder', url: 'header.html' },
        { id: 'hero-placeholder', url: 'hero.html' }, 
        { id: 'trust-placeholder', url: 'trust-bar.html' },
        { id: 'about-placeholder', url: 'about.html' },
        { id: 'consult-placeholder', url: 'consultation.html' },
        { id: 'conditions-placeholder', url: 'conditions.html' },
        { id: 'services-placeholder', url: 'services.html' },
        { id: 'network-placeholder', url: 'partnerships.html' },
        { id: 'training-placeholder', url: 'mentorship.html' },
        { id: 'reviews-placeholder', url: 'reviews.html' },
        { id: 'contact-placeholder', url: 'contact.html' },
        { id: 'footer-placeholder', url: 'footer.html' } 
    ];

    for (const component of components) {
        const container = document.getElementById(component.id);
        if (container) {
            try {
                const response = await fetch(component.url);
                if (response.ok) {
                    container.innerHTML = await response.text();
                }
            } catch (err) {
                console.error(`Failed to load ${component.url}:`, err);
            }
        }
    }

    // Initialize icons after ALL HTML is injected
    if (window.lucide) {
        lucide.createIcons();
    }
}

// AJAX Form Submission Logic (Restored from your request)
async function submitForm(event) {
    const form = event.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = "SENDING...";
    submitBtn.disabled = true;

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            // Signal Alpine.js that the form was a success
            window.dispatchEvent(new CustomEvent('form-success'));
            form.reset();
            
            // Close the modal automatically after 2 seconds for a better user experience
            setTimeout(() => {
                const bodyEl = document.querySelector('body');
                if (window.Alpine) {
                    const data = Alpine.$data(bodyEl);
                    data.showCareer = false;
                }
            }, 2000);

        } else {
            alert("Submission error. Please check your entries.");
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        }
    } catch (error) {
        alert("Network error. Please try again.");
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
    }
}

// Start loading when the page is ready
document.addEventListener('DOMContentLoaded', loadAxisComponents);

// Re-run icons when Alpine triggers updates
document.addEventListener('alpine:init', () => {
    lucide.createIcons();
});
