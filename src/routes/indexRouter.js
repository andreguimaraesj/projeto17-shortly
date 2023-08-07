import { Router } from "express";
import usersRouter from "./usersRouter.js";
import urlsRouter from "./urlsRouter.js";
import rankingRouter from "./rankRouter.js";

const router = Router();

router.use(usersRouter);
router.use(urlsRouter);
router.use(rankingRouter);

export default router;
