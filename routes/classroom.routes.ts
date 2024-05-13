import { Router } from "express";
import { createClassroom } from "../controllers/classroom.controller";

const router = Router();

router.route("/create-classroom").post(createClassroom);

export default router;
