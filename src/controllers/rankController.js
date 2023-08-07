import { rankingUsers } from "../repositories/rank.repository.js";

async function getRanking(req, res) {
  try {
    const ranking = await rankingUsers();
    res.status(200).send(ranking.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export { getRanking };
