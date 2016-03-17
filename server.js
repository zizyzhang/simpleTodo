/**
 * Created by Zizy on 3/12/16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var db = require('./database.js');
db.connect();
//db.getTodo();
//updateTodo('2');


var app = express();
//var arr ;

var todoList = [
    {id: 0, status: 0, content: 'eat'},
    {id: 1, status: 1, content: 'play'}
];


var maxId = 1;


var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

app.use(allowCrossDomain);//CORS middleware


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));


app.get('/del/todo/:id', function (req, res) {
//splice


    res.json({success: delTodoById(req.paramas.id)});

});


app.get('/del/allComplete', function (req, res) {
//全刪
    delAllComplete();

    res.json({success: 1});

});
app.post('/todo', function (req, res) {
        var content = req.body.content;
        var status = req.body.status;

        maxId++;
        addTodo(maxId, content, status);
        res.json({success: 1});

    }
);

app.get('/todo', function (req, res) {
    // Pass to next layer of middleware
    res.json(getTodo(res));
});

app.get('/update/todo/:todoId', function (req, res) {
    // Pass to next layer of middleware
    res.json(updateTodo(req.paramas.id));
});


app.listen(3000, function () {
    console.log('' +
        'app listening on port 3000!');
});


function updateTodo(id) {
    db.updateTodo(id, function (err) {
        if (err) {
            res.json({success: 0});
        }
        else {
            res.json({success: 1});
        }

    });
}


function getTodo(res) {
    db.getTodo(function (err, todoList) {


        if (err) {
            res.json({success: 0});
        }
        else {
            res.json(todoList);
        }


    });

}

function addTodo(id, content, status) {
    db.addTodo(id, content, status, function (err) {
        if (err) {
            res.json({success: 0});
        }
        else {
            res.json({success: 1});
        }

    });
}


function delTodoById(id) {
    db.delTodoById(id, function (err) {
        if (err) {
            res.json({success: 0});
        }
        else {
            res.json({success: 1});
        }
    });

}

function delAllComplete() {
    db.delAllComplete(function (err) {
        if (err) {
            res.json({success: 0});
        }
        else {
            res.json({success: 1});
        }
    });
}