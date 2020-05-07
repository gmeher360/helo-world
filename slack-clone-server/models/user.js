export default (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isAlphanumeric: {
                    msg: 'user name must be alpha numeric only'
                },
                notEmpty: {
                    msg: 'user name field can not be empty'
                },
                len: {
                    args: [4, 15],
                    msg: "user name must be between 4 and 15 character long"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'email field must be a valid email',
                },
                notEmpty: {
                    msg: 'email field can not be empty'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'password field can not be empty',
                }

            }
        }
    }, { underscored: true });

    User.associate = (models) => {
        models.User.belongsToMany(models.Team, {
            through: 'member',
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            }
        });
        models.User.belongsToMany(models.Channel, {
            through: 'channel_member',
            foreignKey: {
                name: 'userId',
                field: ' user_id'
            }
        })
    };

    return User;
};