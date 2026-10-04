const pool = require("../db");

const createSubject = async (req, res) => {
    try {
        const { name } = req.body;

        const result = await pool.query("INSERT INTO subjects (name) VALUES ($1) RETURNING *", [name]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
    };
};

module.exports = {
    createSubject
};