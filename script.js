document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ДАННЫЕ ПРАЙСА (БЕЗ ГОМЕОПАТИИ) ---
    const services = [
        { category: "Взрослая практика", name: "Первичный прием остеопата", price: "7 000 ₽" },
        { category: "Взрослая практика", name: "Повторный сеанс терапии", price: "5 500 ₽" },
        { category: "Детская практика", name: "Прием ребенка (до 3 лет)", price: "4 500 ₽" },
        { category: "Детская практика", name: "Прием ребенка (от 3 до 12 лет)", price: "5 500 ₽" },
        { category: "Выгодные пакеты", name: "Курс из 5 сеансов", price: "25 000 ₽" },
        { category: "Выгодные пакеты", name: "Курс из 10 сеансов", price: "45 000 ₽" },
    ];

    // --- 2. МОДАЛЬНОЕ ОКНО ---
    const modal = document.getElementById('priceModal');
    const openBtn = document.getElementById('openPrice');
    const closeBtn = document.querySelector('.modal-close');
    const listContainer = document.getElementById('priceListContainer');

    function renderPrices() {
        const categories = [...new Set(services.map(s => s.category))];
        
        listContainer.innerHTML = categories.map(cat => `
            <div class="price-category">
                <h4 class="category-title">${cat}</h4>
                ${services
                    .filter(s => s.category === cat)
                    .map(item => `
                        <div class="price-row">
                            <span class="service-name">${item.name}</span>
                            <span class="service-cost">${item.price}</span>
                        </div>
                    `).join('')}
            </div>
        `).join('');
    }

    function toggleModal(show) {
        if (show) {
            renderPrices();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    openBtn.addEventListener('click', (e) => { e.preventDefault(); toggleModal(true); });
    closeBtn.addEventListener('click', () => toggleModal(false));
    modal.addEventListener('click', (e) => { if(e.target === modal) toggleModal(false); });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) toggleModal(false);
    });

    // --- 3. SCROLL REVEAL ---
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // --- 4. STICKY MOBILE CTA ---
    const stickyCta = document.querySelector('.mobile-sticky-cta');
    const contactSection = document.querySelector('.final-contact-section');

    if (window.innerWidth <= 768 && stickyCta && contactSection) {
        const observerSticky = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                stickyCta.style.transform = 'translateX(-50%) translateY(100%)';
            } else {
                stickyCta.style.transform = 'translateX(-50%) translateY(0)';
            }
        }, { threshold: 0.1 });

        observerSticky.observe(contactSection);
    }
});
