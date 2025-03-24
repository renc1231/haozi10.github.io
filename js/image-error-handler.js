/**
 * 图片错误处理脚本
 * 为网站上的所有图片添加错误处理，在图片加载失败时显示占位图
 */

document.addEventListener('DOMContentLoaded', function() {
    // 为所有图片添加错误处理
    const images = document.querySelectorAll('img');
    
    images.forEach(function(img) {
        // 只为没有设置onerror处理程序的图片添加
        if (!img.hasAttribute('onerror')) {
            img.onerror = function() {
                console.error('图片加载失败:', this.src);
                this.onerror = null; // 防止无限循环
                
                // 创建SVG占位图
                const placeholderSvg = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22 viewBox=%220 0 800 600%22%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22%23f0f0f0%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-family=%22Arial%22 font-size=%2224%22 text-anchor=%22middle%22 fill=%22%23666%22%3E' + (this.alt || '图片加载失败') + '%3C/text%3E%3Ctext x=%2250%25%22 y=%2255%25%22 font-family=%22Arial%22 font-size=%2218%22 text-anchor=%22middle%22 fill=%22%23999%22%3EImage Not Found%3C/text%3E%3C/svg%3E';
                
                this.src = placeholderSvg;
            };
        }
    });
});