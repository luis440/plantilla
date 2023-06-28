
$(document).ready(function () {

    


    var ID, APELLIDOS, NOMBRES, CORREO, USUARIO, CONTRASEÑA;


    
    var ID = ($.session.get('SESSION_ID'));
    var USUARIO = ($.session.get('SESSION_USUARIO'));
    var NOMBRES = ($.session.get('SESSION_NOMBRES'));
    var PERFIL = ($.session.get('SESSION_PERFIL'));
    var APELLIDOS = ($.session.get('SESSION_APELLIDOS'));
    var CORREO = ($.session.get('SESSION_CORREO'));


   
    $('#nombre_completo_menu').text(APELLIDOS + ' ' + NOMBRES);
    $('#txtusurio_menu').text(USUARIO);
    $('#txtperfil_menu').html(PERFIL + "<b class='caret'></b>");


    if (PERFIL == 'ADMINISTRADOR') {

        $('#id_menu_Empresa').show();
        $('#id_menu_Tarjeta').show();
        $('#id_menu_Seguridad').show();
        $("#ddlempresa").prop('disabled', false);
        $("#ddlempresa_nuevo").prop('disabled', false);
    }
    else if (PERFIL == 'OPERADOR')
    {
        $('#menu_servicios').html('');
        $('#menu_tipo_cambio').html('');
        $('#menu_series').html('');
        $('#menu_facturacion').html('');
        $('#menu_padre_finazas').html('');
        $('#menu_usuarios').html('');
        
    }
    else if (PERFIL == 'FACTURADOR') {
        $('#menu_padre_mantenimiento').html('');
        $('#menu_operaciones').html('');
      
        $('#menu_usuarios').html('');

    }
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
        location.href = '../Login.aspx';
    });
    $("#btnsalir_perfil").click(function () {
        $.session.clear();
        location.href = '../Login.aspx';
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