const openBtns = document.querySelectorAll(".js-open-request");

const requestPopup = document.getElementById("popup-request");
const successPopup = document.getElementById("popup-success");

const overlays = document.querySelectorAll(".js-popup-overlay");
const closes = document.querySelectorAll(".js-popup-close");

const form = document.querySelector(".js-request-form");
const sendAgainBtn = document.querySelector(".js-send-again");

function openPopup(popup) {
  popup.classList.add("is-open");
}

function closePopup(popup) {
  popup.classList.remove("is-open");
}

openBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    openPopup(requestPopup);
  });
});

overlays.forEach((overlay) => {
  overlay.addEventListener("click", () => {
    const popup = overlay.closest(".popup");
    closePopup(popup);
  });
});

closes.forEach((btn) => {
  btn.addEventListener("click", () => {
    const popup = btn.closest(".popup");
    closePopup(popup);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  closePopup(requestPopup);
  openPopup(successPopup);
});

sendAgainBtn.addEventListener("click", () => {
  closePopup(successPopup);
  openPopup(requestPopup);
});
