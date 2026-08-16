require("dotenv").config();

const express = require("express");
const path = require("path");

const authRoutes = require("./routes/auth");
const quoteRoutes = require("./routes/quotes");
const requireAdmin = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API
app.use("/api/auth", authRoutes);
app.use("/api/quotes", quoteRoutes);

// Protection de la page admin
app.get("/admin.html", requireAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// Fichiers publics
app.use(express.static(path.join(__dirname, "public")));

// API de test
app.get("/api", (req, res) => {
    res.json({
        entreprise: "KYL Tech Technologies",
        message: "Serveur opérationnel"
    });
});

app.listen(PORT, () => {
    console.log(`🚀 KYL Tech serveur lancé sur le port ${PORT}`);
});
