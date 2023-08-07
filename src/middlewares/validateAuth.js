import jwt from "jsonwebtoken";
import { getUserByAll } from "../repositories/user.repository.js";

export default async function validateAuth(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(401);

  try {
    const { id, name, email } = jwt.verify(
      token,
      process.env.JWT_SECRET || "721ebddaafd1f5b1598268770c4dd906"
    );

    const user = await getUserByAll(id, name, email);
    if (user.rowCount === 0) return res.status(401).send("Invalid Token");

    delete user.rows[0].email;
    delete user.rows[0].password;
    res.locals.user = user.rows[0];
  } catch (error) {
    if (error.name === "JsonWebTokenError")
      return res.status(401).send("Invalid Token");
    return res.status(500).send(error.message);
  }
  next();
}
