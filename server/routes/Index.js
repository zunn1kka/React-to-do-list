const Router = require("express");
const router = new Router();
const taskRouter = require("./taskRouter");
const userRouter = require("./userRouter");

router.use("/user", userRouter);
router.use("/tasks", taskRouter);

module.exports = router;
