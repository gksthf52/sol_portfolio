import { playIntro } from "./intro.js";
import { showHero } from "./hero.js";
import { careerHoverAction, staggerAni, staggerSideAni } from "./career.js";

async function loadData() {
  const MIN_TIME = 300;
  const images = Array.from(document.images);
  const delay = new Promise((res) => setTimeout(res, MIN_TIME));
  const preload = Promise.all(
    images.map((img) => {
      if (img.complete) return Promise.resolve();

      return new Promise((res) => {
        img.onload = img.onerror = res;
      });
    }),
  );

  await Promise.all([delay, preload]);
}

export async function init() {
  // intro
  // const intro = playIntro();
  // const data = loadData();
  // await Promise.all([intro, data]);

  // hero
  showHero();
  // career
  careerHoverAction();
  staggerAni();
  staggerSideAni();
}
