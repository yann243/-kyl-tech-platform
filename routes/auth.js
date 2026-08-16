const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email et mot de passe requis."
            });
        }

        if (!ADMIN_EMAIL || !ADMIN_PASSWORD_HASH || !JWT_SECRET) {
            return res.status(500).json({
                success: false,
                message: "Configuration administrateur manquante."
            });
        }

        if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
            return res.status(401).json({
                success: false,
                message: "Identifiants incorrects."
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            ADMIN_PASSWORD_HASH
        );

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Identifiants incorrects."
            });
        }

        const token = jwt.sign(
            {
                email: ADMIN_EMAIL,
                role: "admin"
            },
            JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );

        res.json({
            success: true,
            message: "Connexion réussie.",
            token
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
