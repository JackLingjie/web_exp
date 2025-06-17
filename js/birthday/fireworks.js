// 烟花动画类
class Firework {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.hue = Math.random() * 360;
    }

    // 初始化烟花
    init(x, y) {
        const particleCount = 100;
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 2 + Math.random() * 2;
            const particle = {
                x,
                y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                alpha: 1,
                color: `hsl(${this.hue}, 50%, 50%)`
            };
            this.particles.push(particle);
        }
    }

    // 更新烟花状态
    update() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // 重力
            p.alpha -= 0.01;

            if (p.alpha <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    // 绘制烟花
    draw() {
        this.ctx.globalCompositeOperation = 'lighter';
        for (const p of this.particles) {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.alpha;
            this.ctx.fill();
        }
    }
}

// 烟花管理器
class FireworksManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.fireworks = [];
        this.lastTime = 0;
        this.init();
    }

    init() {
        // 设置画布大小
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // 开始动画循环
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // 创建新烟花
    createFirework(x, y) {
        const firework = new Firework(this.canvas);
        firework.init(x, y);
        this.fireworks.push(firework);
    }

    // 随机创建烟花
    createRandomFirework() {
        const x = Math.random() * this.canvas.width;
        const y = Math.random() * this.canvas.height * 0.5;
        this.createFirework(x, y);
    }

    // 动画循环
    animate(currentTime = 0) {
        requestAnimationFrame((time) => this.animate(time));

        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // 清除画布
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 更新和绘制所有烟花
        for (let i = this.fireworks.length - 1; i >= 0; i--) {
            const firework = this.fireworks[i];
            firework.update();
            firework.draw();

            if (firework.particles.length === 0) {
                this.fireworks.splice(i, 1);
            }
        }

        // 随机创建新烟花
        if (Math.random() < 0.05) {
            this.createRandomFirework();
        }
    }
}

// 初始化烟花
function initFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    const manager = new FireworksManager(canvas);

    // 点击创建烟花
    canvas.addEventListener('click', (e) => {
        manager.createFirework(e.clientX, e.clientY);
    });

    return manager;
} 