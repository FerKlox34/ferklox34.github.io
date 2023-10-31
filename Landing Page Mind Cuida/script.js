function mostrarSeccion(id) {
    var secciones = document.querySelectorAll('section');
    secciones.forEach(function(seccion) {
        seccion.style.display = 'none';
    });
    document.getElementById(id).style.display = 'block';
}

function validarFormulario() {
    var nombre = document.getElementById("puts").value;
    var correo = document.getElementById("puts1").value;
    var comentario = document.getElementById("check");

    

    if ((nombre === "" || correo === "")) {
        alert("Por favor rellene los espacios");
        return false;
    }

    if (!comentario.checked) {
        alert("Por favor acepte la politica");
        return false;
    }

    alert("Se ha enviado correctamente tu comentario");

    return true;
}

