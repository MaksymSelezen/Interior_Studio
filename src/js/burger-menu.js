const refs = {
  openBtn: document.querySelector(".header__menu-toggle"),
  menu: document.querySelector("#burger-menu"),
  closeEls: document.querySelectorAll(".js-burger-close"),
};

const body = document.body;

function openMenu() {
  if (!refs.menu || !refs.openBtn) return;
  refs.menu.classList.add("is-open");
  refs.openBtn.setAttribute("aria-expanded", "true");
  body.classList.add("page_lock");
}

function closeMenu() {
  if (!refs.menu || !refs.openBtn) return;
  refs.menu.classList.remove("is-open");
  refs.openBtn.setAttribute("aria-expanded", "false");
  body.classList.remove("page_lock");
}

function toggleMenu() {
  if (!refs.menu) return;

  if (refs.menu.classList.contains("is-open")) {
    closeMenu();
    return;
  }

  openMenu();
}

function onKeyDown(e) {
  if (e.key === "Escape") closeMenu();
}

function initBurgerMenu() {
  if (!refs.openBtn || !refs.menu) return;

  refs.openBtn.setAttribute("aria-expanded", "false");
  refs.openBtn.addEventListener("click", toggleMenu);

  refs.closeEls.forEach((el) => {
    el.addEventListener("click", closeMenu);
  });

  refs.menu.addEventListener("click", (e) => {
    const link = e.target.closest(".js-burger-link");
    if (link) closeMenu();
  });

  document.addEventListener("keydown", onKeyDown);
}

initBurgerMenu();
function initBurgerLang() {
  const lang = document.querySelector(".burger-menu__lang");
  if (!lang) return;

  const toggle = lang.querySelector(".js-lang-toggle");
  const options = lang.querySelectorAll(".js-lang-option");

  function closeLang() {
    lang.classList.remove("is-open");
  }

  toggle.addEventListener("click", () => {
    lang.classList.toggle("is-open");
  });

  options.forEach((btn) => {
    btn.addEventListener("click", () => {
      options.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      toggle.textContent = btn.textContent.trim();
      closeLang();
    });
  });

  document.addEventListener("click", (e) => {
    if (!lang.contains(e.target)) closeLang();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLang();
  });
}

initBurgerLang();
