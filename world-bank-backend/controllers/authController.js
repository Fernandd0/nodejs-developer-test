const bcrypt = require("bcrypt");
const knex = require("../db/knex");

const createUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verifica si el usuario ya existe
    const userExists = await knex("users").where({ username }).first();
    if (userExists) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserta el nuevo usuario en la base de datos
    await knex("users").insert({ username, password: hashedPassword });
    return res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear usuario", error });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await knex("users").where({ username }).first();

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = "TOKEN_GENERADO";

    return res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    return res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};

module.exports = {
  createUser,
  loginUser,
};
