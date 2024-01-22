const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db");
const authMiddleware = require("./authMiddleware");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/articles", authMiddleware, (req, res) => {
  db.Articles.findAll().then((result) => {
    res.json(result);
  });
});

app.post("/articles", authMiddleware, (req, res) => {
  const article = db.Articles.createArticles(req.body.title, req.user);
  res.json(article);
});

app.post("/login", (req, res) => {
  const user = db.Users.login(req.body.username, req.body.password);
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  res.send(user);
});

app.listen(3020, () => {
  console.log("server is running on port 3020");
});
