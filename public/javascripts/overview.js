(function( overview, $, undefined ) {
  var Estudiante = require(global.models)("Student");
  var Programa = require(global.models)("Program")
  var spinner = $(".loading-main");

  overview.init = function(){
    new Estudiante({
      matricula: global.student
    }).fetch({
      withRelated: [
        {programs: function(query){
          query.where("idPrograma",global.program)
        }}
      ]
    }).then(function(estudiante){
      console.log(estudiante.toJSON());
    }).catch(function(err){
      $.notify("Hubo un error. Favor de reiniciar la aplicación","error");
      console.error(err);
    });
  }
}( window.overview = window.overview || {}, jQuery ));
