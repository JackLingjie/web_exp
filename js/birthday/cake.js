// 蛋糕动画初始化
function cakeInit() {
    const cake = document.querySelector('.cake');
    const layers = document.querySelectorAll('.layer');
    const candle = document.querySelector('.candle');
    const flame = document.querySelector('.flame');

    // 设置初始状态
    cake.style.opacity = '0';
    layers.forEach(layer => layer.style.transform = 'translateX(-50%) translateY(100px)');
    candle.style.opacity = '0';
    flame.style.opacity = '0';

    // 创建动画时间线
    const timeline = anime.timeline({
        easing: 'easeOutElastic(1, .5)'
    });

    // 蛋糕淡入
    timeline.add({
        targets: cake,
        opacity: [0, 1],
        duration: 1000
    });

    // 蛋糕层依次出现
    layers.forEach((layer, index) => {
        timeline.add({
            targets: layer,
            translateY: [100, 0],
            duration: 1000,
            delay: index * 200
        }, '-=800');
    });

    // 蜡烛和火焰出现
    timeline.add({
        targets: [candle, flame],
        opacity: [0, 1],
        duration: 500
    }, '-=500');

    // 火焰闪烁动画
    anime({
        targets: flame,
        scale: [0.8, 1.2],
        opacity: [0.8, 1],
        duration: 1000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
    });
} 