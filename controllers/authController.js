const User = require("../models/userModel");

exports.signUp = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            username,
            password: hashedPassword,
        });
        req.status(201).json({
            status: "success",
            data: {
                user: newUser,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error,
        });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });

        if (!user) {
            req.status(404).json({
                status: "fail",
                message: "user not found",
            });
        }

        const isCorrect = await bcrypt.compare(password, user.password);

        if (isCorrect) {
            res.status(200);
        } else {
            res.status(400).json({
                status: "fail",
                messages: "incorrect username or password",
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error,
        });
    }
};
