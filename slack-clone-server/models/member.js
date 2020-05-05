export default (sequelize, DataTypes) => {
    const Member = sequelize.define('member', {
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, { underscored: true });

    return Member;
};