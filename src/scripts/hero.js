import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DURATION } from "../constants/gsap.js";

gsap.registerPlugin(ScrollTrigger);

// header
const HeaderTextAni = () => {
  const headerContent = document.querySelectorAll(".header");

  if (headerContent) {
    gsap.set(headerContent, { y: -30, opacity: 0 });
    gsap.to(headerContent, {
      y: 0,
      opacity: 1,
      ease: EASE.in4,
      duration: DURATION.text,
    });
  }
};

// hero bottom text
const BottomTextAni = () => {
  const headerContent = document.querySelectorAll(".bottom_text");

  if (headerContent) {
    gsap.set(headerContent, { y: 30, opacity: 0 });
    gsap.to(headerContent, {
      y: 0,
      opacity: 1,
      ease: EASE.in4,
      duration: DURATION.text,
    });
  }
};

// hero
const heroTextAni = () => {
  const HeroFadeList = document.querySelectorAll("#hero .fade-list");

  if (HeroFadeList) {
    HeroFadeList.forEach((item, index) => {
      const fadeItem = item.querySelectorAll(".fade-item");
      const setY = window.innerWidth > 768 ? 180 : 90;

      gsap.set(fadeItem, { y: setY, opacity: 0.2 });
      gsap.to(fadeItem, {
        y: 0,
        opacity: 1,
        ease: EASE.expoout,
        duration: DURATION.heroText,
        stagger: DURATION.stagger,
        delay: DURATION.delay3,
      });
    });
  }
};

// header util flip
const initCardFlip = () => {
  document.querySelectorAll(".card").forEach((card) => {
    const inner = card.querySelector(".card_inner");
    let isFlipped = false;

    card.addEventListener("mouseenter", () => {
      gsap.to(inner, {
        rotateY: 180,
        duration: DURATION.flip,
        ease: EASE.inout2,
      });
      isFlipped = true;
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(inner, {
        rotateY: 0,
        duration: DURATION.flip,
        ease: EASE.inout2,
      });
      isFlipped = false;
    });
  });
};

export function initHeader() {
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
}

// 메인 진입 애니메이션
export function showHero() {
  window.scrollTo(0, 0);

  heroTextAni();
  HeaderTextAni();
  BottomTextAni();

  initCardFlip();

  // initHeader();
}
