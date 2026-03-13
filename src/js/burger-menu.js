import { lock, unlock } from "./scrollLock";

const burgerBtn = document.querySelector(".header__menu-toggle");
const burgerMenu = document.querySelector("#burger-menu");
const burgerCloseItems = document.querySelectorAll(".js-burger-close");
const burgerScrollable = burgerMenu?.querySelector(
  ".js-scroll-lock-scrollable",
);

const langWrap = document.querySelector(".burger-menu__lang");
const langToggle = langWrap?.querySelector(".js-lang-toggle");
const langOptionsWrap = langWrap?.querySelector(".burger-menu__lang-menu");
const langOptions = langWrap?.querySelectorAll(".js-lang-option");

function openMenu() {
  burgerMenu.classList.add("is-open");
  lock(burgerScrollable);
}

function closeMenu() {
  burgerMenu.classList.remove("is-open");
  unlock(burgerScrollable);
}

function selectLanguage(lang) {
  const activeOption = langWrap.querySelector(
    `.js-lang-option[data-lang="${lang}"]`,
  );
  if (!activeOption) return;

  langOptions.forEach((option) => option.classList.remove("is-active"));
  activeOption.classList.add("is-active");
  langToggle.textContent = activeOption.textContent.trim();
  langWrap.classList.remove("is-open");
}

if (burgerBtn && burgerMenu) {
  burgerBtn.addEventListener("click", () => {
    const isOpen = burgerMenu.classList.contains("is-open");
    if (isOpen) closeMenu();
    else openMenu();
  });

  burgerCloseItems.forEach((item) => item.addEventListener("click", closeMenu));

  burgerMenu.addEventListener("click", (event) => {
    if (event.target.closest(".js-burger-link")) closeMenu();
  });
}

if (langWrap && langToggle && langOptionsWrap && langOptions?.length) {
  langToggle.addEventListener("click", () => {
    langWrap.classList.toggle("is-open");
  });

  langOptionsWrap.addEventListener("click", (event) => {
    const option = event.target.closest(".js-lang-option");
    if (!option) return;

    selectLanguage(option.dataset.lang);
  });

  document.addEventListener("click", (event) => {
    if (!langWrap.contains(event.target)) langWrap.classList.remove("is-open");
  });
}
