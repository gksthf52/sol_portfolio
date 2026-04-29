// css import
import "./styles/main.scss";

// js import
import { init } from "./scripts/load.js";

document.addEventListener("DOMContentLoaded", () => {
  init();
});

// 섹션 공통 페이드인
// export function initAnimations() {
//   gsap.utils.toArray(".fade-up").forEach((el) => {
//     gsap.from(el, {
//       scrollTrigger: {
//         trigger: el,
//         start: "top 85%",
//       },
//       y: 50,
//       opacity: 0,
//       duration: 0.9,
//       ease: "power3.out",
//     });
//   });
// }
