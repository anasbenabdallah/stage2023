//used to validate user input
const yup = require("yup");

const userRegisterValidator = yup.object().shape({
  firstname: yup.string().required("firstname is required"),
  lastname: yup.string().required("lastname is required"),
  password: yup
    .string()
    .required()
    .max(1024)
    .min(6, "Password must be at least 6 characters long"),
  email: yup
    .string()
    .email()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "email must be valid")
    .required(),
  role: yup.string().required("role is required"),
});

const loginValidator = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address.")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "email must be valid")
    .required("Email is required."),
  password: yup
    .string()
    .required()
    .max(1024, "Password must be at most 1024 characters long.")
    .min(6, "Password must be at least 6 characters long."),
});

const forgotPasswordValidator = yup.object().shape({
  email: yup.string().email("Must be a valid email address").required(),
});

const resetPasswordValidator = yup.object().shape({
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required(),
});

module.exports = {
  userRegisterValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
};
