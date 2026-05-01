/**
 * AXIS GIFT VOUCHER REGISTRY
 */
const VOUCHERS = [
    {
        id: "fathers-day-2083",
        occasion: "Father's Day Special",
        startDate: "2026-08-20", // Adjust to actual Nepali dates
        endDate: "2026-09-05",
        name: "Elderly Wellness Package",
        description: "Full Assessment + 3 Physio Sessions",
        price: "4500",
        discount: "15% OFF",
        color: "indigo"
    },
    {
        id: "dashain-2083",
        occasion: "Dashain Celebration",
        startDate: "2026-10-01",
        endDate: "2026-10-30",
        name: "Family Health Voucher",
        description: "Valid for any Orthopedic Consultation",
        price: "1200",
        discount: "20% OFF",
        color: "purple"
    },
    {
        id: "anniversary-5",
        occasion: "5th Anniversary",
        startDate: "2026-04-14", 
        endDate: "2026-05-14",
        name: "Elite Massage Voucher",
        description: "60 Mins Deep Tissue Therapy",
        price: "2500",
        discount: "10% OFF",
        color: "slate"
    }
];

let activeVoucher = null;

function loadVouchers() {
    const today = new Date();
    const container = document.getElementById('voucher-container');
    const noOffers = document.getElementById('no-offers');
    let count = 0;

    VOUCHERS.forEach(v => {
        const start = new Date(v.startDate);
        const end = new Date(v.endDate);

        if (today >= start && today <= end) {
            count++;
            const card = `
                <div class="voucher-card bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl hover:shadow-2xl relative overflow-hidden group">
                    <div class="absolute top-0 right-0 bg-purple-600 text-white px-6 py-2 rounded-bl-3xl font-black text-[10px] tracking-widest uppercase">
                        ${v.discount}
                    </div>
                    <span class="text-purple-600 font-black text-[9px] uppercase tracking-[0.4em] block mb-4">${v.occasion}</span>
                    <h3 class="text-2xl font-black uppercase tracking-tighter mb-4 leading-none">${v.name}</h3>
                    <p class="text-slate-400 text-sm font-light mb-8">${v.description}</p>
                    <div class="flex items-center justify-between">
                        <span class="text-xl font-black text-slate-950">Rs. ${v.price}</span>
                        <button onclick="openPayment('${v.id}')" class="bg-slate-950 text-white px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-purple-600 transition-all">Buy Gift</button>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', card);
        }
    });

    if (count === 0) noOffers.classList.remove('hidden');
}

function openPayment(id) {
    activeVoucher = VOUCHERS.find(v => v.id === id);
    document.getElementById('selected-voucher-name').innerText = activeVoucher.name;
    document.getElementById('selected-price').innerText = "Rs. " + activeVoucher.price;
    document.getElementById('payment-modal').style.display = 'flex';
}

function closePayment() {
    document.getElementById('payment-modal').style.display = 'none';
}

function generateReceipt() {
    document.getElementById('payment-modal').style.display = 'none';
    
    // Fill receipt details
    document.getElementById('r-id').innerText = "AX-" + Math.floor(1000 + Math.random() * 9000);
    document.getElementById('r-name').innerText = activeVoucher.name;
    document.getElementById('r-price').innerText = "Rs. " + activeVoucher.price;
    document.getElementById('r-date').innerText = new Date().toLocaleDateString();
    
    // Show receipt
    document.getElementById('receipt-container').style.display = 'flex';
    if(window.lucide) lucide.createIcons();
}

window.onload = loadVouchers;
