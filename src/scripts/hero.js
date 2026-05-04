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

const initHeaderScroll = () => {
  const header = document.querySelector(".header");
  let lastScrollY = 0;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      // 아래로 스크롤 → 헤더 숨김
      gsap.to(header, {
        y: "-70",
        duration: 0.2,
        ease: "power2.inOut",
      });
    } else {
      // 위로 스크롤 → 헤더 노출
      gsap.to(header, {
        y: 0,
        duration: 0.2,
        ease: "power2.inOut",
      });
    }

    lastScrollY = currentScrollY;
  });
};

// 메인 진입 애니메이션
export const initHeroSection = () => {
  animateHeroText();
  animateHeader();
  animateBottomText();

  CardFlip(".card", ".card_inner");
  // initHeaderScroll();
};
