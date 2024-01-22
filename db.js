const jwt = require("jsonwebtoken");
const articles = [
  {
    id: 1,
    title: "Title 1",
    description: "Description 1",
  },
  {
    id: 2,
    title: "Title 2",
    description: "Description 2",
  },
];

const users = [
  {
    id: 1,
    name: "User 1",
    username: "user1",
    email: "halo@mail.com",
    password: "123456",
  },
  {
    id: 2,
    name: "User 2",
    username: "user2",
    email: "halo2@mail.com",
    password: "123456",
  },
];

class Articles {
  static findAll() {
    return new Promise((resolve) => {
      resolve(articles);
    });
  }
  static createArticles(title, user) {
    console.log(user);
    console.log(user.name);
    const data = {
      id: articles.length + 1,
      title,
      user: user.id,
    };
    articles.push(data);
    return data;
  }
}

class Users {
  static login(username, password) {
    const user = users.find((user) => user.username === username);
    if (!user || user.password !== password) {
      return null;
    }
    const token = jwt.sign({ id: user.id, username: user.username }, "footbar");
    return { ...user, token };
  }

  static getUser(id) {
    return users.find((user) => user.id === id);
  }
}

module.exports = { Articles, Users };
