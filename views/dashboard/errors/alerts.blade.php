@if(count($errors) > 0)
  <div class="row">
    <div class="col-sm-12">
      <div class="alert alert-danger">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        @foreach($errors->all() as $error)
          {{$error}}<br/>
        @endforeach
      </div>
    </div>
  </div>
@endif
@if(session('successMesage'))
  <div class="row">
    <div class="col-sm-12">
      <div class="alert alert-success">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        {{session('successMesage')}}<br/>
      </div>
    </div>
  </div>
@endif
