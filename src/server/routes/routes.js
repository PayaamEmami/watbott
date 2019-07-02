const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.session && req.session.passport && req.session.passport.user) {
    res.redirect(process.env.BASE_URL + "/dashboard");
  } else {
    res.redirect(process.env.BASE_URL);
  }
});

module.exports = router;
