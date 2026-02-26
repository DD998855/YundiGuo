// ========================================
// 自定义圆形鼠标光标（Cursor Follower）
// 使用 requestAnimationFrame + 缓动跟随
// ========================================

(function() {
    'use strict';
    
    // 检测是否为触屏设备
    const isTouchDevice = ('ontouchstart' in window) || 
                          (navigator.maxTouchPoints > 0) ||
                          window.matchMedia('(hover: none)').matches;
    
    // 触屏设备不运行
    if (isTouchDevice) {
        return;
    }
    
    // 获取光标元素
    const cursorDot = document.getElementById('cursor-dot');
    if (!cursorDot) {
        console.warn('cursor-dot element not found');
        return;
    }
    
    // 光标尺寸（需要与CSS保持一致）
    const DOT_SIZE = 22;
    const HALF_SIZE = DOT_SIZE / 2;
    
    // 鼠标位置变量
    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    
    // 缓动系数（0.12-0.25之间，越大越紧跟，越小越平滑）
    const LERP_FACTOR = 0.18;
    
    // 监听鼠标移动（使用 passive 提升性能）
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });
    
    // 使用 requestAnimationFrame 平滑更新光标位置
    function updateCursor() {
        // 缓动插值（lerp）
        currentX += (mouseX - currentX) * LERP_FACTOR;
        currentY += (mouseY - currentY) * LERP_FACTOR;
        
        // 保存当前位置到CSS变量（用于 scale 时保持位置）
        const finalX = currentX - HALF_SIZE;
        const finalY = currentY - HALF_SIZE;
        cursorDot.style.setProperty('--cx', `${finalX}px`);
        cursorDot.style.setProperty('--cy', `${finalY}px`);
        
        // 更新光标位置（只用 transform，性能最优）
        cursorDot.style.transform = `translate3d(${finalX}px, ${finalY}px, 0)`;
        
        requestAnimationFrame(updateCursor);
    }
    
    // 启动动画循环
    requestAnimationFrame(updateCursor);
    
    // ========== 交互效果：鼠标按下 ==========
    document.addEventListener('mousedown', function() {
        cursorDot.classList.add('is-down');
    });
    
    document.addEventListener('mouseup', function() {
        cursorDot.classList.remove('is-down');
    });
    
    // ========== 交互效果：hover 可点击元素 ==========
    // 使用事件委托，避免给每个元素单独绑定监听器
    const clickableSelectors = 'a, button, .btn, [role="button"], input[type="submit"], input[type="button"]';
    
    document.addEventListener('mouseover', function(e) {
        // 检查是否 hover 到可点击元素
        if (e.target.matches(clickableSelectors) || e.target.closest(clickableSelectors)) {
            cursorDot.classList.add('is-hover');
        }
    }, true);
    
    document.addEventListener('mouseout', function(e) {
        // 检查是否离开可点击元素
        if (e.target.matches(clickableSelectors) || e.target.closest(clickableSelectors)) {
            cursorDot.classList.remove('is-hover');
        }
    }, true);
    
    // ========== 页面失去焦点时隐藏光标 ==========
    document.addEventListener('mouseleave', function() {
        cursorDot.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', function() {
        cursorDot.style.opacity = '1';
    });
    
})();
