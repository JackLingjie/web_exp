// 气球类
class Balloon {
    constructor(container) {
        this.container = container;
        this.element = document.createElement('div');
        this.element.className = 'balloon';
        this.init();
    }

    init() {
        // 随机颜色
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeead'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        this.element.style.backgroundColor = color;

        // 随机位置和大小
        const size = 30 + Math.random() * 20;
        this.element.style.width = `${size}px`;
        this.element.style.height = `${size * 1.2}px`;

        // 随机起始位置
        const startX = Math.random() * window.innerWidth;
        this.element.style.left = `${startX}px`;
        this.element.style.bottom = '-50px';

        // 添加到容器
        this.container.appendChild(this.element);

        // 开始动画
        this.animate();
    }

    animate() {
        // 随机上升速度和摆动幅度
        const speed = 1 + Math.random() * 2;
        const swing = 50 + Math.random() * 50;
        let position = -50;
        let swingOffset = 0;

        const animate = () => {
            position += speed;
            swingOffset = Math.sin(position / 30) * swing;

            this.element.style.transform = `translateX(${swingOffset}px) translateY(${-position}px)`;

            // 如果气球飞出屏幕，移除它
            if (position > window.innerHeight + 100) {
                this.element.remove();
                return;
            }

            requestAnimationFrame(animate);
        };

        animate();
    }
}

// 气球管理器
class BalloonManager {
    constructor(container) {
        this.container = container;
        this.balloons = [];
        this.isActive = false;
    }

    start() {
        if (this.isActive) return;
        this.isActive = true;
        this.createBalloon();
    }

    stop() {
        this.isActive = false;
    }

    createBalloon() {
        if (!this.isActive) return;

        const balloon = new Balloon(this.container);
        this.balloons.push(balloon);

        // 随机间隔创建下一个气球
        const delay = 500 + Math.random() * 1000;
        setTimeout(() => this.createBalloon(), delay);
    }

    clear() {
        this.stop();
        this.balloons.forEach(balloon => {
            if (balloon.element) {
                balloon.element.remove();
            }
        });
        this.balloons = [];
    }
}

// 初始化气球
function initBalloons() {
    const container = document.getElementById('balloonsContainer');
    const manager = new BalloonManager(container);
    return manager;
} 