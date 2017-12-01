//var ip_port = "10.32.21.67:8080";
var ip_port = "192.168.3.20:8080";


var nodes = [];
var edges = [];
var network = null;

var DIR = '/bower_components/visjs/img/refresh-cl/';
var EDGE_LENGTH_MAIN = 50;
var EDGE_LENGTH_SUB = 50;


function draw() {
    // create a network
    var container = document.getElementById('mynetwork');

    var data = {
        nodes: nodes,
        edges: edges
    };

    var options = {
        autoResize: true,
        height: '100%',
        width: '100%'
    };

    network = new vis.Network(container, data, options);
    /*
    // skip element
    network.on("showPopup", function(params) {
        var id = params;
        //console.log("pop " + id);
        
        if (params.charAt(0) == 's') {
            var id = params.substring(1);
            network["body"]["nodes"][params]["options"]["title"] = parseFlows(id);
            console.log("id"+id);
        }
    });
    */
    //click item
    network.on("click", function(object) {
        /*
        if (object.nodes!="" && object.nodes[0].charAt(0) != 's') {
            // ask for the device info
            $("#vm_dialog").dialog("open");
        }
        */
        console.log(object.nodes[0]);
        if (object.nodes != "") {
            if(object.nodes[0].charAt(0) == 's'){
                var id = object.nodes[0].substring(1);
                $("#ovs_dialog").html(parseFlows(id));
                $("#ovs_dialog").dialog("open");
            }else{
                // ask for the device info
                $("#vm_setting_form").dialog("open");
            }
        }
        /*
        var output = '';
        for (var property in object) {
            output += property + ': ' + object[property] + '; ';
        }
        console.log("click " + output);
        
        console.log("click " + object.nodes);
        */
    });

}

loadSwitches();


function loadExternalLinks(hosts) {

    var url = "http://" + ip_port + "/wm/topology/external-links/json";

    $.ajax({
        url: url,
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                edges.push({
                    from: "s" + data[i]["src-switch"],
                    to: "s" + data[i]["dst-switch"],
                    length: EDGE_LENGTH_MAIN,
                    title: data[i]["src-switch"] + "/" + data[i]["src-port"] + "<br>" + data[i]["dst-switch"] + "/" + data[i]["dst-port"],
                    color: 'red',
                    width: 4
                });
            }

            for (var i = 0; i < hosts.length; i++) {
                if (hosts[i]["attachmentPoint"].length > 0) {
                    if (hosts[i].hasOwnProperty("trueAttachmentPoint") && hosts[i]["trueAttachmentPoint"][0] != null) {
                        edges.push({
                            from: "h" + hosts[i]["mac"],
                            to: "s" + hosts[i]["trueAttachmentPoint"][0].switch,
                            length: EDGE_LENGTH_MAIN,
                            title: hosts[i]["trueAttachmentPoint"][0].switch+"/" + hosts[i]["trueAttachmentPoint"][0].port,
                            color: 'green',
                            width: 2
                        });
                    } else {
                        edges.push({
                            from: "h" + hosts[i]["mac"],
                            to: "s" + hosts[i]["attachmentPoint"][0].switch,
                            length: EDGE_LENGTH_MAIN,
                            title: hosts[i]["attachmentPoint"][0].switch+"/" + hosts[i]["attachmentPoint"][0].port,
                            color: 'green',
                            width: 2
                        });
                    }
                }
            }

            loadInternalLinks();
            //draw();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            //console.log(jqXHR.responseText);
            alert('Error: ' + " " + jqXHR.responseText + " \n Status: " + textStatus + " \n Error Thrown: " +
                errorThrown);
        }
    });
}

function loadInternalLinks(hosts) {
    $.ajax({

        url: "http://" + ip_port + "/wm/topology/links/json",
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                edges.push({
                    from: "s" + data[i]["src-switch"],
                    to: "s" + data[i]["dst-switch"],
                    length: EDGE_LENGTH_MAIN,
                    title: data[i]["src-switch"] + "/" + data[i]["src-port"] + "<br>" + data[i]["dst-switch"] + "/" + data[i]["dst-port"],
                    width: 3
                });
            }

            draw();
            //LoadExternalLinks(hosts);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('Error: ' + " " + jqXHR.responseText + " \n Status: " + textStatus + " \n Error Thrown: " +
                errorThrown);
        }
    });
}

function parseFlows(id) {
    var flowString = "";
    $.ajax({
        url: "http://" + ip_port + "/wm/core/switch/" + id + "/flow/json",
        async: false,
        success: function(flowobject) {
            for (var i = 0; i < flowobject["flows"].length; i++) {
                flowString += "Flow " + i + ":";
                flowString += "<br>&nbsp;&nbsp;&nbsp;Packet count: " + JSON.stringify(flowobject["flows"][i]["packet_count"]);
                flowString += "<br>&nbsp;&nbsp;&nbsp;Matches: " + JSON.stringify(flowobject["flows"][i]["match"]);
                if (flowobject["flows"][i]["version"] == "OF_13") {
                    flowString += "<br>&nbsp;&nbsp;&nbsp;Actions: " + JSON.stringify(flowobject["flows"][i]["instructions"]["instruction_apply_actions"]["actions"]);
                }
                if (flowobject["flows"][i]["version"] == "OF_10") {
                    flowString += "<br>&nbsp;&nbsp;&nbsp;Actions: " + JSON.stringify(flowobject["flows"][i]["actions"]["actions"]);
                }
                flowString += "<br>";
            }
        }
    });
    return flowString;
}


function loadSwitches() {
    $.ajax({
        url: "http://" + ip_port + "/wm/core/controller/switches/json",
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                var id = "s" + data[i]["switchDPID"];
                var label = "s" + data[i]["switchDPID"];

                nodes.push({
                    id: id,
                    label: label,
                    image: DIR + 'switch.png',
                    shape: 'image',
                    //title: parseFlows(data[i]["switchDPID"])
                    title: data[i]["switchDPID"]
                });
            }
            LoadHosts();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('Error: ' + " " + jqXHR.responseText + " \n Status: " + textStatus + " \n Error Thrown: " +
                errorThrown);
        }
    });
}

function LoadHosts() {
    $.ajax({
        url: "http://" + ip_port + "/wm/device/",
        success: function(hosts) {
            hosts = hosts.devices;
            //console.log(hosts);
            for (var i = 0; i < hosts.length; i++) {
                if (hosts[i]["attachmentPoint"].length > 0 && hosts[i]["ipv4"].length > 0) {
                    var id = "h" + hosts[i]["mac"];
                    var label = "h" + hosts[i]["ipv4"];
                    nodes.push({
                        id: id,
                        label: label,
                        image: DIR + 'Hardware-My-Computer-3-icon.png',
                        shape: 'image',
                        title: hosts[i]["mac"]
                    });
                }
            }
            loadExternalLinks(hosts);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            //console.log(jqXHR.responseText);
            alert('Error: ' + " " + jqXHR.responseText + " \n Status: " + textStatus + " \n Error Thrown: " +
                errorThrown);
        }
    });

}