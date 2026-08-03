const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/api", (req, res) => {
    res.json({
        entreprise: "KYL Tech Technologies",
        message: "Serveur opérationnel"
    });
});

app.listen(PORT, () => {
    console.log("🚀 KYL Tech serveur lancé sur le port " + PORT);
});


