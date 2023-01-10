const router = require("express").Router();
const { Blog, User } = require("../models");
const { blogFinder, userExtractor } = require("../util/middleware");
const { Op } = require("sequelize");

router.get("/api/blogs", blogFinder, async (req, res) => {
  let where = {};
  if (req.query.search) {
    where = {
      [Op.or]: {
        title: {
          [Op.substring]: req.query.search,
        },
        author: {
          [Op.substring]: req.query.search,
        },
      },
    };
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
    where,
    order: [["likes", "DESC"]],
  });
  res.json(blogs);
});

router.delete(
  "/api/blogs/:id",
  [blogFinder, userExtractor],
  async (req, res) => {
    if (req.user.id === req.blog.userId) {
      await req.blog.destroy();
    } else {
      throw new Error("Only creator of blog can delete it");
    }
    res.json(req.blog);
  }
);

router.post("/api/blogs", [blogFinder, userExtractor], async (req, res) => {
  console.log("post api blogs")
  try {
    const newBlog = await Blog.create({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      userId: req.user.id,
      year: req.body.year,
    });
    res.json(newBlog);
  } catch (e) {
    return res
      .status(400)
      .send({ message: "Year must be earliest 1991, latest current year" });
  }
});

router.put("/api/blogs/:id", blogFinder, async (req, res) => {
  req.blog.likes = req.body.likes;
  await req.blog.save();
  res.status(200).send();
});

module.exports = router;
