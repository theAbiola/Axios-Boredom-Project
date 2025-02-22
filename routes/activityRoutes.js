import express from "express";
import { getRandomActivity, postActivity } from "../controllers/activityController.js"

const router = express.Router();

router.get("/", getRandomActivity);
router.post("/", postActivity);

export default router;