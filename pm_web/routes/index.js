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
        if(req.params.area=== "north"){
            num = 500;
        }else if(req.params.area=== "all"){
            num = 1000;
        }else if(req.params.area=== "central"){
            num = 300;
        }else if(req.params.area=== "south"){
            num = 400;
        }else if(req.params.area=== "east"){
            num = 500;
        }
        //  jmeter ok
        request.query('SELECT TOP '+num+' * FROM [xianboy].[dbo].[EnvironmentData] ORDER BY [evTime] desc', function (err, result) {
            if (err) 
                return next(err);
            res.json(result.recordset);     
        }); 
    //}
};
exports.movie= function(req, res) {
    res.render('movie');
};

