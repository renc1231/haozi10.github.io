document.addEventListener('DOMContentLoaded', function() {
    const photoItems = document.querySelectorAll('.fullscreen-photo-item');
    const photoWrappers = document.querySelectorAll('.fullscreen-photo-wrapper');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const pageDots = document.querySelectorAll('.page-dot');
    let currentIndex = 0;
    let isAnimating = false;
    let touchStartY = 0;
    let touchEndY = 0;
    
    // 初始化
    updateActivePhoto(0);
    createSideIndicators();
    addImageZoomFeature();
    preloadImages();
    
    // 创建侧边指示器
    function createSideIndicators() {
        const sideIndicatorsContainer = document.createElement('div');
        sideIndicatorsContainer.className = 'side-indicators';
        
        for (let i = 0; i < photoItems.length; i++) {
            const indicator = document.createElement('div');
            indicator.className = i === 0 ? 'side-indicator active' : 'side-indicator';
            indicator.dataset.index = i;
            indicator.addEventListener('click', function() {
                updateActivePhoto(parseInt(this.dataset.index));
            });
            sideIndicatorsContainer.appendChild(indicator);
        }
        
        document.querySelector('.fullscreen-gallery').appendChild(sideIndicatorsContainer);
    }
    
    // 预加载图片
    function preloadImages() {
        photoItems.forEach(item => {
            const img = item.querySelector('img');
            const loader = document.createElement('div');
            loader.className = 'photo-loader';
            item.appendChild(loader);
            
            if (img.complete) {
                item.classList.remove('loading');
            } else {
                item.classList.add('loading');
                img.onload = function() {
                    item.classList.remove('loading');
                };
            }
        });
    }
    
    // 添加图片缩放功能
    function addImageZoomFeature() {
        photoWrappers.forEach(wrapper => {
            const img = wrapper.querySelector('img');
            
            img.addEventListener('click', function() {
                wrapper.classList.toggle('zoomed');
                
                if (wrapper.classList.contains('zoomed')) {
                    // 禁用滑动导航
                    disableNavigation();
                } else {
                    // 启用滑动导航
                    enableNavigation();
                }
            });
        });
    }
    
    function disableNavigation() {
        document.removeEventListener('wheel', handleWheel);
        document.removeEventListener('keydown', handleKeyDown);
    }
    
    function enableNavigation() {
        document.addEventListener('wheel', handleWheel, {passive: true});
        document.addEventListener('keydown', handleKeyDown);
    }
    
    // 显示指定索引的图片
    function updateActivePhoto(index) {
        if (isAnimating) return;
        isAnimating = true;
        
        // 移除所有active类
        photoItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // 设置当前图片为active
        photoItems[index].classList.add('active');
        
        // 更新指示器状态
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        // 更新侧边指示器
        document.querySelectorAll('.side-indicator').forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
        
        // 动画完成后重置状态
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }
    
    // 事件处理函数
    function handleWheel(e) {
        if (e.deltaY > 0) {
            nextBtn.click();
        } else {
            prevBtn.click();
        }
    }
    
    function handleKeyDown(e) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            nextBtn.click();
        }
    }
    
    // 上一张图片
    prevBtn.addEventListener('click', function() {
        let newIndex = (currentIndex - 1 + photoItems.length) % photoItems.length;
        updateActivePhoto(newIndex);
    });
    
    // 下一张图片
    nextBtn.addEventListener('click', function() {
        let newIndex = (currentIndex + 1) % photoItems.length;
        updateActivePhoto(newIndex);
    });
    
    // 启用导航
    enableNavigation();
});