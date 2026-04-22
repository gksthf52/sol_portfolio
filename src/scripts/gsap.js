import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE = {
  out1: "power1.out",
  out2: "power2.out",
  out3: "power3.out",
  out4: "power4.out",
  in1: "power1.in",
  in2: "power2.in",
  in3: "power3.in",
  in4: "power4.in",
};

const DURATION = {
  text: 0.6,
  delay: 0.2,
  scale: 0.8,
};

// 섹션 공통 페이드인
export function initAnimations() {
  gsap.utils.toArray(".fade-up").forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      },
      y: 50,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });
  });
}
// dot 위치 기준 transformOrigin 동적 계산
function getDotTransformOrigin() {
  const dot = document.querySelector(".dot");
  const rect = dot.getBoundingClientRect();
  const dotCenterX = rect.left + rect.width / 2;
  const dotCenterY = rect.top + rect.height / 2;

  console.log(dotCenterX, dotCenterY);

  const x = ((dotCenterX / window.innerWidth) * 100).toFixed(1);
  const y = ((dotCenterY / window.innerHeight) * 100).toFixed(1);

  return `${x}% ${y}%`;
}
// dot scale 동적 계산 (화면 꽉 채우기)
function getDotScale() {
  const dot = document.querySelector(".dot");
  if (!dot) return 300;

  const rect = dot.getBoundingClientRect();
  const dotRadius = rect.width / 2;

  // transformOrigin 기준점 좌표
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  // 네 모서리까지 거리 전부 계산 → 가장 먼 거리 기준
  const distances = [
    Math.sqrt(originX ** 2 + originY ** 2), // 좌상단
    Math.sqrt((window.innerWidth - originX) ** 2 + originY ** 2), // 우상단
    Math.sqrt(originX ** 2 + (window.innerHeight - originY) ** 2), // 좌하단
    Math.sqrt(
      (window.innerWidth - originX) ** 2 + (window.innerHeight - originY) ** 2,
    ), // 우하단
  ];

  const maxDistance = Math.max(...distances);
  const scale = Math.ceil((maxDistance / dotRadius) * 1.2);

  console.log("scale:", scale);

  return scale;
}
// 인트로 애니메이션
export function playIntro() {
  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: () => {
        // intro 제거 (선택)
        const intro = document.getElementById("intro");
        intro?.remove();
        resolve();
      },
    });

    // 초기 상태
    tl.set(".text_box span.name", { opacity: 0, y: "-100%" });
    tl.set(".text_box span.pf", { opacity: 0, y: "100%" });
    tl.set(".dot", { opacity: 0 });

    // 1. Hansol 텍스트 등장
    tl.to(".text_box span.name", {
      opacity: 1,
      y: 0,
      duration: DURATION.text,
      ease: EASE.out1,
    });

    // // 2. Portfolio 텍스트 등장
    tl.to(".text_box span.pf", {
      opacity: 1,
      y: 0,
      duration: DURATION.text,
      ease: EASE.out1,
      delay: DURATION.delay,
    });

    // // 3. dot 등장
    tl.to(".dot", {
      opacity: 1,
      duration: DURATION.text,
      ease: EASE.out1,
      delay: DURATION.delay,
    });

    // // 4. dot 확장
    tl.to(".dot", {
      scale: getDotScale,
      transformOrigin: getDotTransformOrigin,
      duration: DURATION.scale,
      ease: EASE.in4,
      delay: DURATION.delay,
    });
  });
}

// 메인 진입 애니메이션
export function showWrap() {
  const wrap = document.getElementById("wrap");

  gsap.to(wrap, {
    opacity: 1,
    visibility: "visible",
    y: 0,
    ease: EASE.in4,
    // duration: 0,
    // delay: 0,
  });

  HeroTextAni();
  HeaderTextAni();
  BottomTextAni();
}

// hero
const HeroTextAni = () => {
  const HeroFadeList = document.querySelectorAll("#hero .fade-list");

  if (HeroFadeList) {
    HeroFadeList.forEach((item, index) => {
      const fadeItem = item.querySelectorAll(".fade-item");
      const setY = window.innerWidth > 768 ? 180 : 90;

      gsap.set(fadeItem, { y: setY, opacity: 0.2 });
      gsap.to(fadeItem, {
        y: 0,
        opacity: 1,
        ease: EASE.in1,
        duration: 0.8,
        stagger: 0.04,
        delay: DURATION.delay,
      });
    });
  }
};

// header
const HeaderTextAni = () => {
  const headerContent = document.querySelectorAll(".header");

  if (headerContent) {
    gsap.set(headerContent, { y: -30, opacity: 0 });
    gsap.to(headerContent, {
      y: 0,
      opacity: 1,
      ease: EASE.in2,
      duration: 0.4,
      delay: DURATION.delay,
    });
  }
};

// hero bottom text
const BottomTextAni = () => {
  const headerContent = document.querySelectorAll(".bottom_text");

  if (headerContent) {
    gsap.set(headerContent, { y: 30, opacity: 0 });
    gsap.to(headerContent, {
      y: 0,
      opacity: 1,
      ease: EASE.in2,
      duration: 0.4,
      delay: DURATION.delay,
    });
  }
};
