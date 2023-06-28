$(document).ready(function () {

  
    var SESSION_ID_USUARIO = ($.session.get('SESSION_ID_USUARIO'));
    var SESSION_USUARIO = ($.session.get('SESSION_USUARIO'));
    var SESSION_NOMBRES = ($.session.get('SESSION_NOMBRES'));
    var SESSION_DESCRIPCION_PERFIL = ($.session.get('SESSION_DESCRIPCION_PERFIL'));
    var SESSION_APELLIDOS = ($.session.get('SESSION_APELLIDOS'));
    var SESSION_CORREO = ($.session.get('SESSION_CORREO'));

    //====>> Coloca los nombres en la pantalla Cambiar_Clave
    $("#txtnombre_completo").text(SESSION_NOMBRES + ' ' + SESSION_APELLIDOS);
    $("#txtcorreo").text(SESSION_CORREO);
    $("#txtusuario").text(SESSION_USUARIO);

    if (typeof SESSION_NOMBRES === "undefined") {
        location.href = '/Seguridad/Login';
    }

    

    //if (USUARIO != 'admin') {
    //    location.href = 'Login.aspx';

    //}


    //OBTENER_COMBO_EMPRESA();
    //$('#txtfecnac').datetimepicker({
    //    //format: 'YYYY-MM-DD HH:mm'
    //    format: 'DD/MM/YYYY'
    //});
    //$('#txtfecnac').data("DateTimePicker").show();


    $("#btnnuevo").css('cursor', 'pointer');
  
    function BUSCAR_USUARIOS() {
       
        var APELLIDOS = $('#txtapellidos_buscar').val();
        var NOMBRES = $('#txtnombres_buscar').val();
        var ESTADO = $('#ddlestado_buscar').val();
        var USUARIO = $('#txtusuario_buscar').val();

        var table = $('#Tabla_Usuarios').DataTable();
        table.clear().draw();

        var ajax_data = { "APELLIDOS": APELLIDOS, "NOMBRES": NOMBRES, "ESTADO": ESTADO, "USUARIO": USUARIO };
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
            success: function (datos)
            {
                
                for (var i = 0; i < datos.length; i++)
                {


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
   

    $("#btnnuevo").click(function (e) {
        $("#Titulo_Panel").text('Nuevo Usuario');
        $("#txtapellidos").val('');
        $("#txtnombres").val('');
        $("#txtcorreo").val('');
        $("#txt_usuario").val('');
        $("#txtclave").val('');       
        $("#ddlestado").val('A');
        $("#ddlperfil").val('B');
       



        $("#div_estado_buscar").hide();
        $("#btnGuardar").show();
        $("#btnActualizar").hide();

        $('#modal_nuevo').modal();

        /*Eliminar las clases de error*/
        $("#txtapellidos").removeClass('error_campo_vacio');
        $("#txtnombres").removeClass('error_campo_vacio');
        $("#txt_usuario").removeClass('error_campo_vacio');
        $("#txtclave").removeClass('error_campo_vacio');
        $("#ddlperfil").removeClass('error_campo_vacio');
       

    });

    $("#btnbuscar").click(function (e) {

        BUSCAR_USUARIOS();

    });

    $(document).on('click', '.eliminar', function (e) {
        var ID, NOMBRES;
        ID = $(this).parents("tr").find("td").eq(0).html();
        NOMBRES = $(this).parents("tr").find("td").eq(3).html();




        Swal.fire({
            title: 'Inactivar Registro?',
            text: "¿Estás seguro de inactivar al Usuario  :  " + NOMBRES + " ?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1ab394',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Si, Eliminar !'
        }).then((result) => {
            if (result.value) {


                var ajax_data = {
                    "ID": ID

                };

                $.ajax({
                    type: "POST",
                    url: '/Seguridad/Inactivar_Usuario',
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

                            Swal.fire('Eliminado !', 'El Registro ha sido eliminado.', 'success');
                        }
                        $('#Tabla_Usuarios').dataTable().fnClearTable();
                        BUSCAR_USUARIOS();
                        $('body').removeClass('loading'); //Removemos la clase loading
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        var error = eval("(" + XMLHttpRequest.responseText + ")");
                        alert(error.Message);
                    }
                });




            }
        })


    });

    $(document).on('click', '.editar', function (e) {
     

        /*Eliminar las clases de error*/
        $("#txtapellidos").removeClass('error_campo_vacio');
        $("#txtnombres").removeClass('error_campo_vacio');
        $("#txt_usuario").removeClass('error_campo_vacio');
        $("#txtclave").removeClass('error_campo_vacio');


        $("#Titulo_Panel").text('Actualizar Usuario');
        $("#div_estado_buscar").show();
        $('#modal_nuevo').modal();
        $("#btnGuardar").hide();
        $("#btnActualizar").show();

        var ajax_data = {
            "ID": $(this).parents("tr").find("td").eq(0).html(),
        };


        $.ajax({
            type: "POST",
            url: '/Seguridad/Obtener_Usuarios',
            data: JSON.stringify(ajax_data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (datos) {
               
              
                for (var i = 0; i < datos.length; i++) {
                  
                    $("#txtcodigo").val(datos[i].ID);
                    $("#txtapellidos").val(datos[i].APELLIDOS);
                    $("#txtnombres").val(datos[i].NOMBRES);
                    $("#txtcorreo").val(datos[i].CORREO);
                    $("#txt_usuario").val(datos[i].USUARIO);
                    $("#txtclave").val(datos[i].CONTRASEÑA);
                    $("#ddlestado").val(datos[i].ESTADO);
                   
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var error = eval("(" + XMLHttpRequest.responseText + ")");
                alert(error.Message);
            }
        });



    });

    $("#btnGuardar").click(function (e) {

        


        var resultado_validacion = validar_input_vacios();



        if (resultado_validacion == 0) {

            var APELLIDOS = $("#txtapellidos").val();
            var NOMBRES = $("#txtnombres").val();
            var CORREO = $("#txtcorreo").val();
            var USUARIO = $("#txt_usuario").val();
            var CONTRASEÑA = $("#txtclave").val();
          
          //  var EMPRESA = $("#ddlempresa").val();
           // var USUARIO_CREACION = $.session.get('SESSION_USUARIO');

            var ajax_data = {
                "APELLIDOS": APELLIDOS,
                "NOMBRES": NOMBRES,
                "CORREO": CORREO,
                "USUARIO": USUARIO,
                "CONTRASEÑA": CONTRASEÑA
              
               
            };
            $.ajax({
                type: "POST",
                url: '/Seguridad/Grabar_Usuarios',
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
                    BUSCAR_USUARIOS();

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    var error = eval("(" + XMLHttpRequest.responseText + ")");
                    alert(error.Message);
                }
            });

        }




    });

    $("#btnActualizar").click(function (e) {

        var resultado_validacion = validar_input_vacios();


        if (resultado_validacion == 0) {

            var ID = $("#txtcodigo").val();
            var APELLIDOS = $("#txtapellidos").val();
            var NOMBRES = $("#txtnombres").val();
            var CORREO = $("#txtcorreo").val();
            var USUARIO = $("#txt_usuario").val();
            var CONTRASEÑA = $("#txtclave").val();
            var ESTADO = $("#ddlestado").val();
           


            var ajax_data = {
                "ID": ID,
                "APELLIDOS": APELLIDOS,
                "NOMBRES": NOMBRES,
                "CORREO": CORREO,
                "USUARIO": USUARIO,
                "CONTRASEÑA": CONTRASEÑA,
                "ESTADO": ESTADO
               
             
            };

            $.ajax({
                type: "POST",
                url: '/Seguridad/Actualizar_Usuarios',
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

                        Swal.fire('Excelente!', 'El registro se Actualizó Satisfactoriamente.!', 'success')
                    }

                    else {

                        Swal.fire('Error!', 'El registro no Grabo.!', 'error')
                        $('#modal_nuevo').modal('hide');
                    }
                    $('body').removeClass('loading'); //Removemos la clase loading
                    BUSCAR_USUARIOS();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    var error = eval("(" + XMLHttpRequest.responseText + ")");
                    alert(error.Message);
                }
            });

        }






    });


   function validar_input_vacios() {
        /*Eliminar las clases de error*/
        $("#txtapellidos").removeClass('error_campo_vacio');
        $("#txtnombres").removeClass('error_campo_vacio');
        $("#txt_usuario").removeClass('error_campo_vacio');
       $("#txtclave").removeClass('error_campo_vacio');
     

        var validar = 0;

        var APELLIDOS = $("#txtapellidos").val();
        var NOMBRES = $("#txtnombres").val();
        var USUARIO = $("#txt_usuario").val();
       var CLAVE = $("#txtclave").val();
      
      
        




        if (APELLIDOS == '') {
            validar = 1;

            alertify.error('El Campo <b> Apellidos </b> no debe estar vacio.!');
            $("#txtapellidos").addClass('error_campo_vacio');
            return validar;
        }
        else { $("#txtapellidos").removeClass('error_campo_vacio'); }
        if (NOMBRES == '') {
            validar = 1;

            alertify.error('El Campo <b> Nombres </b> no debe estar vacio.!');
            $("#txtnombres").addClass('error_campo_vacio');
            return validar;
        }
        else { $("#txtnombres").removeClass('error_campo_vacio'); }
        if (USUARIO == '') {
            validar = 1;
            alertify.error('El Campo <b> Usuario </b> no debe estar vacio.!');
            $("#txt_usuario").addClass('error_campo_vacio');
            return validar;
        }
        else { $("#txt_usuario").removeClass('error_campo_vacio'); }
        if (CLAVE == '') {
            validar = 1;

            alertify.error('El Campo <b> Contraseña </b> no debe estar vacio.!');
            $("#txtclave").addClass('error_campo_vacio');
            return validar;
        }
        else { $("#txtclave").removeClass('error_campo_vacio'); }
      


        return validar;
    }


    $("#btn_guardar_cambio_clave").click(function (e) {
        var CLAVE1 = $("#txtnuevacontraseña1").val().trim();
        var CLAVE2 = $("#txtnuevacontraseña2").val().trim();
        if (CLAVE1 == "") {
            //Swal.fire("Error !", "Ingrese Contraseña. !", "error");
            alertify.error('<b> Debe ingresar una Contraseña. ! </b>');
        }
        else if (CLAVE1 == CLAVE2) {

            var ajax_data = { "ID": ID, "CLAVE": CLAVE1, "USUARIO": USUARIO };

            $.ajax({
                type: "POST",
                url: '/Seguridad/Cambiar_Clave',
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

                        Swal.fire('Excelente!', 'El registro se Actualizó Satisfactoriamente.!', 'success')
                    }

                    else {

                        Swal.fire('Error!', 'El registro no Grabo.!', 'error')

                    }
                    $('body').removeClass('loading'); //Removemos la clase loading
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    var error = eval("(" + XMLHttpRequest.responseText + ")");
                    alert(error.Message);
                }
            });

            $("#txtnuevacontraseña1").val('');
            $("#txtnuevacontraseña2").val('');
        }

        else {
            //Swal.fire("Error !", "Las contraseñas no coinciden. !", "error");
            alertify.error('<b> Las contraseñas no coinciden. ! </b>');
        }

    });


    $("#show_hide_password a").on('click', function (event) {
        event.preventDefault();
        if ($('#show_hide_password input').attr("type") == "text") {
            $('#show_hide_password input').attr('type', 'password');
            $('#show_hide_password i').addClass("fa-eye-slash");
            $('#show_hide_password i').removeClass("fa-eye");
        } else if ($('#show_hide_password input').attr("type") == "password") {
            $('#show_hide_password input').attr('type', 'text');
            $('#show_hide_password i').removeClass("fa-eye-slash");
            $('#show_hide_password i').addClass("fa-eye");
        }
    });


    $("#show_hide_password2 a").on('click', function (event) {
        event.preventDefault();
        if ($('#show_hide_password2 input').attr("type") == "text") {
            $('#show_hide_password2 input').attr('type', 'password');
            $('#show_hide_password2 i').addClass("fa-eye-slash");
            $('#show_hide_password2 i').removeClass("fa-eye");
        } else if ($('#show_hide_password2 input').attr("type") == "password") {
            $('#show_hide_password2 input').attr('type', 'text');
            $('#show_hide_password2 i').removeClass("fa-eye-slash");
            $('#show_hide_password2 i').addClass("fa-eye");
        }
    });


    $("#btncerrar_cambio_clave").click(function (e) {

        window.location.href = "../Seguridad/Principal";

    });













});
