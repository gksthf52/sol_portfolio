import { gsap } from "gsap";

import { EASE, DURATION } from "../constants/animation.js";

// 페이지 진입 시 header 노출 (위 -> 아래)
const animateHeader = () => {
  gsap.from(".header", {
    y: -30,
    opacity: 0,
    ease: EASE.in4,
    duration: DURATION.text,
  });
};

// 카드 플립 애니메이션
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

export const initHeader = () => {
  animateHeader();
  initHeaderScroll();
  CardFlip(".card", ".card_inner");
};
