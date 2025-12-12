import express from "express";
const app = express();
app.use(express.json());

app.post("/track", (req, res) => {
    console.log("Received:", req.body);
    res.json({ ok: true });
});

app.listen(3000, () => console.log("Server running"));
