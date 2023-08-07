import db from "../database/database.connection.js";

async function addUser(name, email, hash) {
  return db.query(
    `INSERT INTO users ("name", "email", "password") VALUES ($1, $2, $3);`,
    [name, email, hash]
  );
}

async function getUser(email) {
  return db.query(`SELECT * FROM users WHERE users.email= $1;`, [email]);
}

async function addUserSession(id, token) {
  return db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2);`, [
    id,
    token,
  ]);
}

async function selectUserUrls(id) {
  return db.query(
    `SELECT users.id, users.name,
    SUM (urls."visitCount") AS "visitCount",
    array_agg(
      json_build_object(
        'id',urls."id", 'shortUrl', urls."shortUrl", 'url',urls."url", 'visitCount',urls."visitCount"
      )) AS "shortenedUrls"
     FROM users 
     LEFT JOIN urls ON users.id=urls."userId"
     WHERE users.id = $1
     GROUP BY users.id, users.name;`,
    [id]
  );
}

export { addUser, getUser, addUserSession, selectUserUrls };
