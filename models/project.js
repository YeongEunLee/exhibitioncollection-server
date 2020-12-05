module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "Projects",
        {
            idx: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            img: {
                type: DataTypes.TEXT
            },
            userImg: {
                type: DataTypes.TEXT
            },
            name: {
                type: DataTypes.STRING(50)
            },
            subName: {
                type: DataTypes.STRING(200)
            },
            category: {
                type: DataTypes.STRING(200)
            },
            term: {
                type: DataTypes.STRING(50)
            },
            madeBy: {
                type: DataTypes.STRING(50)
            },
            active: {
                type: DataTypes.STRING(50)
            },
            detail: {
                type: DataTypes.STRING(200)
            }
        },
        {
            freezeTableName: true,
            timetables: true
        }
    );
};
