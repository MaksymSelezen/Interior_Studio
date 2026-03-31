const header = document.querySelector(".header");

if (header) {
  const setScrolledState = () => {
    header.classList.toggle("header_scrolled", window.scrollY > 8);
  };

  setScrolledState();

  window.addEventListener("scroll", setScrolledState, { passive: true });
}
