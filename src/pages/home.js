import "../styles/pages/home.scss";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import { loadData } from "../util/load.js";
import { playIntro } from "../section/intro.js";
import { initHeader } from "../components/header.js";
import { initHeroSection } from "../section/hero.js";
import { initCareerSection } from "../section/career.js";
import { initWorkSection } from "../section/work.js";
import { initSkillsSection } from "../section/skills.js";
import { initFooterSection } from "../components/footer.js";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const initHome = async () => {
  //  인트로 + 데이터 로딩 병렬 실행
  // const introPromise = playIntro();
  // const dataPromise = loadData();

  // await Promise.all([introPromise, dataPromise]);

  // ScrollSmoother 먼저
  // ScrollSmoother.create({
  //   wrapper: "#smooth-wrapper",
  //   content: "#smooth-content",
  //   smooth: 5,
  //   effects: true,
  // });
  // console.log(ScrollSmoother.get());

  ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 5,
    effects: true,
  });

  gsap.ticker.add(() => {
    // console.log(gsap.getProperty("#smooth-content", "y"));
  });

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
