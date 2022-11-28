const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");

const registerUser = async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (user) return res.status(400).json("User already exists...");

    const { name, email, password } = req.body;

    user = new userModel({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      jwtSecretKey
    );

    res.status(200).json(token);
  } catch (error) {
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password...");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password...");

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      jwtSecretKey
    );

    res.status(200).json(token);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.registerUser = registerUser;
exports.loginUser = loginUser;
