(function( overview, $, undefined ) {
  var Estudiante = require(global.models)("Student");
  var Programa = require(global.models)("Program")
  var Unidad = require(global.models)("Unit");
  var Materia = require(global.models)("Subject");
  var Trabajo = require(global.models)("Work");
  var Nota = require(global.models)("Note");
  var Movilidad = require(global.models)("Movility");
  var spinner = $(".loading-main");
  var Validator = require("validatorjs");
  Validator.useLang('es');
  var overviewHeader;
  var activity;
  var unitsHolder;
  var editUnit;
  var workHolder;
  var notesHolder;
  var movilitiesHolder;
  var counter;
  var currentStudent;
  var currentProgram;

  overview.init = function(){
    counter = 1;
    overviewHeader = new Ractive({
      el: '#overview-header-holder',
      template: '#overview-header'
    });
    activity = new Ractive({
      el: '#activity-holder',
      template: '#activity',
      empty: ""
    });
    unitsHolder = new Ractive({
      el: '#units-holder',
      template: '#units-template'
    });
    editUnit = new Ractive({
      el: '#edit-semester-holder',
      template: '#edit-semester-template'
    });
    editUnit.on({
      addItem: function(){
        this.push( "subjects", {
        nombre: ""
      })
      },
      deleteItem: function(event){
        console.log(event.index);
        this.splice("subjects", event.index.num, 1);
      },
      updateSemester: function(){
        if(this.get("subjects").length > 0)
          saveEditedSemester(this.get("subjects"),this.get("unitId"));
        else
          $.notify("No se puede guardar un semestre/cuatrimestre sin materias","error");
      }
    })
    workHolder = new Ractive({
      el: '#work-info-holder',
      template: '#work-info-template'
    });
    notesHolder = new Ractive({
      el: "#notes-holder",
      template: "#notes-template"
    });
    notesHolder.on({
      addNote: function(){
        $("#modal-add-note").modal("show").one("hidden.bs.modal",function(){
          $("input[name='Note']").val("");
        });
      }
    });
    movilityHolder = new Ractive({
      el: "movilities-holder",
      template: "movilities-template",
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
        }},
        {works: function(query){
          query.where("idPrograma",global.program)
        }},
        {movilities: function(query){
          query.where("idPrograma",global.program)
        }},
        "notes",
      ]
    }).then(function(estudiante){
      currentStudent = estudiante;
      estudiante = estudiante.toJSON();
      programa = estudiante.programs[0];
      trabajo = estudiante.works[0]
      notas = estudiante.notes;
      movilidades = estudiante.movilities;
      currentProgram = programa;
      console.log(estudiante);
      overviewHeader.set({
        matricula: estudiante.matricula,
        nombre: estudiante.nombre,
        paterno: estudiante.paterno,
        materno: estudiante.materno,
        email: estudiante.email,
        telefono: estudiante.telefono
      });
      workHolder.set({
        trabajo: trabajo,
      })
      workHolder.on({
        updateWork: function(){
          saveUpdatedWork(this.get("trabajo"));
        }
      });
      loadMovilities(movilidades);
      loadNotes(notas);
      loadActivity(estudiante,programa);
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
        subjects: materias,
        unitId: unidades.id
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

   $(document).on("click","#addSubjectO",function(){
    var subject = document.createElement("div");
    $(subject).addClass("col-sm-4 singleSubject");
    $(subject).html('<div class="panel panel-default"><div class="panel-body"><div class="form-group"><label for="subjectName"><span class="subjectNumber">' + counter++ + '</span>.- Nombre de la Materia</label><input type="text" class="form-control" name="Materias"/></div><button type="button" class="btn btn-default btn-raised" id="removeSubjectO">Quitar Materia</button></div></div>');
    $("#semester").append(subject);
  });

  $(document).on("click","#addSubjectEditableO",function(){
    var subject = document.createElement("div");
    $(subject).addClass("col-sm-4 singleSubject");
    $(subject).html('<div class="panel panel-default"><div class="panel-body"><div class="form-group"><label for="subjectName"><span class="subjectNumber">' + counter++ + '</span>.- Nombre de la Materia</label><input type="text" class="form-control" name="Materias"/></div><button type="button" class="btn btn-default btn-raised" id="removeSubjectO">Quitar Materia</button></div></div>');
    $("#edit-semester").append(subject);
  });

  $(document).on("click","#removeSubjectO",function(){
    $(this).closest("div.col-sm-4").remove();
    var inner = 1;
    $("span.subjectNumber").each(function(){
      $(this).text(inner++);
    });
    counter--;
  });

  $(document).on("click","#add-unit",function(){
    $("#modal-unit").modal("show").one("hidden.bs.modal",function(){
      $("#semester").empty();
      counter = 1;
    });
  })

   $(document).on("click","#new-unit-save",function(){
     var button = this;
     new Unidad({
      idEstudiante: global.student,
      idPrograma: global.program   
     }).save().then(function(unidad){
       unidad = unidad.toJSON();
       var promises = [];
       $("input[name='Materias']").each(function(index,element){
          var promise = new Materia({
            idUnidad: unidad.id,
            nombre: element.value
          }).save();
          promises.push(promise);
       })
       return Promise.all(promises);
     }).then(function(values){
      $.notify("El semestre/cuatrimestre se ha guardado correctamente","success");
       $("#modal-unit").modal("hide");
       return currentStudent.refresh({
        withRelated: [
          {programs: function(query){
            query.where("idPrograma",global.program)
          }},
          {units: function(query){
            query.where("idPrograma",global.program)
          }}
        ]
       });
     }).then(function(estudiante){
       estudiante = estudiante.toJSON();
       loadActivity(estudiante,currentProgram);
     }).catch(function(err){
      $.notify("Hubo un error. Favor de reiniciar la aplicación","error");
      console.error(err);
     });
  })

  $(document).on("click","#edit-unit",function(){
    counter = unitsHolder.get("subjects").length + 1;
    editUnit.set({
      subjects: unitsHolder.get("subjects"),
      unitId: this.dataset.id
    });
    $("#modal-edit-unit").modal("show").one("hidden.bs.modal",function(){
      editUnit.reset();
    });
  })

  $(document).on("click","#save-new-note",function(){
    var rules = {
      Note: "required"
    };
    var data = {
      Note: $("textarea[name='Note']").val()
    }
    var validator = new Validator(data,rules);
    validator.setAttributeNames({
      Note: "Nota"
    });
    if(validator.fails()){
      $.notify(validator.errors.first('Note'));
    }
    else{
      new Nota({
        idTrabajo: notesHolder.get("workId"),
        notas: data.Note
      }).save().then(function(note){
        $.notify("La nota se ha guardado correctamente","success");
      }).catch(function(err){
        $.notify("Hubo un error. Favor de reiniciar la aplicación.","error");
        console.error(err);
      })
    }
  });

  function saveEditedSemester(subjects,idUnit){
    console.log(subjects, idUnit);
    new Materia().where({
        idUnidad: idUnit
    }).destroy().then(function(){
      var promises = [];
      for(x in subjects){
        var promise = new Materia({
          nombre: subjects[x].nombre,
          idUnidad: idUnit
        }).save();
        promises.push(promise);
      }
      return Promise.all(promises);
    }).then(function(values){
      console.log(values);
      $.notify("El semestre se ha actualizado.","success");
      return new Materia().where({
        idUnidad: idUnit,
      }).fetchAll()
    }).then(function(subjects){
      var materias = subjects.toJSON();
      console.log(materias);
      unitsHolder.set({
        subjects: materias,
        unitId: idUnit
      });
      $("#modal-edit-unit").modal("hide");
    }).catch(function(err){
      $.notify("Hubo un error. Favor de reiniciar la aplicación","error");
      console.error(err);
    });
  }

  function saveUpdatedWork(trabajo){
    var rules = {
      nombreTutor: "required",
      linea: "required"
    }

    var validator = new Validator(trabajo,rules);
    validator.setAttributeNames({
      nombreTutor: "Nombre de tutor",
      linea: "Línea de generación y ampliación del conocimiento"
    });

    if(validator.fails()){
      var errors = validator.errors.all();
      var string = "";
      for(x in errors){
        string+= errors[x] + "\n";
      }
      $.notify(string,"error");
    }
    else{
      new Trabajo({
        id: workHolder.get("trabajo").id
      }).save(workHolder.get("trabajo")).then(function(){
        $.notify("El trabajo de titulación se ha actualizado correctamente","success");
      }).catch(function(err){
        $.notify("Hubo un error. Favor de reiniciar la aplicación","error");
        consol.error(err);
      });
    }
  }

  function loadActivity(estudiante,programa){
    activity.set({
        total:estudiante.units.length, 
        formato: (programa.formato == "semestral")? "Semestres" : "Cuatrimestres",
        units: estudiante.units
      })
  }

  function loadNotes(notes){
    console.log(trabajo);
    notesHolder.set({
      notes: notes,
      workId: trabajo.id
    })
  }

  function loadMovilities(movilities){
    notesHolder.set({
      movilities: movilities
    })
  }
}( window.overview = window.overview || {}, jQuery ));
