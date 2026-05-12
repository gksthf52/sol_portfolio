import Lenis from "@studio-freight/lenis";

const initLenis = () => {
  const lenis = new Lenis({
    duration: 1,
    lerp: 0.1,
    smoothWheel: true,
    // smoothTouch: false,
  });

  const raf = (time) => {
    lenis.raf(time);

    requestAnimationFrame(raf);
  };

  requestAnimationFrame(raf);
};

export default initLenis;
