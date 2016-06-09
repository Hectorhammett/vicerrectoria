var counter = 1;
$(document).ready(function(){
  startEditables();
  $('.datepicker').datepicker({
    autoclose:true,
    todayBtn:true,
    format:"yyyy-mm-dd",
  });
})

function startEditables(){
  $.fn.editable.defaults.mode = 'inline';
  $('.editables').editable({
    ajaxOptions: {
      type: 'get',
      url: '../../updateStudent',
    }
  });
}

$('#add-unit').click(function(){
  $('#modal-unit').modal('show');
})

$('#unit-select option').on('click',function(){
  $('.no-unit').css('display','none');
  $('.unit-overview .spinner').css('display','flex');
  $.get('../../getStudentUnit',{unitId:this.value},function(data){
    if(isJSON(data)){
      var counter = 1;
      $('.unit-holder').html('');
      var unit = JSON.parse(data);
      var subjects = unit.subjects;
      var form = document.createElement('form');
      $(form).attr('action','../../storeGrades');
      $(form).attr('id','grades-form');
      for(x in subjects){
        var div = document.createElement('div');
        $(div).addClass('col-lg-4 col-md-2 singleSubject');
        if(subjects[x].calificacion != null)
          var calificacion = subjects[x].calificacion;
        else {
          var calificacion = "";
        }
        $(div).html('<div class="panel panel-default"><div class="panel-body"><div class="form-group"><label for="subjectName"><span class="subjectNumber">' + counter++ + '</span>.- Nombre de la Materia</label><input type="text" class="form-control" name="Materias[]" value="' + subjects[x].nombre + '" disabled/></div><div class="form-group"><label for="subjectName">Calificación</label><input type="text" class="form-control" name="Grades[]" value="' + calificacion + '"/></div><input type="hidden" value="' + subjects[x].id + '" name="SubjectsId[]">');
        $(form).append(div);
      }
      var row = document.createElement('div');
      $(row).addClass('row');
      $(row).append(form);
      var buttonColumn = document.createElement('div');
      $(buttonColumn).addClass('col-sm-12');
      var button = document.createElement('button');
      $(button).addClass('btn btn-primary');
      $(button).text('Guardar Calificaciones');
      $(button).attr('id','save-unit-grades');
      var buttonEdit = document.createElement('button');
      $(buttonEdit).addClass('btn btn-default');
      $(buttonEdit).text('Editar Semestre/Cuatrimestre');
      $(buttonEdit).attr('id','edit-unit');
      $(buttonColumn).html(button);
      $(buttonColumn).append(buttonEdit);
      $('.unit-holder').append(form);
      $('.unit-holder').append(buttonColumn);
      $('.unit-overview .spinner').css('display','none');
    }
  });
});

$(document).on('click','#save-unit-grades',function(){
  $('#grades-form').submit();
})

$(document).on('click',"#edit-unit",function(){
  $.get('../../getStudentUnit',{unitId:$('#unit-select').val()},function(data){
    if(isJSON(data)){
      var unit = JSON.parse(data);
      var subjects = unit.subjects
      for(var i = 0; i < subjects.length; i++)
        $("#edit-semester").append(createSubjectDiv(subjects[i]));
      document.getElementsByName('unitId')[0].value = $('#unit-select').val();
      $('#modal-edit-unit').modal('show');
    }
    else{
      alert(data);
    }
  })
})

$("#new-unit-save").click(function(){
  $('#new-unit').submit();
})

$('#modal-unit').on('hidden.bs.modal', function (e) {
  $('#semester').html("");
  counter = 1;
})

$('#modal-edit-unit').on('hidden.bs.modal', function (e) {
  $('#edit-semester').html("");
  counter = 1;
})

$('#edited-unit-save').click(function(){
  $("#edited-unit").submit();
})

$('#delete-unit').click(function(){
  $('#delete-modal').modal('show');
})

$('#add-movility').click(function(){
  $('#modal-add-movility').modal('show');
})

$('#delete-unit-confirm').click(function(){
  document.location.href = "../../deleteUnit?unitId=" + $('#unit-select').val();
})

$('#productivity-add').click(function(){
  $('#modal-add-productivity').modal('show');
})

$('#movilities option').click(function(){
  $('#movility-holder .none').css('display','none');
  $('#movility-holder .spinner').css('display','flex');
  $.get('../../getMovility',{idMovility:this.value},function(data){
    if(isJSON(data)){
      var movility = JSON.parse(data);
      $("#movility-name").val(movility.nombre);
      $("#movility-destiny").val(movility.destino);
      $("#movility-start").val(movility.inicio);
      $("#movility-end").val(movility.fin);
      $("#movility-result").val(movility.resultado);
      $("#movilityId").val(movility.id);
      $('#movility-holder .spinner').css('display','none');
    }
  })
})

$('#productivities option').click(function(){
  $('#productivity-holder .none').css('display','none');
  $('#productivity-holder .spinner').css('display','flex');
  $.get('../../getProductivity',{idProductivity:this.value},function(data){
    if(isJSON(data)){
      var productivity = JSON.parse(data);
      $("#productivityId").val(productivity.id);
      $("#productivity-name").val(productivity.titulo);
      $("#productivity-date").val(productivity.fecha);
      $("#productivity-category").val(productivity.categoria);
      $("#productivity-type").val(productivity.tipo);
      $('#productivity-holder .spinner').css('display','none');
    }
  })
})

$('#productivity-delete').click(function(){
  $('#delete-productivity-modal').modal('show');
})

$('#productivity-delete-confirm').click(function(){
  document.location.href = "../../deleteProductivity?productivityId=" + $("#productivityId").val();
})

$('#movility-delete').click(function(){
  $('#delete-movility-modal').modal('show');
})

$('#movility-delete-confirm').click(function(){
  document.location.href = "../../deleteMovility?movilityId=" + $("#movilityId").val();
})

function isJSON(string){
  try{
    JSON.parse(string);
    return true;
  }
  catch(exc){
    return false;
  }
}

function createSubjectDiv(subject){
  var subjectDiv = document.createElement("div");
  $(subjectDiv).addClass("col-sm-4 singleSubject");
  $(subjectDiv).html('<div class="panel panel-default"><div class="panel-body"><div class="form-group"><label for="subjectName"><span class="subjectNumber">' + counter++ + '</span>.- Nombre de la Materia</label><input type="text" class="form-control" name="Materias[]" value="' + subject.nombre + '"/></div><button type="button" class="btn btn-default btn-raised" id="removeSubject">Quitar Materia</button></div></div>');
  return subjectDiv;
}

$('#add-note').click(function(){
  $('#modal-add-note').modal('show');
})

$('#terminate-program').click(function(){
  $('#modal-terminate').modal('show');
})
