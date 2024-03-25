const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
exports.signUp = async (req, res) => {
    try {
        console.log("req.body", req.body);
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            username,
            password: hashedPassword,
        });
        req.session.user = newUser;
        res.status(201).json({
            status: "success",
            data: {
                user: newUser,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: error,
        });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    // console.log("req.session", req.session);
    try {
        const user = await User.findOne({ username });
        // console.log("user", user);
        if (!user) {
            res.status(404).json({
                status: "fail",
                message: "user not found",
            });
        }

        const isCorrect = await bcrypt.compare(password, user.password);
        // console.log("iscorrect", isCorrect);
        if (isCorrect) {
            req.session.user = user;
            console.log(req.session);
            res.status(200).json({
                status: "success",
                user,
            });
        } else {
            res.status(400).json({
                status: "fail",
                messages: "incorrect username or password",
            });
        }
    } catch (error) {
        console.log("error while login", error);
        res.status(400).json({
            status: "fail",
            error: error,
        });
    }
};
