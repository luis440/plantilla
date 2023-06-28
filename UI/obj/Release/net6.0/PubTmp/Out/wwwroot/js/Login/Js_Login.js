$(document).ready(function () {



    $("#btningresar").click(function () {

       

        var USUARIO_LOGIN = $("#txtusuario").val();
        var CONTRASEÑA_LOGIN = $("#txtclave").val();

        var ajax_data = { "USUARIO": USUARIO_LOGIN, "CONTRASEÑA": CONTRASEÑA_LOGIN };

        $.ajax({
            type: "POST",
            url: '/Login/Validar_Login',
            data: JSON.stringify(ajax_data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () {
                $('body').addClass('loading');
            },
            success: function (respuesta) {
            

                var ID, APELLIDOS, NOMBRES, CORREO, USUARIO, CONTRASEÑA;

                ID = respuesta.obj_Usuario.ID,
                    APELLIDOS = respuesta.obj_Usuario.APELLIDOS,
                    NOMBRES = respuesta.obj_Usuario.NOMBRES,
                    CORREO = respuesta.obj_Usuario.CORREO,
                    USUARIO = respuesta.obj_Usuario.USUARIO,
                    CONTRASEÑA = respuesta.obj_Usuario.CONTRASEÑA,
                    PERFIL = respuesta.obj_Usuario.PERFIL

                if (ID > 0)
                { 


                    $.session.set('SESSION_ID', ID);
                    $.session.set('SESSION_APELLIDOS', APELLIDOS);
                    $.session.set('SESSION_NOMBRES', NOMBRES);
                    $.session.set('SESSION_CORREO', CORREO);
                    $.session.set('SESSION_USUARIO', USUARIO);
                    $.session.set('SESSION_CONTRASEÑA', CONTRASEÑA);
                    $.session.set('SESSION_PERFIL', PERFIL);
                  


                    window.location.href = "../Login/Principal" ;
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