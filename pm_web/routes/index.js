var sql=require('mssql');
//config for your database
var config={
    user:'xianboy1234',
    password:'1234',
    server:'10.32.20.154',   
    database:'xianboy'
 };
//  jmeter ok
var connection = sql.connect(config, function (err) {
    if (err)
        throw err; 
});

  


exports.index = function(req, res) {
    res.render('index');
};
exports.twData = function(req, res) {
    var area = req.params.area;
    var request = new sql.Request();
    var num = 0 ; 
    if(req.params.area=== "all"){    // http://10.105.27.172:3000/api/taiwan/all
        console.log("all");
        num = 10000;
        request.query('SELECT TOP '+num+' * FROM [xianboy].[dbo].[EnvironmentData] ORDER BY [evTime] desc', function (err, result) {
            if (err) 
                return next(err); 
            var request2 = new sql.Request();
            request.query('SELECT TOP 1 * FROM [xianboy].[dbo].[EnvironmentData] ORDER BY [evTime] desc', function (err, result2) {
                if (err) 
                    return next(err); 
                res.json(result2.recordset); 
            });
        }); 
    }else{
        if(req.params.area=== "north"){
            num = 5000;
        }else if(req.params.area=== "central"){
            num = 1000;
        }else if(req.params.area=== "south"){
            num = 100;
        }else if(req.params.area=== "east"){
            num = 10;
        }
        //  jmeter ok
        request.query('SELECT TOP '+num+' * FROM [xianboy].[dbo].[EnvironmentData] ORDER BY [evTime] desc', function (err, result) {
            if (err) 
                return next(err);
            console.log(result.recordset)
            res.json(result.recordset);     

        }); 
    }
/*

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

