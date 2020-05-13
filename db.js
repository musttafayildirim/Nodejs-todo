var Sequelize = require("sequelize");
var sequelize = new Sequelize("todo", "root", "", {
    host : 'localhost',
    port : '3306',
    dialect : 'mysql'
});

var db = {};

db.Todo = sequelize.import(__dirname + "/models/todo.js");
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;