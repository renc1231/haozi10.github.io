/**
 * 修复头像图片加载问题
 * 这个脚本专门用于处理首页头像图片的加载问题
 */

document.addEventListener('DOMContentLoaded', function() {
    // 获取头像图片元素
    const avatarImage = document.querySelector('.avatar-image');
    
    if (avatarImage) {
        // 检查图片是否已经加载
        if (avatarImage.complete) {
            if (avatarImage.naturalWidth === 0) {
                // 图片已完成加载但宽度为0，说明加载失败
                applyFallbackImage(avatarImage);
            }
        } else {
            // 图片尚未加载完成，添加加载事件监听器
            avatarImage.addEventListener('load', function() {
                console.log('头像图片加载成功');
            });
            
            // 添加错误处理
            avatarImage.addEventListener('error', function() {
                console.error('头像图片加载失败:', this.src);
                applyFallbackImage(this);
            });
        }
    }
    
    // 应用备用图像的函数
    function applyFallbackImage(imgElement) {
        // 尝试使用其他可用的图片作为备用
        const fallbackImages = [
            'images/geren.jpg',
            'images/portrait11.jpg',
            'images/portrait12.jpg'
        ];
        
        // 随机选择一个备用图片
        const randomIndex = Math.floor(Math.random() * fallbackImages.length);
        const fallbackSrc = fallbackImages[randomIndex];
        
        console.log('使用备用图片:', fallbackSrc);
        imgElement.src = fallbackSrc;
        
        // 如果备用图片也加载失败，使用SVG占位图
        imgElement.onerror = function() {
            console.error('备用图片也加载失败:', this.src);
            this.onerror = null; // 防止无限循环
            
            // 创建SVG占位图
            const placeholderSvg = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22 viewBox=%220 0 200 200%22%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22%23f0f0f0%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-family=%22Arial%22 font-size=%2216%22 text-anchor=%22middle%22 fill=%22%23999%22%3E' + (this.alt || '图片加载失败') + '%3C/text%3E%3C/svg%3E';
            
            this.src = placeholderSvg;
        };
    }
});