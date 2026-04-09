import { disablePageScroll, enablePageScroll } from "scroll-lock";

document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.querySelector(".preloader");
  const preloaderPercent = document.querySelector(".preloader__percent");
  const preloaderText = document.querySelector(".preloader__hi-text");

  if (!preloader) {
    return;
  }

  const images = document.querySelectorAll('img:not([loading="lazy"])');
  const totalImages = images.length;
  let loadedImages = 0;

  disablePageScroll();

  if (totalImages === 0) {
    document.body.classList.remove("loading");
    enablePageScroll();
    preloader.style.display = "none";
    return;
  }

  const updatePreloader = () => {
    loadedImages += 1;

    const percent = Math.round((loadedImages / totalImages) * 100);
    if (preloaderPercent) {
      preloaderPercent.innerText = `${percent}%`;
    }

    if (loadedImages === totalImages) {
      if (preloaderPercent) {
        preloaderPercent.innerText = "100%";
      }

      setTimeout(() => {
        if (preloaderText) {
          preloaderText.innerText = "";
        }

        if (preloaderPercent) {
          preloaderPercent.innerText = "HILIGHT";
        }

        setTimeout(() => {
          preloader.classList.add("loaded");
          document.body.classList.remove("loading");
          enablePageScroll();
          preloader.addEventListener(
            "transitionend",
            () => {
              preloader.remove();
            },
            { once: true },
          );
        }, 500);
      }, 200);
    }
  };

  images.forEach((image) => {
    if (image.complete) {
      updatePreloader();
      return;
    }

    image.addEventListener("load", updatePreloader, { once: true });
    image.addEventListener("error", updatePreloader, { once: true });
  });
});
