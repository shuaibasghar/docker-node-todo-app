const express = require("express");
const mongoose = require("mongoose");

const session = require("express-session");
const redis = require("redis");
// const RedisStore = require("connect-redis").default;
// const connectRedis = require("connect-redis").default;
const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_IP,
    MONGO_PORT,
    REDIS_URL,
    REDIS_PORT,
    SESSION_SECRET,
} = require("./config/configs");

const postRouter = require("./routes/postRoute");
const userRouter = require("./routes/userRoute");

const app = express();
// const RedisStore = connectRedis(session);
let RedisStore = require("connect-redis")(session);
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT,
});
const connectWithRetry = () => {
    mongoose
        .connect(mongoUrl)
        .then(() => console.log("successfully connected to the database"))
        .catch((e) => {
            console.log("error", e);
            setTimeout(connectWithRetry, 5000);
        });
};
connectWithRetry();

// if you run the behind a proxy(e.g. nginx)
// app.set("trust proxy", 1);

app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            secure: false, //if this is true only transamit cookie over https
            httpOnly: true, //if true ;prevent the client side JS from reading the cookie
            maxAge: 3000000, //session will be stay as long
        },
    })
);

app.use(express.json());
app.get("/", (req, res) => {
    res.send("<h2>HI There</h2>");
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
