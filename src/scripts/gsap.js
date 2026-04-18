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
