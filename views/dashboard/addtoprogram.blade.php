@extends('dashboard.main')
@section('title',"SSTEP | Agregar Alumno a Programa")
@section('css')
  <link href="css/jquery.steps.css" rel="stylesheet"/>
@stop
@section('header')
  Registro de Alumno en programa
@stop

@section('content')
@if(count($errors) > 0)
  <div class="row">
    <div class="col-sm-12">
      <div class="alert alert-danger">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        @foreach($errors->all() as $error)
          <p>{{$error}}</p>
        @endforeach
      </div>
    </div>
  </div>
@endif
@if(session('success'))
  <div class="row">
    <div class="col-sm-12">
      <div class="alert alert-success">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <p>{{session('success')}}</p>
      </div>
    </div>
  </div>
@endif
<form id="example-form" action="addStudentToProgram" METHOD="POST">
    {!!csrf_field()!!}
      <div>
        <h3>Programa</h3>
        <section>
          <div class="col-sm-6">
            <div class="form-group">
              <label>Alumno</label>
              <input type="text" class="form-control" value="{{$student->nombre.' '.$student->paterno.' '.$student->materno}}" disabled="true"/>
              <input type="hidden" name="Matricula" value="{{$student->matricula}}">
            </div>
            <div class="form-group">
              <label>Seleccionar programa para el alumno</label>
              @if($programs->count() > 0)
              <select class="form-control" name="Programa">
                @foreach($programs as $program)
                  <option value="{{$program->id}}">{{$program->nombre}}</option>
                @endforeach
              </select>
              @else
                <h4>No hay programas disponibles para el alumno
              @endif
            </div>
            <div class="form-group">
              <label for="programa">No. de becario(Opcional)</label>
              <input type="text" name="NoBecario" class="form-control" value="{{old('NoBecario')}}"/>
            </div>
            <div class="form-group">
              <label for="programa">Campus</label>
              <input type="text" name="Campus" class="form-control" value="{{old('Campus')}}"/>
            </div>
          </div>
        </section>
        <h3>Carga Académica</h3>
        <section>
          <div id="subjects">
            <h4>Agregar la carga académica del primer semestre del alumno</h4>
            <button type="button" class="btn btn-primary" id="addSubject">Agregar Materia</button>
            <div id="semester" class="row">
            </div>
          </div>
        </section>
        <h3>Trabajo de Titulación</h3>
        <section>
          <div class="col-sm-6">
            <div class="form-group">
              <label for="TutorName">Nombre de Tutor</label>
              <input type="text" class="form-control" name="NombreTutor" value="{{old('NombreTutor')}}"/>
            </div>
            <div class="form-group">
              <label for="Line">Línea de Generación y Ampliación del Conocimiento</label>
              <input type="text" class="form-control" name="Linea" value="{{old('Linea')}}"/>
            </div>
            <div class="form-group">
              <label>Tipo de Trabajo</label>
            </div>
            <div class="radio-inline">
              <label>
                <input type="radio" name="TipoTrabajo" value="Tesis" checked/> Tesis
              </label>
            </div>
            <div class="radio-inline">
              <label>
                <input type="radio"  name="TipoTrabajo" value="Tesina" /> Tesina
              </label>
            </div>
            <div class="radio-inline">
              <label>
                <input type="radio"  name="TipoTrabajo" value="Trabajo Terminal" > Trabajo Terminal
              </label>
            </div>
          </div>
        </section>
      </div>
  </form>
@stop

@section('scripts')
<script src="js/jquery.steps.min.js"></script>
<script src="js/register.js"></script>
<script src="js/register/addSubject.js"></script>
@stop
