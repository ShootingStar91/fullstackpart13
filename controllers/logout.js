const { Session } = require('../models')
const router = require('express').Router()
const { userExtractor } = require("../util/middleware");

router.delete('/api/logout', userExtractor, async (req, res) => {
    const token = req.token;
    const deletedUser = await Session.destroy({ where: { token } })
    if (!deletedUser) {
        return res.status(200).send()
    }
    return res.status(200).send();
})

module.exports = router;
