const Sequelize = require('sequelize'); // sequelize module import
const fs = require('fs'); // fs module import
const path = require('path'); // path module import

require('dotenv').config();

const env = process.env.NODE_ENV || 'local'; // process env or local in default.
const config = require('../../config/config.json')[env];

// connection instances creation for SQl with sequelize.
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
        port: config.port,
        pool: {
            max: config.pool.max,
            min: 0,
            acquire: config.pool.acquire,
            idle: config.pool.idle,
        },
        define: config.define,
        logging: config.logging,
    }
);

const db = {};

fs.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js')
    .forEach((file) => {
        // var model = sequelize.import(path.join(__dirname, file));
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes,
        );
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// ------------------------------------------------


module.exports = db;
