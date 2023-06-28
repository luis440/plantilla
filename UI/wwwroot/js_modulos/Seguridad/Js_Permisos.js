$(document).ready(function () {
    var SESSION_ID_USUARIO = ($.session.get('SESSION_ID_USUARIO'));
    var SESSION_USUARIO = ($.session.get('SESSION_USUARIO'));
    var SESSION_NOMBRES = ($.session.get('SESSION_NOMBRES'));
    var SESSION_DESCRIPCION_PERFIL = ($.session.get('SESSION_DESCRIPCION_PERFIL'));
    var SESSION_APELLIDOS = ($.session.get('SESSION_APELLIDOS'));
    var SESSION_CORREO = ($.session.get('SESSION_CORREO'));
   
    function LISTAR_PERMISOS() {

        $("#Lista_Permisos_Mantenimiento").html('');
        $("#Lista_Permisos_Mastercard").html('');
        $("#Lista_Permisos_Seguridad").html('');
        /*PERMISOS PARA MANTENIMIENTO */
        var ID = $('#usuario_id').html();
       
        var ajax_data = { "ID": ID };
        $.ajax({
            type: "POST",
            url: '/Seguridad/Listar_Permisos_Mantenimiento',

            data: JSON.stringify(ajax_data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () {
                $('body').addClass('loading');
            },
            success: function (datos) {

                for (var i = 0; i < datos.length; i++) {

                    var estado_final_check;
                    var estado = datos[i].ESTADO_MENU;
                    if (estado == 'A') { estado_final_check = 'checked' }
                    else { estado_final_check = '' }
                     

                    $("#Lista_Permisos_Mantenimiento").append("<li id=" + datos[i].ID_MENU + ">" +
                        "<input type='checkbox'' value=" + datos[i].ID_MENU + " name='' class='i-checks' " + estado_final_check +" />"+
                        "<span class='m-l-xs descripcion_permiso'>"+datos[i].DESCRIPCION_MENU+"</span>"+
                        "<small class='label label-primary id_permiso'><i class='fa fa-key'></i> " + datos[i].ID_MENU+"</small>"+
                        "</li >");

                    //datos[i].DESCRIPCION_MENU,
                       

                }
                $('body').removeClass('loading'); //Removemos la clase loading
              
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var error = eval("(" + XMLHttpRequest.responseText + ")");
                // alert(error.Message);
                swal("Error!", "Por favor, prueba los pasos siguientes: <b></br>1.      Cierre todas sus sesiones y vuelva a ingresar al sistema. </br>2.      Compruebe su conexión a Internet.</br> 3.      Reinicie su equipo.</br> 4.      En caso no resuelva la situación, envíe un correo al area de sistemas <b/> ", "error");
            }
        });

        $.ajax({
            type: "POST",
            url: '/Seguridad/Listar_Permisos_Mastercard',

            data: JSON.stringify(ajax_data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () {
                $('body').addClass('loading');
            },
            success: function (datos) {

                for (var i = 0; i < datos.length; i++) {

                    var estado_final_check;
                    var estado = datos[i].ESTADO_MENU;
                    if (estado == 'A') { estado_final_check = 'checked' }
                    else { estado_final_check = '' }

                    $("#Lista_Permisos_Mastercard").append("<li id=" + datos[i].ID_MENU + ">" +
                        "<input type='checkbox'' value=" + datos[i].ID_MENU + " name='' class='i-checks' " + estado_final_check + " />" +
                        "<span class='m-l-xs descripcion_permiso'>" + datos[i].DESCRIPCION_MENU + "</span>" +
                        "<small class='label label-primary id_permiso'><i class='fa fa-key'></i> " + datos[i].ID_MENU + "</small>" +
                        "</li >");

                    //datos[i].DESCRIPCION_MENU,


                }
                $('body').removeClass('loading'); //Removemos la clase loading
                
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var error = eval("(" + XMLHttpRequest.responseText + ")");
                // alert(error.Message);
                swal("Error!", "Por favor, prueba los pasos siguientes: <b></br>1.      Cierre todas sus sesiones y vuelva a ingresar al sistema. </br>2.      Compruebe su conexión a Internet.</br> 3.      Reinicie su equipo.</br> 4.      En caso no resuelva la situación, envíe un correo al area de sistemas <b/> ", "error");
            }
        });
        $.ajax({
            type: "POST",
            url: '/Seguridad/Listar_Permisos_Seguridad',

            data: JSON.stringify(ajax_data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () {
                $('body').addClass('loading');
            },
            success: function (datos) {

                for (var i = 0; i < datos.length; i++) {
                    var estado_final_check;
                    var estado = datos[i].ESTADO_MENU;
                    if (estado == 'A') { estado_final_check = 'checked' }
                    else { estado_final_check = '' }

                    $("#Lista_Permisos_Seguridad").append("<li id="+ datos[i].ID_MENU +">" +
                        "<input type='checkbox'' value=" + datos[i].ID_MENU + " name='' class='i-checks' " + estado_final_check + " />" +
                        "<span class='m-l-xs descripcion_permiso'>" + datos[i].DESCRIPCION_MENU + "</span>" +
                        "<small class='label label-primary id_permiso'><i class='fa fa-key'></i> " + datos[i].ID_MENU + "</small>" +
                        "</li >");

                    //datos[i].DESCRIPCION_MENU,


                }
                $('body').removeClass('loading'); //Removemos la clase loading
              
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var error = eval("(" + XMLHttpRequest.responseText + ")");
                // alert(error.Message);
                swal("Error!", "Por favor, prueba los pasos siguientes: <b></br>1.      Cierre todas sus sesiones y vuelva a ingresar al sistema. </br>2.      Compruebe su conexión a Internet.</br> 3.      Reinicie su equipo.</br> 4.      En caso no resuelva la situación, envíe un correo al area de sistemas <b/> ", "error");
            }
        });
    }

    $("#btnbuscar").click(function (e) {
        $('#id_panel_mantenimiento').css("display", "none");
        $('#id_panel_mastercard').css("display", "none");
        $('#id_panel_seguridad').css("display", "none");
        BUSCAR_USUARIOS();

    });

    function BUSCAR_USUARIOS() {
        $('#div_footer_permisos').hide();
        var APELLIDOS = $('#txtapellidos_buscar').val();
        var NOMBRES = $('#txtnombres_buscar').val();
        var USUARIO = $('#txtusuario_buscar').val();
        var ESTADO = $('#ddlestado_buscar').val();
        
        var table = $('#Tabla_Usuarios').DataTable();
        table.clear().draw();

        var ajax_data = { "APELLIDOS": APELLIDOS, "NOMBRES": NOMBRES, "ESTADO": ESTADO, "USUARIO": USUARIO };
        $.ajax({
            type: "POST",
            url: '/Seguridad/Buscar_Usuario_Permiso',

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
                            { className: 'text-center', targets: [0, 1, 2, 3, 4, 5,6] }

                        ],
                        destroy: true

                    }).fnAddData([

                        datos[i].ID,
                        datos[i].APELLIDOS,
                        datos[i].NOMBRES,
                        datos[i].USUARIO,
                        datos[i].CORREO,
                        datos[i].ESTADO,
                        "<img src='../img/check1.png' class='seleccionar' style='width:20px;height:20px' />",
                     
                    ]);

                }
                $('body').removeClass('loading'); //Removemos la clase loading
                $("#Tabla_Usuarios").show();
                $('#div_tabla_usuarios').show();
                $('#div_usuario_seleccionado').hide();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var error = eval("(" + XMLHttpRequest.responseText + ")");
                // alert(error.Message);
                swal("Error!", "Por favor, prueba los pasos siguientes: <b></br>1.      Cierre todas sus sesiones y vuelva a ingresar al sistema. </br>2.      Compruebe su conexión a Internet.</br> 3.      Reinicie su equipo.</br> 4.      En caso no resuelva la situación, envíe un correo al area de sistemas <b/> ", "error");
            }
        });


    }


    $(document).on('click', '.seleccionar', function (e) {

     
       
        var ID = $(this).parents("tr").find("td").eq(0).html();
        var Apellidos = $(this).parents("tr").find("td").eq(1).html();
        var Nombres = $(this).parents("tr").find("td").eq(2).html();
        var Usuario = $(this).parents("tr").find("td").eq(3).html();
        var Correo = $(this).parents("tr").find("td").eq(4).html();

        $('#usuario_permiso').html(Usuario);
        $('#usuario_nombre').html(Apellidos + ' '+ Nombres);
        $('#usuario_correo').html(Correo);
        $('#usuario_id').html(ID);

        $('#div_tabla_usuarios').hide();
        $('#div_usuario_seleccionado').show();
        $('#div_footer_permisos').show();
        
        LISTAR_PERMISOS();

        $('#id_panel_mantenimiento').css("display", "block");
        $('#id_panel_mastercard').css("display", "block");
        $('#id_panel_seguridad').css("display", "block");
        


    });



    $("#btnGuardar_permisos").click(function (e) {
       
      

        var usuario_id = $('#usuario_id').html();

        var permisos = [];
      
        $("#Lista_Permisos_Mantenimiento input:checkbox:checked").each(function () {
            var ID_MENU= $(this).val();

            permisos.push(ID_MENU);
           
           
        });

        $("#Lista_Permisos_Mastercard input:checkbox:checked").each(function () {
            var ID_MENU = $(this).val();

            permisos.push(ID_MENU);


        });
        $("#Lista_Permisos_Seguridad input:checkbox:checked").each(function () {
            var ID_MENU = $(this).val();

            permisos.push(ID_MENU);


        });
  
       
        var ajax_data = { "ID": usuario_id, "PERMISOS": permisos, "USUARIO_CREACION": SESSION_USUARIO };
       
    
     
     //  asi debe pasar una lista
      //  var ajax_data4 = [{ "ID": 1, "ID_MENU": 2 }, { "ID": 1, "ID_MENU": 3 }];
      
        $.ajax({
            type: "POST",
            url: '/Seguridad/Guardar_Permisos',

            data: JSON.stringify(ajax_data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () {
                $('body').addClass('loading');
            },
            success: function (data) {

                var num = data;
                if (num > 0) {
                    $('#modal_nuevo').modal('hide');
                    Swal.fire('Excelente!', 'El registro se Grabo Satisfactoriamente.!', 'success')
                }

                else {
                    Swal.fire('Error!', 'El registro no Grabo.!', 'error')
                    $('#modal_nuevo').modal('hide');
                }
                $('body').removeClass('loading'); //Removemos la clase loading
               

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var error = eval("(" + XMLHttpRequest.responseText + ")");
                // alert(error.Message);
                swal("Error!", "Por favor, prueba los pasos siguientes: <b></br>1.      Cierre todas sus sesiones y vuelva a ingresar al sistema. </br>2.      Compruebe su conexión a Internet.</br> 3.      Reinicie su equipo.</br> 4.      En caso no resuelva la situación, envíe un correo al area de sistemas <b/> ", "error");
            }
        });
        

    });




});





