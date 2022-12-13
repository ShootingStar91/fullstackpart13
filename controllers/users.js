const { User, Blog, ReadingList } = require("../models");
const router = require("express").Router();

router.get("/api/users", async (req, res) => {
  const users = await User.findAll({ include: { model: Blog } });
  res.json(users);
});

router.get("/api/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: Blog,
      as: "readings",
      attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
      through: {
        attributes: ['id', 'read'],
      },
    },
  });
  res.json(user);
});

router.post("/api/users", async (req, res) => {
  const newUser = await User.create({
    username: req.body.username,
    name: req.body.name,
  });
  res.json(newUser);
});

router.put("/api/users/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if (user) {
    user.name = req.body.name;
  }
  await user.save();
  res.status(200).send();
});

module.exports = router;
