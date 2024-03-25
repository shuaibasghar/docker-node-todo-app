const express = require("express");
const {
    getAllPost,
    createPost,
    getOnePost,
    updatePost,
    deletePost,
} = require("../controllers/postControllers");

const router = express.Router();

//localhost:3000/
router.route("/").get(getAllPost).post(createPost);

router.route("/:id").get(getOnePost).patch(updatePost).delete(deletePost);
module.exports = router;
