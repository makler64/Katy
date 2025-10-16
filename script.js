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
    
    // Блок перехода к todo-листу
    const goToTodoBtn = document.getElementById('goToTodoBtn');
    console.log('goToTodoBtn found:', !!goToTodoBtn);
    
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
    
    
    // Инициализация todo функциональности
    initializeTodoModal();
    
    // Переход к todo-листу (открытие попапа)
    if (goToTodoBtn) {
        console.log('Adding click listener to goToTodoBtn');
    goToTodoBtn.addEventListener('click', () => {
        // Анимация нажатия
        goToTodoBtn.style.transform = 'scale(0.98)';
        
        // Возвращаем кнопку в исходное состояние
        setTimeout(() => {
            goToTodoBtn.style.transform = 'scale(1)';
        }, 150);
        
        // Открываем попап todo
        console.log('Button clicked, trying to open modal...');
        if (window.openTodoModal) {
            window.openTodoModal();
        } else {
            console.error('openTodoModal function not found');
            // Альтернативный способ открытия
            const modal = document.getElementById('todoModal');
            if (modal) {
                console.log('Opening modal directly...');
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            } else {
                console.error('Modal element not found');
            }
        }
        });
    } else {
        console.error('goToTodoBtn element not found');
    }
});

// Todo функциональность
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Инициализация todo модального окна
function initializeTodoModal() {
    const todoModal = document.getElementById('todoModal');
    const closeTodoBtn = document.querySelector('.close-todo');
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const activeTodoList = document.getElementById('activeTodoList');
    const completedTodoList = document.getElementById('completedTodoList');
    const activeCount = document.getElementById('activeCount');
    const completedCount = document.getElementById('completedCount');

    // Проверяем, что все элементы найдены
    console.log('Todo modal elements:', {
        todoModal: !!todoModal,
        closeTodoBtn: !!closeTodoBtn,
        todoInput: !!todoInput,
        addTodoBtn: !!addTodoBtn,
        activeTodoList: !!activeTodoList,
        completedTodoList: !!completedTodoList,
        activeCount: !!activeCount,
        completedCount: !!completedCount
    });

    // Функции для работы с todo
    function renderTodos() {
        if (!activeTodoList || !completedTodoList) return;
        
        activeTodoList.innerHTML = '';
        completedTodoList.innerHTML = '';
        
        const activeTodos = todos.filter(todo => !todo.completed);
        const completedTodos = todos.filter(todo => todo.completed);
        
        // Обновляем счетчики
        if (activeCount) activeCount.textContent = activeTodos.length;
        if (completedCount) completedCount.textContent = completedTodos.length;
        
        // Отрисовка активных задач
        if (activeTodos.length === 0) {
            activeTodoList.innerHTML = '<div class="empty-todos">Нет активных задач</div>';
        } else {
            activeTodos.forEach((todo, index) => {
                const actualIndex = todos.findIndex(t => t.id === todo.id);
                createTodoItem(todo, actualIndex, activeTodoList);
            });
        }
        
        // Отрисовка завершенных задач
        if (completedTodos.length === 0) {
            completedTodoList.innerHTML = '<div class="empty-todos">Нет завершенных задач</div>';
        } else {
            completedTodos.forEach((todo, index) => {
                const actualIndex = todos.findIndex(t => t.id === todo.id);
                createTodoItem(todo, actualIndex, completedTodoList);
            });
        }
        
        // Обновляем статистику на главной странице
        updateTodoStats();
    }

    function createTodoItem(todo, index, container) {
        const todoItem = document.createElement('div');
        todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        todoItem.style.opacity = '0';
        todoItem.style.transform = 'translateY(20px)';
        
        todoItem.innerHTML = `
            <label class="todo-checkbox-container">
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
            </label>
            <span class="todo-text">${todo.text}</span>
            <div class="todo-actions">
                <button class="todo-edit" title="Редактировать">
                    <span class="material-icons">edit</span>
                </button>
                <button class="todo-duplicate" title="Дублировать">
                    <span class="material-icons">content_copy</span>
                </button>
                <button class="todo-delete" title="Удалить">
                    <span class="material-icons">delete</span>
                </button>
            </div>
        `;
        
        // Обработчик изменения статуса задачи
        const checkbox = todoItem.querySelector('.todo-checkbox');
        checkbox.addEventListener('change', () => toggleTodo(index));
        
        // Обработчики кнопок действий
        const editBtn = todoItem.querySelector('.todo-edit');
        const duplicateBtn = todoItem.querySelector('.todo-duplicate');
        const deleteBtn = todoItem.querySelector('.todo-delete');
        
        editBtn.addEventListener('click', () => editTodo(index));
        duplicateBtn.addEventListener('click', () => duplicateTodo(index));
        deleteBtn.addEventListener('click', () => deleteTodo(index));
        
        container.appendChild(todoItem);
        
        // Анимация появления
        setTimeout(() => {
            todoItem.style.transition = 'all 0.3s ease';
            todoItem.style.opacity = '1';
            todoItem.style.transform = 'translateY(0)';
        }, 50);
    }

    function addTodo() {
        if (!todoInput) return;
        
        const text = todoInput.value.trim();
        if (text === '') return;
        
        const newTodo = {
            text: text,
            completed: false,
            id: Date.now()
        };
        
        todos.unshift(newTodo);
        saveTodos();
        renderTodos();
        
        // Очистка поля ввода
        todoInput.value = '';
        todoInput.blur();
    }

    function toggleTodo(index) {
        if (index < 0 || index >= todos.length) return;
        
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    }

    function deleteTodo(index) {
        if (index < 0 || index >= todos.length) return;
        
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    }

    function editTodo(index) {
        if (index < 0 || index >= todos.length) return;
        
        // Находим элемент в DOM
        const allTodoItems = [...activeTodoList.querySelectorAll('.todo-item'), ...completedTodoList.querySelectorAll('.todo-item')];
        const todoItem = allTodoItems.find(item => {
            const todoText = item.querySelector('.todo-text');
            return todoText && todoText.textContent.trim() === todos[index].text;
        });
        
        if (!todoItem) return;
        
        const todoText = todoItem.querySelector('.todo-text');
        const currentTodo = todos[index];
        const currentText = currentTodo.text;
        
        // Создаем поле ввода
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.className = 'todo-edit-input';
        input.style.cssText = `
            flex: 1;
            padding: 8px 12px;
            border: 2px solid #6c757d;
            border-radius: 6px;
            font-size: 1em;
            font-family: 'Montserrat', sans-serif;
            outline: none;
            background: white;
            margin: 0;
            width: 100%;
            box-sizing: border-box;
        `;
        
        // Скрываем кнопки действий и заменяем на кнопку сохранения
        const todoActions = todoItem.querySelector('.todo-actions');
        const originalActions = todoActions.innerHTML;
        
        // Создаем кнопку сохранения
        const saveButton = document.createElement('button');
        saveButton.className = 'todo-save';
        saveButton.innerHTML = '<span class="material-icons">check</span>';
        saveButton.title = 'Сохранить';
        saveButton.style.cssText = `
            background: #28a745;
            border: 1px solid #28a745;
            color: white;
            cursor: pointer;
            padding: 8px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            width: 32px;
            height: 32px;
            transition: all 0.3s ease;
        `;
        
        // Заменяем кнопки на кнопку сохранения
        todoActions.innerHTML = '';
        todoActions.appendChild(saveButton);
        
        // Заменяем текст на поле ввода
        todoText.style.display = 'none';
        todoText.parentNode.insertBefore(input, todoText);
        input.focus();
        input.select();
        
        // Обработчики событий
        const saveEdit = () => {
            const newText = input.value.trim();
            if (newText && newText !== currentText) {
                todos[index].text = newText;
                saveTodos();
                todoText.textContent = newText;
            }
            input.remove();
            todoText.style.display = 'block';
            todoActions.innerHTML = originalActions;
            updateTodoStats();
        };
        
        const cancelEdit = () => {
            input.remove();
            todoText.style.display = 'block';
            todoActions.innerHTML = originalActions;
        };
        
        // Обработчик клика по кнопке сохранения
        saveButton.addEventListener('click', saveEdit);
        
        input.addEventListener('blur', saveEdit);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveEdit();
            } else if (e.key === 'Escape') {
                cancelEdit();
            }
        });
    }

    function duplicateTodo(index) {
        if (index < 0 || index >= todos.length) return;
        
        const originalTodo = todos[index];
        const duplicatedTodo = {
            ...originalTodo,
            text: originalTodo.text + ' (копия)',
            id: Date.now(),
            completed: false
        };
        
        todos.unshift(duplicatedTodo);
        saveTodos();
        renderTodos();
    }

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Обработчики событий
    if (closeTodoBtn) {
        closeTodoBtn.addEventListener('click', () => {
            window.closeTodoModal();
        });
    }

    if (addTodoBtn) {
        addTodoBtn.addEventListener('click', addTodo);
    }

    if (todoInput) {
        todoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTodo();
            }
        });
    }

    // Закрытие по клику вне модального окна
    if (todoModal) {
        todoModal.addEventListener('click', (e) => {
            if (e.target === todoModal) {
                window.closeTodoModal();
            }
        });
    }

    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && todoModal && todoModal.classList.contains('show')) {
            window.closeTodoModal();
        }
    });

    // Горячие клавиши
    document.addEventListener('keydown', function(e) {
        // Ctrl + Enter - добавить задачу (только когда попап открыт)
        if (e.ctrlKey && e.key === 'Enter' && todoModal && todoModal.classList.contains('show')) {
            e.preventDefault();
            addTodo();
        }
    });

    // Инициализация отрисовки
    renderTodos();

    // Функция для обработки свайпов
    function setupSwipeToClose() {
        const modalContent = document.querySelector('.todo-modal .modal-content');
        const dragIndicator = document.querySelector('.modal-drag-indicator');
        
        if (!modalContent || !dragIndicator) return;
        
        let startY = 0;
        let currentY = 0;
        let isDragging = false;
        
        // Обработчики для индикатора перетаскивания
        dragIndicator.addEventListener('mousedown', startDrag);
        dragIndicator.addEventListener('touchstart', startDrag);
        
        function startDrag(e) {
            isDragging = true;
            startY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
            modalContent.style.transition = 'none';
            
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', endDrag);
            document.addEventListener('touchmove', drag);
            document.addEventListener('touchend', endDrag);
        }
        
        function drag(e) {
            if (!isDragging) return;
            
            e.preventDefault();
            currentY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
            const deltaY = currentY - startY;
            
            // Ограничиваем движение только вниз
            if (deltaY > 0) {
                modalContent.style.transform = `translateY(${deltaY}px)`;
            }
        }
        
        function endDrag() {
            if (!isDragging) return;
            
            isDragging = false;
            modalContent.style.transition = 'transform 0.3s ease-out';
            
            const deltaY = currentY - startY;
            
            // Если свайп был достаточно большим, закрываем модальное окно
            if (deltaY > 100) {
                window.closeTodoModal();
            } else {
                // Возвращаем на место
                modalContent.style.transform = 'translateY(0)';
            }
            
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', endDrag);
            document.removeEventListener('touchmove', drag);
            document.removeEventListener('touchend', endDrag);
        }
    }

    // Экспортируем функции для глобального доступа
    window.openTodoModal = function() {
        console.log('Opening todo modal...', todoModal);
        if (todoModal) {
            // Сначала сбрасываем transform
            const modalContent = todoModal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.transform = 'translateY(100%)';
            }
            
            // Блокируем скролл основной страницы
            document.body.classList.add('modal-open');
            
            // Показываем модальное окно
            todoModal.classList.add('show');
            
            // Небольшая задержка для плавной анимации
            setTimeout(() => {
                if (modalContent) {
                    modalContent.style.transform = 'translateY(0)';
                }
            }, 10);
            
            renderTodos(); // Обновляем список при открытии
            setupSwipeToClose(); // Настраиваем свайп для закрытия
            console.log('Todo modal opened successfully');
        } else {
            console.error('Todo modal element not found');
        }
    };

    window.closeTodoModal = function() {
        console.log('Closing todo modal...');
        if (todoModal) {
            // Сначала убираем класс show
            todoModal.classList.remove('show');
            // Сбрасываем transform для плавного скрытия
            const modalContent = todoModal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.transform = 'translateY(100%)';
            }
            // Восстанавливаем скролл основной страницы
            document.body.classList.remove('modal-open');
        }
    };
}

