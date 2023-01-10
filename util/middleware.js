const { Blog, User, Session } = require("../models");
const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");

const tokenExtractor = async (req, res) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    const token = authorization.substring(7);
    console.log({ token });
    
    const found = await Session.findOne({
      where: { token },
    });
    if (!found) {
      throw new Error("Token missing or invalid");
    }
    req.decodedToken = jwt.verify(token, SECRET);
    req.token = token;
    if (req.decodedToken.id && token) {
      return;
    }
    throw new Error("Invalid token!")
  } else {
    throw new Error("Missing token")
  }
};

const userExtractor = async (req, res, next) => {
  await tokenExtractor(req, res);
  console.log(
    "req decoded token in userextractor after tokenextractor:",
    req.decodedToken
  );
  req.user = await User.findByPk(req.decodedToken.id);
  console.log({ user: req.user });
  if (req.user.disabled) {
    throw new Error("Your user has been disabled.")
  }
  next();
};

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  console.log({ blog: req.blog });
  next();
};

const errorHandler = async (err, req, res, next) => {
  res.status(400).send({ message: err.message });
};

module.exports = { blogFinder, errorHandler, userExtractor };
