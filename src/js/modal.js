import JustValidate from "just-validate";

import { lock, unlock } from "./scrollLock";

const openBtns = document.querySelectorAll(".js-open-request");

const requestPopup = document.getElementById("popup-request");
const successPopup = document.getElementById("popup-success");

const overlays = document.querySelectorAll(".js-popup-overlay");
const closes = document.querySelectorAll(".js-popup-close");

const form = document.querySelector(".js-request-form");
const sendAgainBtn = document.querySelector(".js-send-again");

let requestFormValidator = null;

function getScrollableContainer(popup) {
  return popup?.querySelector(".js-scroll-lock-scrollable") || null;
}

function resetRequestFormValidation() {
  requestFormValidator?.refresh();
}

function openPopup(popup) {
  if (!popup) return;

  popup.classList.add("is-open");
  lock(getScrollableContainer(popup));

  if (popup === requestPopup) {
    resetRequestFormValidation();
  }
}

function closePopup(popup) {
  if (!popup) return;

  popup.classList.remove("is-open");
  unlock(getScrollableContainer(popup));

  if (popup === requestPopup) {
    resetRequestFormValidation();
  }
}

function handleRequestFormSuccess() {
  form?.reset();
  resetRequestFormValidation();
  closePopup(requestPopup);
  openPopup(successPopup);
}

function initRequestFormValidation() {
  if (!form || requestFormValidator) return;

  requestFormValidator = new JustValidate(form, {
    errorFieldCssClass: "is-invalid",
    errorLabelCssClass: "popup-request__error-label",
    focusInvalidField: true,
    lockForm: true,
    validateBeforeSubmitting: true,
  });

  requestFormValidator
    .addField('[name="firstName"]', [
      {
        rule: "required",
        errorMessage: "Enter your name",
      },
      {
        rule: "minLength",
        value: 2,
        errorMessage: "Enter at least 2 characters",
      },
      {
        rule: "maxLength",
        value: 30,
        errorMessage: "Enter no more than 30 characters",
      },
    ])
    .addField('[name="lastName"]', [
      {
        rule: "required",
        errorMessage: "Enter your last name",
      },
      {
        rule: "minLength",
        value: 2,
        errorMessage: "Enter at least 2 characters",
      },
      {
        rule: "maxLength",
        value: 30,
        errorMessage: "Enter no more than 30 characters",
      },
    ])
    .addField('[name="phone"]', [
      {
        rule: "required",
        errorMessage: "Enter your phone number",
      },
      {
        rule: "customRegexp",
        value: /^[+]?[-()\s\d]+$/,
        errorMessage: "Enter a valid phone number",
      },
      {
        rule: "minLength",
        value: 10,
        errorMessage: "Enter at least 10 characters",
      },
      {
        rule: "maxLength",
        value: 20,
        errorMessage: "Enter no more than 20 characters",
      },
    ])
    .addField('[name="email"]', [
      {
        rule: "required",
        errorMessage: "Enter your email",
      },
      {
        rule: "email",
        errorMessage: "Enter a valid email",
      },
      {
        rule: "maxLength",
        value: 50,
        errorMessage: "Enter no more than 50 characters",
      },
    ])
    .addField('[name="city"]', [
      {
        rule: "required",
        errorMessage: "Please enter your city",
      },
      {
        rule: "customRegexp",
        value: /^[\p{L}\s'-]+$/u,
        errorMessage: "City contains invalid characters",
      },
      {
        rule: "maxLength",
        value: 40,
        errorMessage: "Enter no more than 40 characters",
      },
    ])
    .addField('[name="propertyType"]', [
      {
        rule: "required",
        errorMessage: "Select a property type",
      },
    ])
    .addField('[name="comment"]', [
      {
        rule: "maxLength",
        value: 500,
        errorMessage: "Enter no more than 500 characters",
      },
    ])
    .onSuccess((event) => {
      event?.preventDefault();
      handleRequestFormSuccess();
    });
}

initRequestFormValidation();

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

sendAgainBtn?.addEventListener("click", () => {
  closePopup(successPopup);
  openPopup(requestPopup);
});
