import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  addUser,
  getUserByEmail,
  addUserSession,
  selectUserUrls,
} from "../repositories/user.repository.js";

async function signUp(req, res) {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  try {
    await addUser(name, email, hash);
    res.sendStatus(201);
  } catch (error) {
    if (error.code === "23505")
      return res.status(409).send("Email already registered");
    res.status(500).send(error.message);
  }
}

async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (user.rowCount === 0) return res.status(401).send("Email invalid");

    const validPassword = bcrypt.compareSync(password, user.rows[0].password);
    if (!validPassword) return res.status(401).send("Password invalid");

    const token = jwt.sign(
      {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
      },
      process.env.JWT_SECRET || "721ebddaafd1f5b1598268770c4dd906"
    );

    await addUserSession(user.rows[0].id, token);

    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getUserUrls(req, res) {
  const user = res.locals.user;
  try {
    const userUrls = await selectUserUrls(user.id);
    res.send(userUrls.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export { signIn, signUp, getUserUrls };
