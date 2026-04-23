import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DURATION } from "../constants/gsap.js";

gsap.registerPlugin(ScrollTrigger);

// hero
const HeroTextAni = () => {
  const HeroFadeList = document.querySelectorAll("#hero .fade-list");

  if (HeroFadeList) {
    HeroFadeList.forEach((item, index) => {
      const fadeItem = item.querySelectorAll(".fade-item");
      const setY = window.innerWidth > 768 ? 180 : 90;

      gsap.set(fadeItem, { y: setY, opacity: 0.2 });
      gsap.to(fadeItem, {
        y: 0,
        opacity: 1,
        ease: EASE.in1,
        duration: 0.8,
        stagger: 0.04,
        delay: DURATION.delay,
      });
    });
  }
};

// header
const HeaderTextAni = () => {
  const headerContent = document.querySelectorAll(".header");

  if (headerContent) {
    gsap.set(headerContent, { y: -30, opacity: 0 });
    gsap.to(headerContent, {
      y: 0,
      opacity: 1,
      ease: EASE.in4,
      duration: 0.4,
      delay: DURATION.delay,
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
      duration: 0.4,
      delay: DURATION.delay,
    });
  }
};

// 메인 진입 애니메이션
export function showWrap() {
  HeroTextAni();
  HeaderTextAni();
  BottomTextAni();
}
