/**
 * Created by Zizy on 3/12/16.
 */
//var sqlite3 = require('sqlite3').verbose();

//数据库接口库
var util = require('util');
var sqlite3 = require('sqlite3');

sqlite3.verbose();
var db = undefined;

var todoList = {
    //userId:'matchedUserId'
};

//schema:
//CREATE  TABLE "main"."UserMatches" ("userId" VARCHAR PRIMARY KEY  NOT NULL  UNIQUE , "partnerId" VARCHAR NOT NULL )

/*
 数据库名是直接硬编码的，所以当调用connect和setup函数时，当前目录中就会生成unclenoway.sqlite文件
 */
var self = this;
exports.connect = function (callback) {
    //連接資料庫"./db/simpleTodo.sqlite"
    db = new sqlite3.Database("./db/simpleTodo.sqlite", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
        function (err) {
            if (err) {
                util.log('FAIL on connect database ' + err);
                callback(err);
            } else {
                console.log('connect to simpleTodo.sqlite success');
                //callback(null);
                //loadMemoryCache();
            }
        });
};

//var loadMemoryCache = function () {
//    self.forAll(function (err, row) {
//        if (!err) {
//            userlocal[row.id] = row.partnerId;
//        }
//    }, function () {
//        console.log(JSON.stringify(userlocal));
//
//    });
//}


exports.getTodo = function (callback) {
    //查詢所有Todo
    db.all("SELECT * FROM 'Todo-table' ", function (err, row) {

        if (err) {
            util.log('FAIL to retrieve row ' + err);
            callback(null);
        } else {
            //console.log(row);
            todoList = row;
            callback(todoList);
            console.log(todoList);
        }
    });

}

exports.addTodo = function (id, content, status, callback) {
    //新增Todo
    db.run("INSERT INTO 'Todo-table' (id, content, status) " +
        "VALUES (?, ?, ?);",
        [id, content, status],
        function (error) {
            if (error) {
                util.log('FAIL on addTodo ' + error);
                callback(error);
            } else {
                callback(null);
            }
        });
};

var r;
exports.updateTodo = function (id, callback) {
    //console.log("id=" + id);
    //更改Todo狀態
    db.get("SELECT status FROM 'Todo-table' " +
        "WHERE id = ? ", [id], function (err, row) {
        if (err) {
            util.log('FAIL on status ' + err);
            callback(err);
        } else {
            //console.log("row="+JSON.stringify(row)); //JSON.stringify(row)將row轉成JSON輸出
            r = row.status;     //r是當前id的狀態
            //console.log(r);
            callback(null);
        }

        var reverseR = r == 0 ? 1 : 0;      //如果狀態是0:未完成 改成 1:已完成 ; 如果狀態是1:已完成 改成 0:未完成
        db.run("UPDATE 'Todo-table' " +
            "SET status= ? WHERE id = ?", [reverseR, id], function (err) {
            if (err) {
                util.log('FAIL on updateTdo ' + err);
                callback(err);
            }
            else {
                //console.log('if r ==1');
                callback(null);
            }
        });

    });


}


exports.delTodoById = function (id, callback) {

    db.run("UPDATE 'Todo-table' " +
        "SET status='-1' " +
        "WHERE id = ? ",
        [id],
        function (err) {

            if (err) {
                util.log('FAIL on delTdo ' + err);
                callback(err);
            } else {
                callback(null);
            }
        });
//UPDATE "Todo-table" SET status='-1'  WHERE id in ( 1 );
}

exports.delAllComplete = function (callback) {
    //for(var index in todoList){
    //    if(todoList[index].status==1){
    //        todoList[index].status=-1;
    //    }
    //}
    db.run("UPDATE 'Todo-table' " +
        "SET status='-1' " +
        "WHERE status = 1 ",
        function (err) {

            if (err) {
                util.log('FAIL on delTdo ' + err);
                callback(err);
            } else {
                callback(null);
            }
        });
};


//exports.forAll = function(doEach, done){
//    db.each("SELECT * FROM Todo-table", function(err, row){
//        if (err){
//            util.log('FAIL to retrieve row ' + err);
//            done(err, null);
//        } else {
//            doEach(null, row);
//        }
//    }, done);
//};
