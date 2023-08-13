//used to validate user input
const yup = require("yup");

const companyRegisterValidator = yup.object().shape({
  companyName: yup.string().required("companyName is required"),
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

module.exports = {
  companyRegisterValidator,
};
