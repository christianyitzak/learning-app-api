const express = require("express");
const { createSubject, getSubject } = require("../controllers/subject.controller");

const router = express.Router();

router.get("/", getSubject);
router.post("/", createSubject);

module.exports = router;