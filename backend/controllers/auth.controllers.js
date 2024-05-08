const User = require('../models/auth.model');
const { hash, verify } = require('../middleware/hash-password');
const { decodeToken, signToken } = require('../middleware/login-token');
const { registerValidation } = require("../validation/index");

const signup = async(req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    let user = await User.findOne({
        email: req.body.email,
    });
    if (user) {
        return res.status(400).json({
            status: "fail",
            message: "Email Exists",
        });
    }
    user = req.body;
    let username = await User.findOne({
        username: req.body.username,
    });
    if (username) {
        return res.status(400).json({
            status: "fail",
            message: "Username Exists",
        });
    }
    username = req.body;
    user.password = await hash(user.password);
    const newUser = await new User(user);
    newUser.save();
    res.status(201).json({ status: "success", message: "User created" });
}

const login = async(req, res) => {
    const { password, email } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(401).json({ status: "fail", message: "Invalid email or password" });
    const isPasswordValid = await verify(user.password, password);
    if (!isPasswordValid) return res.status(401).json({ status: "fail", message: "Invalid email or password" });

    const { _id, username, role, profilePicture } = user;
    const userData = {
        username: user.username,
        role: user.role,
        email: user.email,
        profilePicture: user.profilePicture,
        createdAt: user.createdAt,
        _id: user._id,
    };
    const token = signToken(JSON.stringify({ _id, username, role, email: user.email, profilePicture }));
    return res.status(200).json({ status: "success", message: "successfully logged in", data: userData, token })
}

const userProfile = (req, res) => {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ")[1];
    const payload = decodeToken(token);
    return res.status(200).json({ status: "success", data: payload });
}

const getAllUsers = async(req, res) => {
    const users = await User.find();
    res.status(200).json({ status: "success", data: users })
}

const deleteUserById = async(req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ status: "fail", message: "User not Found" });
    await User.findByIdAndDelete(id);
    res.status(200).json({ status: "success", message: "User Deleted" });
}

const updateProfile = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ status: "fail", message: "User not found" });
    await User.findByIdAndUpdate(id, updates);
    return res.status(200).json({ status: "success", message: "User Updated successfully", data: updates });
};

module.exports = { signup, login, userProfile, getAllUsers, deleteUserById, updateProfile };
