export default (sequelize, DataTypes) => {
    const Team = sequelize.define('team', {
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
    }, { underscored: true });

    Team.associate = (models) => {
        models.Team.belongsToMany(models.User, {
            through: 'member',
            foreignKey: {
                name: 'teamId',
                field: 'team_id'
            }
        });
        models.Team.belongsTo(models.User, {
            foreignKey: {
                name: 'owner',
                field: 'team_id'
            }
        });
    };

    return Team;
};