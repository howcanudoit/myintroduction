/* ==========================================================================
   个人主页 · 公共脚本
   --------------------------------------------------------------------------
   功能：
   1. 移动端汉堡菜单的开合
   2. 区块进入视口时的淡入动画（IntersectionObserver，性能友好）
   ========================================================================== */

/* ---------- 1. 移动端汉堡菜单 ---------- */
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    // 切换 .open 类：由 CSS 过渡实现平滑滑出/收起动画
    navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", navLinks.classList.contains("open"));
  });

  // 点击任意导航项后自动收起菜单（移动端体验更顺滑）
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
    }
  });
}

/* ---------- 2. 区块淡入动画 ---------- */
const fadeEls = document.querySelectorAll(".fade-in");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // 元素进入视口后添加 .visible 触发过渡，并停止观察以节省开销
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  fadeEls.forEach((el) => observer.observe(el));
} else {
  // 老浏览器兜底：直接全部显示
  fadeEls.forEach((el) => el.classList.add("visible"));
}
