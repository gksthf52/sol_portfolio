import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DURATION } from "../constants/animation.js";

// 텍스트 순차적으로 올라오는 애니메이션
export const animateFadeText = ({
  selector = "#hero .fade-item",
  yDesktopSize = 180,
  yMobileSize = 90,
  opacity = 0.2,
  ease = EASE.expoout,
  duration = DURATION.heroText,
  stagger,
  delay = DURATION.delay3,
} = {}) => {
  ScrollTrigger.matchMedia({
    "(min-width: 769px)": () => animate(yDesktopSize),
    "(max-width: 768px)": () => animate(yMobileSize),
  });

  function animate(y) {
    gsap.from(selector, {
      y,
      opacity,
      ease,
      duration,
      stagger,
      delay,
    });
  }
};
