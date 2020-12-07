const { sequelize, Project, User, Image } = require("../models");

module.exports = {
    createProject: async (imgInfo, userInfo, projectInfo) => {
        const t = await sequelize.transaction();

        try {
            const user = await User.create(
                {
                    ...userInfo
                },
                { transaction: t }
            );
            const project = await Project.create(
                {
                    ...projectInfo
                },
                { transaction: t }
            );
            const image = await Image.create(
                {
                    ...imgInfo
                },
                { transaction: t }
            );

            await project.addImage(image, { transaction: t });
            await user.addProject(project, { transaction: t });

            await t.commit();

            const collectionInfo = await User.findOne({
                include: [
                    {
                        model: Project,
                        include: [
                            {
                                model: Image,
                                attributes: ["img"]
                            }
                        ],
                        attributes: {
                            exclude: ["UserId"]
                        }
                    }
                ],
                attributes: { exclude: ["id"] },
                where: {
                    id: user.id
                }
            });

            return collectionInfo;
        } catch (err) {
            await t.rollback();
            console.log(err);
            throw new Error("Server error");
        }
    }
};
