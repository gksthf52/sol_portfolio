import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DURATION } from "../constants/gsap.js";

gsap.registerPlugin(ScrollTrigger);

// dot 의 위치와 크기 정보를 반환
function getDotInfo() {
  const dot = document.querySelector(".dot");
  const rect = dot.getBoundingClientRect();
  const CenterX = rect.left + rect.width / 2;
  const CenterY = rect.top + rect.height / 2;
  const Radius = rect.width / 2;

  return { CenterX, CenterY, Radius };
}

// dot 위치 기준 transformOrigin 동적 계산
function getDotTransformOrigin(info) {
  const x = ((info.CenterX / window.innerWidth) * 100).toFixed(1);
  const y = ((info.CenterY / window.innerHeight) * 100).toFixed(1);

  return `${x}% ${y}%`;
}

// dot scale 동적 계산 (화면 꽉 채우기)
function getDotScale(info) {
  // 네 모서리까지 거리 전부 계산 → 가장 먼 거리 기준
  const distances = [
    Math.sqrt(info.CenterX ** 2 + info.CenterY ** 2),
    Math.sqrt((window.innerWidth - info.CenterX) ** 2 + info.CenterY ** 2),
    Math.sqrt(info.CenterX ** 2 + (window.innerHeight - info.CenterY) ** 2),
    Math.sqrt(
      (window.innerWidth - info.CenterX) ** 2 +
        (window.innerHeight - info.CenterY) ** 2,
    ),
  ];
  const scale = Math.ceil((Math.max(...distances) / info.Radius) * 1.2);

  return scale;
}

// 인트로 애니메이션
export function playIntro() {
  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: () => {
        // 인트로 제거
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
      ease: EASE.out1,
      duration: DURATION.introText,
    });

    // // 2. Portfolio 텍스트 등장
    tl.to(".text_box span.pf", {
      opacity: 1,
      y: 0,
      ease: EASE.out1,
      duration: DURATION.introText,
    });

    // // 3. dot 등장
    tl.to(".dot", {
      opacity: 1,
      ease: EASE.out1,
      duration: DURATION.introText,
    });

    // // 4. dot 확장
    tl.to(".dot", {
      scale: () => {
        const info = getDotInfo();
        if (!info) return 300;
        return getDotScale(info);
      },
      transformOrigin: () => {
        const info = getDotInfo();
        if (!info) return "60% 68%";
        return getDotTransformOrigin(info);
      },
      ease: EASE.in4,
      duration: DURATION.dotScale,
    });
  });
}
