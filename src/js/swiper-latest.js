import Swiper from "swiper";
import "swiper/css";

const latestSliderSelector = ".js-blog-post-latest-swiper";

const initLatestSwiper = () => {
  const latestSlider = document.querySelector(latestSliderSelector);

  if (!latestSlider) return;

  const latestSwiper = new Swiper(latestSlider, {
    loop: true,
    speed: 500,
    grabCursor: true,
    watchOverflow: true,
    centeredSlides: false,
    slidesPerView: 1.2,
    spaceBetween: 26,
    breakpoints: {
      768: {
        slidesPerView: 1.8,
        spaceBetween: 20,
      },
    },
  });

  window.addEventListener("load", () => {
    latestSwiper.update();
  });

  return latestSwiper;
};

initLatestSwiper();
