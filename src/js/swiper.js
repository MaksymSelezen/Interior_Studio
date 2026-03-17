import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";

const formatSlideNumber = (value) => String(value).padStart(2, "0");

const heroWideImageWidthPoints = [
  [375, 316],
  [768, 656],
  [1024, 863],
  [1440, 1227],
  [1920, 1636],
];

const interpolateWidth = (viewportWidth) => {
  if (viewportWidth <= heroWideImageWidthPoints[0][0]) {
    return (
      (heroWideImageWidthPoints[0][1] / heroWideImageWidthPoints[0][0]) *
      viewportWidth
    );
  }

  for (let index = 0; index < heroWideImageWidthPoints.length - 1; index += 1) {
    const [startViewport, startWidth] = heroWideImageWidthPoints[index];
    const [endViewport, endWidth] = heroWideImageWidthPoints[index + 1];

    if (viewportWidth <= endViewport) {
      const progress =
        (viewportWidth - startViewport) / (endViewport - startViewport);

      return startWidth + (endWidth - startWidth) * progress;
    }
  }

  const [lastViewport, lastWidth] =
    heroWideImageWidthPoints[heroWideImageWidthPoints.length - 1];

  return (lastWidth / lastViewport) * viewportWidth;
};

const getHeroSlidesPerView = () => {
  const viewportWidth = window.innerWidth;
  const wideImageWidth = interpolateWidth(viewportWidth);

  return viewportWidth / wideImageWidth;
};

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
    slidesPerView: getHeroSlidesPerView(),
    navigation: {
      prevEl: ".js-hero-prev",
      nextEl: ".js-hero-next",
    },
    on: {
      init(swiper) {
        updatePagination(swiper, paginationElements);
      },
      resize(swiper) {
        swiper.params.slidesPerView = getHeroSlidesPerView();
        swiper.update();
      },
      slideChange(swiper) {
        updatePagination(swiper, paginationElements);
      },
    },
  });

  return heroSwiper;
};

initHeroSwiper();
