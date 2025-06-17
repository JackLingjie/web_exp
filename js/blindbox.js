document.addEventListener('DOMContentLoaded', () => {
    const blindBox = document.querySelector('.blind-box');
    const giftWrap = document.querySelector('.gift-wrap');
    const audio = document.getElementById('unwrapSound');
    
    // 创建新的链接元素
    const journeyLink = document.createElement('a');
    journeyLink.href = 'pages/interactive.html';
    journeyLink.className = 'journey-link';
    journeyLink.textContent = '一段旅程即将开始...';
    journeyLink.style.display = 'none';
    document.querySelector('.blind-box-container').appendChild(journeyLink);
    
    blindBox.addEventListener('click', () => {
        // 播放音效
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log('Audio play failed:', e));
        }
        
        // 添加开箱动画类
        blindBox.classList.add('unwrapped');
        
        // 1.5秒后显示新链接
        setTimeout(() => {
            journeyLink.style.display = 'block';
            journeyLink.classList.add('show');
        }, 1500);
    });
});