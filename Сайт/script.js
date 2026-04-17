// ==========================================
// 1. БАЗА ДАННЫХ УСЛУГ (Теперь с категориями!)
// ==========================================
const services = [
    { category: "Приемы", name: "Первичный прием остеопата", price: "7 000 ₽" },
    { category: "Приемы", name: "Повторный сеанс терапии", price: "5 000 ₽" },
    { category: "Детская остеопатия", name: "Прием ребенка (до 3-х лет)", price: "4 500 ₽" },
    { category: "Детская остеопатия", name: "Детский прием (от 3 до 12 лет)", price: "5 500 ₽" },
    { category: "Выгодные пакеты", name: "Курс из 5 сеансов", price: "25 000 ₽" },
    { category: "Выгодные пакеты", name: "Курс из 10 сеансов", price: "45 000 ₽" },
    { category: "Прочее", name: "Консультация по результатам диагностики", price: "3 000 ₽" },
];

const openBtn = document.getElementById('openPrice');
const closeBtn = document.querySelector('.modal-close');
const modal = document.getElementById('priceModal');
const listContainer = document.getElementById('priceListContainer');

// Функция рендеринга с группировкой по категориям
function renderPrices() {
    const categories = [...new Set(services.map(s => s.category))];
    
    listContainer.innerHTML = categories.map(cat => `
        <div class="price-category">
            <h4 class="category-title">${cat}</h4>
            ${services
                .filter(s => s.category === cat)
                .map((item, index) => `
                    <div class="price-row" style="animation-delay: ${index * 0.1}s">
                        <span class="service-name">${item.name}</span>
                        <span class="service-cost">${item.price}</span>
                    </div>
                `).join('')}
        </div>
    `).join('');
}

const toggleModal = (isOpen) => {
    if (isOpen) {
        renderPrices();
        modal.classList.add('active'); 
        document.body.style.overflow = 'hidden';
    } else {
        modal.classList.remove('active'); 
        document.body.style.overflow = '';
    }
};

openBtn.addEventListener('click', () => toggleModal(true));
closeBtn.addEventListener('click', () => toggleModal(false));

window.addEventListener('click', (e) => {
    if (e.target === modal) toggleModal(false);
});

// Добавляем закрытие по клавише ESC (Премиальный UX)
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        toggleModal(false);
    }
});
const observerOptions = {
    threshold: 0.15 // Элемент начнет появляться, когда 15% его площади будет видно
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
        }
    });
}, observerOptions);

// Находим все элементы с классом .reveal и запускаем слежку за ними
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
