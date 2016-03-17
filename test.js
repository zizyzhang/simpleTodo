
var db = require('./database.js');
db.connect(function(err){
    if(err){

    }
 });

//db.updateTodo(4,function(err){
//    console.log(err);
//});

//db.addTodo('6','0','mocha',function(err){
//    console.log(err);
//});

//db.delTodoById(6,function(err){
//    console.log(err)
//});


//db.updateTodo(10, function (err) {
//    if (err) {
//
//    }
//    else {
//
//    }
//
//});

db.getTodo(function(todoList){

});


//
//db.getMaxId(function(err,row){
//    if(!err){
//        console.log(row);
//    }
//});
//

//db.delAllComplete(function(err){
//    console.log(err);
//});
