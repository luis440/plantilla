$(document).ready(function () {

    
    var ID = ($.session.get('SESSION_ID'));
    var USUARIO = ($.session.get('SESSION_USUARIO'));
    var NOMBRES = ($.session.get('SESSION_NOMBRES'));
    var PERFIL = ($.session.get('SESSION_PERFIL'));
    var APELLIDOS = ($.session.get('SESSION_APELLIDOS'));
    var CORREO = ($.session.get('SESSION_CORREO'));
    

    //if (typeof NOMBRES === "undefined") {
    //    location.href = '../Login.aspx';

    //}

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

        var table = $('#Tabla_Usuarios').DataTable();
        table.clear().draw();

        var ajax_data = { "APELLIDOS": APELLIDOS, "NOMBRES": NOMBRES, "ESTADO": ESTADO };
        $.ajax({
            type: "POST",
            url: '/Usuario/BUSCAR_USUARIOS2',
         
            data: JSON.stringify(ajax_data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () {
                $('body').addClass('loading');
            },
            success: function (respuesta)
            {
                
                for (var i = 0; i < respuesta.length; i++)
                {


                    $('#Tabla_Usuarios').dataTable({
                        columnDefs: [
                            { className: 'text-center', targets: [0, 1, 2, 3, 4, 5, 6] }

                        ],
                        destroy: true

                    }).fnAddData([

                        respuesta[i].ID,
                        respuesta[i].APELLIDOS,
                        respuesta[i].NOMBRES,
                        respuesta[i].USUARIO,
                        respuesta[i].CORREO,                       
                        respuesta[i].ESTADO,
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
                swal("Error!", "Por favor, prueba los pasos siguientes: <b></br>1.      Cierre todas sus sesiones y vuelva a ingresar al sistema. </br>2.      Compruebe su conexión a Internet.</br> 3.      Reinicie su equipo.</br> 4.      En caso no resuelva la situación, envíe un correo a atencionalcliente@renzocosta.com <b/> ", "error");
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
       



        $("#div_estado_buscar").hide();
        $("#btnGuardar").show();
        $("#btnActualizar").hide();

        $('#modal_nuevo').modal();

        /*Eliminar las clases de error*/
        $("#txtapellidos").removeClass('error_campo_vacio');
        $("#txtnombres").removeClass('error_campo_vacio');
        $("#txt_usuario").removeClass('error_campo_vacio');
        $("#txtclave").removeClass('error_campo_vacio');
       
       

    });

    $("#btnbuscar").click(function (e) {

        BUSCAR_USUARIOS();

    });

    $(document).on('click', '.eliminar', function (e) {
        var ID, NOMBRES;
        ID = $(this).parents("tr").find("td").eq(0).html();
        NOMBRES = $(this).parents("tr").find("td").eq(3).html();




        Swal.fire({
            title: 'Eliminar Registro?',
            text: "¿Estás seguro de eliminar el Usuario  :  " + NOMBRES + " ?",
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
                    url: '../ServiciosWeb/SW_Usuarios.asmx/Eliminar_Usuarios',
                    data: JSON.stringify(ajax_data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: true,
                    beforeSend: function () {
                        $('body').addClass('loading');
                    },
                    success: function (respuesta) {
                        var num = respuesta.d;
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
            url: '../ServiciosWeb/SW_Usuarios.asmx/Obtener_Usuarios',
            data: JSON.stringify(ajax_data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (respuesta) {
                var datos = (typeof respuesta.d) == 'string' ?
                    eval('(' + respuesta.d + ')') :
                    respuesta.d;
              
                for (var i = 0; i < datos.length; i++) {
                  
                    $("#txtcodigo").val(datos[i].ID);
                    $("#txtapellidos").val(datos[i].APELLIDOS);
                    $("#txtnombres").val(datos[i].NOMBRES);
                    $("#txtcorreo").val(datos[i].CORREO);
                    $("#txt_usuario").val(datos[i].USUARIO);
                    $("#txtclave").val(datos[i].CONTRASEÑA);
                    $("#ddlestado").val(datos[i].ESTADO);
                    $("#ddlperfil").val(datos[i].PERFIL);
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
            var PERFIL = $("#ddlperfil").val();
          //  var EMPRESA = $("#ddlempresa").val();
           // var USUARIO_CREACION = $.session.get('SESSION_USUARIO');

            var ajax_data = {
                "APELLIDOS": APELLIDOS,
                "NOMBRES": NOMBRES,
                "CORREO": CORREO,
                "USUARIO": USUARIO,
                "CONTRASEÑA": CONTRASEÑA,
                "PERFIL": PERFIL
               
            };
            $.ajax({
                type: "POST",
                url: '../ServiciosWeb/SW_Usuarios.asmx/Grabar_Usuarios',
                data: JSON.stringify(ajax_data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                beforeSend: function () {
                    $('body').addClass('loading');
                },
                success: function (resultado) {
                    var num = resultado.d;
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
            var PERFIL = $("#ddlperfil").val();


            var ajax_data = {
                "ID": ID,
                "APELLIDOS": APELLIDOS,
                "NOMBRES": NOMBRES,
                "CORREO": CORREO,
                "USUARIO": USUARIO,
                "CONTRASEÑA": CONTRASEÑA,
                "ESTADO": ESTADO,
                "PERFIL": PERFIL
             
            };

            $.ajax({
                type: "POST",
                url: '../ServiciosWeb/SW_Usuarios.asmx/Actualizar_Usuarios',
                data: JSON.stringify(ajax_data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                beforeSend: function () {
                    $('body').addClass('loading');
                },
                success: function (resultado) {
                    var num = resultado.d;
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



    
    $("#txtnombre_completo").text(NOMBRES + ' ' + APELLIDOS);
    $("#txtperfil").text(PERFIL);
    $("#txtcorreo").text(CORREO);
    $("#txtusuario").text(USUARIO);
  

    $("#btn_guardar_cambio_clave").click(function (e) {
        var CLAVE1 = $("#txtnuevacontraseña1").val().trim();
        var CLAVE2 = $("#txtnuevacontraseña2").val().trim();
        if (CLAVE1 == "") {
            //Swal.fire("Error !", "Ingrese Contraseña. !", "error");
            alertify.error('<b> Debe ingresar una Contraseña. ! </b>');
        }
        else if (CLAVE1 == CLAVE2) {

            var ajax_data = { "ID": ID, "CLAVE1": CLAVE1, "USUARIO": USUARIO };

            $.ajax({
                type: "POST",
                url: '../ServiciosWeb/SW_Usuarios.asmx/Cambiar_contraseña',
                data: JSON.stringify(ajax_data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                beforeSend: function () {
                    $('body').addClass('loading');
                },
                success: function (resultado) {
                    var num = resultado.d;
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


    $("#btncerrar").click(function (e) {

        window.location.href = "Principal.aspx";

    });













});
