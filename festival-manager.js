/**
 * AXIS FESTIVAL & OFFERS MANAGER
 * This script checks the current date and triggers the correct popup.
 */

const FESTIVAL_OFFERS = [
    {
        id: "anniversary-5",
        name: "5th Anniversary Celebration",
        startDate: "2026-04-14", // Baisakh 01, 2083
        endDate: "2026-05-14",   // Baisakh 30, 2083
        title: "You're Invited",
        offerPhysio: "15% OFF Physio",
        offerMassage: "10% OFF Massage",
        link: "/anniversary"
    },
    {
        id: "dashain-2083",
        name: "Dashain Special",
        startDate: "2026-10-10", // Example dates
        endDate: "2026-10-25",
        title: "Happy Dashain",
        offerPhysio: "Flat 20% OFF",
        offerMassage: "Free Assessment",
        link: "/offers"
    }
];

function checkAndShowFestivalOffer() {
    const today = new Date();
    
    // Find if today falls between any start and end date
    const activeOffer = FESTIVAL_OFFERS.find(offer => {
        const start = new Date(offer.startDate);
        const end = new Date(offer.endDate);
        return today >= start && today <= end;
    });

    if (activeOffer) {
        // Check if user has already closed this specific offer today
        const hasSeen = localStorage.getItem(`closed_${activeOffer.id}_${today.getDate()}`);
        
        if (!hasSeen) {
            renderFestivalPopup(activeOffer);
        }
    }
}

function renderFestivalPopup(offer) {
    // Inject the HTML Structure
    const popupHTML = `
    <div id="festival-popup" style="position: fixed; inset: 0; z-index: 99999; display: flex; align-items: center; justify-content: center; padding: 1rem; font-family: 'Inter', sans-serif;">
        <div onclick="closeFestivalPopup('${offer.id}')" style="position: absolute; inset: 0; background: rgba(2, 6, 23, 0.96); backdrop-filter: blur(12px);"></div>
        
        <div id="festival-card" style="opacity: 0; transform: translateY(20px); transition: all 0.8s ease; position: relative; background: white; width: 100%; max-width: 480px; border-radius: 2.5rem; overflow: hidden; border: 10px solid white; box-shadow: 0 40px 100px rgba(88, 28, 135, 0.5); text-align: center;">
            <div style="position: absolute; inset: 0; z-index: 0; pointer-events: none;">
                <img src="/axis-physio-clinic-interior.jpg" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.4;">
                <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, white, rgba(255,255,255,0.2), white);"></div>
            </div>

            <div style="position: relative; z-index: 10; padding: 3.5rem 2rem;">
                <h2 style="border-top: 2px solid #7e22ce; border-bottom: 2px solid #7e22ce; padding: 5px 20px; display: inline-block; font-size: 12px; font-weight: 900; color: #7e22ce; text-transform: uppercase; letter-spacing: 0.3em; margin-bottom: 2rem;">Axis Physiotherapy</h2>
                
                <h1 style="font-size: 5rem; font-weight: 900; color: #581c87; text-transform: uppercase; line-height: 0.85; margin-bottom: 1.5rem;">${offer.title}</h1>
                
                <div style="background: #7e22ce; color: white; padding: 15px 30px; border-radius: 1rem; margin-bottom: 2rem; display: inline-block;">
                    <p style="margin: 0; font-size: 1.2rem; font-weight: 900; text-transform: uppercase;">${offer.name}</p>
                </div>

                <div style="border-top: 1px solid rgba(126, 34, 206, 0.2); padding-top: 1.5rem; margin-bottom: 2rem;">
                    <p style="font-size: 1.5rem; font-weight: 900; color: #9333ea; margin: 0;">${offer.offerPhysio}</p>
                    <p style="font-size: 1.2rem; font-weight: 900; color: #6b21a8; margin: 0;">${offer.offerMassage}</p>
                </div>

                <a href="${offer.link}" style="display: block; background: #9333ea; color: white; padding: 18px; border-radius: 9999px; text-decoration: none; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; font-size: 12px;">Details & Booking</a>
                
                <button onclick="closeFestivalPopup('${offer.id}')" style="margin-top: 1.5rem; background: none; border: none; color: #94a3b8; font-weight: 800; cursor: pointer; text-transform: uppercase; font-size: 10px; letter-spacing: 0.2em;">Dismiss</button>
            </div>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', popupHTML);

    // Animation trigger
    setTimeout(() => {
        const card = document.getElementById('festival-card');
        if(card) card.style.opacity = '1';
        if(card) card.style.transform = 'translateY(0)';
    }, 100);
}

function closeFestivalPopup(id) {
    const popup = document.getElementById('festival-popup');
    if(popup) {
        popup.style.opacity = '0';
        // Save to localStorage so it doesn't pop again today
        const today = new Date().getDate();
        localStorage.setItem(`closed_${id}_${today}`, 'true');
        setTimeout(() => popup.remove(), 800);
    }
}

// Initialize on Load
window.addEventListener('load', () => {
    setTimeout(checkAndShowFestivalOffer, 2000); // 2 second delay for better UX
});
