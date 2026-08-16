require("dotenv").config();

const express = require("express");
const path = require("path");

const authRoutes = require("./routes/auth");
const quoteRoutes = require("./routes/quotes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/quotes", quoteRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.get("/api", (req, res) => {
    res.json({
        entreprise: "KYL Tech Technologies",
        message: "Serveur opérationnel"
    });
});

app.listen(PORT, () => {
    console.log(`🚀 KYL Tech serveur lancé sur le port ${PORT}`);
});
