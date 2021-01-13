const router = require("express").Router();
const verifyToken = require("../../middlewares/verifyToken");
const { getAllUserLinks, createUserLink, deleteUserLink, updateUserLink } = require("../../controllers/links");

router.get("/", verifyToken, getAllUserLinks);

router.post("/", verifyToken, createUserLink);

router.delete("/", verifyToken, deleteUserLink);

router.put("/", verifyToken, updateUserLink);

module.exports = router;
