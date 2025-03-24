document.addEventListener('DOMContentLoaded', function() {
    // 创建背景容器
    const backgroundContainer = document.createElement('div');
    backgroundContainer.className = 'animated-background';
    document.body.prepend(backgroundContainer);
    
    // 创建渐变背景
    const gradientBg = document.createElement('div');
    gradientBg.className = 'gradient-bg';
    backgroundContainer.appendChild(gradientBg);
    
    // 创建连接线画布
    const connectionCanvas = document.createElement('canvas');
    connectionCanvas.className = 'connection-lines';
    backgroundContainer.appendChild(connectionCanvas);
    
    // 设置画布大小
    const ctx = connectionCanvas.getContext('2d');
    resizeCanvas();
    
    // 创建粒子 - 精心控制数量和质量
    const particles = [];
    const particleCount = 10; // 减少粒子数量，提升界面简洁度
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(backgroundContainer, particles);
    }
    
    // 动画循环
    animateParticles(particles, ctx);
    
    // 窗口大小改变时重设画布大小
    window.addEventListener('resize', resizeCanvas);
    
    function resizeCanvas() {
        connectionCanvas.width = window.innerWidth;
        connectionCanvas.height = window.innerHeight;
    }
});

function createParticle(container, particles) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // 随机大小，更精致的粒子
    const size = Math.random() * 2.5 + 0.8;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // 随机位置
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    // 随机透明度，更加精致柔和
    const opacity = Math.random() * 0.15 + 0.02;
    particle.style.opacity = opacity;
    
    // 添加到容器
    container.appendChild(particle);
    
    // 存储粒子数据，进一步降低速度，使动画更加优雅
    particles.push({
        element: particle,
        x: x,
        y: y,
        size: size,
        speedX: Math.random() * 0.08 - 0.04, // 更加优雅缓慢的移动
        speedY: Math.random() * 0.08 - 0.04  // 更加优雅缓慢的移动
    });
}

function animateParticles(particles, ctx) {
    function animate() {
        // 清除画布
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        
        // 更新粒子位置
        particles.forEach(particle => {
            // 移动粒子
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // 边界检查
            if (particle.x < 0 || particle.x > window.innerWidth) {
                particle.speedX *= -1;
            }
            if (particle.y < 0 || particle.y > window.innerHeight) {
                particle.speedY *= -1;
            }
            
            // 更新DOM元素位置
            particle.element.style.left = `${particle.x}px`;
            particle.element.style.top = `${particle.y}px`;
        });
        
        // 绘制连接线
        drawConnections(particles, ctx);
        
        // 继续动画
        requestAnimationFrame(animate);
    }
    
    animate();
}

function drawConnections(particles, ctx) {
    // 使用更淡的蓝色
    ctx.strokeStyle = 'rgba(120, 170, 255, 0.08)';
    ctx.lineWidth = 0.2; // 更细的线条
    
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // 增加连线距离，但大幅降低密度
            if (distance < 150 && Math.random() > 0.85) {
                // 距离越远，线条越透明
                const opacity = 1 - distance / 150;
                ctx.strokeStyle = `rgba(120, 170, 255, ${opacity * 0.08})`;
                
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}