// core version + navigation, pagination modules:
import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

import { gsap } from "gsap";
import "swiper/css";

let swiper = null;

function createSwiper(startTranslate = null) {
  if (swiper) {
    swiper.destroy(true, true);
  }

  swiper = new Swiper(".skills_swiper", {
    modules: [Autoplay],
    slidesPerView: 13,
    spaceBetween: 30,
    loop: true,
    speed: 2500,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    on: {
      init: (s) => {
        if (startTranslate !== null) {
          // 초기화 후 저장된 위치로 이동
          s.setTranslate(startTranslate);
        }
      },
    },
  });
}

export function initSkillsSwiper() {
  createSwiper();

  const swiperEl = document.querySelector(".skills_swiper");

  swiperEl.addEventListener("mouseenter", () => {
    swiper.autoplay.stop();
    swiper.setTranslate(swiper.getTranslate());
    swiper.setTransition(0);
  });

  swiperEl.addEventListener("mouseleave", () => {
    const currentTranslate = swiper.getTranslate(); // 현재 위치 저장
    createSwiper(currentTranslate); // 위치 전달하며 재시작
  });
}
