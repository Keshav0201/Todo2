const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users(email,password) VALUES (?,?)",
    [email, hashedPassword],
    (err) => {
      if (err) {
        return res.send("User already exists");
      }

      res.redirect("/login");
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err, result) => {
      if (result.length === 0) {
        return res.send("User not found");
      }

      const user = result[0];

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return res.send("Incorrect password");
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("token", token);

      res.redirect("/todos/dashboard");
    }
  );
};
