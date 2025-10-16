// Элементы DOM
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const activeTodoList = document.getElementById('activeTodoList');
const completedTodoList = document.getElementById('completedTodoList');
const activeCount = document.getElementById('activeCount');
const completedCount = document.getElementById('completedCount');
const backBtn = document.getElementById('backBtn');

// Массив задач (загружается из localStorage)
let todos = JSON.parse(localStorage.getItem('todos')) || [];


// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    renderTodos();
    setupEventListeners();
    setupHotkeys();
    setupAutoSave();
    setupMobileKeyboard();
});

// Отрисовка списка задач
function renderTodos() {
    activeTodoList.innerHTML = '';
    completedTodoList.innerHTML = '';
    
    const activeTodos = todos.filter(todo => !todo.completed);
    const completedTodos = todos.filter(todo => todo.completed);
    
    // Обновляем счетчики
    updateCounters(activeTodos.length, completedTodos.length);
    
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
}

// Обновление счетчиков
function updateCounters(activeCountValue, completedCountValue) {
    activeCount.textContent = activeCountValue;
    completedCount.textContent = completedCountValue;
}

// Создание элемента задачи
function createTodoItem(todo, index, container) {
        const todoItem = document.createElement('div');
        todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        todoItem.style.opacity = '0';
        todoItem.style.transform = 'translateY(20px)';
        
        todoItem.innerHTML = `
            <label class="todo-checkbox-container">
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="checkmark"></span>
            </label>
            <span class="todo-text">${todo.text}</span>
            <div class="todo-actions">
                <button class="todo-edit" onclick="editTodo(${index})" title="Редактировать (F2)">
                    <span class="material-icons">edit</span>
                </button>
                <button class="todo-duplicate" onclick="duplicateTodo(${index})" title="Дублировать">
                    <span class="material-icons">content_copy</span>
                </button>
                <button class="todo-delete" onclick="deleteTodo(${index})" title="Удалить (Delete)">
                    <span class="material-icons">delete</span>
                </button>
            </div>
        `;
        
        // Обработчик изменения статуса задачи
        const checkbox = todoItem.querySelector('.todo-checkbox');
        checkbox.addEventListener('change', () => toggleTodo(index));
        
    container.appendChild(todoItem);
        
        // Анимация появления
        setTimeout(() => {
            todoItem.style.transition = 'all 0.3s ease';
            todoItem.style.opacity = '1';
            todoItem.style.transform = 'translateY(0)';
    }, 50);
}

// Добавление новой задачи
function addTodo() {
    const text = todoInput.value.trim();
    if (text === '') return;
    
    const newTodo = {
        text: text,
        completed: false,
        id: Date.now()
    };
    
    todos.unshift(newTodo);
    saveTodos();
    addSingleTodo(newTodo, 0);
    
    // Очистка поля ввода
    todoInput.value = '';
    
    // Принудительная очистка с задержкой
    setTimeout(() => {
        todoInput.value = '';
    }, 100);
    
    // Закрытие клавиатуры
    todoInput.blur();
    
    // Прокручиваем наверх для просмотра новой задачи
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 200);
    
    // Фиксируем инпут внизу экрана
    const inputContainer = document.querySelector('.todo-input-container-fixed');
    if (inputContainer) {
        inputContainer.style.position = 'fixed';
        inputContainer.style.bottom = '0px';
        inputContainer.style.transform = 'translateY(0)';
    }
    
    // Возвращаем обычный отступ для контента
    const todoPageBody = document.querySelector('.todo-page-body');
    if (todoPageBody) {
        todoPageBody.style.paddingBottom = '100px';
    }
}

// Добавление одной задачи без анимации для существующих
function addSingleTodo(todo, index) {
    // Очищаем сообщение "Нет активных задач" если оно есть
    if (activeTodoList.innerHTML.includes('Нет активных задач')) {
        activeTodoList.innerHTML = '';
    }
    
    createTodoItem(todo, index, activeTodoList);
    
    // Обновляем счетчики
    const activeTodos = todos.filter(todo => !todo.completed);
    const completedTodos = todos.filter(todo => todo.completed);
    updateCounters(activeTodos.length, completedTodos.length);
    
    updateStats();
}

// Переключение статуса задачи
function toggleTodo(index) {
    if (index < 0 || index >= todos.length) return;
    
    todos[index].completed = !todos[index].completed;
    saveTodos();
    
    // Перерисовываем списки, чтобы задача переместилась в нужную секцию
    renderTodos();
    updateStats();
}

// Удаление задачи с анимацией
function deleteTodo(index) {
    if (index < 0 || index >= todos.length) return;
    
    // Находим элемент в DOM для анимации
    const allTodoItems = [...activeTodoList.querySelectorAll('.todo-item'), ...completedTodoList.querySelectorAll('.todo-item')];
    const todoItem = allTodoItems.find(item => {
        const todoText = item.querySelector('.todo-text');
        return todoText && todoText.textContent.trim() === todos[index].text;
    });
    
    if (todoItem) {
        todoItem.style.transition = 'all 0.3s ease';
        todoItem.style.opacity = '0';
        todoItem.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
            updateStats();
        }, 300);
    } else {
        // Если элемент не найден, просто удаляем из массива
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
        updateStats();
    }
}


// Редактирование задачи
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
    saveButton.title = 'Сохранить (Enter)';
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
            // Обновляем только текст задачи без перерендеринга
            todoText.textContent = newText;
        }
        input.remove();
        todoText.style.display = 'block';
        // Восстанавливаем оригинальные кнопки
        todoActions.innerHTML = originalActions;
        // Обновляем только статистику, без перерендеринга всех задач
        updateStats();
    };
    
    const cancelEdit = () => {
        input.remove();
        todoText.style.display = 'block';
        // Восстанавливаем оригинальные кнопки
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



// Настройка горячих клавиш
function setupHotkeys() {
    document.addEventListener('keydown', function(e) {
        // Ctrl + Enter - добавить задачу
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            addTodo();
        }
        
        // Delete - удалить выбранную задачу
        if (e.key === 'Delete') {
            const selectedItem = document.querySelector('.todo-item.selected');
            if (selectedItem) {
                const index = Array.from(todoList.children).indexOf(selectedItem);
                if (index !== -1) {
                    deleteTodo(index);
                }
            }
        }
        
        // F2 - редактировать выбранную задачу
        if (e.key === 'F2') {
            e.preventDefault();
            const selectedItem = document.querySelector('.todo-item.selected');
            if (selectedItem) {
                const index = Array.from(todoList.children).indexOf(selectedItem);
                if (index !== -1) {
                    editTodo(index);
                }
            }
        }
    });
}

// Настройка автосохранения
function setupAutoSave() {
    setInterval(() => {
        saveTodos();
        console.log('Автосохранение выполнено');
    }, 30000); // каждые 30 секунд
}

// Настройка для мобильной клавиатуры
function setupMobileKeyboard() {
    const inputContainer = document.querySelector('.todo-input-container-fixed');
    const todoInput = document.getElementById('todoInput');
    
    if (!inputContainer || !todoInput) return;
    
    // Обработчик фокуса на инпуте
    todoInput.addEventListener('focus', function() {
        // Фиксируем инпут внизу экрана без поднятия
        inputContainer.style.position = 'fixed';
        inputContainer.style.bottom = '0px';
        inputContainer.style.transform = 'translateY(0)';
        inputContainer.style.zIndex = '1000';
        
        // Предотвращаем скролл страницы
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
        
        // Добавляем отступ для контента
        const todoPageBody = document.querySelector('.todo-page-body');
        if (todoPageBody) {
            todoPageBody.style.paddingBottom = '120px';
        }
    });
    
    // Обработчик потери фокуса
    todoInput.addEventListener('blur', function() {
        // Возвращаем скролл страницы
        document.body.style.overflow = '';
        document.body.style.height = '';
        
        // Возвращаем обычный отступ для контента
        const todoPageBody = document.querySelector('.todo-page-body');
        if (todoPageBody) {
            todoPageBody.style.paddingBottom = '100px';
        }
    });
    
    // Обработчик изменения размера окна (для поворота экрана)
    window.addEventListener('resize', function() {
        if (document.activeElement === todoInput) {
            // Если инпут в фокусе, обновляем позицию
            setTimeout(() => {
                inputContainer.style.position = 'fixed';
                inputContainer.style.bottom = '0px';
                inputContainer.style.transform = 'translateY(0)';
            }, 100);
        }
    });
}


// Дублирование задачи
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
    
    // Перерисовываем списки, чтобы дублированная задача появилась в правильной секции
    renderTodos();
    updateStats();
}

// Сохранение в localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Обработчики событий
function setupEventListeners() {
addTodoBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Кнопка назад
backBtn.addEventListener('click', function() {
    // Показываем прелоадер
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-spinner"></div>
        <p>Возвращаемся назад...</p>
    `;
    document.body.appendChild(preloader);
    
    // Переход на главную страницу
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
});
}
