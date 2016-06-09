var counter = 1;

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
