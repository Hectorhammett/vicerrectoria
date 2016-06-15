(function( overview, $, undefined ) {
  var Estudiante = require(global.models)("Student");
  var Programa = require(global.models)("Program")
  var Unidad = require(global.models)("Unit");
  var Materia = require(global.models)("Subject");
  var spinner = $(".loading-main");
  var overviewHeader;
  var activity;
  var unitsHolder;

  overview.init = function(){
    overviewHeader = new Ractive({
      el: '#overview-header-holder',
      template: '#overview-header'
    });
    activity = new Ractive({
      el: '#activity-holder',
      template: '#activity'
    });
    unitsHolder = new Ractive({
      el: '#units-holder',
      template: '#units-template'
    });
    new Estudiante({
      matricula: global.student
    }).fetch({
      withRelated: [
        {programs: function(query){
          query.where("idPrograma",global.program)
        }},
        {units: function(query){
          query.where("idPrograma",global.program)
        }}
      ]
    }).then(function(estudiante){
      estudiante = estudiante.toJSON();
      programa = estudiante.programs[0];
      console.log(estudiante);
      overviewHeader.set({
        matricula: estudiante.matricula,
        nombre: estudiante.nombre,
        paterno: estudiante.paterno,
        materno: estudiante.materno,
        email: estudiante.email,
        telefono: estudiante.telefono
      });
      activity.set({
        total:estudiante.units.length, 
        formato: (programa.formato == "semestral")? "Semestres" : "Cuatrimestres",
        units: estudiante.units
      })
    }).catch(function(err){
      $.notify("Hubo un error. Favor de reiniciar la aplicación","error");
      console.error(err);
    });
  }

  $(document).on("click","#unit-select option",function(){
    var option = this;
    var spinner = $(".unit-overview .spinner");
    $(".unit-overview .no-unit").fadeOut(25);
    spinner.fadeIn(25);
    new Unidad({
      id: option.value
    }).fetch({
      withRelated:["subjects"]
    }).then(function(unit){
      unidades = unit.toJSON();
      materias = unidades.subjects;
      console.log(unidades);
      unitsHolder.set({
        subjects: materias
      });
      spinner.fadeOut(25);
    }).catch(function(err){
      $.notify("Hubo un error. Favor de reiniciar la aplicación","error");
      console.error(err);
    })
  })

  $(document).on("click","#save-unit-grades",function(){
    var promises = [];
    $(".unit-overview input[name='Grades']").each(function(index, element){
      var promise = new Materia({
        id: element.dataset.id
      }).save({calificacion: element.value});
      promises.push(promise);
    });
    Promise.all(promises).then(function(values){
      $.notify("Se han guardado las calificaciones correctamente","success");
    }).catch(function(err){
      $.notify("Hubo un error. Favor de reiniciar la aplicación","error");
      console.error(err);
    });
  })

}( window.overview = window.overview || {}, jQuery ));
