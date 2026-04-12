// ==========================================
// 1. БАЗА ДАННЫХ УСЛУГ
// Здесь ты можешь легко добавлять или менять цены!
// Просто соблюдай формат: { name: "Название", price: "Цена" },
// ==========================================
const services = [
    { name: "Первичный прием остеопата", price: "7 000 ₽" },
    { name: "Повторный сеанс терапии", price: "5 000 ₽" },
    { name: "Прием ребенка (до 3-х лет)", price: "4 500 ₽" },
    { name: "Детский прием (от 3 до 12 лет)", price: "5 500 ₽" },
    { name: "Курс из 5 сеансов", price: "25 000 ₽" },
    { name: "Курс из 10 сеансов", price: "45 000 ₽" },
    { name: "Консультация по результатам диагностики", price: "3 000 ₽" },
];

// ==========================================
// 2. ТЕХНИЧЕСКАЯ ЧАСТЬ (Логика работы)
// Эту часть можно не трогать, она работает автоматически
// ==========================================

// Находим элементы на странице
const openBtn = document.getElementById('openPrice'); // Кнопка открытия
const closeBtn = document.querySelector('.modal-close'); // Крестик закрытия
const modal = document.getElementById('priceModal'); // Само окно (оверлей)
const listContainer = document.getElementById('priceListContainer'); // Блок для списка

// Функция, которая «рисует» услуги из списка выше в HTML
function renderPrices() {
    listContainer.innerHTML = services.map(item => `
        <div class="price-row">
            <span class="service-name">${item.name}</span>
            <span class="service-cost">${item.price}</span>
        </div>
    `).join('');
}

// Функция открытия/закрытия окна
const toggleModal = (isOpen) => {
    if (isOpen) {
        renderPrices(); // Сначала обновляем список цен, потом открываем окно
        modal.classList.add('active'); 
        document.body.style.overflow = 'hidden'; // Запрещаем скролл сайта при открытом окне
    } else {
        modal.classList.remove('active'); 
        document.body.style.overflow = ''; // Возвращаем скролл обратно
    }
};

// Слушаем клик по кнопке "Посмотреть полный прайс"
openBtn.addEventListener('click', () => toggleModal(true));

// Слушаем клик по крестику (X)
closeBtn.addEventListener('click', () => toggleModal(false));

// Слушаем клик по темному фону (оверлею), чтобы закрыть окно
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        toggleModal(false);
    }
});
