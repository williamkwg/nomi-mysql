/*var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '12345678',
    database : 'test'
});

connection.connect();

connection.query('select count(*) a from user', function (error, results, fields) {
    if (error) throw error;

    console.log('The solution is: ', results);
});*/



let m = require('./index.js');

let a = new m({
    host     : '127.0.0.1',
    user     : 'root',
    port     :  3306,
    password : '12345678',
    database : 'test'
});

let connection = a.getConnection().then(function(con){

    con.query('select count(*) a from user').then(function (results) {
        console.log(arguments);
        //if (error) throw error;

        console.log('The solution is: ', results);
    }).then(()=>{
        process.exit();
    });

});


