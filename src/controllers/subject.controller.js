const pool = require("../db");

const createSubject = async (req, res) => {
    try {
        const { name } = req.body;

        const result = await pool.query("INSERT INTO subjects (name) VALUES ($1) RETURNING *", [name]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create subject",
        });
    };
};

const getSubject = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM subjects ORDER BY id ASC");
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to get subjects",
        });
    };
};

module.exports = {
    createSubject,
    getSubject
};