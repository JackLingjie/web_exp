// 检查是否支持减少动画
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 音频上下文
let audioContext;
const bgm = document.getElementById('bgm');
bgm.volume = 0.4;

// 初始化音频上下文
function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    bgm.play().catch(error => {
        console.log('Audio playback failed:', error);
        // 显示提示信息
        Swal.fire({
            title: '提示',
            text: '请点击页面任意位置以启用音频',
            icon: 'info',
            confirmButtonText: '知道了',
            confirmButtonColor: '#ff80bf'
        });
    });
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
        }
    });
}

// 蛋糕动画
function animateCake() {
    const cake = document.querySelector('.cake-container');
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
    const canvas = document.getElementById('fireworks');
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
    const container = document.querySelector('.balloons-container');
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

        anime({
            targets: balloon,
            translateY: -window.innerHeight - 100,
            duration: 10000 + Math.random() * 5000,
            easing: 'linear',
            complete: () => balloon.remove()
        });
    }
}

// 彩带效果
function initConfetti() {
    const jsConfetti = new JSConfetti();
    const cake = document.querySelector('.cake');

    cake.addEventListener('click', () => {
        jsConfetti.addConfetti({
            emojis: ['🎂', '🎉', '🎁', '🎈', '✨'],
            emojiSize: 50,
            confettiNumber: 100
        });

        // 添加点击反馈动画
        anime({
            targets: cake,
            scale: [1, 1.1, 1],
            duration: 500,
            easing: 'easeInOutQuad'
        });
    });
}

// 动画时间线
function startTimeline() {
    if (prefersReducedMotion) {
        document.querySelector('.typed-text').textContent = '生日快乐！';
        return;
    }

    // 初始化动画
    animateCake();
    initFireworks();
    createBalloons();
    initConfetti();

    // 添加结束按钮
    const button = document.createElement('button');
    button.textContent = '再次祝她生日快乐！';
    button.className = 'cta-button';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.left = '50%';
    button.style.transform = 'translateX(-50%)';
    button.style.zIndex = '100';
    button.onclick = () => {
        // 添加过渡动画
        const transition = document.createElement('div');
        transition.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--c-bg-1);
            opacity: 0;
            transition: opacity 0.5s ease;
            z-index: 1000;
        `;
        document.body.appendChild(transition);

        // 触发过渡动画
        requestAnimationFrame(() => {
            transition.style.opacity = '1';
            setTimeout(() => {
                location.href = 'index.html';
            }, 500);
        });
    };
    document.body.appendChild(button);
}

// 页面加载完成后开始
document.addEventListener('DOMContentLoaded', () => {
    showModals();
    initTyped();
});