import db from "../database/database.connection.js";

async function insertUrl(userId, url, shortId) {
  return db.query(
    `INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3)
        RETURNING id, "shortUrl";`,
    [userId, url, shortId]
  );
}

async function selectUrlById(id) {
  return db.query(
    `SELECT urls.id, urls."shortUrl", urls.url FROM urls 
        WHERE urls.id=$1`,
    [id]
  );
}

async function selectUrlByShort(shortUrl) {
  return db.query(
    `SELECT urls.url FROM urls 
          WHERE urls."shortUrl"=$1`,
    [shortUrl]
  );
}

async function updateVisitCount(shortUrl) {
  return db.query(
    `UPDATE urls SET "visitCount" = "visitCount" + 1
          WHERE urls."shortUrl"=$1
          ;`,
    [shortUrl]
  );
}

async function removeUrl(id, userId) {
  return db.query(
    `DELETE FROM urls 
            WHERE urls."id"=$1 AND urls."userId"=$2`,
    [id, userId]
  );
}

export {
  insertUrl,
  selectUrlById,
  selectUrlByShort,
  updateVisitCount,
  removeUrl,
};
