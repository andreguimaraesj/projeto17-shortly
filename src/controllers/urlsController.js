import { nanoid } from "nanoid";
import {
  insertUrl,
  selectUrlById,
  selectUrlByShort,
  updateVisitCount,
  removeUrl,
} from "../repositories/urls.repository.js";

async function addUrl(req, res) {
  const { url } = req.body;
  const userId = res.locals.user.id;
  const shortId = nanoid(8);
  try {
    const newShort = await insertUrl(userId, url, shortId);
    res.status(201).send(newShort.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function urlById(req, res) {
  const { id } = req.params;
  try {
    const shortUrl = await selectUrlById(id);
    if (shortUrl.rowCount === 0) return res.sendStatus(404);

    res.status(200).send(shortUrl.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function openUrl(req, res) {
  const { shortUrl } = req.params;
  try {
    const url = await selectUrlByShort(shortUrl);
    if (url.rowCount === 0) return res.sendStatus(404);

    await updateVisitCount(shortUrl);

    res.redirect(url.rows[0].url);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function deleteUrl(req, res) {
  const { id } = req.params;
  const userId = res.locals.user.id;

  try {
    const url = await selectUrlById(id);
    if (url.rowCount === 0) return res.sendStatus(404);

    const deleteTry = await removeUrl(id, userId);
    if (deleteTry.rowCount === 0) return res.sendStatus(401);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export { addUrl, urlById, openUrl, deleteUrl };
