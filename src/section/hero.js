import { gsap } from "gsap";

import { EASE, DURATION } from "../constants/animation.js";
import { animateFadeText } from "../animations/textStagger.js";

// hero 하단 애니메이션 (text)
const animateBottomText = () => {
  gsap.from(".bottom_text", {
    y: 30,
    opacity: 0,
    ease: EASE.in4,
    duration: DURATION.text,
  });
};

// 메인 진입 애니메이션
export const initHeroSection = () => {
  animateFadeText({ stagger: DURATION.stagger });
  animateBottomText();
};
