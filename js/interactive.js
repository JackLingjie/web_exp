// 检查是否支持减少动画
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 音频处理
let bgMusic = null;
let isMusicPlaying = false;

// 音频上下文
let audioContext;
const bgm = document.getElementById('bgm');
bgm.volume = 0.4;

// 初始化音频上下文
function initAudio() {
    // 暂时禁用音频功能
    console.log('音频功能已暂时禁用');
    return;
}

// 模态框处理
function showModal(message, duration = 2000) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.textContent = message;
    document.body.appendChild(modal);

    setTimeout(() => {
        modal.classList.add('show');
    }, 100);

    setTimeout(() => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }, duration);
}

// 显示模态框链
async function showModals() {
    try {
        await Swal.fire({
            title: '准备好打开了吗？',
            text: '点击 Yes 继续',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonColor: '#ff80bf',
            allowOutsideClick: false
        });

        await Swal.fire({
            title: '你确定准备好了吗？',
            text: '再确认一下',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '再想想',
            confirmButtonColor: '#ff80bf',
            allowOutsideClick: false
        });

        await Swal.fire({
            title: '那我们开始了！',
            icon: 'success',
            confirmButtonText: '开始',
            confirmButtonColor: '#ff80bf',
            allowOutsideClick: false
        });

        // 开始动画序列
        startTimeline();
    } catch (error) {
        // 用户取消，返回首页
        location.href = 'index.html';
    }
}

// 初始化打字效果
function initTyped() {
    const typed = new Typed('.typed-text', {
        strings: [
            'Wait😜，请检查一下有没有把手机声音打开😀',
            '那我们就开始了！'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        showCursor: false,
        onComplete: () => {
            initAudio();
            showModals();
        }
    });
}

// 蛋糕动画
function animateCake() {
    const cake = document.querySelector('.cake');
    if (!cake) return;

    const timeline = anime.timeline({
        easing: 'easeOutElastic(1, .5)'
    });

    timeline
        .add({
            targets: cake,
            opacity: [0, 1],
            translateY: [100, 0],
            duration: 2000
        })
        .add({
            targets: '.candle .flame',
            scale: [0.8, 1.2],
            opacity: [0.8, 1],
            duration: 1000,
            direction: 'alternate',
            loop: true
        }, '-=1000');
}

// 烟花动画
function initFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = window.innerWidth <= 414 ? 50 : 100;
    let lastTime = 0;

    function createParticle(x, y) {
        return {
            x,
            y,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            radius: Math.random() * 2 + 1,
            color: `hsl(${Math.random() * 360}, 50%, 50%)`,
            alpha: 1,
            life: 1
        };
    }

    function animate(currentTime) {
        if (!lastTime) lastTime = currentTime;
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, i) => {
            particle.x += particle.vx * (deltaTime / 16);
            particle.y += particle.vy * (deltaTime / 16);
            particle.life -= 0.01;
            particle.alpha = particle.life;

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${particle.color}, ${particle.alpha})`;
            ctx.fill();

            if (particle.life <= 0) {
                particles.splice(i, 1);
            }
        });

        if (particles.length < particleCount) {
            particles.push(createParticle(
                Math.random() * canvas.width,
                Math.random() * canvas.height
            ));
        }

        requestAnimationFrame(animate);
    }

    animate(0);

    // 窗口大小改变时重置画布
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// 气球动画
function createBalloons() {
    const container = document.getElementById('balloonsContainer');
    if (!container) return;

    const colors = ['#ff80bf', '#ff69b4', '#ff1493', '#ff69b4'];
    const count = window.innerWidth <= 414 ? 5 : 10;

    for (let i = 0; i < count; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = `${Math.random() * 100}%`;
        balloon.style.bottom = '-50px';
        balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(balloon);
    }
}

// 初始化五彩纸屑
function initConfetti() {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
        emojis: ['🎉', '🎊', '🎂', '🎁', '🎈'],
        emojiSize: 50,
        confettiNumber: 100
    });
}

// 开始动画时间线
function startTimeline() {
    // 初始化所有动画
    animateCake();
    initFireworks();
    createBalloons();
    initConfetti();

    // 显示模态框
    showModal('生日快乐！🎉', 3000);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initTyped();
});