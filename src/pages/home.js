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

gsap.registerPlugin(ScrollTrigger);

const initHome = async () => {
  //  인트로 + 데이터 로딩 병렬 실행
  // const introPromise = playIntro();
  // const dataPromise = loadData();

  // await Promise.all([introPromise, dataPromise]);

  initLenis();

  initHeader();
  initHeroSection();
  initCareerSection();
  initWorkSection();
  initSkillsSection();
  initFooterSection();

  // ScrollTrigger 위치 재계산
  ScrollTrigger.refresh();
};

initHome();
