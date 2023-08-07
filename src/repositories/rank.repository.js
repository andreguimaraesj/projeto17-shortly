import db from "../database/database.connection.js";

async function rankingUsers() {
  return db.query(`
  SELECT users.id, users.name, 
  CAST(COUNT(urls."userId") AS INTEGER) AS "linksCount", 
  CAST(SUM(COALESCE(urls."visitCount",0)) AS INTEGER)  AS "visitCount" FROM users
  JOIN urls ON users.id = urls."userId"
  GROUP BY users.id, users.name ORDER BY "visitCount" DESC, users.id LIMIT 10
  `);
}

export { rankingUsers };
