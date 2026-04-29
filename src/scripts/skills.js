import Swiper from "swiper";
import { gsap } from "gsap";
import "swiper/css";

export function initSkillsSwiper() {
  const swiperEl = document.querySelector(".skills_swiper");
  const wrapper = document.querySelector(".skills_swiper .swiper-wrapper");

  // 슬라이드 복제
  const slides = wrapper.querySelectorAll(".swiper-slide");
  slides.forEach((slide) => {
    const clone = slide.cloneNode(true);
    wrapper.appendChild(clone);
  });

  const swiper = new Swiper(".skills_swiper", {
    slidesPerView: 13,
    spaceBetween: 30,
    loop: true,
    allowTouchMove: false,
  });

  const slideWidth = swiper.slides[0].offsetWidth + 30;
  const totalWidth = slideWidth * slides.length; // 원본 슬라이드 총 너비

  // GSAP 으로 무한 흐르게
  const ticker = gsap.to(wrapper, {
    x: `-=${totalWidth}`,
    duration: 30,
    ease: "none",
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize((x) => parseFloat(x) % -totalWidth),
    },
  });

  // 호버 시 멈춤
  swiperEl.addEventListener("mouseenter", () => {
    ticker.pause(); // ← 즉시 멈춤
  });

  swiperEl.addEventListener("mouseleave", () => {
    ticker.resume(); // ← 즉시 재시작
  });
}
