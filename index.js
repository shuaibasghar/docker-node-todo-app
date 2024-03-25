const express = require("express");
const mongoose = require("mongoose");
const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_IP,
    MONGO_PORT,
} = require("./config/configs");

const postRouter = require("./routes/postRoute");
const userRouter = require("./routes/userRoute");

const app = express();

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const connectWithRetry = () => {
    mongoose
        .connect(mongoUrl)
        .then(() => console.log("successfully conned to the database"))
        .catch((e) => {
            console.log("error", e);
            setTimeout(connectWithRetry, 5000);
        });
};
connectWithRetry();

app.use(express.json());
app.get("/", (req, res) => {
    res.send("<h2>HI There</h2>");
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
