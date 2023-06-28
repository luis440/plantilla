using BE;
using DA.Repositorio;
using DA.Repositorio.Repositorio_Empresa;
using DA.Repositorio.Repositorio_Errores;
using DA.Repositorio.Repositorio_Menu;
using DA.Repositorio.Repositorio_Oficina;
using DA.Repositorio.Repositorio_Pais;
using DA.Repositorio.Repositorio_Usuario;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers
{
    public class MantenimientoController : Controller
    {

        // variables
        private readonly IPais _Pais;
        private readonly IErrores _errores;
        private readonly IEmpresa _empresa;
        private readonly IOficina _Oficina;
        public MantenimientoController(IPais pais, IErrores errores, IEmpresa empresa, IOficina Oficina)
        {
            _Pais = pais;
            _errores = errores;
            _empresa = empresa;
            _Oficina = Oficina;
        }


        #region ====>> EMPRESA <<==== 
        //====> VISTAS 
        public IActionResult Empresa()
        {
            return View();
        }
        //====> METODOS

        public async Task<JsonResult> Buscar_Empresa([FromBody] BE_Empresa obj_Empresa)
        {
            List<BE_Empresa> lista = new List<BE_Empresa>();
            try
            {
                lista = await _empresa.Buscar_Empresa(obj_Empresa);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(lista);
        }

        public async Task<JsonResult> Obtener_Empresa([FromBody] BE_Empresa obj_Empresa)
        {
            List<BE_Empresa> lista = new List<BE_Empresa>();
            try
            {
                lista = await _empresa.Obtener_Empresa(obj_Empresa);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(lista);
        }

        public async Task<JsonResult> Actualizar_Empresa([FromBody] BE_Empresa obj_Empresa)
        {
            int resultado = 0;
            try
            {
                resultado = await _empresa.Actualizar_Empresa(obj_Empresa);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(resultado);
        }

        public async Task<JsonResult> Grabar_Empresa([FromBody] BE_Empresa obj_Empresa)
        {
            int resultado = 0;
            try
            {
                resultado = await _empresa.Grabar_Empresa(obj_Empresa);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(resultado);
        }

        public async Task<JsonResult> Inactivar_Empresa([FromBody] BE_Empresa obj_Empresa)
        {
            int resultado = 0;
            try
            {
                resultado = await _empresa.Inactivar_Empresa(obj_Empresa);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(resultado);
        }

        public async Task<JsonResult> Obtener_Combo_Empresa()
        {
            List<BE_Empresa> lista = new List<BE_Empresa>();
            try
            {
                lista = await _empresa.Obtener_Combo_Empresa();
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(lista);
        }

        #endregion






        #region ====>> PAIS <<==== 
        //====> VISTAS 
        public IActionResult Pais_Moneda()
        {
            return View();
        }
        //====> METODOS
        public async Task<JsonResult> Buscar_Pais([FromBody] BE_Pais_Moneda obj_Pais)
        {
            List<BE_Pais_Moneda> lista = new List<BE_Pais_Moneda>();
            try
            {
                lista = await _Pais.Buscar_Pais(obj_Pais);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(lista);
        }

        public async Task<JsonResult> Obtener_Pais([FromBody] BE_Pais_Moneda obj_Pais)
        {
            List<BE_Pais_Moneda> lista = new List<BE_Pais_Moneda>();
            try
            {
                lista = await _Pais.Obtener_Pais(obj_Pais);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(lista);
        }

        public async Task<JsonResult> Obtener_Combo_Pais()
        {
            List<BE_Pais_Moneda> lista = new List<BE_Pais_Moneda>();
            try
            {
                lista = await _Pais.Obtener_Combo_Pais();
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(lista);
        }
        
        public async Task<JsonResult> Obtener_Datos_Combo_Pais([FromBody] BE_Pais_Moneda obj_Pais)
        {
            List<BE_Pais_Moneda> lista = new List<BE_Pais_Moneda>();
            try
            {
                lista = await _Pais.Obtener_Datos_Combo_Pais(obj_Pais);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(lista);
        }
        public async Task<JsonResult> Actualizar_Pais([FromBody] BE_Pais_Moneda obj_Pais)
        {
            int resultado = 0;
            try
            {
                resultado = await _Pais.Actualizar_Pais(obj_Pais);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(resultado);
        }

        public async Task<JsonResult> Grabar_Pais([FromBody] BE_Pais_Moneda obj_Pais)
        {
            int resultado = 0;
            try
            {
                resultado = await _Pais.Grabar_Pais(obj_Pais);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(resultado);
        }

        public async Task<JsonResult> Inactivar_Pais([FromBody] BE_Pais_Moneda obj_Pais)
        {
            int resultado = 0;
            try
            {
                resultado = await _Pais.Inactivar_Pais(obj_Pais);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(resultado);
        }

        #endregion


        #region ====>> OFICINA <<==== 
        //====> VISTAS 
        public IActionResult Oficina()
        {
            return View();
        }
        //====> METODOS


        public async Task<JsonResult> Buscar_Oficina([FromBody] BE_Oficina obj_Oficina)
        {
            List<BE_Oficina> lista = new List<BE_Oficina>();
            try
            {
                lista = await _Oficina.Buscar_Oficina(obj_Oficina);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(lista);
        }

        public async Task<JsonResult> Obtener_Oficina([FromBody] BE_Oficina obj_Oficina)
        {
            List<BE_Oficina> lista = new List<BE_Oficina>();
            try
            {
                lista = await _Oficina.Obtener_Oficina(obj_Oficina);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(lista);
        }

      

     
        public async Task<JsonResult> Actualizar_Oficina([FromBody] BE_Oficina obj_Oficina)
        {
            int resultado = 0;
            try
            {
                resultado = await _Oficina.Actualizar_Oficina(obj_Oficina);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(resultado);
        }

        public async Task<JsonResult> Grabar_Oficina([FromBody] BE_Oficina obj_Oficina)
        {
            int resultado = 0;
            try
            {
                resultado = await _Oficina.Grabar_Oficina(obj_Oficina);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(resultado);
        }

        public async Task<JsonResult> Inactivar_Oficina([FromBody] BE_Oficina obj_Oficina)
        {
            int resultado = 0;
            try
            {
                resultado = await _Oficina.Inactivar_Oficina(obj_Oficina);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(resultado);
        }







        #endregion


    }
}
