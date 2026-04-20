import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  // 섹션 공통 페이드인
  gsap.utils.toArray(".fade-up").forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      },
      y: 50,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });
  });
}

export function playIntro() {
  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: () => {
        // intro 제거 (선택)
        // const intro = document.getElementById("intro");
        // intro?.remove();
        resolve();
      },
    });

    // 초기 상태
    tl.set(".text_box span.name", { opacity: 0, y: "-100%" });
    tl.set(".text_box span.pf", { opacity: 0, y: "100%" });
    tl.set(".dot", { opacity: 0 });

    // 1. 텍스트 순차 등장
    tl.to(".text_box span.name", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    // // 1. 텍스트 순차 등장
    tl.to(".text_box span.pf", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    // // 2. 점 등장
    tl.to(".dot", {
      opacity: 1,
      duration: 0.8,
      ease: "back.out(3)",
    });

    // // 3. 점 확장 (핵심)
    tl.to(".dot", {
      scale: 700,
      duration: 0.8,
      transformOrigin: "60% 68%",
      ease: "power4.in",
    });

    // 4. 배경 전환 느낌
    // tl.to(
    //   "#intro",
    //   {
    //     backgroundColor: "#fff",
    //     duration: 0.3,
    //   },
    //   "-=0.4",
    // );

    // 5. intro fade out
    // tl.to("#intro", {
    //   opacity: 0,
    //   duration: 0.4,
    // });
  });
}

export function showWrap() {
  const wrap = document.getElementById("wrap");

  gsap.to(wrap, {
    opacity: 1,
    visibility: "visible",
    y: 0,
    duration: 0.6,
    ease: "power2.out",
  });
}
