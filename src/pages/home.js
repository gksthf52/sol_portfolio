import "../styles/pages/home.scss";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import initLenis from "../lib/lenis.js";

import { loadData } from "../util/load.js";
import { playIntro } from "../section/intro.js";
import { initHeader } from "../components/header.js";
import { initHeroSection } from "../section/hero.js";
import { initCareerSection } from "../section/career.js";
import { initWorkSection } from "../section/work.js";
import { initSkillsSection } from "../section/skills.js";
import { initFooterSection } from "../components/footer.js";

import { initPageTransition } from "../animations/initPageTransition.js";

gsap.registerPlugin(ScrollTrigger);

const initHome = async () => {
  //  인트로 + 데이터 로딩 병렬 실행
  const introPromise = playIntro();
  const dataPromise = loadData();

  await Promise.all([introPromise, dataPromise]);

  // 깜빡이 현상 대비
  document.querySelector(".wrap").style.visibility = "visible";

  initLenis();
  initPageTransition();

  initHeader();
  initHeroSection();
  initCareerSection();
  initWorkSection();
  initSkillsSection();
  initFooterSection();

  // ScrollTrigger 위치 재계산
  ScrollTrigger.refresh();
};

window.addEventListener("pageshow", () => {
  if (event.persisted) {
    document.body.style.opacity = "0";

    window.location.reload();
  }
});

initHome();
