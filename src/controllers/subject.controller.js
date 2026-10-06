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

const getSubjects = async (req, res) => {
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

const getSubjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM subjects WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Subject not found!" });
        };

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to get subjects",
        });
    };
}

const updateSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({
                message: "Name is required"
            });
        };

        const result = await pool.query("UPDATE subjects SET name = $1 WHERE id = $2", [name, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Subject not found!" });
        };

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to get subjects",
        });
    };
};

const deleteSubject = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM subjects WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Subject not found",
            });
        }

        res.status(200).json({
            message: "Subject deleted successfully",
            subject: result.rows[0],
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete subject",
        });
    }
};

module.exports = {
    createSubject,
    getSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject
};