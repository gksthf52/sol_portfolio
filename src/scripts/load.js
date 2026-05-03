import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { playIntro } from "./intro.js";
import { initHeroSection } from "./hero.js";
import { initCareerSection } from "./career.js";
import { initWorkSection } from "./work.js";
import { initSkillsSection } from "./skills.js";
import { initFooterSection } from "./footer.js";

gsap.registerPlugin(ScrollTrigger);

/**
 * 이미지 + 최소 로딩 시간 보장
 */
const loadData = async () => {
  const MIN_TIME = 300;

  const delay = new Promise((res) => setTimeout(res, MIN_TIME));

  const images = [...document.images];

  const preload = Promise.all(
    images.map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise((res) => {
            img.onload = img.onerror = res;
          }),
    ),
  );

  await Promise.all([delay, preload]);
};

/**
 * 앱 초기화 (인트로 포함)
 */
export const initApp = async () => {
  //  1. 인트로 + 데이터 로딩 병렬 실행
  const introPromise = playIntro(); // 반드시 Promise 반환해야 함
  const dataPromise = loadData();

  await Promise.all([introPromise, dataPromise]);

  //  2. 스크롤 초기화 (혹시 중간에 움직였을 경우 대비)
  window.scrollTo(0, 0);

  //  3. 섹션 초기화
  initHeroSection();
  initCareerSection();
  initWorkSection();
  initSkillsSection();
  initFooterSection();

  //  4. ScrollTrigger 위치 재계산 (필수)
  ScrollTrigger.refresh();
};
