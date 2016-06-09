var table;
var changed = false;

$(document).ready(function(){
  table = $("#students").DataTable({
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
    "url":"getStudents"
  },
  rowCallback: function( row, data, index ) {
    $(row).addClass( 'row-clickable' );
  }
  });
});

$("#students").on('click',"tbody tr",function(){
  var row = this;
  $('#modal-student').modal('show');
  $('#modal-student-header').text(table.row(row).data()[1]);
  getStudent(table.row(row).data()[0]);
})

$('#modal-student').on('hidden.bs.modal', function () {
  destroyEditables();
})

function getStudent(mat){
  $.get('getStudent',{matricula:mat},function(data){
    if(isJSON(data)){
      var student = JSON.parse(data);
      $("#Matricula").text(student.matricula);
      $("#Nombre").text(student.nombre);
      $("#Paterno").text(student.paterno);
      $("#Materno").text(student.materno);
      $("#Email").text(student.email);
      $("#Telefono").text(student.telefono);
      $(".editables").attr("data-pk",student.matricula);
      $('#programas-activo').empty();
      $('#add-to-program-button').attr('href','addToProgram?matricula='+mat);
      $('#programas-terminados').empty();
      for(x in student.programs){
        if(student.programs[x].pivot.estado === 'activo'){
          var li = document.createElement('li');
          var link = document.createElement('a');
          $(link).attr('href','studentInProgram/' + student.programs[x].id + '/' + student.matricula);
          $(link).text(student.programs[x].nombre);
          $(li).append(link);
          $("#programas-activo").append(li)
        }
        else{
          var li = document.createElement('li');
          var link = document.createElement('a');
          $(link).attr('href','studentInProgram/' + student.programs[x].id + '/' + student.matricula);
          $(link).text(student.programs[x].nombre);
          $(li).append(link);
          $("#programas-terminados").append(li)
        }
      }
    }
    else{
      alert(data);
    }
  })
  .done(function(){
    startEditables();
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

function startEditables(){
  $.fn.editable.defaults.mode = 'inline';
  $('.editables').editable({
    ajaxOptions: {
      type: 'get',
      url: 'updateStudent',
    }
  });
}

function destroyEditables(){
  $('.editables').editable('destroy');
}

$('.editables').on('save', function(e, params) {
    changed = true;
});
