import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { EASE, DURATION } from "../constants/gsap.js";

gsap.registerPlugin(ScrollTrigger);

export const careerHoverAction = () => {
  const careerList = document.querySelectorAll(".career_item");

  careerList.forEach((career) => {
    if (career) {
      career.addEventListener("mouseenter", () => {
        career.classList.add("is-active");
      });
      career.addEventListener("mouseleave", () => {
        career.classList.remove("is-active");
      });
    }
  });
};

export const staggerAni = () => {
  const staggers = document.querySelectorAll(".stagger");

  if (staggers) {
    staggers.forEach((stagger) => {
      const staggerItems = stagger.querySelectorAll(".stagger-item");
      const setY = window.innerWidth > 768 ? 50 : 30;

      gsap.set(staggerItems, { y: setY, opacity: 0 });

      gsap.to(staggerItems, {
        y: 0,
        opacity: 1,
        stagger: DURATION.careerTextStagger,
        duration: DURATION.careerText,
        ease: EASE.inout1,
        scrollTrigger: {
          trigger: stagger,
          start: "top 100%",
          end: "center top",
          // markers: true,
        },
      });
    });
  }
};

export const staggerSideAni = () => {
  const items = document.querySelectorAll(".stagger-side li");

  items.forEach((item, index) => {
    const isLeft = item.classList.contains("left");
    const setX = window.innerWidth > 768 ? 150 : 20;
    const setY = window.innerWidth > 768 ? 100 : 50;
    const rotateZ = window.innerWidth > 768 ? 10 : 15;

    gsap.set(item, {
      x: isLeft ? -setX : setX,
      y: setY,
      rotateZ: isLeft ? -rotateZ : rotateZ,
      opacity: 0,
    });

    gsap.to(item, {
      x: 0,
      y: 0,
      rotateZ: 0,
      opacity: 1,
      duration: DURATION.workImgAni,
      ease: EASE.out3,
      scrollTrigger: {
        trigger: item, // ⭐ 핵심 (각각 트리거)
        start: "top 80%",
        // markers: true,
      },
    });
  });
};
