document.addEventListener('DOMContentLoaded', () => {
    const blindBox = document.querySelector('.blind-box');
    
    blindBox.addEventListener('click', () => {
        // 添加过渡动画
        blindBox.style.transition = 'transform 0.5s ease';
        blindBox.style.transform = 'scale(0.8) rotate(360deg)';
        
        // 延迟后跳转到第二个页面
        setTimeout(() => {
            window.location.href = 'pages/interactive.html';
        }, 500);
    });
});