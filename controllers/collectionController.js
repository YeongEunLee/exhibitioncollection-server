const ut = require("../modules/util");
const rm = require("../modules/responseMessage");
const sc = require("../modules/statusCode");
const collectionService = require("../services/collectionService");

module.exports = {
    createProject: async (req, res, next) => {
        const {
            img,
            name,
            subName,
            category,
            term,
            detail,
            userImg,
            userName,
            active
        } = req.body;

        const imgParams = { img };
        const userParams = { userImg, userName, active };
        const projectParams = { name, subName, category, term, detail };

        if (!(img || name || subName || category || term || detail)) {
            return res
                .status(sc.BAD_REQUEST)
                .json(ut.fail(sc.BAD_REQUEST, "필요한 값이 없습니다"));
        }

        try {
            const collectionInfo = await collectionService.createProject(
                imgParams,
                userParams,
                projectParams
            );

            return res
                .status(sc.OK)
                .json(ut.success(sc.OK, "프로젝트 생성!", collectionInfo));
        } catch (err) {
            console.log(err);
            return res
                .status(sc.INTERNAL_SERVER_ERROR)
                .json(ut.fail(sc.INTERNAL_SERVER_ERROR, "서버 오류"));
        }
    }
};
