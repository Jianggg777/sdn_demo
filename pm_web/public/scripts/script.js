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
}