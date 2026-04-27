import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

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
      const setY = window.innerHeight > 768 ? 50 : 30;

      gsap.set(staggerItems, { y: setY, opacity: 0 });

      gsap.to(staggerItems, {
        y: 0,
        stagger: 0.2,
        duration: 0.6,
        opacity: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: stagger,
          start: "top 80%",
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
    const setY = window.innerHeight > 768 ? 100 : 30;

    gsap.set(item, {
      x: isLeft ? -180 : 180,
      y: setY,
      opacity: 0,
      rotateZ: isLeft ? -15 : 15,
    });

    gsap.to(item, {
      x: 0,
      y: 0,
      rotateZ: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: item, // ⭐ 핵심 (각각 트리거)
        start: "top 80%",
        // markers: true,
      },
    });
  });
};
