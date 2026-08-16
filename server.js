const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const authRoutes = require("./routes/auth");
const quoteRoutes = require("./routes/quotes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
// Fichiers du site
app.use(express.static(path.join(__dirname, "public")));

// API principale
app.get("/api", (req, res) => {
    res.json({
        entreprise: "KYL Tech Technologies",
        message: "Serveur opérationnel"
    });
});

// API des demandes de devis
app.use("/api/quotes", quoteRoutes);

// Page d'accueil
app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "index.html")
    );
});

// 404
app.use((req, res) => {
    res.status(404).json({
        message: "Route introuvable"
    });
});

// Démarrage
app.listen(PORT, () => {
    console.log(`🚀 KYL Tech serveur lancé sur le port ${PORT}`);
});
