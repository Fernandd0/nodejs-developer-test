const express = require("express");
const knex = require("./db/knex");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await knex("users").where({ username }).first();

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    const token = jwt.sign({ id: user.id }, "123", { expiresIn: "1h" });

    return res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    return res.status(500).json({ message: "Error al iniciar sesión", error });
  }
});

app.listen(3000, () => {
  console.log("Servidor on");
});
