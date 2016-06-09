var table;
$(document).ready(function(){
  table = $("#programs").DataTable({
    columns: [
      { "visible": false },
      null,
      null,
      null,
      null
    ],
    language: {
    "sProcessing":     "Procesando...",
    "sLengthMenu":     "Mostrar _MENU_ registros",
    "sZeroRecords":    "No se encontraron resultados",
    "sEmptyTable":     "Ningún dato disponible en esta tabla",
    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix":    "",
    "sSearch":         "Buscar:",
    "sUrl":            "",
    "sInfoThousands":  ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst":    "Primero",
        "sLast":     "Último",
        "sNext":     "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
},
  ajax:{
    "url":"getPrograms"
  },
  rowCallback: function( row, data, index ) {
    $(row).addClass( 'row-clickable' );
  }
  });
});

$("#programs").on('click',"tbody tr",function(){
  var row = this;
  $('#modal-program').modal('show');
  $('#modal-program-header').text(table.row(row).data()[1]);
  getProgram(table.row(row).data()[0]);
})

function getProgram(id){
  $.get('getProgram',{id:id},function(data){
    if(isJSON(data)){
      var program = JSON.parse(data);
      var body = $("#program-content");
      var row = document.createElement('div');
      var column = document.createElement('div');
      var students = $("#program-students");
      var list = document.createElement('ul');
      body.html("");
      students.html("");
      $(row).addClass("row");
      $(column).addClass('col-sm-12');
      $(column).html('<h4>Nombre del programa</h4><p>' + program.nombre + '<h4>Tipo del programa</h4>' + program.tipo + '<h4>Formato del programa</h4>' + program.formato + '<h4>Duración del programa</h4>' + program.duracion + "<h4>Total de alumnos en el programa</h4>" + program.students.length);
      $(row).append(column);
      body.append(row);
      for(x in program.students){
        var student = document.createElement('li');
        $(student).text(program.students[x].nombre + " " + program.students[x].paterno + " " + program.students[x].materno);
        $(list).append(student);
      }
      students.append(list);
    }
    else{
      alert(data);
    }
  });
}

function isJSON(str){
  try{
    JSON.parse(str);
    return true;
  }
  catch(e){
    return false;
  }
}
