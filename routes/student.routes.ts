import { Router } from "express";
import protectRoute from "../middlewares/auth.middleware";
import {
  loginController,
  logoutController,
  signupController,
} from "../controllers/student.controller";

const router = Router();

router.route("/signup").post(signupController);
router.route("/login").post(loginController);
router.route("/logout").post(logoutController);
export default router;
