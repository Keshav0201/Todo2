const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const todo = require("../controllers/todoController");

router.get("/dashboard",authMiddleware,todo.getTodos);

router.post("/add",authMiddleware,todo.addTodo);

router.get("/delete/:id",authMiddleware,todo.deleteTodo);

router.post("/edit/:id",authMiddleware,todo.editTodo);

module.exports = router;