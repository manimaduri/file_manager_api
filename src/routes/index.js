const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const folderRouter = require("./folder");
const filesRouter = require("./file");
const authMiddleware = require("../middleware/auth");

// Register API endpoint
router.use("/auth", authRouter);
router.use("/folders", authMiddleware, folderRouter);
router.use("/files", authMiddleware, filesRouter);

module.exports = router;
