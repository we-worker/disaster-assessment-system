// 暗黑模式切换功能
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;
    
    // 检查系统偏好
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 检查本地存储
    const savedTheme = localStorage.getItem('theme');
    
    // 设置初始主题
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }
    
    // 切换主题
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            if (htmlElement.classList.contains('dark')) {
                htmlElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else {
                htmlElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
    
    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                htmlElement.classList.add('dark');
            } else {
                htmlElement.classList.remove('dark');
            }
        }
    });
});