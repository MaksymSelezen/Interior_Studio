import Swiper from "swiper";
import "swiper/css";

const latestSliderSelector = ".js-blog-post-latest-swiper";
const mobileMedia = window.matchMedia("(max-width: 767.98px)");

let latestSwiper = null;

const initLatestSwiper = () => {
  const latestSlider = document.querySelector(latestSliderSelector);

  if (!latestSlider) return;

  if (mobileMedia.matches && !latestSwiper) {
    latestSwiper = new Swiper(latestSlider, {
      slidesPerView: "auto",
      spaceBetween: 26,
      speed: 500,
      grabCursor: true,
      watchOverflow: true,
    });
  }

  if (!mobileMedia.matches && latestSwiper) {
    latestSwiper.destroy(true, true);
    latestSwiper = null;
  }
};

initLatestSwiper();
mobileMedia.addEventListener("change", initLatestSwiper);
