// 配置生日日期
const birthday = '2025-07-14T00:00:00+08:00';

// 打字效果
const typed = new Typed('.typed-text', {
    strings: ['Hi {{HerName}}, 生日快乐！'],
    typeSpeed: 50,
    showCursor: false,
    onComplete: () => {
        document.querySelector('.countdown').style.opacity = '1';
    }
});

// 倒计时功能
function updateCountdown() {
    const now = new Date();
    const target = new Date(birthday);
    const diff = target - now;

    if (diff <= 0) {
        document.querySelector('.countdown').textContent = '生日快乐！';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.querySelector('.countdown').textContent = 
        `距离你的生日还有 ${days} 天 ${hours} 小时 ${minutes} 分 ${seconds} 秒`;
}

// 初始化倒计时
updateCountdown();
setInterval(updateCountdown, 1000);

// 检测 prefers-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
    document.documentElement.classList.add('reduced-motion');
} 