import JustValidate from "just-validate";

const blogFooterForm = document.querySelector(".js-blog-footer-form");

if (blogFooterForm) {
  const blogFooterValidator = new JustValidate(blogFooterForm, {
    errorFieldCssClass: "is-invalid",
    errorLabelCssClass: "blog-footer__error-label",
    focusInvalidField: true,
    lockForm: true,
    validateBeforeSubmitting: true,
  });

  blogFooterValidator
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
      blogFooterForm.reset();
    });
}
