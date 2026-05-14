import { gsap } from "gsap";
import { EASE, DURATION } from "../constants/animation.js";
import { staggerSideAni } from "../animations/contentStagger.js";

const worksHoverAction = () => {
  const worksContent = document.querySelectorAll(".works_list li");

  if (!worksContent.length) return; // 요소 없으면 종료

  worksContent.forEach((content) => {
    const img = content.querySelector("img");
    const dim = content.querySelector(".dim");
    const dimBox = content.querySelector(".dim_box");

    // hover in
    content.addEventListener("mouseenter", () => {
      // li
      gsap.to(content, {
        scale: 0.98,
        ease: EASE.out3,
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
      // li > dimBox
      gsap.to(dimBox, {
        opacity: 1,
      });
    });

    // hover out
    content.addEventListener("mouseleave", () => {
      // li
      gsap.to(content, {
        scale: 1,
        ease: EASE.out3,
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
      // li > dimBox
      gsap.to(dimBox, {
        opacity: 0,
      });
    });
  });
};

export const initWorkSection = () => {
  staggerSideAni();
  worksHoverAction();
};
