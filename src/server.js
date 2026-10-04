const express = require("express");
const pool = require("./db");

const subjectRoutes = require("./routes/subject.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Learning App Api"
    });
});

app.use("/api/subjects", subjectRoutes);

app.get("/api/health", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            status: "ok",
            database: "connected",
            time: result.rows[0].now
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Database connection failed."
        });
    };
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});