import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";

const formatSlideNumber = (number) => String(number).padStart(2, "0");

const aboutPhilosophySwiperEl = document.querySelector(
  ".about-philosophy__swiper",
);
const currentSlideEl = document.querySelector(
  ".js-about-philosophy-current-slide",
);
const totalSlidesEl = document.querySelector(
  ".js-about-philosophy-total-slides",
);
const progressbarEl = document.querySelector(
  ".js-about-philosophy-progressbar",
);

if (aboutPhilosophySwiperEl) {
  const totalSlides =
    aboutPhilosophySwiperEl.querySelectorAll(".swiper-slide").length;

  const updatePagination = (swiper) => {
    if (!totalSlides || !currentSlideEl || !totalSlidesEl || !progressbarEl) {
      return;
    }

    const currentSlide = swiper.realIndex + 1;

    currentSlideEl.textContent = formatSlideNumber(currentSlide);
    totalSlidesEl.textContent = formatSlideNumber(totalSlides);
    progressbarEl.style.width = `${(currentSlide / totalSlides) * 100}%`;
  };

  new Swiper(aboutPhilosophySwiperEl, {
    modules: [Navigation],
    loop: true,
    grabCursor: true,
    speed: 800,
    spaceBetween: 12,
    slidesPerView: 1.19,
    centeredSlides: false,
    navigation: {
      nextEl: ".about-philosophy__pagination .swiper-navigation__arrow_right",
      prevEl: ".about-philosophy__pagination .swiper-navigation__arrow_left",
    },
    on: {
      init: updatePagination,
      slideChange: updatePagination,
    },
  });
}
