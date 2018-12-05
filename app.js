const app = require("express")();
const jwt = require("jsonwebtoken");

app.get("/api", (req, res) => {
  res.json({
    message: "This is a message from GET ROUTE OF _API_"
  });
});

app.post("/api/posts", verifyToken, (req, res) => {
  // getting and verifying the Token
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "This is a POSTS route!",
        authData
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  const user = {
    name: "rehan",
    age: 19,
    email: "rehansattar117@gmail.com"
  };

  jwt.sign({ user }, "secretkey", (err, token) => {
    if (err) {
      res.json({ err });
      return;
    }
    res.json({
      token
    });
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  // pull out the header from the auth header => header looks like: Bearer <access_token>
  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1];
    req.token = token;
    console.log(req.token);
    next();
  } else {
    console.log("Token Insider!");
    res.sendStatus(403);
  }
}

app.listen(5000, err =>
  err
    ? console.log("Error While Starting the server ", err)
    : console.log("Server Started on PORT: 5000")
);
