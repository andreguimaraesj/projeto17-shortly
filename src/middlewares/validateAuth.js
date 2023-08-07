import jwt from "jsonwebtoken";
import db from "../database/database.connection.js";

export default async function validateAuth(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(401);

  try {
    const session = jwt.verify(
      token,
      process.env.JWT_SECRET || "721ebddaafd1f5b1598268770c4dd906"
    );
    if (!session) return res.status(401).send("Invalid Token");
    const { id, name, email } = session;
    const user = await db.query(
      `SELECT * FROM users WHERE users.id= $1 AND users.name=$2 AND users.email= $3;`,
      [id, name, email]
    );
    if (user.rowCount === 0) return res.status(401).send("Invalid Token");
    delete user.rows[0].email;
    delete user.rows[0].password;
    res.locals.user = user.rows[0];
  } catch (err) {
    return res.status(500).send(err.message);
  }
  next();
}
