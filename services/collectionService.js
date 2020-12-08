const { sequelize, Project, User, Image } = require("../models");

module.exports = {
    createProject: async (imgInfo, userInfo, projectInfo) => {
        const t = await sequelize.transaction();
        try {
            const user = await User.create(
                {
                    userName: userInfo.madeBy,
                    userImg: userInfo.userImg,
                    active: userInfo.active
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
                attributes: ["userImg", ["userName", "madeBy"], "active"],
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
    },
    getProject: async () => {
        try {
            const collectionInfo = await Project.findAll({
                include: [
                    {
                        model: User
                    },
                    {
                        model: Image
                    }
                ],
                attributes: {
                    exclude: ["UserId"]
                }
            });
            return collectionInfo;
        } catch (err) {
            console.log(err);
            throw new Error("Server error");
        }
    }
};
