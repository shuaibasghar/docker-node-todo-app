const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
    .connect("mongodb://root:shuaib@mongo:27017/?authSource=admin")
    .then(() => console.log("successfully conned to the database"))
    .catch((e) => console.log("error", e));
app.get("/", (req, res) => {
    res.send("<h2>HI There</h2>");
});
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
