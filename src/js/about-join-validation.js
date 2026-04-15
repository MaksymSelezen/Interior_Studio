import JustValidate from "just-validate";

const aboutJoinForm = document.querySelector(".js-about-join-form");

if (aboutJoinForm) {
  const aboutJoinValidator = new JustValidate(aboutJoinForm, {
    errorFieldCssClass: "is-invalid",
    errorLabelCssClass: "about-join__error-label",
    focusInvalidField: true,
    lockForm: true,
    validateBeforeSubmitting: true,
  });

  aboutJoinValidator
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
    .onSuccess((event) => {
      event?.preventDefault();
      aboutJoinForm.reset();
    });
}
