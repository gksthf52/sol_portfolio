import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const worksHoverAction = () => {
  const worksContent = document.querySelectorAll(".works_list li");
  const dim = document.querySelectorAll(".works_list .dim");

  if (!worksContent.length) return; // 요소 없으면 종료

  worksContent.forEach((content) => {
    const img = content.querySelector("img");
    const dim = content.querySelector(".dim");

    content.addEventListener("mouseenter", () => {
      gsap.set(dim, {
        opacity: 1,
        background: "transparent",
      });
      gsap.to(content, {
        scale: 0.99,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(img, {
        filter: "blur(2px)",
      });

      gsap.to(dim, {
        opacity: 0.5,
        duration: 0.3,
        background: " #00000086",
      });
    });

    content.addEventListener("mouseleave", () => {
      gsap.to(content, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(img, {
        filter: "blur(0px)",
      });

      gsap.to(dim, {
        opacity: 1,
        duration: 0.3,
        background: "transparent",
      });
    });
  });
};
