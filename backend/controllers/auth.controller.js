import User from "../models/user.model";
import bcrypt from "bcryptjs";
import genToken from "../config/token";

export const signUp = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const checkuserbyusername = await User.findOne({ userName });
    if (checkuserbyusername) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const checkuserbyemail = await User.findOne({ email });
    if (checkuserbyemail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const hashedPassword = await bcypt(password, 10);
    const user = await User.create({
      userName,
      email,
      hashedPassword,
    });
    const token = await genToken(user._id);
    // storing in cookiesl
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: none,
      secure: false, // set to true if using https
    });
    return res.status(201).json(user);
  } catch (e) {
    console.log(e);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const hashedPassword = await bcypt(password, 10);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = await genToken(user._id);
    // storing in cookies
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: none,
      secure: false, // set to true if using https
    });
    return res.status(201).json(user);
  } catch (e) {
    console.log(e);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json("logged out success");
  } catch (e) {
    console.log(e);
  }
};
