// models/todo.js
module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("Todo", {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        task: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isCompleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {
        freezeTableName: true,
        timestamps: true
    });
    return Todo;
};
