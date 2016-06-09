$(function() {
  var form = $("#example-form");
  form.children("div").steps({
      headerTag: "h3",
      bodyTag: "section",
      transitionEffect: "slideLeft",
      labels: {
        current: "Paso Actual:",
        pagination: "Paginación",
        finish: "GUARDAR",
        next: "SIGUIENTE",
        previous: "ANTERIOR",
        loading: "Cargando ..."
    },
    onFinished: function (event, currentIndex)
   {
      form.submit();
   }
  });
});
