import "../styles/pages/about.scss";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import initLenis from "../lib/lenis.js";

import { initHeader } from "../components/header.js";
import { initFooterSection } from "../components/footer.js";

import { DURATION } from "../constants/animation.js";
import { animateFadeText } from "../animations/textStagger.js";
import { staggerAni } from "../animations/contentStagger.js";

gsap.registerPlugin(ScrollTrigger);

const initAbout = async () => {
  document.documentElement.style.visibility = "visible";

  initLenis();

  staggerAni();

  initHeader();
  initFooterSection();

  animateFadeText({ stagger: DURATION.stagger });

  // ScrollTrigger 위치 재계산
  ScrollTrigger.refresh();
};

initAbout();
