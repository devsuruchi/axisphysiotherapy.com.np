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
        { id: 'massage-placeholder', url: 'deep-tissue.html' },
        { id: 'chiro-placeholder', url: 'chiropractic.html' },
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
// 3. FORCE VIDEO PLAYBACK
    // Browsers often pause videos loaded via Fetch. This forces them to play.
    document.querySelectorAll('video').forEach(video => {
        video.play().catch(() => {
            console.log("Autoplay blocked by browser; waiting for user interaction.");
        });
    });
}
/**
 * Career Form Submission Logic
 * Sends to Formspree and handles UI feedback
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
            // This re-triggers the Alpine data to show the Thank You screen
            const bodyEl = document.querySelector('body');
            const data = window.Alpine.$data(bodyEl);
            data.formSubmitted = true;
            form.reset();
        } else {
            alert("Error: Please ensure the CV link is correct.");
            btn.innerText = "Submit Application";
            btn.disabled = false;
        }
    } catch (error) {
        alert("Connection Error. Please try again.");
        btn.innerText = "Submit Application";
        btn.disabled = false;
    }
}

// Initialize loading
document.addEventListener('DOMContentLoaded', loadAxisComponents);
