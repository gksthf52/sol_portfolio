import { gsap } from "gsap";

export const resetPageTransition = () => {
  const wrap = document.querySelector(".wrap");
  const pageT = document.querySelector(".page_transition");

  // GSAP inline style 제거
  gsap.set([wrap, pageT], {
    clearProps: "all",
  });

  // 안전하게 transform 강제 초기화
  if (pageT) {
    pageT.style.transform = "";
  }

  if (wrap) {
    wrap.style.transform = "";
    wrap.style.opacity = "";
  }
};

// 페이지 나갈 때
export const pageLeave = () => {
  // 페이지 이동 직전에 기록
  sessionStorage.setItem("fromSubPage", "true");

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
  // 최초 진입
  resetPageTransition();

  // 뒤로가기 복원 대응
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      resetPageTransition();
    }
  });

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
