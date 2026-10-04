const express = require("express");
const { createSubject } = require("../controllers/subject.controller");

const router = express.Router();

router.post("/", createSubject);

module.exports = router;