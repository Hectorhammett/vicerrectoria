var win = nw.Window.get();
win.maximize();
var path = require('path');
var nwPath = process.execPath;
var nwDir = path.dirname(nwPath);
global.models = nwDir+"/db/models";
global.db = nwDir+"/db/db";
global.sqlite = nwDir + "/db/vice.sqlite";

$("a").click(function(e){
  e.preventDefault();
  $("#page-holder").load(this.href);
});

$.fn.serializeObject = function(){
    var obj = {};

    $.each( this.serializeArray(), function(i,o){
        var n = o.name,
        v = o.value;

        obj[n] = obj[n] === undefined ? v
            : $.isArray( obj[n] ) ? obj[n].concat( v )
            : [ obj[n], v ];
    });

    return obj;
};
