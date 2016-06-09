(function( search, $, undefined ) {
  var Estudiante = require(global.models)("Student");
  var Knex = require(global.db).knex;
  var tableStudents;
  var modalStudent;
  var spinner = $(".loading-main");
  var studentData;
  var activePrograms;
  var Knex = require(global.db).knex;

  search.init = function(){
    $.fn.editable.defaults.mode = 'inline';
    modalStudent = $("#modal-student");
    studentData = new Ractive({
      el: '#update-student',
      template: '#template'
    });
    activePrograms = new Ractive({
      el: "#programas-activo",
      template: "#active-programs"
    });
    initTable();
  }

  $(document).on("click","#students tbody tr",function(){
    var row = this;
    spinner.fadeIn(25);
    new Estudiante({
      matricula: tableStudents.row(row).data().matricula
    }).fetch({
      withRelated: [
        "programs"
      ]
    }).then(function(estudiante){
      var estudiante = estudiante.toJSON();
      var programas = estudiante.programs;
      studentData.set({
        Matricula: estudiante.matricula,
        Nombre: estudiante.nombre,
        Paterno: estudiante.paterno,
        Materno: estudiante.materno,
        Email: estudiante.email,
        Telefono: estudiante.telefono
      });
      activePrograms.set({
        actives: programas,
        matricula: estudiante.matricula
      });
      spinner.fadeOut(25,function(){
        $(".editables").editable({
          success: function(response, newValue) {
            var values = {};
            var editable = this;
            values[this.id] = newValue;
            Knex("Estudiante").where("matricula",this.dataset.pk).update(values).then(function(){
              $.notify("El estudiante ha sido actualizado correctamente","success");
              updateTable();
            }).catch(function(err){
              if(err.code == "SQLITE_CONSTRAINT"){
                $.notify("La matrícula ya se encuentra en uso.","error");
                $(editable).editable("setValue",editable.dataset.pk);
              }
              else {
                $.notify("Ha habido un error, favor de reiniciar la aplicación","error");
              }
              console.error(err);
            })
          }
        });
        $(modalStudent).modal("show");
      });
    })
  });

  $(document).on("click",".url-program",function(){
    global.student = this.dataset.student;
    global.program = this.dataset.program
    $(modalStudent).modal("hide").one("hidden.bs.modal",function(){
      $("#page-holder").load("views/dashboard/overview.html");
    });
  });

  function initTable(){
    tableStudents = getStudents().then(function(estudiantes){
      tableStudents = $("#students").DataTable({
        data: estudiantes,
        columns: [
          {data: 'matricula'},
          {data: "nombre"},
          {data: "email"},
          {data: "telefono"}
        ],
        columnDefs: [
            {

                "render": function ( data, type, row, meta ) {
                    return data + " " + row.paterno + " " + row.materno;
                },
                "targets": 1
            },
        ]
      });
      console.log(estudiantes);
    }).catch(function(err){
      console.error(err);
    });
  }

  function getStudents(){
    var students = new Estudiante().fetchAll().then(function(estudiantes){
      return estudiantes.toJSON();
    })
    return students;
  }

  function updateTable(){
    tableStudents.destroy();
    initTable();
  }
}( window.search = window.search || {}, jQuery ));
