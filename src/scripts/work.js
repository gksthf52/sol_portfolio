import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DURATION } from "../constants/gsap.js";

gsap.registerPlugin(ScrollTrigger);

const worksHoverAction = () => {
  const worksContent = document.querySelectorAll(".works_list li");

  if (!worksContent.length) return; // 요소 없으면 종료

  worksContent.forEach((content) => {
    const img = content.querySelector("img");
    const dim = content.querySelector(".dim");

    // hover in
    content.addEventListener("mouseenter", () => {
      // li
      gsap.to(content, {
        scale: 0.98,
        // duration: DURATION.workHover,
        ease: EASE.out2,
      });
      // li > img
      gsap.to(img, {
        filter: "blur(3px)",
      });
      // li > dim
      gsap.to(dim, {
        opacity: 0.5,
        backgroundColor: " #00000086",
      });
    });

    // hover out
    content.addEventListener("mouseleave", () => {
      // li
      gsap.to(content, {
        scale: 1,
        // duration: DURATION.workHover,
        ease: EASE.out2,
      });
      // li > img
      gsap.to(img, {
        filter: "blur(0px)",
      });
      // li > dim
      gsap.to(dim, {
        opacity: 1,
        backgroundColor: "transparent",
      });
    });
  });
};

export const initWorkSection = () => {
  worksHoverAction();
};
