
var db = require('./database.js');
db.connect(function(err){
    console.log("Err: " +err.toString());
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

db.getTodo(function(todoList){

});

//db.delAllComplete(function(err){
//    console.log(err);
//});
