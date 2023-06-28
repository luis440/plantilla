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
 $("#btnnuevo").css('cursor', 'pointer');


    //if (USUARIO != 'admin') {
    //    location.href = 'Login.aspx';

    //}


    OBTENER_COMBO_PAIS();

    function OBTENER_COMBO_PAIS() {

        $('#ddlpais').empty().append('<option value=B> << Seleccionar >> </option>');
        $.ajax({
            type: "POST",
            url: '/Mantenimiento/Obtener_Combo_Pais',
            data: JSON.stringify(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () {
                $('body').addClass('loading');
            },
            success: function (datos) {

                for (var i = 0; i < datos.length; i++) {

                    $('#ddlpais').append('<option value="' + datos[i].ID_PAIS + '">' + datos[i].DESCRIPCION_PAIS + '</option>');

                }
                $('body').removeClass('loading'); //Removemos la clase loading

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var error = eval("(" + XMLHttpRequest.responseText + ")");
                // alert(error.Message);
                swal("Error!", "Por favor, prueba los pasos siguientes: <b></br>1.      Cierre todas sus sesiones y vuelva a ingresar al sistema. </br>2.      Compruebe su conexión a Internet.</br> 3.      Reinicie su equipo.</br> 4.      En caso no resuelva la situación, envíe un correo aL area de sistemas <b/> ", "error");
            }
        });
    };
   
    $('#ddlpais').change(function () {
        $('#txtiso3').val('');
        $('#txtiso2').val('');
       
        var ID_PAIS = $('#ddlpais').val();
        if (ID_PAIS == 'B') { ID_PAIS = 0; }

        var ajax_data = { "ID_PAIS": ID_PAIS };

        $.ajax({
            type: "POST",
            url: '/Mantenimiento/Obtener_Datos_Combo_Pais',
            data: JSON.stringify(ajax_data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () { $('body').addClass('loading'); },
            success: function (datos) {
               

                for (var i = 0; i < datos.length; i++) {

                   
                    $('#txtiso3').val(datos[i].ISO3_PAIS);
                    $('#txtiso2').val(datos[i].ISO2_PAIS);

                }


                $('body').removeClass('loading');
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var error = eval("(" + XMLHttpRequest.responseText + ")");
                swal("Error!", "Por favor, prueba los pasos siguientes: <b></br>1.      Cierre todas sus sesiones y vuelva a ingresar al sistema. </br>2.      Compruebe su conexión a Internet.</br> 3.      Reinicie su equipo.</br> 4.      En caso no resuelva la situación, envíe un correo a atencionalcliente@renzocosta.com <b/> ", "error");
            }
        });







    });






    function BUSCAR_EMPRESA() {

        var DESCRIPCION_EMPRESA = $('#txtapellidos_buscar').val();
        var RUC_EMPRESA = $('#txtnombres_buscar').val();
        var ESTADO = $('#ddlestado_buscar').val();
        

        var table = $('#Tabla_Empresa').DataTable();
        table.clear().draw();

        var ajax_data = { "DESCRIPCION_EMPRESA": DESCRIPCION_EMPRESA, "RUC_EMPRESA": RUC_EMPRESA, "ESTADO": ESTADO };
        $.ajax({
            type: "POST",
            url: '/Mantenimiento/Buscar_Empresa',

            data: JSON.stringify(ajax_data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () {
                $('body').addClass('loading');
            },
            success: function (datos) {

                for (var i = 0; i < datos.length; i++) {


                    $('#Tabla_Empresa').dataTable({
                        columnDefs: [
                            { className: 'text-center', targets: [0, 1, 2, 3, 4, 5,6] }

                        ],
                        destroy: true

                    }).fnAddData([

                        datos[i].ID_EMPRESA,
                        datos[i].RUC_EMPRESA,
                        datos[i].DESCRIPCION_EMPRESA,
                        datos[i].TELEFONO_EMPRESA,     
                        datos[i].ESTADO,
                        "<img src='../img/editar_2.png' class='editar' style='width:20px;height:20px' />",
                        "<img src='../img/ELIMINAR.png' class='eliminar' style='width:20px;height:20px'/>"
                    ]);

                }
                $('body').removeClass('loading'); //Removemos la clase loading
                $("#Tabla_Empresa").show();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var error = eval("(" + XMLHttpRequest.responseText + ")");
                // alert(error.Message);
                swal("Error!", "Por favor, prueba los pasos siguientes: <b></br>1.      Cierre todas sus sesiones y vuelva a ingresar al sistema. </br>2.      Compruebe su conexión a Internet.</br> 3.      Reinicie su equipo.</br> 4.      En caso no resuelva la situación, envíe un correo al area de sistemas <b/> ", "error");
            }
        });


    }


    $("#btnnuevo").click(function (e) {
        $("#Titulo_Panel").text('Nueva Empresa');
        $("#txtruc").val('');
        $("#txtdescripcion").val('');
        $("#txt_nombre_comercial").val('');
        $("#txtrepresentantelegal").val('');
        $("#txt_direccion").val('');
        $("#txttelefono").val('');
        $("#ddlpais").val('B');
        $("#ddlestado").val('A');
        $("#txtiso3").val('');
        $("#txtiso2").val('');

        $("#div_estado_buscar").hide();
        $("#btnGuardar").show();
        $("#btnActualizar").hide();

        $('#modal_nuevo').modal();

        /*Eliminar las clases de error*/
        $("#txtruc").removeClass('error_campo_vacio');
        $("#txtdescripcion").removeClass('error_campo_vacio');

    });

    $("#btnbuscar").click(function (e) {

        BUSCAR_EMPRESA();

    });

    $(document).on('click', '.eliminar', function (e) {
        var ID_EMPRESA, DESCRIPCION;
        ID_EMPRESA = $(this).parents("tr").find("td").eq(0).html();
        DESCRIPCION = $(this).parents("tr").find("td").eq(2).html();




        Swal.fire({
            title: 'Inactivar Registro?',
            text: "¿Estás seguro de inactivar la Empresa  :  " + DESCRIPCION + " ?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1ab394',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Si, Eliminar !'
        }).then((result) => {
            if (result.value) {


                var ajax_data = {
                    "ID_EMPRESA": ID_EMPRESA

                };

                $.ajax({
                    type: "POST",
                    url: '/Mantenimiento/Inactivar_Empresa',
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
                        $('#Tabla_Empresa').dataTable().fnClearTable();
                        BUSCAR_EMPRESA();
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
        $("#txtruc").removeClass('error_campo_vacio');
        $("#txtdescripcion").removeClass('error_campo_vacio');


        $("#Titulo_Panel").text('Actualizar Empresa');
        $("#div_estado_buscar").show();
        $('#modal_nuevo').modal();
        $("#btnGuardar").hide();
        $("#btnActualizar").show();

        var ajax_data = {
            "ID_EMPRESA": $(this).parents("tr").find("td").eq(0).html(),
        };


        $.ajax({
            type: "POST",
            url: '/Mantenimiento/Obtener_Empresa',
            data: JSON.stringify(ajax_data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (datos) {


                for (var i = 0; i < datos.length; i++) {

                    $("#txtcodigo").val(datos[i].ID_EMPRESA);
                    $("#txtruc").val(datos[i].RUC_EMPRESA);
                    $("#txtdescripcion").val(datos[i].DESCRIPCION_EMPRESA);
                    $("#txt_nombre_comercial").val(datos[i].NOMBRE_COMERCIAL_EMPRESA);
                    $("#txtrepresentantelegal").val(datos[i].REPRESENTANTE_CREDITO_EMPRESA);
                    $("#txt_direccion").val(datos[i].DIRECCION_EMPRESA);
                    $("#txttelefono").val(datos[i].TELEFONO_EMPRESA);
                    $("#ddlpais").val(datos[i].ID_PAIS);
                    $("#txtiso3").val(datos[i].ISO3_PAIS);
                    $("#txtiso2").val(datos[i].ISO2_PAIS);
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

            var DESCRIPCION_EMPRESA = $("#txtdescripcion").val();
            var NOMBRE_COMERCIAL_EMPRESA = $("#txt_nombre_comercial").val();
            var REPRESENTANTE_CREDITO_EMPRESA = $("#txtrepresentantelegal").val();
            var DIRECCION_EMPRESA = $("#txt_direccion").val();
            var RUC_EMPRESA = $("#txtruc").val();
            var TELEFONO_EMPRESA = $("#txttelefono").val();
            var ID_PAIS = $("#ddlpais").val();
            var USUARIO_CREACION = SESSION_USUARIO;
          

            //  var EMPRESA = $("#ddlempresa").val();
            // var USUARIO_CREACION = $.session.get('SESSION_USUARIO');

            var ajax_data = {
                "DESCRIPCION_EMPRESA": DESCRIPCION_EMPRESA,
                "NOMBRE_COMERCIAL_EMPRESA": NOMBRE_COMERCIAL_EMPRESA,
                "REPRESENTANTE_CREDITO_EMPRESA": REPRESENTANTE_CREDITO_EMPRESA,
                "DIRECCION_EMPRESA": DIRECCION_EMPRESA,
                "RUC_EMPRESA": RUC_EMPRESA,
                "TELEFONO_EMPRESA": TELEFONO_EMPRESA,
                 "ID_PAIS": ID_PAIS,
                  "USUARIO_CREACION": USUARIO_CREACION

            };
            $.ajax({
                type: "POST",
                url: '/Mantenimiento/Grabar_Empresa',
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
                    BUSCAR_EMPRESA();

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

            var ID_EMPRESA = $("#txtcodigo").val();
            var DESCRIPCION_EMPRESA = $("#txtdescripcion").val();
            var NOMBRE_COMERCIAL_EMPRESA = $("#txt_nombre_comercial").val();
            var REPRESENTANTE_CREDITO_EMPRESA = $("#txtrepresentantelegal").val();
            var DIRECCION_EMPRESA = $("#txt_direccion").val();
            var RUC_EMPRESA = $("#txtruc").val();
            var TELEFONO_EMPRESA = $("#txttelefono").val();
            var ID_PAIS = $("#ddlpais").val();
            var USUARIO_MODIFICACION = SESSION_USUARIO;
            var ESTADO = $("#ddlestado").val();;



            var ajax_data = {
                "ID_EMPRESA": ID_EMPRESA,
                "DESCRIPCION_EMPRESA": DESCRIPCION_EMPRESA,
                "NOMBRE_COMERCIAL_EMPRESA": NOMBRE_COMERCIAL_EMPRESA,
                "REPRESENTANTE_CREDITO_EMPRESA": REPRESENTANTE_CREDITO_EMPRESA,
                "DIRECCION_EMPRESA": DIRECCION_EMPRESA,
                "RUC_EMPRESA": RUC_EMPRESA,
                "TELEFONO_EMPRESA": TELEFONO_EMPRESA,
                "ID_PAIS": ID_PAIS,
                "USUARIO_MODIFICACION": USUARIO_MODIFICACION,
                "ESTADO": ESTADO


            };

            $.ajax({
                type: "POST",
                url: '/Mantenimiento/Actualizar_Empresa',
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
                    BUSCAR_EMPRESA();
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
        $("#txtruc").removeClass('error_campo_vacio');
        $("#txtdescripcion").removeClass('error_campo_vacio');
       


        var validar = 0;

        var RUC = $("#txtruc").val();
        var DESCRIPCION = $("#txtdescripcion").val();

        if (RUC == '') {
            validar = 1;

            alertify.error('El Campo <b> RUC </b> no debe estar vacio.!');
            $("#txtruc").addClass('error_campo_vacio');
            return validar;
        }
        else { $("#txtruc").removeClass('error_campo_vacio'); }
        if (DESCRIPCION == '') {
            validar = 1;

            alertify.error('El Campo <b> Descripcion </b> no debe estar vacio.!');
            $("#txtdescripcion").addClass('error_campo_vacio');
            return validar;
        }
        else { $("#txtdescripcion").removeClass('error_campo_vacio'); }
       

        return validar;
    }



    $("#btncerrar_cambio_clave").click(function (e) {

        window.location.href = "../Seguridad/Principal";

    });



});