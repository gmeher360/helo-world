export default (sequelize, DataTypes) => {
    const Member = sequelize.define('member', {
    }, { underscored: true });

    return Member;
};