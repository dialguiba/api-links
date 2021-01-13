const router = require("express").Router();
const validate = require("../../middlewares/validation/validation");
const { loginSchema, registerSchema } = require("../../middlewares/validation/schema/user");
const { login, register } = require("../../controllers/users");

router.get("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

module.exports = router;
