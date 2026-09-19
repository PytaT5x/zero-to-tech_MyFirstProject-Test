// main.js — 使用 Anime.js 为个人主页添加入场动画
// 采用模块化方式，导入 anime.js（通过全局变量 anime，因为 CDN 直接暴露了 anime）
// 但我们仍然使用 export 语法构建一个小模块

import { animate } from "animejs";


// 确保 anime 已加载（挂载在 window 上）
/* if (typeof anime === 'undefined') {
  console.error('Anime.js 未加载，请检查 CDN 链接。');
} else {
  console.log('Anime.js 已加载，版本:', anime.version);
} */

/**
 * 动画主入口：页面加载后执行一系列 Anime.js 动画
 */
function initProfileAnimations() {
  // 1. 获取需要动画的元素
  const profileCard = document.querySelector('.profile-card');
  const avatarWrapper = document.querySelector('.avatar-wrapper');
  const avatar = document.querySelector('.avatar');
  const name = document.querySelector('.name');
  const title = document.querySelector('.title');
  const socialLinks = document.querySelectorAll('.social-links li');
  const bio = document.querySelector('.bio');
  const contactBtn = document.querySelector('.contact-btn');

  // 确保卡片初始是透明（css 中已设置 opacity: 0，但以防万一）
  profileCard.style.opacity = '0';

  // 2. 构建动画序列 —— 使用 anime.timeline 按顺序展示
  const timeline = anime.timeline({
    easing: 'easeOutExpo',
    duration: 1000,
    // 动画完成后的回调，可留空
  });

  // 第一步：卡片整体淡入 + 轻微上浮
  timeline.add({
    targets: profileCard,
    opacity: [0, 1],
    translateY: [30, 0],
    scale: [0.98, 1],
    duration: 900,
    easing: 'easeOutCubic',
  });

  // 第二步：头像包装器弹出 + 旋转轻微 (同时进行)
  timeline.add({
    targets: avatarWrapper,
    scale: [0.7, 1],
    rotate: ['0deg', '0deg'],
    duration: 800,
    easing: 'easeOutBack',
  }, '-=500'); // 与上一步重叠 500ms

  // 第三步：头像本身稍微缩放 (细化)
  timeline.add({
    targets: avatar,
    scale: [0.9, 1],
    duration: 700,
    easing: 'easeOutQuad',
  }, '-=600');

  // 第四步：姓名和头衔依次淡入上移
  timeline.add({
    targets: [name, title],
    opacity: [0, 1],
    translateY: [18, 0],
    duration: 700,
    delay: anime.stagger(100), // 让姓名先动，头衔稍后
    easing: 'easeOutCubic',
  }, '-=400');

  // 第五步：社交按钮逐个弹入（stagger 效果）
  timeline.add({
    targets: socialLinks,
    opacity: [0, 1],
    translateY: [18, 0],
    scale: [0.9, 1],
    duration: 600,
    delay: anime.stagger(80),
    easing: 'easeOutBack',
  }, '-=300');

  // 第六步：自我介绍淡入
  timeline.add({
    targets: bio,
    opacity: [0, 1],
    translateY: [12, 0],
    duration: 700,
    easing: 'easeOutCubic',
  }, '-=200');

  // 第七步：联系按钮弹入 + 轻微脉动
  timeline.add({
    targets: contactBtn,
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 600,
    easing: 'easeOutBack',
  }, '-=400');

  // 第八步（可选）：头像持续微光或者小浮动（独立动画，不放在 timeline 里，但可以加个循环）
  // 让头像在入场后有一个持续的轻柔呼吸/浮动效果，更生动
  anime({
    targets: avatarWrapper,
    translateY: [0, -6],
    direction: 'alternate',
    loop: true,
    duration: 2200,
    easing: 'easeInOutSine',
    delay: 1200, // 等入场动画基本完成后再开始
  });

  // 额外趣味：社交按钮的悬浮动画（仅演示，不影响主流程）
  // 给联系按钮添加一个简单的脉冲动画（重复）
  anime({
    targets: contactBtn,
    boxShadow: [
      '0 12px 22px -8px rgba(15, 23, 42, 0.3)',
      '0 18px 28px -6px rgba(15, 23, 42, 0.5)'
    ],
    direction: 'alternate',
    loop: true,
    duration: 1800,
    easing: 'easeInOutSine',
    delay: 1500,
  });
}

/**
 * 辅助：点击联系按钮的小反馈（纯粹玩一下 anime）
 */
function setupContactButton() {
  const btn = document.getElementById('contactBtn');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    // 点击时播放一个快速缩放动画，覆盖原有效果
    anime({
      targets: btn,
      scale: [1, 1.12, 1],
      duration: 500,
      easing: 'easeOutElastic(1, .5)',
    });
    // 同时可以弹出一个简易提示（非动画，仅示意）
    // 或者临时改文本
    const originalText = btn.innerHTML;
    btn.innerHTML = '✨ 感谢联系！';
    setTimeout(() => {
      btn.innerHTML = originalText;
    }, 1200);
  });
}

// 页面加载完成后执行所有动画
window.addEventListener('DOMContentLoaded', () => {
  // 确保 anime 加载成功
  if (typeof anime !== 'undefined') {
    initProfileAnimations();
    setupContactButton();
  } else {
    // 如果 CDN 加载失败，至少让卡片可见（移除内联透明度）
    document.querySelector('.profile-card').style.opacity = '1';
    alert('Anime.js 加载失败，请检查网络或 CDN。');
  }
});

// 也可以导出一些函数（如果需要被其他模块使用，但这里不需要）
// export { initProfileAnimations, setupContactButton };