
export default (sequelize, DataTypes) => {
    const Message = sequelize.define('message', {
        text: DataTypes.STRING,
    }, { underscore: true });

    Message.associate = (models) => {
        // 1:M
        models.Message.belongsTo(models.Channel, {
            foreignKey: {
                name: 'channelId',
                field: 'channel_id'
            }
        });
        models.Message.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            }
        });
    };

    return Message;
};