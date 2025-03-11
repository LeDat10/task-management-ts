import {Router} from "express";
import * as controller from "../controllers/user.controller";
import * as authMiddlware from "../middlewares/auth.middleware";

const router: Router = Router();

router.post("/register", controller.register);

router.post("/login", controller.login);

router.get("/detail", authMiddlware.requireAuth,  controller.detail);

export const userRoutes:Router = router;