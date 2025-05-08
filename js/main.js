document.addEventListener('DOMContentLoaded', () => {
    // 初始化所有功能
    initHeaderScroll();
    initSmoothScroll();
    initFadeInAnimation();
    initLazyLoading();
    initMobileMenu();
    initScrollAnimation();
    loadTeamData();
    loadProjectData();
    initImageComparisonSliders();
    initImageCarousels(); // 新增图片轮播初始化
});

// 导航栏滚动效果
function initHeaderScroll() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
            
            // 滚动方向检测
            if (lastScrollY < window.scrollY) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
        } else {
            header.classList.remove('header-scrolled');
            header.classList.remove('header-hidden');
        }
        
        lastScrollY = window.scrollY;
    });
}

// 平滑滚动到锚点
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 内容区块淡入动画
function initFadeInAnimation() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}

// 图片懒加载
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                lazyImageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(image => {
        lazyImageObserver.observe(image);
    });
}

// 移动端菜单切换
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// 滚动动画
function initScrollAnimation() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.8) {
                element.classList.add('fade-in');
            }
        });
    }
    
    // 初始检查
    checkScroll();
    
    // 滚动时检查
    window.addEventListener('scroll', checkScroll);
}

// 填充团队成员数据
function loadTeamData() {
    if (typeof teamData !== 'undefined') {
        // 填充作者信息
        const authorTableBody = document.getElementById('authorTableBody');
        if (authorTableBody && teamData.authors) {
            teamData.authors.forEach(author => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="py-3 px-4 text-secondary-700 dark:text-secondary-300">${author.college}</td>
                    <td class="py-3 px-4 text-secondary-700 dark:text-secondary-300">${author.grade}</td>
                    <td class="py-3 px-4 text-secondary-700 dark:text-secondary-300">${author.studentId}</td>
                    <td class="py-3 px-4 text-secondary-700 dark:text-secondary-300">${author.phone}</td>
                `;
                authorTableBody.appendChild(row);
            });
        }
        
        // 填充教师信息
        const teacherTableBody = document.getElementById('teacherTableBody');
        if (teacherTableBody && teamData.teachers) {
            teamData.teachers.forEach(teacher => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="py-3 px-4 text-secondary-700 dark:text-secondary-300">${teacher.unit}</td>
                    <td class="py-3 px-4 text-secondary-700 dark:text-secondary-300">${teacher.title}</td>
                    <td class="py-3 px-4 text-secondary-700 dark:text-secondary-300">${teacher.phone}</td>
                `;
                teacherTableBody.appendChild(row);
            });
        }
    }
}

// 填充项目数据
function loadProjectData() {
    if (typeof projectData !== 'undefined') {
        // 填充合作项目
        const projectsList = document.getElementById('projectsList');
        if (projectsList && projectData.projects) {
            projectData.projects.forEach(project => {
                const li = document.createElement('li');
                li.className = 'flex items-start';
                li.innerHTML = `
                    <i class="fa-solid fa-circle-check text-primary-500 dark:text-primary-400 mt-1 mr-2"></i>
                    <span>${project}</span>
                `;
                projectsList.appendChild(li);
            });
        }
        
        // 填充专利与论文
        const patentsList = document.getElementById('patentsList');
        if (patentsList && projectData.patents) {
            projectData.patents.forEach(patent => {
                const li = document.createElement('li');
                li.className = 'flex items-start';
                li.innerHTML = `
                    <i class="fa-solid fa-file-shield text-primary-500 dark:text-primary-400 mt-1 mr-2"></i>
                    <span>${patent}</span>
                `;
                patentsList.appendChild(li);
            });
        }
        
        // 填充技术亮点
        const techHighlights = document.getElementById('techHighlights');
        if (techHighlights && projectData.highlights) {
            projectData.highlights.forEach((highlight, index) => {
                const div = document.createElement('div');
                // 为每个卡片应用不同的悬停效果
                const hoverClasses = ['card-hover', 'card-hover-rotate', 'card-hover-scale', 'card-hover-glow'];
                const hoverClass = hoverClasses[index % hoverClasses.length];
                
                div.className = `bg-white dark:bg-secondary-900 rounded-lg p-5 shadow-md border border-secondary-100 dark:border-secondary-700 ${hoverClass}`;
                div.innerHTML = `
                    <h4 class="text-lg font-semibold mb-2 text-secondary-900 dark:text-white">${highlight}</h4>
                `;
                techHighlights.appendChild(div);
            });
        }
    }
}

// 图片对比滑动功能
function initImageComparisonSliders() {
    const sliders = document.querySelectorAll('.image-comparison-slider');
    
    if (sliders.length === 0) {
        return;
    }
    
    sliders.forEach(slider => {
        const container = slider.querySelector('.image-comparison-container');
        const beforeImg = slider.querySelector('.image-comparison-before');
        const afterImg = slider.querySelector('.image-comparison-after');
        const handle = slider.querySelector('.image-comparison-slider-handle');
        
        if (!container || !beforeImg || !afterImg || !handle) {
            return;
        }
        
        let isDragging = false;
        
        // 确保图片加载完成后再初始化
        if (beforeImg.complete && afterImg.complete) {
            initializeSlider();
        } else {
            // 等待两张图片都加载完成
            let loadedCount = 0;
            const checkLoaded = () => {
                loadedCount++;
                if (loadedCount === 2) {
                    initializeSlider();
                }
            };
            
            if (!beforeImg.complete) {
                beforeImg.onload = checkLoaded;
            } else {
                loadedCount++;
            }
            
            if (!afterImg.complete) {
                afterImg.onload = checkLoaded;
            } else {
                loadedCount++;
            }
        }
        
        // 初始化滑块
        function initializeSlider() {
            // 设置容器尺寸
            const imgWidth = beforeImg.offsetWidth;
            const imgHeight = beforeImg.offsetHeight;
            
            container.style.width = `${imgWidth}px`;
            container.style.height = `${imgHeight}px`;
            
            // 设置初始位置为50%
            updateSliderPosition(50);
        }
        
        // 更新滑块位置的函数
        function updateSliderPosition(percentage) {
            // 限制百分比在0-100之间
            percentage = Math.max(0, Math.min(100, percentage));
            
            // 计算像素位置
            const containerWidth = container.offsetWidth;
            const position = (percentage / 100) * containerWidth;
            
            // 使用clip属性来控制图片显示区域
            beforeImg.style.clip = `rect(0px, ${position}px, ${container.offsetHeight}px, 0px)`;
            afterImg.style.clip = `rect(0px, ${containerWidth}px, ${container.offsetHeight}px, ${position}px)`;
            
            // 更新滑块位置
            handle.style.left = `${position}px`;
        }
        
        // 计算鼠标/触摸位置的百分比
        function getPercentage(event) {
            const rect = container.getBoundingClientRect();
            let clientX;
            
            // 处理触摸事件
            if (event.type.includes('touch')) {
                clientX = event.touches[0].clientX;
            } else {
                clientX = event.clientX;
            }
            
            const x = clientX - rect.left;
            return (x / rect.width) * 100;
        }
        
        // 鼠标/触摸事件处理
        function handleStart(event) {
            isDragging = true;
            container.classList.add('active');
            
            // 阻止默认行为，防止在移动设备上滚动页面
            event.preventDefault();
            
            // 立即更新位置
            updateSliderPosition(getPercentage(event));
        }
        
        function handleMove(event) {
            if (!isDragging) return;
            
            // 阻止默认行为，防止在移动设备上滚动页面
            event.preventDefault();
            
            // 更新位置
            updateSliderPosition(getPercentage(event));
        }
        
        function handleEnd() {
            isDragging = false;
            container.classList.remove('active');
        }
        
        // 添加事件监听器
        // 鼠标事件
        handle.addEventListener('mousedown', handleStart);
        container.addEventListener('mousedown', handleStart);
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleEnd);
        
        // 触摸事件（移动设备）
        handle.addEventListener('touchstart', handleStart);
        container.addEventListener('touchstart', handleStart);
        window.addEventListener('touchmove', handleMove);
        window.addEventListener('touchend', handleEnd);
        
        // 窗口大小改变时重新初始化
        window.addEventListener('resize', initializeSlider);
    });
}

// 图片轮播功能 - 修复版
function initImageCarousels() {
    const carousels = document.querySelectorAll('.image-carousel');
    
    carousels.forEach(carousel => {
        const container = carousel.querySelector('.carousel-container');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const indicators = carousel.querySelector('.carousel-indicators');
        
        if (!container || slides.length === 0) return;
        
        let currentIndex = 0;
        
        // 初始化：显示第一张幻灯片
        slides[0].classList.add('active');
        
        // 创建指示器
        if (indicators && slides.length > 1) {
            slides.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('carousel-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                indicators.appendChild(dot);
            });
        }
        
        // 更新当前幻灯片
        function updateCarousel() {
            // 更新幻灯片显示状态
            slides.forEach((slide, index) => {
                if (index === currentIndex) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
            
            // 更新指示器
            if (indicators) {
                const dots = indicators.querySelectorAll('.carousel-dot');
                dots.forEach((dot, index) => {
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        }
        
        // 切换到指定幻灯片
        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }
        
        // 下一张幻灯片
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        }
        
        // 上一张幻灯片
        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        }
        
        // 添加事件监听器
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        // 自动轮播（可选）
        if (carousel.dataset.autoplay === 'true') {
            const interval = parseInt(carousel.dataset.interval || '5000');
            setInterval(nextSlide, interval);
        }
        
        // 触摸滑动支持
        let touchStartX = 0;
        let touchEndX = 0;
        
        container.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        container.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) {
                nextSlide();
            } else if (touchEndX - touchStartX > 50) {
                prevSlide();
            }
        }, {passive: true});
    });
}