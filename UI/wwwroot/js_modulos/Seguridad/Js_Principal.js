$(document).ready(function () {

    
    var SESSION_ID_USUARIO = ($.session.get('SESSION_ID_USUARIO'));
    var SESSION_USUARIO = ($.session.get('SESSION_USUARIO'));
    var SESSION_NOMBRES = ($.session.get('SESSION_NOMBRES'));

    var SESSION_APELLIDOS = ($.session.get('SESSION_APELLIDOS'));
    var SESSION_CORREO = ($.session.get('SESSION_CORREO'));
    

    if (typeof SESSION_NOMBRES === "undefined") {
        location.href = '/Seguridad/Login';

    }

    //====>> Dibujar MENU por permisos de usuario

    CREAR_MENU();
    
    function CREAR_MENU() {

        var APELLIDOS = $('#txtapellidos_buscar').val();
        var NOMBRES = $('#txtnombres_buscar').val();
        var ESTADO = $('#ddlestado_buscar').val();

        var table = $('#Tabla_Usuarios').DataTable();
        table.clear().draw();

        var ajax_data = { "APELLIDOS": APELLIDOS, "NOMBRES": NOMBRES, "ESTADO": ESTADO };
        $.ajax({
            type: "POST",
            url: '/Seguridad/Buscar_Usuarios',

            data: JSON.stringify(ajax_data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () {
                $('body').addClass('loading');
            },
            success: function (datos) {

                for (var i = 0; i < datos.length; i++) {


                    $('#Tabla_Usuarios').dataTable({
                        columnDefs: [
                            { className: 'text-center', targets: [0, 1, 2, 3, 4, 5, 6] }

                        ],
                        destroy: true

                    }).fnAddData([

                        datos[i].ID,
                        datos[i].APELLIDOS,
                        datos[i].NOMBRES,
                        datos[i].USUARIO,
                        datos[i].CORREO,
                        datos[i].ESTADO,
                        "<img src='../img/editar_2.png' class='editar' style='width:20px;height:20px' />",
                        "<img src='../img/ELIMINAR.png' class='eliminar' style='width:20px;height:20px'/>"
                    ]);

                }
                $('body').removeClass('loading'); //Removemos la clase loading
                $("#Tabla_Usuarios").show();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var error = eval("(" + XMLHttpRequest.responseText + ")");
                // alert(error.Message);
                swal("Error!", "Por favor, prueba los pasos siguientes: <b></br>1.      Cierre todas sus sesiones y vuelva a ingresar al sistema. </br>2.      Compruebe su conexión a Internet.</br> 3.      Reinicie su equipo.</br> 4.      En caso no resuelva la situación, envíe un correo al area de sistemas <b/> ", "error");
            }
        });


    }




});
