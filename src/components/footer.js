import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const initLogoStretch = () => {
  const logoWrap = document.querySelector(".logo-instance");
  const svg = document.querySelector(".footer_logo_stretch");
  const textEl = svg?.querySelector("text");

  if (!logoWrap || !svg || !textEl) return;

  const getPadding = () => {
    const w = window.innerWidth;
    if (w < 480) return w * 0.18;
    if (w < 768) return w * 0.1;
    if (w < 1024) return w * 0.08;
    return w * 0.03;
  };

  const getInitialViewBox = () => {
    const w = window.innerWidth;
    if (w < 480) return "0 0 400 100";
    if (w < 768) return "0 0 600 100";
    return "0 0 800 100";
  };

  const updateViewBox = () => {
    const bbox = textEl.getBBox();
    if (!bbox.width || !bbox.height) return;

    const padding = getPadding();

    svg.setAttribute(
      "viewBox",
      `${bbox.x - padding} ${bbox.y} ${bbox.width + padding * 2} ${bbox.height}`,
    );
  };

  svg.setAttribute("viewBox", getInitialViewBox());

  document.fonts.ready.then(() => {
    updateViewBox();
  });

  window.addEventListener("resize", () => {
    updateViewBox();
    ScrollTrigger.refresh();
  });

  gsap.set(logoWrap, { height: "0px" });

  gsap.to(logoWrap, {
    scrollTrigger: {
      trigger: ".footer_top",
      start: "top 80%",
      end: "bottom top",
      scrub: true,
      markers: true,
    },
    height: () => window.innerWidth * 0.4,
    ease: "none",
  });
};

export const initFooterSection = () => {
  initLogoStretch();
};
