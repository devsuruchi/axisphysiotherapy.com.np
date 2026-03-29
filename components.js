/**
 * AXIS PHYSIOTHERAPY - Master Component Loader
 * Version: 2.0 (High Performance)
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
        { id: 'team-placeholder', url: 'team.html' },
        { id: 'alumni-placeholder', url: 'alumni.html' },
        { id: 'massage-placeholder', url: 'deep-tissue.html' },
        { id: 'chiro-placeholder', url: 'chiropractic.html' },
        { id: 'reviews-placeholder', url: 'reviews.html' },
        { id: 'contact-placeholder', url: 'contact.html' },
        { id: 'footer-placeholder', url: 'footer.html' } 
    ];

    // Load all components in parallel for maximum speed
    await Promise.all(components.map(async (component) => {
        const container = document.getElementById(component.id);
        if (container) {
            try {
                const response = await fetch(component.url);
                if (response.ok) {
                    container.innerHTML = await response.text();
                }
            } catch (err) {
                console.error(`Axis Error: Failed to load ${component.url}`, err);
            }
        }
    }));

    // 1. RE-INITIALIZE ALPINE.JS
    // This tells Alpine to look at the new HTML and activate the menus/buttons
    if (window.Alpine) {
        window.Alpine.discoverUninitializedComponents((el) => {
            window.Alpine.initializeComponent(el);
        });
    }

    // 2. RE-INITIALIZE LUCIDE ICONS
    if (window.lucide) {
        lucide.createIcons();
    }

    // 3. FORCE VIDEO AUTOPLAY
    // Browsers often block video play if injected via JS
    document.querySelectorAll('video').forEach(video => {
        video.play().catch(e => console.log("Autoplay waiting for interaction"));
    });
}

/**
 * Career Form Submission Logic
 * Handles Formspree without page refresh
 */
async function submitForm(event) {
    const form = event.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    if (!submitBtn) return;

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
            // Signal Alpine to show Success state
            window.dispatchEvent(new CustomEvent('form-success'));
            form.reset();
            
            // Automatically close modal after 3 seconds
            setTimeout(() => {
                const body = document.querySelector('body');
                if (window.Alpine) {
                    const data = Alpine.$data(body);
                    data.showCareer = false;
                    data.formSubmitted = false; // Reset for next time
                }
            }, 3000);

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

// Global Event Listener for Icons
document.addEventListener('alpine:init', () => {
    // Refresh icons whenever Alpine changes the DOM (like opening a modal)
    Alpine.effect(() => {
        if (window.lucide) lucide.createIcons();
    });
});

// Kick off the loading process
document.addEventListener('DOMContentLoaded', loadAxisComponents);
