module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "Image",
        {
            img: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            timestamps: false
        }
    );
};
