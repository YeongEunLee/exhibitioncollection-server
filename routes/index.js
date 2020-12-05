var express = require("express");
var router = express.Router();

const projectRouter = require("./project");

router.use("/projects", projectRouter);
/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("index", { title: "Express" });
});

module.exports = router;
