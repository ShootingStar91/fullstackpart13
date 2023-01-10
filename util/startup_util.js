const { Session } = require("../models");
const jwt = require("jsonwebtoken");

/* Deletes expired tokens from sessions table.
   This is because the backend allows multiple tokens for the same user to
   exist, so logout does not delete all users tokens from session table,
   which means there could be many expired/invalid tokens present.
   Run this at server startup once */
const deleteExpiredTokens = async () => {
  console.log("Running deleteExpiredTokens...");
  const sessions = await Session.findAll({});
  for (session of sessions) {
    console.log({session})
    try {
      const decodedToken = jwt.verify(session.token);
    } catch (e) {
      await session.destroy();
      console.log("Invalid session deleted");
    }
  }
};

module.exports = { deleteExpiredTokens }