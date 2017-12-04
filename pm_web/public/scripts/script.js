$(document).ready(function() {
    // RDW img map
    $('img[usemap]').rwdImageMaps();
    // Initialize popup as usual
    $('.popup-link').magnificPopup({
        // Delay in milliseconds before popup is removed
        removalDelay: 300,
        // Class that is added to popup wrapper and background
        // make it unique to apply your CSS animations just to this exact popup
        mainClass: 'mfp-fade'
    });
    $('.ajax-popup-link').magnificPopup({
        type: 'ajax'
    });
});

function dynamicData(area) {
    console.log("hi???");
    console.log("area???"+area);
    var objects = [];
    $.ajax({
        url: "/api/taiwan/"+area,
        type: "GET",
        //↓天辣辣辣辣這行太神了!!!!傳回值終於可以存惹感動
        async: false,
        success: function(data) {
            for (i = 0; i < data.length; i++) {
                var inner = {   
                    "usrUserName": data[i].usrUserName, 
                    "stId": data[i].stId, 
                    "srId": data[i].srId, 
                    "evTime": data[i].evTime, 
                    "evValue": data[i].evValue
                }
                objects.push(inner);
            }
            objects = data;
            //console.log(objects);        
        }
    });
    //塞進div
    var str = "<p>";
    var i;
    for(i=0;i<objects.length;i++){
        str += objects[i].usrUserName + " " + objects[i].stId+ " "+objects[i].srId+ " "+objects[i].evTime+ " "+objects[i].evValue+ "<br>";

    }
    str += "</p>";
    $("#tw_content").html(str);
    // 顯示
    //document.getElementById('tw_button').click();
    $( "#tw_button" ).click();
}
