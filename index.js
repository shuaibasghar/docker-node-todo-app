const express = require("express");
const mongoose = require("mongoose");
const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_IP,
    MONGO_PORT,
} = require("./config/configs");
const app = express();

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
mongoose
    .connect(mongoUrl)
    .then(() => console.log("successfully conned to the database"))
    .catch((e) => console.log("error", e));
app.get("/", (req, res) => {
    res.send("<h2>HI There</h2>");
});
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
