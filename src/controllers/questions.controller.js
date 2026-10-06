const pool = require("../db");

const createQuestion = async (req, res) => {
    try {
        const { subject_id, question } = req.body;

        if (!subject_id || !question || question.trim === "") {
            return res.status(400)
                .json({ message: "Subject_id and question is required" })
        };

        const result = await pool.query(
            `
            INSERT into questions (subject_id, question)
            VALUES ($1, $2)
            RETURNING *
            `,
            [subject_id, question]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create question",
        });
    };
};

module.exports = {
    createQuestion
};