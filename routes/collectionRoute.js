var express = require("express");
var router = express.Router();

const collectionController = require("../controllers/collectionController");
/* Create Project. */
router.get("/projects", collectionController.createProject);

module.exports = router;
