// Функция обновления статистики todo
function updateTodoStats() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    
    const totalElement = document.getElementById('totalTasks');
    const completedElement = document.getElementById('completedTasks');
    const activeElement = document.getElementById('activeTasks');
    
    if (totalElement) totalElement.textContent = total;
    if (completedElement) completedElement.textContent = completed;
    if (activeElement) activeElement.textContent = active;
}

document.addEventListener('DOMContentLoaded', function() {
    updateTodoStats();
    
    // Комплименты от Вовы для Кати
    const compliments = [
        "Катя, ты самая красивая девушка на свете! 💕",
        "Твоя улыбка освещает весь мой мир! ✨",
        "Катя, ты невероятно умная и талантливая! 🧠",
        "С тобой каждый день становится особенным! 🌟",
        "Катя, ты моя самая большая мечта! 💫",
        "Твои глаза - это две звезды, которые ведут меня! 👀",
        "Катя, ты делаешь меня самым счастливым человеком! 😊",
        "Твоя доброта и нежность покоряют мое сердце! 💖",
        "Катя, ты мой источник вдохновения! 🎨",
        "С тобой я чувствую, что могу свернуть горы! ⛰️",
        "Катя, ты самая лучшая девушка в мире! 🌍",
        "Твоя любовь - это самое драгоценное, что у меня есть! 💎",
        "Катя, ты моя принцесса! 👑",
        "С тобой даже обычный день становится праздником! 🎉",
        "Катя, ты мое солнышко в пасмурный день! ☀️",
        "Катя, ты самая милая и нежная! 🌸",
        "Твоя энергия заряжает меня позитивом! ⚡",
        "Катя, ты умеешь делать даже скучные моменты волшебными! ✨",
        "Твоя мудрость поражает меня каждый день! 🧠",
        "С тобой я забываю обо всех проблемах! 😌",
        "Катя, ты самая искренняя и честная! 💎",
        "Ты делаешь меня лучше просто своим присутствием! 🌺",
        "Катя, твоя забота обо мне не знает границ! 💕",
        "С тобой я чувствую, что могу все! 🚀",
        "Твоя красота заставляет мое сердце биться быстрее! 💓",
        "Катя, ты самая понимающая и терпеливая! 💝",
        "Твоя улыбка - мой любимый вид искусства! 🎨",
        "С тобой каждый день полон сюрпризов! 🎁",
        "Катя, твоя любовь - мой источник силы! 💪",
        "Ты умеешь видеть красоту в простых вещах! 🌈",
        "Катя, твоя поддержка значит для меня все! 🌟",
        "С тобой я чувствую себя защищенным! 🛡️",
        "Твоя нежность - это лекарство для моей души! 💊",
        "Катя, ты самая романтичная девушка! 💕",
        "Твоя смелость вдохновляет меня! 🦋",
        "С тобой я понимаю, что такое настоящее счастье! 😇",
        "Катя, твоя красота сияет изнутри! ✨",
        "Ты делаешь мою жизнь яркой и интересной! 🌈",
        "Катя, твоя любовь - это мой самый большой подарок! 🎁",
        "С тобой я чувствую себя самым удачливым! 💫",
        "Катя, ты мой ангел-хранитель! 👼",
        "Твоя доброта согревает мое сердце! 🔥",
        "Катя, ты самая загадочная и привлекательная! 🔮",
        "С тобой я чувствую себя дома! 🏠",
        "Твоя улыбка - мой самый любимый звук! 🎵",
        "Катя, ты делаешь каждый момент особенным! ⏰",
        "Твоя любовь - это мой компас в жизни! 🧭",
        "С тобой я чувствую себя самым сильным! 💪",
        "Катя, ты мое самое большое сокровище! 💰"
    ];
    
    let currentComplimentIndex = 0;
    
    // Модальное окно инструкций
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    const modalCloseBtn = document.getElementById('modalClose');
    
    // Функции для модальных окон
    function showModal() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    function hideModal() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    
    // Обработчики для закрытия модальных окон
    closeBtn.addEventListener('click', hideModal);
    modalCloseBtn.addEventListener('click', hideModal);
    
    
    // Закрытие по клику вне модального окна
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });
    
    
    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modal.classList.contains('show')) {
                hideModal();
            }
        }
    });
    
    // Блок комплиментов
    const complimentText = document.getElementById('complimentText');
    
    // Проверяем, что элемент найден
    if (!complimentText) {
        console.error('Элемент complimentText не найден!');
        return;
    }
    
    // Функция для показа случайного комплимента
    function showRandomCompliment() {
        console.log('showRandomCompliment вызвана');
        console.log('compliments.length:', compliments.length);
        console.log('currentComplimentIndex:', currentComplimentIndex);
        
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * compliments.length);
        } while (newIndex === currentComplimentIndex && compliments.length > 1);
        
        currentComplimentIndex = newIndex;
        console.log('Новый индекс:', currentComplimentIndex);
        console.log('Новый комплимент:', compliments[currentComplimentIndex]);
        
        // Фиксированный цвет для фона
        const backgroundColor = 'rgba(255, 182, 193, 0.3)';
        
        // Плавное исчезновение с блюром
        complimentText.style.transition = 'all 0.3s ease-out';
        complimentText.style.opacity = '0';
        complimentText.style.filter = 'blur(3px)';
        
        setTimeout(() => {
            // Меняем текст и цвет фона
            complimentText.textContent = compliments[currentComplimentIndex];
            complimentText.style.backgroundColor = backgroundColor;
            console.log('Текст изменен на:', complimentText.textContent);
            console.log('Цвет фона изменен на:', backgroundColor);
            
            // Плавное появление через блюр
            complimentText.style.transition = 'all 0.5s ease-out';
            complimentText.style.opacity = '1';
            complimentText.style.filter = 'blur(0px)';
        }, 300);
    }
    
    // Показываем комплимент при клике на сам текст
    complimentText.addEventListener('click', () => {
        showRandomCompliment();
    });
    
    // Кнопка нового комплимента
    const newComplimentBtn = document.getElementById('newComplimentBtn');
    
    // Обработчик для кнопки нового комплимента
    newComplimentBtn.addEventListener('click', () => {
        console.log('Кнопка нажата!');
        showRandomCompliment();
        
        // Анимация кнопки
        newComplimentBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            newComplimentBtn.style.transform = 'scale(1)';
        }, 150);
    });
    
    // Блок перехода к чату (весь блок кликабельный)
    const goToChatBtn = document.getElementById('goToChatBtn');
    const goToTodoBtn = document.getElementById('goToTodoBtn');
    
    // Функция загрузки погоды
    async function loadWeather() {
        const weatherTemp = document.getElementById('weatherTemp');
        const weatherIcon = document.getElementById('weatherIcon');
        const weatherDesc = document.getElementById('weatherDesc');
        
        try {
            // Используем wttr.in - бесплатный API без регистрации
            // Этот сервис предоставляет данные о погоде без API ключа
            const CITY = 'Vladivostok';
            const URL = `https://wttr.in/${CITY}?format=%C+%t&lang=ru`;
            
            // Показываем красивый прелоадер
            weatherTemp.innerHTML = `
                <div class="weather-loader">
                    <div class="loader-dot"></div>
                    <div class="loader-dot"></div>
                    <div class="loader-dot"></div>
                </div>
            `;
            weatherDesc.textContent = '';
            weatherIcon.textContent = '⏳';
            
            // Получаем данные с таймаутом для ускорения
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 секунды таймаут
            
            const response = await fetch(URL, { 
                signal: controller.signal,
                cache: 'no-cache'
            });
            clearTimeout(timeoutId);
            
            const weatherData = await response.text();
            
            // Парсим ответ (формат: "ясно +6°C" или "Переменная облачность +6°С")
            const parts = weatherData.trim().split(' ');
            console.log('Оригинальные данные:', weatherData);
            console.log('Части:', parts);
            
            // Ищем температуру в последней части (она всегда содержит °C или °С)
            let temp = '';
            let condition = '';
            
            for (let i = parts.length - 1; i >= 0; i--) {
                if (parts[i].includes('°')) {
                    temp = parts[i];
                    condition = parts.slice(0, i).join(' ');
                    break;
                }
            }
            
            // Если не нашли температуру, берем последнюю часть
            if (!temp && parts.length > 0) {
                temp = parts[parts.length - 1];
                condition = parts.slice(0, -1).join(' ');
            }
            
            console.log('Найденная температура:', temp);
            console.log('Условие погоды:', condition);
            
            if (temp && condition) {
                // Маппинг условий на иконки
                const iconMap = {
                    'ясно': '☀️',
                    'солнечно': '☀️',
                    'облачно': '☁️',
                    'облачность': '☁️',
                    'переменная облачность': '⛅',
                    'пасмурно': '☁️',
                    'дождь': '🌧️',
                    'ливень': '🌦️',
                    'снег': '❄️',
                    'туман': '🌫️',
                    'гроза': '⛈️',
                    'Clear': '☀️',
                    'Sunny': '☀️',
                    'Cloudy': '☁️',
                    'Rain': '🌧️',
                    'Snow': '❄️',
                    'Fog': '🌫️',
                    'Thunderstorm': '⛈️'
                };
                
                // Нормализуем условие для поиска в мапе
                const normalizedCondition = condition.toLowerCase().trim();
                const icon = iconMap[normalizedCondition] || '🌤️';
                
                // Обновляем данные с анимацией
                weatherTemp.textContent = temp;
                weatherIcon.textContent = icon;
                weatherDesc.textContent = condition;
                
                console.log('Погода загружена:', normalizedCondition, temp);
                
            } else {
                throw new Error('Не удалось распарсить данные о погоде');
            }
            
        } catch (error) {
            // В случае ошибки используем статичные данные
            console.log('Используем статичные данные о погоде:', error);
            const vladivostokWeather = {
                temperature: 6,
                description: 'солнечно',
                icon: '☀️'
            };
            
            weatherTemp.textContent = `${vladivostokWeather.temperature}°C`;
            weatherIcon.textContent = vladivostokWeather.icon;
            weatherDesc.textContent = vladivostokWeather.description;
        }
        
        // Добавляем анимацию появления
        weatherTemp.style.opacity = '0';
        weatherTemp.style.transform = 'translateY(10px)';
        setTimeout(() => {
            weatherTemp.style.transition = 'all 0.5s ease';
            weatherTemp.style.opacity = '1';
            weatherTemp.style.transform = 'translateY(0)';
        }, 200);
    }
    
    // Загружаем погоду при загрузке страницы
    loadWeather();
    
    // Обновляем погоду каждые 5 минут для более актуальных данных
    setInterval(loadWeather, 300000);
    
    // Автоматическая смена комплиментов каждые 5 секунд
    setInterval(() => {
        showRandomCompliment();
    }, 5000);
    
    
    // Переход к todo-листу
    goToTodoBtn.addEventListener('click', () => {
        // Анимация нажатия
        goToTodoBtn.style.transform = 'scale(0.98)';
        
        // Создаем прелоадер
        const preloader = document.createElement('div');
        preloader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #ff6b6b, #ff8e8e, #ffa8a8);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        // Создаем анимированный спиннер
        const spinner = document.createElement('div');
        spinner.style.cssText = `
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        `;
        
        // Создаем текст загрузки
        const loadingText = document.createElement('div');
        loadingText.textContent = 'Переходим к записям...';
        loadingText.style.cssText = `
            color: white;
            font-family: 'Montserrat', sans-serif;
            font-size: 1.2em;
            font-weight: 500;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        `;
        
        preloader.appendChild(spinner);
        preloader.appendChild(loadingText);
        document.body.appendChild(preloader);
        
        // Показываем прелоадер
        setTimeout(() => {
            preloader.style.opacity = '1';
        }, 10);
        
        // Переход на страницу todo
        setTimeout(() => {
            window.location.href = 'todo.html';
        }, 1500);
    });
    
    goToChatBtn.addEventListener('click', () => {
        // Анимация нажатия
        goToChatBtn.style.transform = 'scale(0.98)';
        
        // Создаем прелоадер
        const preloader = document.createElement('div');
        preloader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #ff6b6b, #ff8e8e, #ffa8a8);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        // Создаем анимированный спиннер
        const spinner = document.createElement('div');
        spinner.style.cssText = `
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        `;
        
        // Создаем текст загрузки
        const loadingText = document.createElement('div');
        loadingText.textContent = 'Переходим к чату...';
        loadingText.style.cssText = `
            color: white;
            font-family: 'Montserrat', sans-serif;
            font-size: 1.2em;
            font-weight: 500;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        `;
        
        // Добавляем CSS анимацию для спиннера
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        preloader.appendChild(spinner);
        preloader.appendChild(loadingText);
        document.body.appendChild(preloader);
        
        // Показываем прелоадер
        setTimeout(() => {
            preloader.style.opacity = '1';
        }, 50);
        
        // Переход к чату
        setTimeout(() => {
            window.location.href = 'chat.html';
        }, 1500);
    });
});
