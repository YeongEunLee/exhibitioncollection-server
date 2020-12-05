var express = require("express");
var router = express.Router();

const projectController = require("../controllers/projectController");
/* GET users listing. */
router.get("/", projectController.getProjects);

module.exports = router;
