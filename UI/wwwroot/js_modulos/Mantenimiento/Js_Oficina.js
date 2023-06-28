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


    OBTENER_COMBO_EMPRESA();
    OBTENER_COMBO_OFICINA_SBS();
    OBTENER_COMBO_CIUDAD();

    function OBTENER_COMBO_EMPRESA() {

        $('#ddlempresa').empty().append('<option value=0> << Seleccionar >> </option>');
        $('#ddlempresa_buscar').empty().append('<option value=0> << Seleccionar >> </option>');
        
        $.ajax({
            type: "POST",
            url: '/Mantenimiento/Obtener_Combo_Empresa',
            data: JSON.stringify(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () {
                $('body').addClass('loading');
            },
            success: function (datos) {

                for (var i = 0; i < datos.length; i++) {

                    $('#ddlempresa').append('<option value="' + datos[i].ID_EMPRESA + '">' + datos[i].DESCRIPCION_EMPRESA + '</option>');
                    $('#ddlempresa_buscar').append('<option value="' + datos[i].ID_EMPRESA + '">' + datos[i].DESCRIPCION_EMPRESA + '</option>');

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
    function OBTENER_COMBO_OFICINA_SBS() {

        $('#ddloficinasbs').empty().append('<option value=0> << Seleccionar >> </option>');
       

        //$.ajax({
        //    type: "POST",
        //    url: '/Mantenimiento/Obtener_Combo_Oficina_SBS',
        //    data: JSON.stringify(),
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    async: true,
        //    beforeSend: function () {
        //        $('body').addClass('loading');
        //    },
        //    success: function (datos) {

        //        for (var i = 0; i < datos.length; i++) {

        //            $('#ddlempresa').append('<option value="' + datos[i].ID_OFICINA_SBS + '">' + datos[i].DESCRIPCION_OFICINA_SBS + '</option>');
                   

        //        }
        //        $('body').removeClass('loading'); //Removemos la clase loading

        //    },
        //    error: function (XMLHttpRequest, textStatus, errorThrown) {
        //        var error = eval("(" + XMLHttpRequest.responseText + ")");

        //        swal("Error!", "Por favor, prueba los pasos siguientes: <b></br>1.      Cierre todas sus sesiones y vuelva a ingresar al sistema. </br>2.      Compruebe su conexión a Internet.</br> 3.      Reinicie su equipo.</br> 4.      En caso no resuelva la situación, envíe un correo aL area de sistemas <b/> ", "error");
        //    }
        //});
    };
    function OBTENER_COMBO_CIUDAD() {

        $('#ddlciudad').empty().append('<option value=0> << Seleccionar >> </option>');


        //$.ajax({
        //    type: "POST",
        //    url: '/Mantenimiento/Obtener_Combo_Oficina_SBS',
        //    data: JSON.stringify(),
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    async: true,
        //    beforeSend: function () {
        //        $('body').addClass('loading');
        //    },
        //    success: function (datos) {

        //        for (var i = 0; i < datos.length; i++) {

        //            $('#ddlempresa').append('<option value="' + datos[i].ID_OFICINA_SBS + '">' + datos[i].DESCRIPCION_OFICINA_SBS + '</option>');


        //        }
        //        $('body').removeClass('loading'); //Removemos la clase loading

        //    },
        //    error: function (XMLHttpRequest, textStatus, errorThrown) {
        //        var error = eval("(" + XMLHttpRequest.responseText + ")");

        //        swal("Error!", "Por favor, prueba los pasos siguientes: <b></br>1.      Cierre todas sus sesiones y vuelva a ingresar al sistema. </br>2.      Compruebe su conexión a Internet.</br> 3.      Reinicie su equipo.</br> 4.      En caso no resuelva la situación, envíe un correo aL area de sistemas <b/> ", "error");
        //    }
        //});
    };

    function BUSCAR_OFICINA() {

        var ID_OFICINA = $('#ddlempresa_buscar').val();
        var DESCRIPCION_OFICINA = $('#txtoficina_buscar').val();
        var ESTADO_OFICINA = $('#ddlestado_buscar').val();


        var table = $('#Tabla_Oficina').DataTable();
        table.clear().draw();

        var ajax_data = { "ID_OFICINA": ID_OFICINA, "DESCRIPCION_OFICINA": DESCRIPCION_OFICINA, "ESTADO_OFICINA": ESTADO_OFICINA };
        $.ajax({
            type: "POST",
            url: '/Mantenimiento/Buscar_Oficina',

            data: JSON.stringify(ajax_data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () {
                $('body').addClass('loading');
            },
            success: function (datos) {

                for (var i = 0; i < datos.length; i++) {


                    $('#Tabla_Oficina').dataTable({
                        columnDefs: [
                            { className: 'text-center', targets: [0, 1, 2, 3, 4, 5] }

                        ],
                        destroy: true

                    }).fnAddData([

                        datos[i].ID_OFICINA,
                        datos[i].DESCRIPCION_EMPRESA,
                        datos[i].COD_OFICINA,
                        datos[i].DESCRIPCION_OFICINA,
                        datos[i].ESTADO_OFICINA,
                        "<img src='../img/editar_2.png' class='editar' style='width:20px;height:20px' />",
                        "<img src='../img/ELIMINAR.png' class='eliminar' style='width:20px;height:20px'/>"
                    ]);

                }
                $('body').removeClass('loading'); //Removemos la clase loading
                $("#Tabla_Oficina").show();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var error = eval("(" + XMLHttpRequest.responseText + ")");
                // alert(error.Message);
                swal("Error!", "Por favor, prueba los pasos siguientes: <b></br>1.      Cierre todas sus sesiones y vuelva a ingresar al sistema. </br>2.      Compruebe su conexión a Internet.</br> 3.      Reinicie su equipo.</br> 4.      En caso no resuelva la situación, envíe un correo al area de sistemas <b/> ", "error");
            }
        });


    }


    $("#btnnuevo").click(function (e) {
        $("#Titulo_Panel").text('Nueva Oficina');
        $("#ddlempresa").val('0');
        $("#txtcodigooficina").val('');
        $("#txtdescripcion").val('');
        $("#ddloficinasbs").val('0');
        $("#ddlciudad").val('0');
        $("#txt_direccion").val('');
        $("#ddlestado").val('A');


        $("#div_estado_buscar").hide();
        $("#btnGuardar").show();
        $("#btnActualizar").hide();

        $('#modal_nuevo').modal();

        /*Eliminar las clases de error*/
        $("#txtcodigooficina").removeClass('error_campo_vacio');
        $("#txtdescripcion").removeClass('error_campo_vacio');

    });

    $("#btnbuscar").click(function (e) {

        BUSCAR_OFICINA();

    });

    $(document).on('click', '.eliminar', function (e) {
         
        var ID_OFICINA = $(this).parents("tr").find("td").eq(0).html();
        var DESCRIPCION = $(this).parents("tr").find("td").eq(3).html();

        Swal.fire({
            title: 'Inactivar Registro?',
            text: "¿Estás seguro de inactivar la Oficina  :  " + DESCRIPCION + " ?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1ab394',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Si, Eliminar !'
        }).then((result) => {
            if (result.value) {


                var ajax_data = {
                    "ID_OFICINA": ID_OFICINA

                };

                $.ajax({
                    type: "POST",
                    url: '/Mantenimiento/Inactivar_Oficina',
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
                        $('#Tabla_Oficina').dataTable().fnClearTable();
                        BUSCAR_OFICINA();
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
        $("#txtcodigooficina").removeClass('error_campo_vacio');
        $("#txtdescripcion").removeClass('error_campo_vacio');


        $("#Titulo_Panel").text('Actualizar Oficina');
        $("#div_estado_buscar").show();
        $('#modal_nuevo').modal();
        $("#btnGuardar").hide();
        $("#btnActualizar").show();

        var ajax_data = {
            "ID_OFICINA": $(this).parents("tr").find("td").eq(0).html(),
        };


        $.ajax({
            type: "POST",
            url: '/Mantenimiento/Obtener_Oficina',
            data: JSON.stringify(ajax_data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (datos) {


                for (var i = 0; i < datos.length; i++) {

                    $("#txtcodigo").val(datos[i].ID_OFICINA);
                    $("#ddlempresa").val(datos[i].ID_EMPRESA);
                    $("#txtcodigooficina").val(datos[i].COD_OFICINA);
                    $("#txtdescripcion").val(datos[i].DESCRIPCION_OFICINA);
                    $("#ddloficinasbs").val(datos[i].ID_OFICINA_SBS);
                    $("#ddlciudad").val(datos[i].ID_CIUDAD);
                    $("#txt_direccion").val(datos[i].DIRECCION_OFICINA);
                    $("#ddlestado").val(datos[i].ESTADO_OFICINA); }},
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var error = eval("(" + XMLHttpRequest.responseText + ")");
                alert(error.Message);
            }});
});

    $("#btnGuardar").click(function (e) {
        var resultado_validacion = validar_input_vacios();
        if (resultado_validacion == 0) {

            var COD_OFICINA = $("#txtcodigooficina").val();
            var DESCRIPCION_OFICINA = $("#txtdescripcion").val();
            var ID_OFICINA_SBS = $("#ddloficinasbs").val();
            var ID_EMPRESA = $("#ddlempresa").val();
            var ID_CIUDAD = $("#ddlciudad").val();
            var DIRECCION_OFICINA = $("#txt_direccion").val();          
            var USUARIO_CREACION = SESSION_USUARIO;

            var ajax_data = {
                "COD_OFICINA": COD_OFICINA,
                "DESCRIPCION_OFICINA": DESCRIPCION_OFICINA,
                "ID_OFICINA_SBS": ID_OFICINA_SBS,
                "ID_EMPRESA": ID_EMPRESA,
                "ID_CIUDAD": ID_CIUDAD,
                "DIRECCION_OFICINA": DIRECCION_OFICINA,
                "USUARIO_CREACION": USUARIO_CREACION

            };
            $.ajax({
                type: "POST",
                url: '/Mantenimiento/Grabar_Oficina',
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
                    BUSCAR_OFICINA();

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

            var ID_OFICINA = $("#txtcodigo").val();
            var COD_OFICINA = $("#txtcodigooficina").val();
            var DESCRIPCION_OFICINA = $("#txtdescripcion").val();
            var ID_OFICINA_SBS = $("#ddloficinasbs").val();
            var ID_EMPRESA = $("#ddlempresa").val();
            var ID_CIUDAD = $("#ddlciudad").val();
            var DIRECCION_OFICINA = $("#txt_direccion").val();
            var ESTADO_OFICINA = $("#ddlestado").val();
            var USUARIO_MODIFICACION = SESSION_USUARIO;



            var ajax_data = {
                "ID_OFICINA": ID_OFICINA,
                "COD_OFICINA": COD_OFICINA,
                "DESCRIPCION_OFICINA": DESCRIPCION_OFICINA,
                "ID_OFICINA_SBS": ID_OFICINA_SBS,
                "ID_EMPRESA": ID_EMPRESA,
                "ID_CIUDAD": ID_CIUDAD,
                "DIRECCION_OFICINA": DIRECCION_OFICINA,
                "USUARIO_MODIFICACION": USUARIO_MODIFICACION,
                "ESTADO_OFICINA": ESTADO_OFICINA


            };

            $.ajax({
                type: "POST",
                url: '/Mantenimiento/Actualizar_Oficina',
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
                    BUSCAR_OFICINA();
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
        $("#txtcodigooficina").removeClass('error_campo_vacio');
        $("#txtdescripcion").removeClass('error_campo_vacio');



        var validar = 0;

        var CODIGO_OFICINA = $("#txtcodigooficina").val();
        var DESCRIPCION = $("#txtdescripcion").val();

        if (CODIGO_OFICINA == '') {
            validar = 1;

            alertify.error('El Campo <b> Cod Oficina </b> no debe estar vacio.!');
            $("#txtcodigooficina").addClass('error_campo_vacio');
            return validar;
        }
        else { $("#txtcodigooficina").removeClass('error_campo_vacio'); }
        if (DESCRIPCION == '') {
            validar = 1;

            alertify.error('El Campo <b> Descripcion Oficina </b> no debe estar vacio.!');
            $("#txtdescripcion").addClass('error_campo_vacio');
            return validar;
        }
        else { $("#txtdescripcion").removeClass('error_campo_vacio'); }


        return validar;
    }






});