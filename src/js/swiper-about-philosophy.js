import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";

const formatSlideNumber = (number) => String(number).padStart(2, "0");

const sectionEl = document.querySelector(".about-philosophy");

if (sectionEl) {
  const swiperEl = sectionEl.querySelector(".about-philosophy__swiper");

  if (swiperEl) {
    const currentSlideEl = sectionEl.querySelector(
      ".js-about-philosophy-current-slide",
    );
    const totalSlidesEl = sectionEl.querySelector(
      ".js-about-philosophy-total-slides",
    );
    const progressbarEl = sectionEl.querySelector(
      ".js-about-philosophy-progressbar",
    );
    const totalSlides = swiperEl.querySelectorAll(".swiper-slide").length;

    const updatePagination = (swiper) => {
      if (!totalSlides || !currentSlideEl || !totalSlidesEl || !progressbarEl) {
        return;
      }

      const currentSlide = swiper.realIndex + 1;

      currentSlideEl.textContent = formatSlideNumber(currentSlide);
      totalSlidesEl.textContent = formatSlideNumber(totalSlides);
      progressbarEl.style.width = `${(currentSlide / totalSlides) * 100}%`;
    };

    new Swiper(swiperEl, {
      modules: [Navigation],
      loop: true,
      grabCursor: true,
      speed: 800,
      spaceBetween: 12,
      slidesPerView: 1.19,
      navigation: {
        nextEl: ".about-philosophy__arrow--next",
        prevEl: ".about-philosophy__arrow--prev",
      },
      on: {
        init: updatePagination,
        slideChange: updatePagination,
      },
    });
  }
}
