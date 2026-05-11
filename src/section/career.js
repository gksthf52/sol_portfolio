import { staggerAni } from "../animations/contentStagger.js";

const careerHoverAction = () => {
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

// 메인 진입 애니메이션
export const initCareerSection = () => {
  careerHoverAction();
  staggerAni();
};
