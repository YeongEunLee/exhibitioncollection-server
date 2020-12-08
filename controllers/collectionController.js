const { User, Image, Project } = require("../models");
const ut = require("../modules/util");
const rm = require("../modules/responseMessage");
const sc = require("../modules/statusCode");
const collectionService = require("../services/collectionService");

module.exports = {
    createProject: async (req, res, next) => {
        const {
            name,
            subName,
            category,
            term,
            detail,
            madeBy,
            active
        } = req.body;

        if (!req.files) {
            return res
                .status(sc.BAD_REQUEST)
                .json(ut.fail(sc.BAD_REQUEST, "필요한 값이 없습니다(file)"));
        }
        const img = req.files.img[0].location;
        const userImg = req.files.userImg[0].location;

        if (
            !(
                img &&
                name &&
                subName &&
                category &&
                term &&
                detail &&
                madeBy &&
                userImg &&
                active
            )
        ) {
            return res
                .status(sc.BAD_REQUEST)
                .json(ut.fail(sc.BAD_REQUEST, "필요한 값이 없습니다"));
        }

        const imgParams = { img };
        const userParams = { userImg, madeBy, active };
        const projectParams = { name, subName, category, term, detail };

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
    },
    getProject: async (req, res, next) => {
        try {
            const collectionInfo = await collectionService.getProject();

            return res
                .status(sc.OK)
                .json(ut.success(sc.OK, "프로젝트 조회!", collectionInfo));
        } catch (err) {
            console.log(err);
            return res
                .status(sc.INTERNAL_SERVER_ERROR)
                .json(ut.fail(sc.INTERNAL_SERVER_ERROR, "서버 오류"));
        }
    },

    deleteProject: async (req, res) => {
        const id = req.params.id;
        try {
            const project = await Project.destroy({
                where: {
                    id
                }
            });
            return res
                .status(sc.OK)
                .send(ut.success(sc.OK, rm.DELETE_PROJECT_SUCCESS));
        } catch (err) {
            console.log(err);
            return res
                .status(sc.INTERNAL_SERVER_ERROR)
                .send(
                    ut.fail(sc.INTERNAL_SERVER_ERROR, rm.DELETE_PROJECT_FAIL)
                );
        }
    }
};
