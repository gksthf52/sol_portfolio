import { gsap } from "gsap";
import { EASE, DURATION } from "../constants/animation.js";

// 텍스트 순차적으로 올라오는 애니메이션
export const staggerAni = ({
  item = ".stagger",
  start = "top bottom",
  end = "center top",
} = {}) => {
  const staggers = document.querySelectorAll(item);

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
          start,
          end,
          // markers: true,
        },
      });
    });
  }
};

export const staggerSideAni = () => {
  const items = document.querySelectorAll(".stagger-side li");

  items.forEach((item) => {
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
