const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  login: async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email or password is wrong");

    /* Checking password */
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Email or password is wrong");

    /* create and give token */
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth_token", token).send(token);
  },

  register: async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    /* Check if user exists */
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists");

    /* Hash Pass */
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    /* Create new user */
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });
    try {
      const savedUser = await user.save();
      res.send({ user: user._id });
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
