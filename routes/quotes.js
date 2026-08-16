const express = require("express");
const fs = require("fs");
const path = require("path");
const requireAdmin = require("../middleware/auth");

const router = express.Router();

const dbPath = path.join(__dirname, "../database/db.json");

function readDatabase() {
    if (!fs.existsSync(dbPath)) {
        return { users: [], quotes: [] };
    }

    const data = fs.readFileSync(dbPath, "utf8");

    if (!data.trim()) {
        return { users: [], quotes: [] };
    }

    return JSON.parse(data);
}

function saveDatabase(db) {
    fs.writeFileSync(
        dbPath,
        JSON.stringify(db, null, 2)
    );
}


// GET /api/quotes
// 🔐 ADMIN UNIQUEMENT
router.get("/", requireAdmin, (req, res) => {

    try {

        const db = readDatabase();

        res.json({
            success: true,
            quotes: db.quotes || []
        });

    } catch (error) {

        console.error("Erreur récupération devis :", error);

        res.status(500).json({
            success: false,
            message: "Impossible de récupérer les demandes."
        });

    }

});


// POST /api/quotes
// 🌐 PUBLIC : créer une demande
router.post("/", (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            company,
            service,
            budget,
            message
        } = req.body;

        if (!name || !email || !service || !message) {

            return res.status(400).json({
                success: false,
                message: "Veuillez remplir les champs obligatoires."
            });

        }

        const db = readDatabase();

        if (!db.quotes) {
            db.quotes = [];
        }

        const quote = {

            id: Date.now(),

            name: String(name).trim(),

            email: String(email).trim(),

            phone: phone ? String(phone).trim() : "",

            company: company ? String(company).trim() : "",

            service: String(service).trim(),

            budget: budget ? String(budget).trim() : "",

            message: String(message).trim(),

            status: "nouvelle",

            createdAt: new Date().toISOString()

        };

        db.quotes.push(quote);

        saveDatabase(db);

        res.status(201).json({

            success: true,

            message: "Votre demande de devis a été envoyée avec succès."

        });

    } catch (error) {

        console.error("Erreur création devis :", error);

        res.status(500).json({

            success: false,

            message: "Impossible d'enregistrer la demande."

        });

    }

});


module.exports = router;
