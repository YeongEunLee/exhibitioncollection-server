const ut = require("../modules/util");
const rm = require("../modules/responseMessage");
const sc = require("../modules/statusCode");
const projectService = require("../services/projectService");

module.exports = {
    getProjects: async (req, res) => {
        const projects = await projectService.getProjects();

        return res
            .status(sc.OK)
            .send(ut.success(sc.OK, rm.READ_POST_SUCCESS, { projects }));
    }
};
