const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../database/db.json");

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

        const db = JSON.parse(
            fs.readFileSync(dbPath, "utf8")
        );

        if (!db.quotes) {
            db.quotes = [];
        }

        const quote = {
            id: Date.now(),
            name,
            email,
            phone: phone || "",
            company: company || "",
            service,
            budget: budget || "",
            message,
            status: "nouvelle",
            createdAt: new Date().toISOString()
        };

        db.quotes.push(quote);

        fs.writeFileSync(
            dbPath,
            JSON.stringify(db, null, 2)
        );

        res.status(201).json({
            success: true,
            message: "Demande de devis enregistrée."
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
