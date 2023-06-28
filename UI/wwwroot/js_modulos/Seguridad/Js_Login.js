$(document).ready(function () {

    //Ingresar con Enter
    let input = document.querySelector('Body');
    input.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
          
            $("#btningresar").click();
        }
    })

    $("#btningresar").click(function () {

        var USUARIO_LOGIN = $("#txtusuario").val();
        var CONTRASEÑA_LOGIN = $("#txtclave").val();

        var ajax_data = { "USUARIO": USUARIO_LOGIN, "CONTRASEÑA": CONTRASEÑA_LOGIN };

        $.ajax({
            type: "POST",
            url: '/Seguridad/Validar_Login',
            data: JSON.stringify(ajax_data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () {
                $('body').addClass('loading');
            },
            success: function (respuesta) {


                var ID, APELLIDOS, NOMBRES, CORREO, USUARIO, CONTRASEÑA;



                if (respuesta.length > 0) {

                      ID = respuesta[0].ID,
                      APELLIDOS = respuesta[0].APELLIDOS,
                      NOMBRES = respuesta[0].NOMBRES,
                      CORREO = respuesta[0].CORREO,
                      USUARIO = respuesta[0].USUARIO,
                      CONTRASEÑA = respuesta[0].CONTRASEÑA,
                      


                    $.session.set('SESSION_ID_USUARIO', ID);
                    $.session.set('SESSION_APELLIDOS', APELLIDOS);
                    $.session.set('SESSION_NOMBRES', NOMBRES);
                    $.session.set('SESSION_CORREO', CORREO);
                    $.session.set('SESSION_USUARIO', USUARIO);
                    $.session.set('SESSION_CONTRASEÑA', CONTRASEÑA);
                
                    window.location.href = "../Seguridad/Principal";
                }
                else { swal("Error!", "Usuario o Contraseña Incorrecta. !", "error"); }

                $('body').removeClass('loading');
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var error = eval("(" + XMLHttpRequest.responseText + ")");
                alert(error.Message);
            }
        });



    });

   
});



    

    
