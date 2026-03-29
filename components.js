/**
 * AXIS PHYSIOTHERAPY - Master Component Loader (Fixed & Fail-Safe)
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
        { id: 'massage-placeholder', url: 'deep-tissue.html' },
        { id: 'chiro-placeholder', url: 'chiropractic.html' },
        { id: 'reviews-placeholder', url: 'reviews.html' },
        { id: 'faqs-placeholder', url: 'faqs.html' },
        { id: 'contact-placeholder', url: 'contact.html' },
        { id: 'footer-placeholder', url: 'footer.html' } 
    ];

    // Load all components
    for (const component of components) {
        const container = document.getElementById(component.id);
        if (container) {
            try {
                const response = await fetch(component.url);
                if (response.ok) {
                    const html = await response.text();
                    container.innerHTML = html;
                } else {
                    console.warn(`Skipping: ${component.url} not found (404)`);
                }
            } catch (err) {
                console.error(`Error loading ${component.url}:`, err);
            }
        }
    }

    // 1. Refresh Lucide Icons for all newly injected HTML
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. Wake up Alpine.js for the new components
    // If Alpine hasn't started yet, this won't crash.
    if (window.Alpine) {
        // This is the magic line that makes the mobile menu work
        window.Alpine.discoverUninitializedComponents((el) => {
            window.Alpine.initializeComponent(el);
        });
    }
}

/**
 * Career Form Submission Logic
 */
async function submitForm(event) {
    const form = event.target;
    const formData = new FormData(form);
    const btn = form.querySelector('button[type="submit"]');
    
    btn.innerText = "SENDING...";
    btn.disabled = true;

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            // 1. INFORM THE USER
            alert("Success! Your application has been submitted to Axis Physiotherapy. We will review it shortly.");
            
            // 2. AUTOMATICALLY CLOSE MODAL & RESET
            const bodyEl = document.querySelector('body');
            const alpineData = window.Alpine.$data(bodyEl);
            
            alpineData.showCareer = false; // Closes the modal
            form.reset(); // Clears fields
        } else {
            alert("Error: Please check your connection and try again.");
        }
    } catch (error) {
        alert("Connection Error. Please try again.");
    } finally {
        btn.innerText = "Submit Application";
        btn.disabled = false;
    }
}

// Start the loading process
document.addEventListener('DOMContentLoaded', loadAxisComponents);
