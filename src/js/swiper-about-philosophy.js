import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";

const formatSlideNumber = (number) => String(number).padStart(2, "0");
const paginationElements = {
  currentSlide: document.querySelector(".js-about-philosophy-current-slide"),
  totalSlides: document.querySelector(".js-about-philosophy-total-slides"),
  progressbar: document.querySelector(".js-about-philosophy-progressbar"),
};

const swiperProgressbarChangeSlide = (swiper) => {
  const totalSlides = swiper.slides.length - swiper.loopedSlides * 2;
  const {
    currentSlide,
    totalSlides: totalSlidesEl,
    progressbar,
  } = paginationElements;

  if (!totalSlides || !currentSlide || !totalSlidesEl || !progressbar) {
    return;
  }

  const currentSlideIndex = swiper.realIndex + 1;

  currentSlide.textContent = formatSlideNumber(currentSlideIndex);
  totalSlidesEl.textContent = formatSlideNumber(totalSlides);
  progressbar.style.width = `${(currentSlideIndex / totalSlides) * 100}%`;
};

const swiperProgressbarInit = (swiper) => swiperProgressbarChangeSlide(swiper);

const aboutPhilosophySwiperEl = document.querySelector(
  ".about-philosophy__swiper",
);

if (aboutPhilosophySwiperEl) {
  new Swiper(aboutPhilosophySwiperEl, {
    modules: [Navigation],
    loop: true,
    grabCursor: true,
    speed: 800,
    spaceBetween: 12,
    slidesPerView: 1.2,
    navigation: {
      nextEl: ".about-philosophy__pagination .swiper-navigation__arrow_right",
      prevEl: ".about-philosophy__pagination .swiper-navigation__arrow_left",
    },
    on: {
      init: swiperProgressbarInit,
      slideChange: swiperProgressbarChangeSlide,
    },
  });
}
