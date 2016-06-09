var Bookshelf = require('./db');

var models = [];

var Student = Bookshelf.Model.extend({
  tableName: 'Estudiante',
  idAttribute: 'matricula',
  hasTimestamps: false,
  programs:function(){
    return this.belongsToMany(Program,"Programa_has_estudiantes","idEstudiante","idPrograma").withPivot(["becario","campus","estado"]);
  },
  works: function(){
    return this.hasMany(Work,"idEstudiante");
  }
});

var Program = Bookshelf.Model.extend({
  tableName: 'Programa',
  idAttribute: 'id',
  hasTimestamps: false,
  students:function(){
    return this.belongsToMany(Student,"Programa_has_estudiantes","idPrograma","idEstudiante").withPivot(['becario', 'campus','estado']);
  }
});

var Unit =  Bookshelf.Model.extend({
  tableName: 'Unidad',
  idAttribute: 'id',
  hasTimestamps: false,
  student:function(){
    return this.belongsTo(Student,"idEstudiante");
  },
  program: function(){
    return this.belongsTo(Program,"idPrograma");
  },
  subjects: function(){
    return this.hasMany(Subject,"idUnidad");
  }
});

var Subject =  Bookshelf.Model.extend({
  tableName: 'Materia',
  idAttribute: 'id',
  hasTimestamps: false,
  unidad: function(){
    return this.belongsTo(Unidad,"idUnidad");
  }
});

var Work =  Bookshelf.Model.extend({
  tableName: 'Trabajo',
  idAttribute: 'id',
  hasTimestamps: false,
  unidad: function(){
    return this.belongsTo(Unidad,"idUnidad");
  },
  student: function(){
    return this.belongsTo(Student,"idEstudiante");
  },
});

models["Student"] = Student;
models["Program"] = Program;
models["Unit"] = Unit;
models["Subject"] = Subject;
models["Work"] = Work;

module.exports = function(model){
  return models[model];
}
