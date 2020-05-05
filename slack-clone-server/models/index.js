import Sequelize from 'sequelize';
var fs = require('fs');
var path = require('path');
const basename = path.basename(__filename);
const sequelize = new Sequelize('slack', 'postgres', 'postgres', {
    dialect: 'postgres',
    define: {
        underscored: true,
    },
});

const models = {}

models.sequelize = sequelize;
models.Sequelize = Sequelize;
models.User = require('./user.js').default(sequelize, Sequelize);
models.Member = require('./member.js').default(sequelize, Sequelize);
models.Team = require('./team.js').default(sequelize, Sequelize);
models.Channel = require('./channel.js').default(sequelize, Sequelize);
models.Message = require('./message.js').default(sequelize, Sequelize);

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});



module.exports = models;