const express = require("express");

const {
    createSubject,
    getSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject,
} = require("../controllers/subject.controller");

const router = express.Router();

router.get("/", getSubjects);
router.get("/:id", getSubjectById);

router.post("/", createSubject);
router.patch("/:id", updateSubject);
router.delete("/:id", deleteSubject);

module.exports = router;