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

    function BUSCAR_PAIS() {

        var DESCRIPCION_PAIS = $('#txtpais_buscar').val();
        var DESCRIPCION_MONEDA = $('#txtmoneda_buscar').val();
        var ESTADO_PAIS = $('#ddlestado_buscar').val();
    

        var table = $('#Tabla_Pais').DataTable();
        table.clear().draw();

        var ajax_data = { "DESCRIPCION_PAIS": DESCRIPCION_PAIS, "DESCRIPCION_MONEDA": DESCRIPCION_MONEDA, "ESTADO_PAIS": ESTADO_PAIS };
        $.ajax({
            type: "POST",
            url: '/Mantenimiento/Buscar_Pais',

            data: JSON.stringify(ajax_data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () {
                $('body').addClass('loading');
            },
            success: function (datos) {

                for (var i = 0; i < datos.length; i++) {


                    $('#Tabla_Pais').dataTable({
                        columnDefs: [
                            { className: 'text-center', targets: [0, 1, 2, 3, 4, 5, 6] }

                        ],
                        destroy: true

                    }).fnAddData([

                        datos[i].ID_PAIS,
                        datos[i].COD_PAIS,
                        datos[i].DESCRIPCION_PAIS,
                        datos[i].COD_MONEDA,
                        datos[i].DESCRIPCION_MONEDA,
                        datos[i].ESTADO_PAIS,
                        "<img src='../img/editar_2.png' class='editar' style='width:20px;height:20px' />",
                        "<img src='../img/ELIMINAR.png' class='eliminar' style='width:20px;height:20px'/>"
                    ]);

                }
                $('body').removeClass('loading'); //Removemos la clase loading
                $("#Tabla_Pais").show();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var error = eval("(" + XMLHttpRequest.responseText + ")");
                // alert(error.Message);
                swal("Error!", "Por favor, prueba los pasos siguientes: <b></br>1.      Cierre todas sus sesiones y vuelva a ingresar al sistema. </br>2.      Compruebe su conexión a Internet.</br> 3.      Reinicie su equipo.</br> 4.      En caso no resuelva la situación, envíe un correo al area de sistemas <b/> ", "error");
            }
        });


    }


    $("#btnnuevo").click(function (e) {
        $("#Titulo_Panel").text('Nuevo Pais');
        $("#txtcodigopais").val('');
        $("#txtdescripcionpais").val('');
        $("#txtiso3").val('');
        $("#txtiso2").val('');
        $("#txtcodigomoneda").val('');
        $("#txtdescripcionmoneda").val('');
        $("#txtcodigoalfanumerico").val('');     
        $("#ddlestado").val('A');
       
        $("#div_estado_buscar").hide();
        $("#btnGuardar").show();
        $("#btnActualizar").hide();

        $('#modal_nuevo').modal();

        /*Eliminar las clases de error*/
        $("#txtcodigopais").removeClass('error_campo_vacio');
        $("#txtdescripcionpais").removeClass('error_campo_vacio');
      


    });

    $("#btnbuscar").click(function (e) {

        BUSCAR_PAIS();

    });

    $(document).on('click', '.eliminar', function (e) {
       
        var ID_PAIS = $(this).parents("tr").find("td").eq(0).html();
        var DESCRIPCION_PAIS = $(this).parents("tr").find("td").eq(2).html();




        Swal.fire({
            title: 'Inactivar Registro?',
            text: "¿Estás seguro de inactivar el Pais  :  " + DESCRIPCION_PAIS + " ?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1ab394',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Si, Eliminar !'
        }).then((result) => {
            if (result.value) {


                var ajax_data = {"ID_PAIS": ID_PAIS};

                $.ajax({
                    type: "POST",
                    url: '/Mantenimiento/Inactivar_Pais',
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
                        $('#Tabla_Pais').dataTable().fnClearTable();
                        BUSCAR_PAIS();
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
        $("#txtcodigopais").removeClass('error_campo_vacio');
        $("#txtdescripcionpais").removeClass('error_campo_vacio');


        $("#Titulo_Panel").text('Actualizar Pais');
        $("#div_estado_buscar").show();
        $('#modal_nuevo').modal();
        $("#btnGuardar").hide();
        $("#btnActualizar").show();

        var ajax_data = {
            "ID_PAIS": $(this).parents("tr").find("td").eq(0).html(),
        };


        $.ajax({
            type: "POST",
            url: '/Mantenimiento/Obtener_Pais',
            data: JSON.stringify(ajax_data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (datos) {


                for (var i = 0; i < datos.length; i++) {

                    $("#txtcodigo").val(datos[i].ID_PAIS);
                    $("#txtcodigopais").val(datos[i].COD_PAIS);
                    $("#txtdescripcionpais").val(datos[i].DESCRIPCION_PAIS);
                    $("#txtiso3").val(datos[i].ISO3_PAIS);
                    $("#txtiso2").val(datos[i].ISO2_PAIS);
                    $("#txtcodigomoneda").val(datos[i].COD_MONEDA);
                    $("#txtdescripcionmoneda").val(datos[i].DESCRIPCION_MONEDA);
                    $("#txtcodigoalfanumerico").val(datos[i].COD_ALFANUMERICO_MONEDA);
                    $("#ddlestado").val(datos[i].ESTADO_PAIS);

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

            var COD_PAIS = $("#txtcodigopais").val();
            var DESCRIPCION_PAIS = $("#txtdescripcionpais").val();
            var ISO3_PAIS = $("#txtiso3").val();
            var ISO2_PAIS = $("#txtiso2").val();
            var COD_MONEDA = $("#txtcodigomoneda").val();
            var DESCRIPCION_MONEDA = $("#txtdescripcionmoneda").val();
            var COD_ALFANUMERICO_MONEDA = $("#txtcodigoalfanumerico").val();
            var USUARIO_CREACION = SESSION_USUARIO;
            

            //  var EMPRESA = $("#ddlempresa").val();
            // var USUARIO_CREACION = $.session.get('SESSION_USUARIO');

            var ajax_data = {
                "COD_PAIS": COD_PAIS,
                "DESCRIPCION_PAIS": DESCRIPCION_PAIS,
                "ISO3_PAIS": ISO3_PAIS,
                "ISO2_PAIS": ISO2_PAIS,
                "COD_MONEDA": COD_MONEDA,
                "DESCRIPCION_MONEDA": DESCRIPCION_MONEDA,
                "COD_ALFANUMERICO_MONEDA": COD_ALFANUMERICO_MONEDA,
                "USUARIO_CREACION": USUARIO_CREACION


            };
            $.ajax({
                type: "POST",
                url: '/Mantenimiento/Grabar_Pais',
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
                    BUSCAR_PAIS();

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

            var ID_PAIS = $("#txtcodigo").val();
            var COD_PAIS = $("#txtcodigopais").val();
            var DESCRIPCION_PAIS = $("#txtdescripcionpais").val();
            var ISO3_PAIS = $("#txtiso3").val();
            var ISO2_PAIS = $("#txtiso2").val();
            var COD_MONEDA = $("#txtcodigomoneda").val();
            var DESCRIPCION_MONEDA = $("#txtdescripcionmoneda").val();
            var COD_ALFANUMERICO_MONEDA = $("#txtcodigoalfanumerico").val();
            var USUARIO_MODIFICACION = SESSION_USUARIO;
            var ESTADO_PAIS = $("#ddlestado").val();
            

            var ajax_data = {
                "ID_PAIS": ID_PAIS,
                "COD_PAIS": COD_PAIS,
                "DESCRIPCION_PAIS": DESCRIPCION_PAIS,
                "ISO3_PAIS": ISO3_PAIS,
                "ISO2_PAIS": ISO2_PAIS,
                "COD_MONEDA": COD_MONEDA,
                "DESCRIPCION_MONEDA": DESCRIPCION_MONEDA,
                "COD_ALFANUMERICO_MONEDA": COD_ALFANUMERICO_MONEDA,
                "USUARIO_MODIFICACION": USUARIO_MODIFICACION,
                "ESTADO_PAIS": ESTADO_PAIS
                

            };

            $.ajax({
                type: "POST",
                url: '/Mantenimiento/Actualizar_Pais',
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
                    BUSCAR_PAIS();
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
      

        $("#txtcodigopais").removeClass('error_campo_vacio');
        $("#txtdescripcionpais").removeClass('error_campo_vacio');

        var validar = 0;

        var CODIGO_PAIS = $("#txtcodigopais").val();
        var DESCRIPCION_PAIS = $("#txtdescripcionpais").val();

        if (CODIGO_PAIS == '') {
            validar = 1;

            alertify.error('El Campo <b> Codigo Pais </b> no debe estar vacio.!');
            $("#txtcodigopais").addClass('error_campo_vacio');
            return validar;
        }
        else { $("#txtcodigopais").removeClass('error_campo_vacio'); }
        if (DESCRIPCION_PAIS == '') {
            validar = 1;

            alertify.error('El Campo <b> Descripcion Pais </b> no debe estar vacio.!');
            $("#txtdescripcionpais").addClass('error_campo_vacio');
            return validar;
        }
        else { $("#txtdescripcionpais").removeClass('error_campo_vacio'); }



        return validar;
    }


    $("#btncerrar_cambio_clave").click(function (e) {

        window.location.href = "../Seguridad/Principal";

    });













});
