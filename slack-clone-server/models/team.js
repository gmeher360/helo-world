export default (sequelize, DataTypes) => {
    const Team = sequelize.define('team', {
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
    });

    Team.associate = (models) => {
        models.Team.belongsToMany(models.User, {
            through: 'member',
            foreignKey: 'teamId',
        });
        models.Team.belongsTo(models.User, {
            foreignKey: 'owner',
        });
    };

    return Team;
};