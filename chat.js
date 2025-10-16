document.addEventListener('DOMContentLoaded', function() {
    
    // Чат с помощником
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const backBtn = document.getElementById('backBtn');
    
    // Ответы помощника Вовы
    const assistantResponses = [
        "Вова просил передать, что он очень скучает по тебе! 💕",
        "Мой босс Вова говорил, что ты самая лучшая девушка на свете! ✨",
        "Вова поручил мне следить, чтобы у тебя всегда было хорошее настроение! 😊",
        "Он просил передать, что ты делаешь его счастливым каждый день! 💖",
        "Вова сказал, что ты его вдохновение и мотивация! 🌟",
        "Мой босс очень заботится о тебе! Он постоянно думает, как сделать тебя счастливой 💝",
        "Вова просил передать, что ты самая красивая и умная! 👑",
        "Он говорил, что с тобой каждый день становится особенным! ✨",
        "Вова поручил мне всегда быть рядом, когда тебе нужна поддержка! 💕",
        "Мой босс сказал, что ты его принцесса и он готов на все ради тебя! 👸",
        "Вова просил передать, что ты делаешь его жизнь осмысленной! 💫",
        "Он говорил, что ты его ангел-хранитель! 👼",
        "Вова поручил мне следить, чтобы ты всегда улыбалась! 😄",
        "Мой босс сказал, что ты его самое большое сокровище! 💎",
        "Вова просил передать, что он любит тебя больше всего на свете! 💕"
    ];
    
    // Функция добавления сообщения
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = isUser ? 'К' : 'В';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        const p = document.createElement('p');
        p.textContent = text;
        content.appendChild(p);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Функция отправки сообщения
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;
        
        // Добавляем сообщение пользователя
        addMessage(message, true);
        chatInput.value = '';
        
        // Показываем индикатор печати
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message ai-message';
        typingIndicator.innerHTML = `
            <div class="message-avatar">В</div>
            <div class="message-content">
                <p>Печатает...</p>
            </div>
        `;
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Имитируем задержку ответа помощника
        setTimeout(() => {
            // Удаляем индикатор печати
            chatMessages.removeChild(typingIndicator);
            
            // Добавляем ответ помощника
            const randomResponse = assistantResponses[Math.floor(Math.random() * assistantResponses.length)];
            addMessage(randomResponse);
        }, 1000 + Math.random() * 2000); // 1-3 секунды
    }
    
    // Обработчики событий
    sendBtn.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Обработчики быстрых вопросов
    const quickQuestions = document.querySelectorAll('.quick-question');
    quickQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const questionText = question.getAttribute('data-question');
            chatInput.value = questionText;
            sendMessage();
        });
    });
    
    // Анимация кнопки отправки
    sendBtn.addEventListener('click', () => {
        sendBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            sendBtn.style.transform = 'scale(1)';
        }, 150);
    });
    
    // Кнопка возврата
    backBtn.addEventListener('click', () => {
        // Анимация нажатия
        backBtn.style.transform = 'scale(0.95)';
        
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
        loadingText.textContent = 'Возвращаемся назад...';
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
        
        // Переход назад
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    });
});
