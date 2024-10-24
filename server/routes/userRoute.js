import { Router } from "express";
import * as c from "../controllers/userController.js";
import { authorizaiton } from "../middlewares/auth.js";

const router = Router();

router.post("/signup", c.createUser);

router.post("/login", c.loginUser);

router.get("/", authorizaiton, c.getLoginUser);
router.patch("/change-password", authorizaiton, c.changePassword);
router.put("/", authorizaiton, c.updateUser);

export default router;
