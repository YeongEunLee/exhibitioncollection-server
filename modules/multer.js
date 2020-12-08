const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

aws.config.loadFromPath(__dirname + "/../config/s3.json");

const s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
        s3,
        bucket: "baemin",
        acl: "public-read",
        key: function(req, file, cb) {
            if (file.fieldname == "img") {
                cb(
                    null,
                    "images/projectImages/" +
                        Date.now() +
                        "." +
                        file.originalname.split(".").pop()
                );
            }

            if (file.fieldname == "userImg") {
                cb(
                    null,
                    "images/userImages/" +
                        Date.now() +
                        "." +
                        file.originalname.split(".").pop()
                );
            }
        }
    })
});

module.exports = upload;
