const { Projects } = require("../models");

module.exports = {
    getProjects: async () => {
        const projects = await Projects.findAll({});

        return projects;
    }
};
