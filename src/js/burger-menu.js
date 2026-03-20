import { lock, unlock } from "./scrollLock";

const burgerBtn = document.querySelector(".header__menu-toggle");
const burgerMenu = document.getElementById("burger-menu");
const burgerScrollable = burgerMenu?.querySelector(
  ".js-scroll-lock-scrollable",
);

const langWrap = burgerMenu?.querySelector(".burger-menu__lang");
const langToggle = langWrap?.querySelector(".js-lang-toggle");
const langOptionsWrap = langWrap?.querySelector(".burger-menu__lang-menu");

function openMenu() {
  if (!burgerMenu || !burgerScrollable) return;

  burgerScrollable.scrollTop = 0;
  burgerMenu.classList.add("is-open");
  lock(burgerScrollable);
}

function closeMenu() {
  if (!burgerMenu) return;

  burgerMenu.classList.remove("is-open");
  langWrap?.classList.remove("is-open");
  unlock(burgerScrollable);
}

function selectLanguage(option) {
  if (!langWrap || !langToggle) return;

  langWrap.querySelectorAll(".js-lang-option").forEach((item) => {
    item.classList.toggle("is-active", item === option);
  });

  langToggle.textContent = option.textContent.trim();
  langWrap.classList.remove("is-open");
}

burgerBtn?.addEventListener("click", () => {
  if (!burgerMenu) return;

  burgerMenu.classList.contains("is-open") ? closeMenu() : openMenu();
});

burgerMenu?.addEventListener("click", (event) => {
  if (event.target.closest(".js-burger-close, .js-burger-link")) {
    closeMenu();
    return;
  }

  const option = event.target.closest(".js-lang-option");

  if (option) {
    selectLanguage(option);
  }
});

langToggle?.addEventListener("click", () => {
  if (!langOptionsWrap) return;

  langWrap?.classList.toggle("is-open");
});

document.addEventListener("click", (event) => {
  if (!langWrap?.contains(event.target)) {
    langWrap?.classList.remove("is-open");
  }
});
