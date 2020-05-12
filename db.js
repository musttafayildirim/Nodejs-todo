var Sequelize = require("sequelize");
var sequelize = new Sequelize("todo", "root", "", {
    host : 'localhost',
    port : '3307',
    dialect : 'mysql'
});

var db = {};

db.Todo = sequelize.import(__dirname + "/models/todo.js");
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;