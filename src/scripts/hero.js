import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DURATION } from "../constants/gsap.js";

gsap.registerPlugin(ScrollTrigger);

/**
 * =========================
 * GSAP Animation
 * =========================
 */

// hero 메인 텍스트 순차적으로 올라오는 애니메이션
const animateHeroText = () => {
  ScrollTrigger.matchMedia({
    "(min-width: 769px)": () => valueY(180),
    "(max-width: 768px)": () => valueY(90),
  });

  function valueY(y) {
    gsap.from("#hero .fade-item", {
      y: y,
      opacity: 0.2,
      ease: EASE.expoout,
      duration: DURATION.heroText,
      stagger: DURATION.stagger,
      delay: DURATION.delay3,
    });
  }
};

// hero 상단 애니메이션 (header)
const animateHeader = () => {
  gsap.from(".header", {
    y: -30,
    opacity: 0,
    ease: EASE.in4,
    duration: DURATION.text,
  });
};

// hero 하단 애니메이션 (text)
const animateBottomText = () => {
  gsap.from(".bottom_text", {
    y: 30,
    opacity: 0,
    ease: EASE.in4,
    duration: DURATION.text,
  });
};

/**
 * =========================
 * Interaction
 * =========================
 */

// 카드 플립
const flipAnimation = (el, rotateY) => {
  gsap.to(el, {
    rotateY: rotateY,
    duration: DURATION.flip,
    ease: EASE.inout2,
  });
};
const CardFlip = (cardSelector, innerSelector) => {
  document.querySelectorAll(cardSelector).forEach((card) => {
    const inner = card.querySelector(innerSelector);

    card.addEventListener("mouseenter", () => flipAnimation(inner, 180));
    card.addEventListener("mouseleave", () => flipAnimation(inner, 0));
  });
};

// 스크롤에 따른 header 노출/숨김
const initHeaderScroll = () => {
  const header = document.querySelector(".header");
  if (!header) return; // 헤더 체크

  let lastScrollY = 0;
  let isHidden = false;
  let ticking = false; //스크롤 이벤트 최적화

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const scrollDiff = currentScrollY - lastScrollY;

    // 너무 작은 움직임은 무시
    if (Math.abs(scrollDiff) < 5) return;

    const shouldHide = scrollDiff > 0 && currentScrollY > 50;

    // 상태가 바뀔 때만 실행
    if (shouldHide !== isHidden) {
      isHidden = shouldHide;

      gsap.to(header, {
        y: isHidden ? "-100%" : "0%",
        opacity: isHidden ? 0 : 1,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
};

// 메인 진입 애니메이션
export const initHeroSection = () => {
  animateHeroText();
  animateHeader();
  animateBottomText();

  CardFlip(".card", ".card_inner");
  initHeaderScroll();
};
