(function( programs, $, undefined ) {
  var Programa = require(global.models)("Program");
  var Estudiante = require(global.models)("Student");
  var spinner = $(".loading-main");
  var table;
  var ractive;
  var tableStudents;

  programs.init = function(){
    tableStudents = $("#table-program-students");
    ractive = new Ractive({
      el: '#program-content',
      template: '#template'
    });
    process.stderr.on('data', function(data) {
      console.log(data);
    });
    initTable();
  }

  function initTable(){
    var programas = getPrograms();
    programas.then(function(programas){
      table = $("#programs").DataTable({
        data: programas,
        columns:[
          { data: "id", visible: false },
          { data: "nombre" },
          { data: "tipo" },
          { data: "formato" },
          { data: "duracion" },
          { data: "orientacion" },
        ]
      });
    }).catch(function(){
      $.notify("Hubo un problema. Esto es un error interno, favor de cerrar y abrir de nuevo la aplicación","error");
    });
  }

  function getPrograms(){
    var programs = new Programa().fetchAll().then(function(programs){
      return programs.toJSON();
    })

    return programs;
  }


  //Handlers
  $(document).on("click","#programs tbody tr",function(){
    spinner.fadeIn(25);
    var id = table.row(this).data().id;
    new Programa({
      id: id
    }).fetch({
      withRelated:[
        "students"
      ]
    }).then(function(programa){
      var programa = programa.toJSON();
      var students = programa.students;
      console.log(students.length);
      spinner.fadeOut(25);
      $("#modal-program-header").text(programa.nombre);
      ractive.set({
        nombre: programa.nombre,
        tipo: programa.tipo,
        formato: programa.formato,
        duracion: programa.duracion,
        total:  students.length
      });
      tableStudents.DataTable().destroy();
      tableStudents.DataTable({
        data: students,
        columns: [
          {data: "matricula"},
          {data: "nombre"}
        ]
      });
      $("#modal-program").modal("show");
    }).catch(function(err){
      $.notify("Hubo un problema. Esto es un error interno, favor de cerrar y abrir de nuevo la aplicación","error");
      console.error(err);
    })
  });
}( window.programs = window.programs || {}, jQuery ));
