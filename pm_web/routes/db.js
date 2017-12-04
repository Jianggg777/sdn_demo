// db.js 
var mssql = require("mssql"); 
var dbConfig={
    user:'xianboy1234',
    password:'1234',
    server:'10.32.20.154',   //這邊要注意一下!!
    database:'xianboy'
 };
  

var connection = mssql.connect(dbConfig, function (err) {
    if (err)
        throw err; 
});

module.exports = connection; 