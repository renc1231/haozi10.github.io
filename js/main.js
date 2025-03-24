// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 在这里添加您的 JavaScript 代码
    console.log('网页已加载完成');
});

// 示例：简单的返回顶部功能
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
} 