const { ReadingList, Blog } = require('../models')
const router = require('express').Router()
const { userExtractor } = require("../util/middleware");

router.post('/api/readinglists', async (req, res) => {
    const readinglistAddition = await ReadingList.create({
        blogId: req.body.blog_id,
        userId: req.body.user_id
    })
    res.json(readinglistAddition)
})

router.put('/api/readinglists/:id', userExtractor, async (req, res) => {
  const readingListEntry = await ReadingList.findByPk(req.params.id);
  if (readingListEntry.userId !== req.user.id) {
    throw new Error("You can only change your own readinglists!");
  }
  readingListEntry.read = req.body.read;
  await readingListEntry.save();
  res.json(readingListEntry);
})


module.exports = router;
