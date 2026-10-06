const express = require("express");
const { createQuestion } = require("../controllers/questions.controller");

const router = express.Router();

router.post("/", createQuestion);

module.exports = router;