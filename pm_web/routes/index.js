exports.index = function ( req, res ){
   res.render('index');
};
exports.twData = function ( req, res ){
   var area = req.params.area;
   console.log("area :"+area);
   // send the area data
   res.render('index');
};
