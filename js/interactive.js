document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('readyButton');
    const messageContainer = document.getElementById('messageContainer');
    let clickCount = 0;

    const messages = [
        { text: '你确定准备好了吗？', emoji: '🤔' },
        { text: '那我们开始了', emoji: '✨' },
        { text: 'Wait，请检查一下有没有把手机声音打开', emoji: '🔊' },
        { text: '那我们就开始了', emoji: '🎉' }
    ];

    function showMessage(message) {
        const formattedMessage = `${message.text} <span class="emoji">${message.emoji}</span>`;
        messageContainer.innerHTML = formattedMessage;
        messageContainer.classList.add('show');
        
        // 为新消息添加动画
        const textElements = messageContainer.childNodes;
        textElements.forEach((node, index) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const words = node.textContent.split('');
                const spans = words.map((word, i) => 
                    `<span class="rolling-text" style="animation-delay: ${i * 0.05}s">${word}</span>`
                ).join('');
                const spanElement = document.createElement('span');
                spanElement.innerHTML = spans;
                node.replaceWith(spanElement);
            }
        });
    }

    function updateButtonText(message) {
        button.innerHTML = `${message.text} <span class="emoji">${message.emoji}</span>`;
    }

    button.addEventListener('click', () => {
        if (clickCount < messages.length - 1) {
            showMessage(messages[clickCount]);
            updateButtonText(messages[clickCount]);
            clickCount++;
        } else {
            showMessage(messages[clickCount]);
            button.style.transform = 'scale(0.95)';
            button.style.opacity = '0.7';
            button.disabled = true;
            
            // 延迟后跳转到下一个页面
            setTimeout(() => {
                const transition = document.createElement('div');
                transition.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: white;
                    opacity: 0;
                    transition: opacity 0.5s ease;
                    z-index: 1000;
                `;
                document.body.appendChild(transition);
                
                // 触发过渡动画
                setTimeout(() => {
                    transition.style.opacity = '1';
                    setTimeout(() => {
                        window.location.href = 'birthday.html';
                    }, 500);
                }, 50);
            }, 2000);
        }
    });
});