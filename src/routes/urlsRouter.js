import { Router } from "express";
import {
  addUrl,
  urlById,
  openUrl,
  deleteUrl,
} from "../controllers/urlsController.js";
import validateSchema from "../middlewares/validateSchema.js";
import validateAuth from "../middlewares/validateAuth.js";
import schemaUrl from "../schemas/url.js";

const urlsRouter = Router();

urlsRouter.post(
  "/urls/shorten",
  validateAuth,
  validateSchema(schemaUrl),
  addUrl
);
urlsRouter.delete("/urls/:id", validateAuth, deleteUrl);
urlsRouter.get("/urls/:id", urlById);
urlsRouter.get("/urls/open/:shortUrl", openUrl);

export default urlsRouter;
