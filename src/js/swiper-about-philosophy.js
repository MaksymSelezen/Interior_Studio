import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";

const formatSlideNumber = (value) => String(value).padStart(2, "0");

const getAboutPhilosophyElements = (root) => ({
  current: root?.querySelector(".js-about-philosophy-current"),
  total: root?.querySelector(".js-about-philosophy-total"),
  progress: root?.querySelector(".js-about-philosophy-progress"),
});

const updateAboutPhilosophyPagination = (swiper, elements) => {
  const totalSlides = swiper.slides.filter(
    (slide) => !slide.classList.contains("swiper-slide-duplicate"),
  ).length;

  if (
    !totalSlides ||
    !elements.current ||
    !elements.total ||
    !elements.progress
  ) {
    return;
  }

  const currentSlide = swiper.realIndex + 1;

  elements.current.textContent = formatSlideNumber(currentSlide);
  elements.total.textContent = formatSlideNumber(totalSlides);
  elements.progress.style.width = `${(currentSlide / totalSlides) * 100}%`;
};

const initAboutPhilosophySwiper = () => {
  const philosophySlider = document.querySelector(
    ".js-about-philosophy-swiper",
  );

  if (!philosophySlider) {
    return;
  }

  const paginationRoot = document.querySelector(
    ".js-about-philosophy-pagination",
  );
  const paginationElements = getAboutPhilosophyElements(paginationRoot);

  return new Swiper(philosophySlider, {
    loop: true,
    modules: [Navigation],
    speed: 650,
    grabCursor: true,
    slidesPerView: "auto",
    spaceBetween: 12,
    navigation: {
      prevEl: ".js-about-philosophy-prev",
      nextEl: ".js-about-philosophy-next",
    },
    on: {
      init(swiper) {
        updateAboutPhilosophyPagination(swiper, paginationElements);
      },
      slideChange(swiper) {
        updateAboutPhilosophyPagination(swiper, paginationElements);
      },
    },
  });
};

initAboutPhilosophySwiper();
