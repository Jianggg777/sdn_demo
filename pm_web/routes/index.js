var sql=require('mssql');
var io= require('socket.io');
//config for your database
 var config={
    user:'xianboy1234',
    password:'1234',
    server:'10.32.20.154',   //這邊要注意一下!!
    database:'xianboy'
 };
  


exports.index = function(req, res) {
    res.render('index');
};
exports.twData = function(req, res) {
    var area = req.params.area;
    var num=0 ; 
    if(req.params.area=== "all"){    // http://10.105.27.172:3000/api/taiwan/all
        num = 10000;
    }else if(req.params.area=== "north"){
        num = 5000;
    }else if(req.params.area=== "central"){
        num = 1000;
    }else if(req.params.area=== "south"){
        num = 100;
    }else if(req.params.area=== "east"){
        num = 10;
    }
    var objects = [];



/*
io.sockets.on('adminConnect', function (email) {
    connection = mysql.createConnection(config); // db_config has all details of database
    connection.connect(); // no problem in connection
    connection.query('SELECT TOP '+num+' * FROM [xianboy].[dbo].[EnvironmentData]', function (err, results, fields) {
        if (err) throw err;
        if (results[0]) {
            // Some code
            res.json(recordsets.recordset);
        } else {
            console.log("no id");
        }
    });
    connection.end(); // its giving error "Cannot enqueue Query after invoking quit."
});


new sql.ConnectionPool(config).connect().then(pool => {
  return pool.request.query('SELECT TOP '+num+' * FROM [xianboy].[dbo].[EnvironmentData]')
  }).then(result => {
    res.json(recordsets.recordset);
    //let rows = result.recordset
    //res.setHeader('Access-Control-Allow-Origin', '*')
    //res.status(200).json(rows);
    sql.close();
  }).catch(err => {
    //res.status(500).send({ message: "${err}"})
    console.log(err);
    sql.close();
  });


 
    //connect to your database
    sql.connect(config,function (err) {
        if(err) 
            console.log(err);
     
        //create Request object
        var request = new sql.Request();
        request.query('SELECT TOP '+num+' * FROM [xianboy].[dbo].[EnvironmentData]',function(err,recordsets){

            if(err){
                console.log(err);
            }else{           
                res.json(recordsets.recordset);
            }
            sql.close();
        });

    });
*/
 
};

