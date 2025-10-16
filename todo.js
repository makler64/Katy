// Элементы DOM
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');
const backBtn = document.getElementById('backBtn');

// Массив задач (загружается из localStorage)
let todos = JSON.parse(localStorage.getItem('todos')) || [];


// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    renderTodos();
    setupHotkeys();
    setupAutoSave();
});

// Отрисовка списка задач
function renderTodos() {
    todoList.innerHTML = '';
    
    if (todos.length === 0) {
        todoList.innerHTML = '<div class="empty-todos">Пока нет задач. Добавьте первую!</div>';
        return;
    }
    
    todos.forEach((todo, index) => {
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
        
        todoList.appendChild(todoItem);
        
        // Анимация появления
        setTimeout(() => {
            todoItem.style.transition = 'all 0.3s ease';
            todoItem.style.opacity = '1';
            todoItem.style.transform = 'translateY(0)';
        }, index * 100);
    });
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
    
    todos.push(newTodo);
    saveTodos();
    renderTodos();
    
    // Очистка поля ввода
    todoInput.value = '';
    todoInput.focus();
}

// Переключение статуса задачи
function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

// Удаление задачи с анимацией
function deleteTodo(index) {
    const todoItem = document.querySelector(`.todo-item:nth-child(${index + 1})`);
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
    }
}

// Редактирование задачи
function editTodo(index) {
    const todoItem = document.querySelector(`.todo-item:nth-child(${index + 1})`);
    const todoText = todoItem.querySelector('.todo-text');
    const currentText = todos[index].text;
    
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
    `;
    
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
        }
        input.remove();
        todoText.style.display = 'block';
        renderTodos();
        updateStats();
    };
    
    const cancelEdit = () => {
        input.remove();
        todoText.style.display = 'block';
    };
    
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


// Дублирование задачи
function duplicateTodo(index) {
    const originalTodo = todos[index];
    const duplicatedTodo = {
        ...originalTodo,
        text: originalTodo.text + ' (копия)',
        id: Date.now(),
        completed: false
    };
    
    todos.splice(index + 1, 0, duplicatedTodo);
    saveTodos();
    renderTodos();
}

// Сохранение в localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Обработчики событий
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
