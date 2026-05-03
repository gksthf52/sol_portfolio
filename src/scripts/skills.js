import Swiper from "swiper";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // ← 추가
import "swiper/css";

gsap.registerPlugin(ScrollTrigger); // ← 추가

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

export function initLogoStretch() {
  const logoWrap = document.querySelector(".logo-instance");
  const svg = document.querySelector(".footer_logo_stretch");
  const textEl = svg?.querySelector("text");

  if (!logoWrap || !svg || !textEl) return;

  function updateViewBox() {
    const bbox = textEl.getBBox();
    if (!bbox.width || !bbox.height) return;

    // const padding = 50; // 좌우 여백
    // 화면 너비에 따라 padding 동적 계산
    // const padding = window.innerWidth * 0.07; // 화면 너비의 3%

    let padding;

    if (window.innerWidth < 480) {
      padding = window.innerWidth * 0.18; // 모바일
      console.log("모바일");
    } else if (window.innerWidth < 768) {
      padding = window.innerWidth * 0.1; // 태블릿
      console.log("태블릿");
    } else if (window.innerWidth < 1024) {
      padding = window.innerWidth * 0.08; // 데스크탑
      console.log("데스크탑");
    } else {
      padding = window.innerWidth * 0.03; // 데스크탑
      console.log("wide");
    }

    svg.setAttribute(
      "viewBox",
      `${bbox.x - padding} ${bbox.y} ${bbox.width + padding * 2} ${bbox.height}`,
    );
  }

  // 초기 viewBox 임시값 먼저 세팅
  svg.setAttribute("viewBox", "0 0 800 100");
  // 초기 viewBox 임시값 반응형으로
  // function getInitialViewBox() {
  //   if (window.innerWidth < 480) {
  //     return "0 0 400 100"; // 모바일
  //   } else if (window.innerWidth < 768) {
  //     return "0 0 600 100"; // 태블릿
  //   } else {
  //     return "0 0 800 100"; // 데스크탑
  //   }
  // }

  // svg.setAttribute("viewBox", getInitialViewBox());

  // 폰트 로딩 후 정확한 값으로 업데이트
  document.fonts.ready.then(() => {
    updateViewBox();
  });

  window.addEventListener("resize", updateViewBox);
  gsap.set(logoWrap, { height: "0px" });

  gsap.to(logoWrap, {
    scrollTrigger: {
      trigger: ".footer_top", // ← 텍스트 영역 기준
      start: "bottom bottom", // ← 텍스트 영역 상단이 화면 하단에 닿을 때
      end: "bottom top", // ← 텍스트 영역 상단이 화면 30% 위치에 올 때
      scrub: true,
      // markers: true,
    },
    height: window.innerWidth * 0.3,
  });
}
