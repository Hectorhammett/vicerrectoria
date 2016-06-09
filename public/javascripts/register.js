(function( register, $, undefined ) {
  var Programa = require(global.models)("Program");
  var Validator = require("validatorjs");

  register.init =  function(){
    Validator.useLang('es');
    initSteps();
  }

  function initSteps(){
    $("#form-program").children("div").steps({
        headerTag: "h3",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        labels: {
          current: "Paso Actual:",
          pagination: "Paginación",
          finish: "GUARDAR",
          next: "SIGUIENTE",
          previous: "ANTERIOR",
          loading: "Cargando ..."
      },
      onFinishing: function(e,currentIndex){
        var form = $("#form-program").serializeObject();
        console.log(form);
        var data = form;
        var rules = {
          Nombre: "required",
          Duracion: "required|numeric",
        }
        var validation = new Validator(data,rules);
        if(validation.fails()){
          var string = "";
          var errors = validation.errors.all();
          for(x in errors){
            string += errors[x] + "\n";
          }
          $.notify(string,"error");
          return false;
        }
        return true;
      },
      onFinished: function (event, currentIndex)
     {
       var form = $("#form-program").serializeObject();
        new Programa({
          nombre: form.Nombre,
          tipo: form.ProgramType,
          formato: form.ProgramFormat,
          duracion: form.Duracion,
          orientacion: form.ProgramOrientation
        }).save().then(function(){
          $.notify("El programa se ha guardado correctamente","success");
          $("#link-register-program").click();
        }).catch(function(err){
          $.notify("Hubo un problema guardando el programa. Esto es un error interno, favor de cerrar y abrir de nuevo la aplicación","error");
          console.error(err)
        });
     }
    });
  }
}( window.register = window.register || {}, jQuery ));
