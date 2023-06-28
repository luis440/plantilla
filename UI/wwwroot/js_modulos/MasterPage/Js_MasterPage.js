
$(document).ready(function () {


    var SESSION_ID_USUARIO = ($.session.get('SESSION_ID_USUARIO'));
    var SESSION_USUARIO = ($.session.get('SESSION_USUARIO'));
    var SESSION_NOMBRES = ($.session.get('SESSION_NOMBRES'));
    var SESSION_ID_PERFIL = ($.session.get('SESSION_ID_PERFIL'));
    var SESSION_DESCRIPCION_PERFIL = ($.session.get('SESSION_DESCRIPCION_PERFIL'));
    var SESSION_APELLIDOS = ($.session.get('SESSION_APELLIDOS'));
    var SESSION_CORREO = ($.session.get('SESSION_CORREO'));

   
    $('#nombre_completo_menu').text(SESSION_APELLIDOS + ' ' + SESSION_NOMBRES);
    $('#txtusurio_menu').html(SESSION_USUARIO + "<b class='caret'></b>");
    $('#txtperfil_menu').text(SESSION_CORREO);


    var ajax_data = { "ID": SESSION_ID_USUARIO };
    $.ajax({
        type: "POST",
        url: '/Seguridad/Mostrar_Menu',

        data: JSON.stringify(ajax_data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        beforeSend: function () {
            $('body').addClass('loading');
        },
        success: function (datos) {

            for (var i = 0; i < datos.length; i++) {

                $('#' + datos[i].DESCRIPCION_MENU_SYS).css("display", "block");
               


            }
            $('body').removeClass('loading'); //Removemos la clase loading

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var error = eval("(" + XMLHttpRequest.responseText + ")");
            // alert(error.Message);
            swal("Error!", "Por favor, prueba los pasos siguientes: <b></br>1.      Cierre todas sus sesiones y vuelva a ingresar al sistema. </br>2.      Compruebe su conexión a Internet.</br> 3.      Reinicie su equipo.</br> 4.      En caso no resuelva la situación, envíe un correo al area de sistemas <b/> ", "error");
        }
    });




    //if (PERFIL == 'ADMINISTRADOR') {

    //    $('#id_menu_Empresa').show();
    //    $('#id_menu_Tarjeta').show();
    //    $('#id_menu_Seguridad').show();
    //    $("#ddlempresa").prop('disabled', false);
    //    $("#ddlempresa_nuevo").prop('disabled', false);
    //}
    //else if (PERFIL == 'OPERADOR')
    //{
    //    $('#menu_servicios').html('');
    //    $('#menu_tipo_cambio').html('');
    //    $('#menu_series').html('');
    //    $('#menu_facturacion').html('');
    //    $('#menu_padre_finazas').html('');
    //    $('#menu_usuarios').html('');
        
    //}
    //else if (PERFIL == 'FACTURADOR') {
    //    $('#menu_padre_mantenimiento').html('');
    //    $('#menu_operaciones').html('');
      
    //    $('#menu_usuarios').html('');

    //}
    //else {

       
    //    $('#id_menu_Empresa').hide();
    //    $('#id_li_menu_Empresa').html('');

    //    $('#id_menu_Tarjeta').hide();
    //    $('#id_li_menu_Tarjeta').html('');

    //    $('#id_menu_Seguridad').hide();
    //    $('#id_menu_Seguridad').html('');



    //    $("#ddlempresa").prop('disabled', true);
    //    $("#ddlempresa_nuevo").prop('disabled', true);
    //}

    //FACTURADOR



   
   
    //$('#txtusuario_perfil').text(PERFIL);
   
   



    
    $("#btn_salir").click(function () {
        $.session.clear();
        location.href = '/Seguridad/Login';
    });
    $("#btnsalir_perfil").click(function () {
        $.session.clear();
        location.href = '/Seguridad/Login';
    });
});

function aMays(e, elemento) {
    tecla = (document.all) ? e.keyCode : e.which;
    elemento.value = elemento.value.toUpperCase();
}


function aMin(e, elemento) {
    tecla = (document.all) ? e.keyCode : e.which;
    elemento.value = elemento.value.toLowerCase();
}