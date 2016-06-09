(function( registerStudent, $, undefined ) {
  var Validator = require("validatorjs");
  var Programas = require(global.models)("Program");
  var Estudiante = require(global.models)("Student");
  var Subject = require(global.models)("Subject")
  var Unit = require(global.models)("Unit");
  var Work = require(global.models)("Work");
  var ractive;
  var spinner = $(".loading-main");
  var counter = 1;

  registerStudent.init = function(){
    Validator.useLang("es");
    counter = 1;
    initForm();
    getPrograms().then(function(programas){
      console.log(programas);
      ractive = new Ractive({
        el: "#select-program",
        template: "#template",
        data: { programs: programas }
      });
    }).catch(function(err){
      $.notify("Hubo un error. Este es un problema interno de la aplicación. Favor de cerrar y reabrir el programa.","error");
    });
  }

  $(document).on("click","#addSubject",function(){
    var subject = document.createElement("div");
    $(subject).addClass("col-sm-4 singleSubject");
    $(subject).html('<div class="panel panel-default"><div class="panel-body"><div class="form-group"><label for="subjectName"><span class="subjectNumber">' + counter++ + '</span>.- Nombre de la Materia</label><input type="text" class="form-control" name="Materias[]"/></div><button type="button" class="btn btn-default btn-raised" id="removeSubject">Quitar Materia</button></div></div>');
    $("#semester").append(subject);
  });

  $(document).on("click","#addSubjectEditable",function(){
    var subject = document.createElement("div");
    $(subject).addClass("col-sm-4 singleSubject");
    $(subject).html('<div class="panel panel-default"><div class="panel-body"><div class="form-group"><label for="subjectName"><span class="subjectNumber">' + counter++ + '</span>.- Nombre de la Materia</label><input type="text" class="form-control" name="Materias[]"/></div><button type="button" class="btn btn-default btn-raised" id="removeSubject">Quitar Materia</button></div></div>');
    $("#edit-semester").append(subject);
  });

  $(document).on("click","#removeSubject",function(){
    $(this).closest("div.col-sm-4").remove();
    var inner = 1;
    $("span.subjectNumber").each(function(){
      $(this).text(inner++);
    });
    counter--;
  });

  function initForm(){
    $("#form-new-student").steps({
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
      onStepChanging: function(event,currentIndex,newIndex){
        var form = $(this).serializeObject();
        if (currentIndex > newIndex)
         {
             return true;
         }
         if (currentIndex == 0)
         {
           var rules = {
             Matricula: "required|numeric",
             Nombre: "required",
             Paterno: "required",
             Materno: "required",
             Email: "required|email",
             Telefono: "required"
           }
           var validator = new Validator(form,rules);
           if(validator.fails()){
             var string = "";
             var errors = validator.errors.all();
             for(x in errors){
               string += errors[x] + "\n";
             }
             $.notify(string,"error");
             return false
           }else{
             checkAsync(form);
             return true;
           }
         }
         if(currentIndex == 1){
           var rules = {
             Programa: "required|not_in:-1",
             Campus: "required"
           }
           var validator = new Validator(form,rules);
           if(validator.fails()){
             var string = "";
             var errors = validator.errors.all();
             for(x in errors){
               string += errors[x] + "\n";
             }
             $.notify(string,"error");
             return false
           }
           else {
             return true;
           }
         }
         if(currentIndex == 2){
           var rules = {
             "Materias[]": "required"
           }

           var validator = new Validator(form,rules);
           if(validator.fails()){
             $.notify("Se debe de registrar al menos una materia.","error");
             return false
           }
           else{
             return true;
           }
         }
      },
      onFinishing: function(event, currentIndex){
        var form = $(this).serializeObject();
        var rules = {
          NombreTutor: "required",
          Linea: "required",
          TipoTrabajo: "required"
        }
        var validator = new Validator(form,rules);
        if(validator.fails()){
          var string = "";
          var errors = validator.errors.all();
          for(x in errors){
            string += errors[x] + "\n";
          }
          $.notify(string,"error");
          return false
        }
        else {
          return true;
        }
      },
      onFinished: function(){
        spinner.fadeIn(25);
        var form = $(this).serializeObject();
        new Estudiante({
          matricula: form.Matricula,
          nombre: form.Nombre,
          paterno: form.Paterno,
          materno: form.Materno,
          email: form.Email,
          telefono: form.Telefono
        }).save({},{method:"insert"}).then(function(student){
          return student.programs().attach(form.Programa);
        }).then(function(attached){
          return attached.updatePivot({
            becario: form.NoBecario,
            campus: form.Campus,
          })
        }).then(function(){
          return new Unit({
            idEstudiante: form.Matricula,
            idPrograma: form.Programa
          }).save();
        }).then(function(unit){
          var promises = [];
          if(form["Materias[]"] instanceof Array){
            for(x in form["Materias[]"]){
              var promise = new Subject({
                idUnidad: form.Programa,
                nombre: form["Materias[]"][x]
              }).save({},{method:"insert"});
              promises.push(promise);
            }
          }
          else{
            var promise = new Subject({
              idUnidad: form.Programa,
              nombre: form["Materias[]"]
            }).save({},{method:"insert"});
            promises.push(promise);
          }
          var work = new Work({
            NombreTutor: form.NombreTutor,
            tipo: form.TipoTrabajo,
            linea: form.Linea,
            idEstudiante: form.Matricula,
            idPrograma: form.Programa
          }).save({},{method:"insert"});
          promises.push(work);
          Promise.all(promises).then(function(data){
            spinner.fadeOut(25);
            $("#link-register-student").click();
            $.notify("El Alumno se ha guardado correctamente","success");
          })
        }).catch(function(err){
          $.notify("Ha habido un error. Este error es interno, favor de reiniciar la aplicación","error");
          console.error(err);
        })
      },
    });
  }

  function checkAsync(form){
    spinner.fadeIn(100);
    new Estudiante().where({
      matricula: form.Matricula
    }).count().then(function(total){
      console.log(total);
      spinner.fadeOut(100,function(){
        if(total > 0){
          $("#form-new-student").steps("previous");
          $.notify("La matrícula ya ha sido asignada a otro alumno.");
        }
      });
    });
  }

  function getPrograms(){
    var programs = new Programas().fetchAll().then(function(programas){
      return programas.toJSON();
    })
    return programs;
  }
}( window.registerStudent = window.registerStudent || {}, jQuery ));
