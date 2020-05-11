export default (sequelize, DataTypes) => {
    const Team = sequelize.define('team', {
        name: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isAlphanumeric: {
                    msg: "Team name must be alpha numeric only"
                },
                len: {
                    args: [5, 10],
                    msg: "Team name must be 5 to 15 characters long"
                }
            }
        },
    }, { underscored: true });

    Team.associate = (models) => {
        models.Team.belongsToMany(models.User, {
            through: models.Member,
            foreignKey: {
                name: 'teamId',
                field: 'team_id'
            }
        });
        models.Team.belongsTo(models.User, {
            foreignKey: {
                name: 'owner',
                field: 'owner'
            }
        });
    };

    return Team;
};