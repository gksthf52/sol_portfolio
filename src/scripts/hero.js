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
// 메인 진입 애니메이션
export function showWrap() {
  heroTextAni();
  HeaderTextAni();
  BottomTextAni();
}
