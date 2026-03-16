import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";

const formatSlideNumber = (value) => String(value).padStart(2, "0");

const getHeroElements = (root) => ({
  current: root?.querySelector(".js-hero-current"),
  total: root?.querySelector(".js-hero-total"),
  progress: root?.querySelector(".js-hero-progress"),
});

const updatePagination = (swiper, elements) => {
  const totalSlides = swiper.slides.filter(
    (slide) => !slide.classList.contains("swiper-slide-duplicate"),
  ).length;

  if (
    !totalSlides ||
    !elements.current ||
    !elements.total ||
    !elements.progress
  )
    return;

  const currentSlide = swiper.realIndex + 1;

  elements.current.textContent = formatSlideNumber(currentSlide);
  elements.total.textContent = formatSlideNumber(totalSlides);
  elements.progress.style.width = `${(currentSlide / totalSlides) * 100}%`;
};

const initHeroSwiper = () => {
  const heroSlider = document.querySelector(".js-hero-swiper");

  if (!heroSlider) return;

  const paginationRoot = document.querySelector(".js-hero-pagination");
  const paginationElements = getHeroElements(paginationRoot);

  const heroSwiper = new Swiper(heroSlider, {
    modules: [Navigation],
    loop: true,
    grabCursor: true,
    speed: 800,
    spaceBetween: 0,
    slidesPerView: 1.16,
    navigation: {
      prevEl: ".js-hero-prev",
      nextEl: ".js-hero-next",
    },
    breakpoints: {
      768: {
        slidesPerView: 1.17,
      },
      1024: {
        slidesPerView: 1.18,
      },
      1440: {
        slidesPerView: 1.175,
      },
    },
    on: {
      init(swiper) {
        updatePagination(swiper, paginationElements);
      },
      slideChange(swiper) {
        updatePagination(swiper, paginationElements);
      },
    },
  });

  return heroSwiper;
};

initHeroSwiper();
