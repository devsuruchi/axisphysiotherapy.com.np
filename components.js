/**
 * AXIS PHYSIOTHERAPY - Stable Component Loader
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

    // Load one by one for maximum stability
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
                console.error(`Error loading ${component.url}:`, err);
            }
        }
    }

    // REFRESH ICONS
    if (window.lucide) {
        lucide.createIcons();
    }

    // WAKE UP ALPINE.JS
    // This ensures the mobile menu and career form "switches" work
    if (window.Alpine) {
        window.Alpine.start();
    }
}

// CAREER FORM SUBMISSION LOGIC
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
            // Automatically close the form after successful submission
            alert("Thank you! Your application has been submitted successfully.");
            
            // This reaches into the Alpine data to close the modal
            const bodyEl = document.querySelector('body');
            if (window.Alpine) {
                const data = Alpine.$data(bodyEl);
                data.showCareer = false;
            }
            form.reset();
        } else {
            alert("There was an error. Please check your internet and try again.");
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        }
    } catch (error) {
        alert("Network error. Please try again.");
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
    }
}

// Kick off loading when the browser is ready
document.addEventListener('DOMContentLoaded', loadAxisComponents);
