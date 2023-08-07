import db from "../database/database.connection.js";

async function rankingUsers() {
  return db.query(`
  SELECT users.id, users.name, COUNT(urls."userId") AS "linksCount", SUM(COALESCE(urls."visitCount",0))  AS "visitCount" FROM users
  JOIN urls ON users.id = urls."userId"
  GROUP BY users.id, users.name ORDER BY "visitCount" DESC, users.id LIMIT 10
  `);
}

export { rankingUsers };
