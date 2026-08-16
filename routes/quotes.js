const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

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

// GET : récupérer les demandes de devis
router.get("/", (req, res) => {

    try {

        const db = readDatabase();

        res.json({
            success: true,
            quotes: db.quotes || []
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Impossible de récupérer les demandes."
        });

    }
});


// POST : créer une demande de devis
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

            name: name,

            email: email,

            phone: phone || "",

            company: company || "",

            service: service,

            budget: budget || "",

            message: message,

            status: "nouvelle",

            createdAt: new Date().toISOString()

        };

        db.quotes.push(quote);

        saveDatabase(db);

        res.status(201).json({

            success: true,

            message: "Demande de devis enregistrée.",

            quote: quote

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Erreur serveur."

        });

    }

});


module.exports = router;
