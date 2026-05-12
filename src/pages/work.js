import "../styles/pages/work.scss";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import initLenis from "../lib/lenis.js";

import { DURATION } from "../constants/animation.js";

import { initHeader } from "../components/header.js";
import { animateFadeText } from "../animations/textStagger.js";
import { staggerAni } from "../animations/contentStagger.js";

gsap.registerPlugin(ScrollTrigger);

const initWork = async () => {
  initLenis();
  // init
  initHeader();
  staggerAni();
  staggerAni({
    item: ".stagger2",
    start: "25% 80%",
    end: "bottom top",
  });
  staggerAni({
    item: ".stagger3",
    start: "90% 80%",
    end: "bottom top",
  });

  // 프로젝트 타이틀 animation
  animateFadeText({
    selector: ".work_title .fade-item",
    duration: DURATION.detailDuration,
    stagger: DURATION.detailStagger,
    delay: DURATION.delay3,
  });

  // ScrollTrigger 위치 재계산
  ScrollTrigger.refresh();
};

initWork();
