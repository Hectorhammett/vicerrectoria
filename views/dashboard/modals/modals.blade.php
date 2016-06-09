<div class="modal fade" id="modal-student" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      <h4 class="modal-title" id="modal-student-header"></h4>
    </div>
    <div class="modal-body">
      <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingOne">
      <h4 class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Datos del Alumno
        </a>
      </h4>
    </div>
    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
      <div class="panel-body">
        <form id="update-student">
          <div class="form-group">
            <label>Matrícula</label>
            <a href="#" id="Matricula" class="editables" data-type="text" data-pk="" data-url="/post" data-title="Enter username"></a>
          </div>
          <div class="form-group">
            <label>Nombre</label>
            <a href="#" id="Nombre" class="editables" data-type="text" data-pk="" data-url="/post" data-title="Enter username"></a>
          </div>
          <div class="form-group">
            <label>Apellido Paterno</label>
            <a href="#" id="Paterno" class="editables" data-type="text" data-pk="" data-url="/post" data-title="Enter username"></a>
          </div>
          <div class="form-group">
            <label>Apellido Materno</label>
            <a href="#" id="Materno" class="editables" data-type="text" data-pk="" data-url="/post" data-title="Enter username"></a>
          </div>
          <div class="form-group">
            <label>Correo Electrónico</label>
            <a href="#" id="Email" class="editables" data-type="text" data-pk="" data-url="/post" data-title="Enter username"></a>
          </div>
          <div class="form-group">
            <label>Teléfono</label>
            <a href="#" id="Telefono" class="editables" data-type="text" data-pk="" data-url="/post" data-title="Enter username"></a>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingTwo">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Programas
        </a>
      </h4>
    </div>
    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
      <div class="panel-body">
        <div class="row">
          <div class="col-sm-12">
            <p>Programas donde el alumno se encuentra activo</p>
            <ul id="programas-activo">
            </ul>
            <p>Programas donde cuales el alumno ha concluido o han sido cancelados</p>
            <ul id="programas-terminados">
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <a id="add-to-program-button" href="" class="btn btn-primary btn-block">Agregar alumno a programa</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
    </div>
  </div>
</div>
</div>

<!-- Modal -->
<div class="modal fade bs-example-modal-lg" id="modal-unit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Agregar Semestre/Cuatrimestre</h4>
      </div>
      <div class="modal-body" id="modal-unit-body">
        <div id="subjects">
          <h4>Agregar la carga académica del semestre/cuatrimestre del alumno</h4>
          <button type="button" class="btn btn-primary" id="addSubject">Agregar Materia</button>
          <form id="new-unit" method="GET" action="{{URL::to('newUnit')}}">
            <input type="hidden" value="{{$program->id or ""}}" name="programId"/>
            <input type="hidden" value="{{$student->matricula or ""}}" name="matricula"/>
            <div id="semester" class="row">
            </div>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" id="new-unit-save">Guardar Semestre/Cuatrimestre</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal -->
<div class="modal fade bs-example-modal-lg" id="modal-edit-unit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Editar Semestre/Cuatrimestre</h4>
      </div>
      <div class="modal-body" id="modal-unit-body">
        <div id="subjects">
          <h4>Editar la carga académica del semestre/cuatrimestre del alumno</h4>
          <button type="button" class="btn btn-primary" id="addSubjectEditable">Agregar Materia</button>
          <form id="edited-unit" method="GET" action="{{URL::to('editedUnit')}}">
            <input type="hidden" value="" name="unitId"/>
            <div id="edit-semester" class="row">
            </div>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-danger" id="delete-unit">Borrar Semestre/Cuatrimestre</button>
        <button type="button" class="btn btn-primary" id="edited-unit-save">Guardar Semestre/Cuatrimestre</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal para agregar  movilidad -->
<div class="modal fade bs-example-modal-lg" id="modal-add-movility" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Agregar Movilidad</h4>
      </div>
      <div class="modal-body" id="modal-movility-body">
        <div id="subjects">
          <h4>Llenar la información sobre la movilidad del alumno</h4>
          <form action="{{URL::to('/addMovility')}}" method="post">
            {{csrf_field()}}
            <input type="hidden" name="StudentId" value="{{$student->matricula or ""}}">
            <input type="hidden" name="ProgramId" value="{{$program->id or ""}}">
            <div class="form-group">
              <label>Nombre</label>
              <input type="text" name="Nombre" class="form-control" value="{{old('Nombre')}}"/>
            </div>
            <div class="form-group">
              <label>Fecha de Inicio</label>
              <input type="text" name="Start" class="form-control datepicker" value="{{old('Start')}}"/>
            </div>
            <div class="form-group">
              <label>Fecha de Finalización</label>
              <input type="text" name="End" class="form-control datepicker" value="{{old('End')}}"/>
            </div>
            <div class="form-group">
              <label>Destino</label>
              <input type="text" name="Destino" class="form-control" value="{{old('Destrino')}}"/>
            </div>
            <div class="form-group">
              <label>Resultado</label>
              <input type="text" name="Resultado" class="form-control" value="{{old('Resultado')}}"/>
            </div>

        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
        <button type="submit" class="btn btn-primary" >Guardar Movilidad</button>
      </div>
      </form>
    </div>
  </div>
</div>

<!-- Modal para agregar trabajo de productividad -->
<div class="modal fade bs-example-modal-lg" id="modal-add-productivity" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Agregar Trabajo de Productividad</h4>
      </div>
      <div class="modal-body" id="modal-movility-body">
        <div id="subjects">
          <h4>Llenar la información sobre el trabajo del alumno</h4>
          <form action="{{URL::to('/addProductivity')}}" method="post">
            {{csrf_field()}}
            <input type="hidden" name="StudentId" value="{{$student->matricula or ""}}">
            <input type="hidden" name="ProgramId" value="{{$program->id or ""}}">
            <div class="form-group">
              <label>Nombre</label>
              <input type="text" name="Nombre" class="form-control" value="{{old('Nombre')}}"/>
            </div>
            <div class="form-group">
              <label>Fecha</label>
              <input type="text" name="Start" class="form-control datepicker" value="{{old('Start')}}"/>
            </div>
            <div class="form-group">
              <label>Categoría</label>
              <input type="text" name="Category" class="form-control" value="{{old('Category')}}"/>
            </div>
            <div class="form-group">
              <label>Tipo</label>
              <input type="text" name="Type" class="form-control" value="{{old('Type')}}"/>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
        <button type="submit" class="btn btn-primary" >Guardar Trabajo</button>
      </div>
      </form>
    </div>
  </div>
</div>

<!-- Modal para agregar notas -->
<div class="modal fade bs-example-modal-lg" id="modal-add-note" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Agregar nota</h4>
      </div>
      <div class="modal-body" id="modal-movility-body">
        <form action="{{URL::to('addNote')}}" method="POST">
          {{csrf_field()}}
          <input type="hidden" name="workId" value="{{$work->id or ''}}"/>
          <div class="form-group">
            <textarea class="form-control" name="Note" rows="10" placeholder="Texto de la nota"></textarea>
          </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
        <button type="submit" class="btn btn-primary" >Guardar Nota</button>
      </div>
      </form>
    </div>
  </div>
</div>

<div class="modal fade bs-example-modal-lg" id="modal-terminate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Terminar Programa</h4>
      </div>
      <div class="modal-body" id="modal-movility-body">
        <h3>Importante</h3>
        <p>Al terminar un programa, el estudiante ya no estará activo en éste, por lo tanto solo se recomienda utilizar esta opción solo cuando el estudiante haya concluído con sus estudios, o cuando el estudiante se ha dado de baja.</p>
        <a href="{{URL::to('terminateProgram')}}?programId={{$program->id or ''}}&studentId={{$student->matricula or ''}}" class="btn btn-primary btn-lg center-block">Terminar programa</a>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
      </div>
    </div>
  </div>
</div>


<!-- Delete Modal -->
<div class="modal fade modal-danger" id="delete-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Borrar Semestre/Cuatrimestre</h4>
      </div>
      <div class="modal-body">
        Está a punto de borrar un Semestre/Cuatrimestre. Esto no se puede deshacer.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-warning" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-danger" id="delete-unit-confirm">Borrar</button>
      </div>
    </div>
  </div>
</div>

<!-- Delete Modal -->
<div class="modal fade modal-danger" id="delete-movility-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Borrar Movilidad</h4>
      </div>
      <div class="modal-body">
        Está a punto de borrar una Movilidad. Esto no se puede deshacer.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-warning" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-danger" id="movility-delete-confirm">Borrar</button>
      </div>
    </div>
  </div>
</div>

<!-- Delete Modal -->
<div class="modal fade modal-danger" id="delete-productivity-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Borrar Trabajo de Productividad</h4>
      </div>
      <div class="modal-body">
        Está a punto de borrar un trabajo de Productividad. Esto no se puede deshacer.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-warning" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-danger" id="productivity-delete-confirm">Borrar</button>
      </div>
    </div>
  </div>
</div>
