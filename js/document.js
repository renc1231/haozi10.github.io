document.addEventListener('DOMContentLoaded', function() {
    const photoItems = document.querySelectorAll('.fullscreen-photo-item');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    // 初始化显示第一张图片
    showPhoto(0);
    
    // 显示指定索引的图片
    function showPhoto(index) {
        // 隐藏所有图片
        photoItems.forEach(item => {
            item.style.display = 'none';
        });
        
        // 显示当前索引的图片
        photoItems[index].style.display = 'flex';
        
        // 更新指示器状态
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }
    
    // 上一张图片
    prevBtn.addEventListener('click', function() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = photoItems.length - 1;
        showPhoto(newIndex);
    });
    
    // 下一张图片
    nextBtn.addEventListener('click', function() {
        let newIndex = currentIndex + 1;
        if (newIndex >= photoItems.length) newIndex = 0;
        showPhoto(newIndex);
    });
    
    // 点击指示器切换图片
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            showPhoto(index);
        });
    });
    
    // 键盘导航
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });
});