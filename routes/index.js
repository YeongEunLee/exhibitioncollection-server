var express = require("express");
var router = express.Router();

const collectionRouter = require("./collectionRoute");

router.use(collectionRouter);
/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("index", { title: "Express" });
});

module.exports = router;
