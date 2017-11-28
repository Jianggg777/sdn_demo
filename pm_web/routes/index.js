exports.index = function(req, res) {
    res.render('index');
};
exports.twData = function(req, res) {
    var area = req.params.area;
    console.log("area :" + area);
    var data = "MESSAGE";
    // send the area data
    /*
    res.json({
        area: req.params.area,
        message: 'The get api : ' + data
    });*/
    var objects = [];
    var js = {
        area: req.params.area,
        message: 'The get api : ' + data
    };
    var js2 = {
        area: "wow",
        message: "HI"
    };
    objects.push(js);
    objects.push(js2);
    objects.push(js);
    res.json(objects);
};