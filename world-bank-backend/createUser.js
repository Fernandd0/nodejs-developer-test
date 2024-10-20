//create user bd
const bcrypt = require("bcrypt");
const knex = require("./db/knex");

const createUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await knex("users").insert({ username, password: hashedPassword });
  console.log("Usuario creado");
};

createUser("fernando", "123");
