

$(document).ready(function(){


    getTodo();

    $('#delAllComplete').click(function(){
        deleteAllTodo();
    })

    $('#todo').keypress(function (event) {

        if (event.keyCode == 13) {
            postTodo();

            $('#todo').val("");
        }

    });



});


function getTodo(){
    //var todoList=[{id:"0",content:"5",status:0},{id:"1",content:"6",status:0}];
    var todoList=[];
    $.getJson("http://localhost:3000/todo",function(data){
        todoList=data;

        for(var i=0;i<trytodo.length;i++) {
            $('#todo-list').html($('#todo-list').html() +
                "<li  ><div><input class='toggle' type='checkbox'><label  style='font-size: 16pt;'>" + todoList[i].content + "</label>" +
                "<button class='text-right' onclick='deletetodo("+todoList[i].id+")'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button></div></li>");
        }

     });


}

function postTodo(){
    var todo= $('#todo').val();
    $.post('http://localhost:3000/todo',{status:0,content:todo},function(data){
        getTodo();
    });
}


function deleteTodo(index){
    console.log(index);
    $.get("http://localhost:3000/del/todo/"+index,function(data){

    });

}

function deleteAllTodo(){
    $.get("http://localhost:3000/del/allComplete/",function(data){

    });
}

