const express = require("express");
const authRouter = express.Router();


const CLIENT_URL = "http://localhost:3000/";

//imported controllers
const {
  signIn,
  signUp,
  logout,
 
} = require("../controllers/auth.user.controller");

//imported schema validator
const validate = require("../middlewares/SchemaValidation.middleware");
//imported validators
const {
  userRegisterValidator,
  loginValidator,
} = require("../validators/user.auth.validators");

const {
  companyRegisterValidator,
} = require("../validators/company.auth.validators");

//imported MiddleWare
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");

authRouter.get("/currentUser", authenticateToken, async (req, res) => {
  try {
    res.send({ user: req.user });
  } catch (err) {
    res.send(err.message);
  }
});

authRouter.post(
  "/register",
  (req, res, next) => {
    if (req.body.role === "user") {
      return validate(userRegisterValidator)(req, res, next);
    } else if (req.body.role === "company") {
      return validate(companyRegisterValidator)(req, res, next);
    }
  },
  signUp
);
authRouter.post("/login", validate(loginValidator), signIn);
authRouter.post("/logout", logout);




authRouter.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});




module.exports = authRouter;
