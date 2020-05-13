var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var _ = require("underscore");
var PORT = process.env.PORT || 3000;


/*database bağlantısı */
var db = require("./db");

//applicationımda body parserı kullan demiş oluyoruz..
app.use(bodyParser.json());

/* get işlemi */
app.get("/todos", function(req, res){
    db.Todo.findAll({
        where : {
            completed : false
        }
    }).then(function(todos){
        res.json(todos)
    })
});

//post metoduyla kaydetme işlemi yapılır
app.post("/todos", function(req, res){
    let body = _.pick(req.body, "description", "completed");

    db.Todo.create(body).then(function(todo){
        res.json(todo.toJSON());
    }, function(e){
        res.status(500).send();
    })
});

//put metoduyla güncelleme işlemi yapılır
app.put("/todos/:id", function(req, res){
    
    let todoId = req.params.id;
    let body = _.pick(req.body, "description", "completed");

    let attributes = {};

    if(body.hasOwnProperty("description")){
        attributes.description = body.description;
    }

    if(body.hasOwnProperty("completed")){
        attributes.completed = body.completed;
    }

    db.Todo.findOne({
        where : {
            id : todoId
        }
    }).then(function(todo){
        if(todo){
            todo.update(attributes).then(function(todo){
                res.json(todo.toJSON());
            }, function(){
                res.status(400).send();
            }) 
        }else{
            res.status(404).send({
                error : "aradığınız id bulunamadı.."
            })
        }

    }, function(){
        res.status(500).send();
    })
});

//delete metoduyla silme işlemi yapılır..
app.delete("/todos/:id", function(req, res){
    
    let todoId = req.params.id;

    db.Todo.destroy({
        where : {
            id : todoId
        }
    }).then(function(rowDeleted){
        if(rowDeleted === 0 ){
            res.status(404).send({
                error : "Silmek istediginiz kayit bulunamamistir..."
            });
        }else{
            //başarılı no content
            res.status(204).send();
        }
    }, function(){
        res.status(500).send();
    })
});


db.sequelize.sync().then(function(){
    app.listen(PORT, function(){
        console.log("Express listening on " + PORT + "!");
    });
});