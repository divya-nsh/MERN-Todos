import { Router } from "express";
import * as c from "../controllers/todoController.js";
import { authorizaiton } from "../middlewares/auth.js";

const router = Router();

router.use(authorizaiton);

router.route("/").get(c.getTodos).post(c.addTodo);

router.route("/:id").put(c.updateTodo).delete(c.deleteTodo).get(c.getTodo);

router.route("/remove/all").delete(c.deleteAllTodos);

export default router;
