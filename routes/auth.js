const express = require("express");
const router = express.Router();
const user = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

router.post(
  "/signUP",
  [
    body("username", "please enter a valid user name ").isLength({ min: 5 }),

    body("email", "please enter a valid email ").isEmail(),

    body("password", "please enter a valid password ").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //   let createUser = await user.findOne({
      //     email: req.bodt.email,
      //   });

      //   if (createUser) {
      //     res
      //       .status(409)
      //       .json({ massage: "user already Exists", data: createUser });
      //   }       let createuser= await User.findOne({email:req.body.email})

      let createUser = await User.findOne({ email: req.body.email });

      if (createUser) {
        return res
          .status(400)
          .json({ success: false, message: "the user is already exist" });
      }

      const passward = req.body.password;
      const salt = bcrypt.genSaltSync(5);
      const hash = bcrypt.hashSync(passward, salt);

      createUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });

      createUser.save();
      //   console.log(req.body);
      res.json({ massage: "successfully created User", data: createUser });
    } catch {
      (err) => {
        console.log(err);
      };
    }
  }
);

module.exports = router;
