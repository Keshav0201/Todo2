const db = require("../config/db");

exports.getTodos = (req, res) => {
  db.query(
    "SELECT * FROM todos WHERE user_id=?",
    [req.userId],
    (err, todos) => {
      res.render("dashboard", { todos });
    }
  );
};

exports.addTodo = (req, res) => {
  const task = req.body.task;

  db.query(
    "INSERT INTO todos(user_id,task) VALUES (?,?)",
    [req.userId, task],
    () => {
      res.redirect("/todos/dashboard");
    }
  );
};

exports.deleteTodo = (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM todos WHERE id=? AND user_id=?",
    [id, req.userId],
    () => {
      res.redirect("/todos/dashboard");
    }
  );
};

exports.editTodo = (req, res) => {
  const id = req.params.id;
  const task = req.body.task;

  db.query("UPDATE todos SET task=? WHERE id=?", [task, id], () => {
    res.redirect("/todos/dashboard");
  });
};
