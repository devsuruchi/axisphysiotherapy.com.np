/**
 * AXIS PHYSIOTHERAPY - Master Component Loader
 * This script assembles all modular parts into your pages.
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
        { id: 'pricing-placeholder', url: 'pricing.html' },
        { id: 'network-placeholder', url: 'partnerships.html' },
        { id: 'training-placeholder', url: 'mentorship.html' },
        { id: 'team-placeholder', url: 'team.html' },
        { id: 'alumni-placeholder', url: 'alumni.html' },
        { id: 'reviews-placeholder', url: 'reviews.html' },
        { id: 'contact-placeholder', url: 'contact.html' },
        { id: 'footer-placeholder', url: 'footer.html' } 
    ];

    // Load all components sequentially for logic stability
    for (const component of components) {
        const container = document.getElementById(component.id);
        if (container) {
            try {
                const response = await fetch(component.url);
                if (response.ok) {
                    const html = await response.text();
                    container.innerHTML = html;
                }
            } catch (err) {
                console.error(`Axis Error: Failed to load ${component.url}`, err);
            }
        }
    }

    // 1. Refresh Lucide Icons for all new HTML
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. Force Alpine.js to recognize new components (Mobile Menu, etc)
    if (window.Alpine) {
        window.Alpine.start();
    }
}

/**
 * Career Form Submission Logic
 * Sends to Formspree and handles UI feedback
 */
async function submitForm(event) {
    const form = event.target;
    const formData = new FormData(form);
    const btn = form.querySelector('button[type="submit"]');
    
    // Save original text
    const originalBtnText = "Submit Application";
    btn.innerText = "UPLOADING...";
    btn.disabled = true;

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        const result = await response.json();

        if (response.ok) {
            alert("Success! Your application has been sent to Axis.");
            
            // Close the modal using Alpine.js
            const bodyEl = document.querySelector('body');
            if (window.Alpine) {
                const data = Alpine.$data(bodyEl);
                data.showCareer = false;
            }
            form.reset();
        } else {
            // This shows the actual error from Formspree (e.g. "File too large")
            alert("Error: " + (result.error || "Please check your entries and try again."));
            btn.innerText = originalBtnText;
            btn.disabled = false;
        }
    } catch (error) {
        console.error("Formspree Error:", error);
        alert("Connection Error: Please ensure your CV is under 5MB and your internet is active.");
        btn.innerText = originalBtnText;
        btn.disabled = false;
    }
}
// Initialize loading
document.addEventListener('DOMContentLoaded', loadAxisComponents);
