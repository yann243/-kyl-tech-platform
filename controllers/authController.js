const { db } = require("../database/db");
const bcrypt = require("bcryptjs");

async function register(req, res) {
  const { nom, email, password } = req.body;

  if (!nom || !email || !password) {
    return res.status(400).json({
      message: "Tous les champs sont obligatoires."
    });
  }

  await db.read();

  const existe = db.data.users.find(user => user.email === email);

  if (existe) {
    return res.status(400).json({
      message: "Cet utilisateur existe déjà."
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  db.data.users.push({
    id: Date.now(),
    nom,
    email,
    password: passwordHash
  });

  await db.write();

  res.status(201).json({
    message: "Inscription réussie."
  });
}

module.exports = {
  register
};
