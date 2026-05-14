import { gsap } from "gsap";

// 페이지 나갈 때
export const pageLeave = () => {
  return new Promise((resolve) => {
    const wrap = document.querySelector(".wrap");
    const pageT = document.querySelector(".page_transition");

    gsap.set(wrap, { y: 0, opacity: 1, scale: 1 });
    gsap.to(wrap, {
      x: 700,
      y: "-30%",
      rotate: 20,
      scale: 1.5,
      duration: 1.4,
      ease: "power2.in",
      onComplete: () => resolve(),
    });

    gsap.to(pageT, {
      x: "-5%",
      y: "100%",
      rotate: 30,
      duration: 1.6,
      delay: 0.2,
      ease: "power2.in",
      onComplete: () => resolve(),
    });
  });
};

export const initPageTransition = () => {
  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");

    // 외부 링크, 해시 링크 제외
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("http") ||
      href.startsWith("mailto") ||
      href.startsWith("tel")
    )
      return;

    link.addEventListener("click", async (e) => {
      e.preventDefault();

      await pageLeave(); // 전환 애니메이션
      window.location.href = href; // 페이지 이동
    });
  });
};
