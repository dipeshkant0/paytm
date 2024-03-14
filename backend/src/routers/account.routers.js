import { Router } from "express";
import { showBalance } from "../controllers/account.controllers.js";
import { verifyToken } from "../middlewares/auth.middlewares.js";
const router = Router();

router.route('/show-balance').post(verifyToken,showBalance);


export default router
