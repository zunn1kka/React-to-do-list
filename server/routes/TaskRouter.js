const Router = require("express");
const router = new Router();
const taskController = require("../controllers/TaskController");
const authMiddleware = require("../middleware/AuthMiddleware");

router.post("/", authMiddleware, taskController.create);
router.get("/", authMiddleware, taskController.getAll);
router.get("/:id", authMiddleware, taskController.getOne);
router.put("/:id", authMiddleware, taskController.update);
router.delete("/:id", authMiddleware, taskController.delete);
router.patch("/:id/toggle", authMiddleware, taskController.toggleComplete);

module.exports = router;
