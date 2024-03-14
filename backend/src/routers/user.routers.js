import { Router } from "express";
import { registerUser,signIn } from "../controllers/user.controllers.js";
const router = Router();

router.route('/register').post(registerUser);
router.route('/sign-in').post(signIn)

export default router
