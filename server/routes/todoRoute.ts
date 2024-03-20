import express from "express";

const router = express.Router();
const {
  getCreateTodo,
  getAllTodo,
  getToggleProgress,
  getUpdateTodo,
  getRemoveTodo
} = require("../Controllers/todoController");

const { isAutheticatedUser } = require("../middleware/isAuthenticated");

router.route("/todo/create").post(isAutheticatedUser, getCreateTodo);
router.route("/todo/update").put(isAutheticatedUser, getUpdateTodo);
router.route("/todo/all").get(isAutheticatedUser, getAllTodo);
router.route("/todo/progress").post(isAutheticatedUser, getToggleProgress);
router.route("/todo/remove").post(isAutheticatedUser, getRemoveTodo);

module.exports = router;
