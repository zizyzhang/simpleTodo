

$(document).ready(function(){
    $("#tpl").load('./template/todoItem.html',null ,function(){
        getTodo();
    });

    $.ajaxSetup({
        // Disable caching of AJAX responses
        cache: false
    });




    $('#delAllComplete').click(function(){
        deleteAllTodo();
    });



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


    $.getJSON('http://localhost:3000/todo',function(data){

         var todoList=$('#todo-list');


        todoList.html("");

        for(var i=0;i<data.length;i++) {
            //console.log(data[i].id);
            if (data[i].status== -1 )continue;

            var  compiled=  _.template($('#tpl').html());

            var li_class=data[i].status==1?'completed':'';
            var isChecked =data[i].status==1?true:false;

            console.log(JSON.stringify(data));

            todoList.html(todoList.html()+ compiled({content:data[i].content ,id:data[i].id,li_class: li_class}));
            if(isChecked){
                $('#check_' + data[i].id).attr('checked','checked');

            }else{
                $('#check_' + data[i].id).attr('checked',null);
            }

            //todoList.html(todoList.html() +
            //
            //    "<li><div><input class='toggle' type='checkbox'  "
            //    + "id=' " + data[i].id + " ' onclick='selectTodo(" + data[i].id  + ")'>" +
            //    "<label  style='font-size: 16pt;'>" + data[i].content + "</label>" +
            //    "<button class='text-right' onclick='deletetodo("+data[i].id+")'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button></div></li>");
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
        getTodo();
    });

}

function deleteAllTodo(){

    $.get("http://localhost:3000/del/allComplete/",function(data){
        getTodo();


    });
}


function selectTodo(f){
    console.log(f);

    $.get("http://localhost:3000/update/todo/"+f,function(){
        getTodo();
    });

}

