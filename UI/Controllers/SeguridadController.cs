using BE;
using DA.Repositorio.Repositorio_Errores;
using DA.Repositorio;
using Microsoft.AspNetCore.Mvc;
using DA.Repositorio.Repositorio_Usuario;
using DA.Repositorio.Repositorio_Menu;

namespace UI.Controllers
{
    public class SeguridadController : Controller
    {
        // variables
        private readonly ILogin _login;
        private readonly IErrores _errores;
        private readonly IUsuario _usuario;
        private readonly IMenu _menu;


        public SeguridadController(ILogin login, IErrores errores, IUsuario usuario,IMenu menu)
        {
            _login = login;
            _errores = errores;
            _usuario = usuario;
            _menu= menu;
        }


        
        #region ====>> LOGIN <<==== 


        //====> VISTAS 
        public IActionResult Login()
        {
            return View();
        }
        public IActionResult Principal()
        {
            return View();
        }

        //====> METODOS
        public async Task<JsonResult> Validar_Login([FromBody] BE_Usuario oUsuario)
        {
            List<BE_Usuario> lista = new List<BE_Usuario>();
            try
            {
                lista = await _login.Validar_Login(oUsuario);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(lista);
        }

        #endregion
        #region ====>> USUARIOS <<==== 

        //====> VISTAS      
        public IActionResult Usuario()
        {
            return View();
        }
        public IActionResult Cambio_Clave()
        {
            return View();
        }
       
        //====> METODOS





        public async Task<JsonResult> Buscar_Usuarios([FromBody] BE_Usuario oUsuario)
        {
            List<BE_Usuario> lista = new List<BE_Usuario>();
            try
            {
                lista = await _usuario.Buscar_Usuarios(oUsuario);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(lista);
        }


        public async Task<JsonResult> Obtener_Usuarios([FromBody] BE_Usuario oUsuario)
        {
            List<BE_Usuario> lista = new List<BE_Usuario>();
            try
            {
                lista = await _usuario.Obtener_Usuarios(oUsuario);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(lista);
        }


        public async Task<JsonResult> Actualizar_Usuarios([FromBody] BE_Usuario oUsuario)
        {
            int resultado = 0;
            try
            {
                resultado = await _usuario.Actualizar_Usuarios(oUsuario);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(resultado);
        }

        public async Task<JsonResult> Grabar_Usuarios([FromBody] BE_Usuario oUsuario)
        {
            int resultado = 0;
            try
            {
                resultado = await _usuario.Grabar_Usuarios(oUsuario);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(resultado);
        }

        public async Task<JsonResult> Cambiar_Clave([FromBody] BE_Usuario oUsuario)
        {
            int resultado = 0;
            try
            {
                resultado = await _usuario.Cambiar_Clave(oUsuario);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(resultado);
        }
        public async Task<JsonResult> Inactivar_Usuario([FromBody] BE_Usuario oUsuario)
        {
            int resultado = 0;
            try
            {
                resultado = await _usuario.Inactivar_Usuario(oUsuario);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(resultado);
        }

        #endregion
        #region ====>> PERMISOS <<==== 


        //====> VISTAS 
        public IActionResult Permisos()
        {
            return View();
        }


        //====> METODOS


        public async Task<JsonResult> Buscar_Usuario_Permiso([FromBody] BE_Usuario oUsuario)
        {
            List<BE_Usuario> lista = new List<BE_Usuario>();
            try
            {
                lista = await _menu.Buscar_Usuario_Permiso(oUsuario);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(lista);
        }

        public async Task<JsonResult> Listar_Permisos_Mantenimiento([FromBody] BE_Usuario obj_Usuario)
        {
            List<BE_Menu> lista = new List<BE_Menu>();
            try
            {
                lista = await _menu.Listar_Permisos_Mantenimiento(obj_Usuario);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(lista);
        }

        public async Task<JsonResult> Listar_Permisos_Mastercard([FromBody] BE_Usuario obj_Usuario)
        {
            List<BE_Menu> lista = new List<BE_Menu>();
            try
            {
                lista = await _menu.Listar_Permisos_Mastercard(obj_Usuario);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(lista);
        }
        public async Task<JsonResult> Listar_Permisos_Seguridad([FromBody] BE_Usuario obj_Usuario)
        {
            List<BE_Menu> lista = new List<BE_Menu>();
            try
            {
                lista = await _menu.Listar_Permisos_Seguridad(obj_Usuario);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(lista);
        }

        public async Task<JsonResult> Guardar_Permisos([FromBody] BE_Usuario obj_Usuario)
        {
            int resultado = 0;
            try
            {
                resultado = await _menu.Guardar_Permiso(obj_Usuario);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(resultado);
        }

        public async Task<JsonResult> Mostrar_Menu([FromBody] BE_Usuario obj_Usuario)
        {
            List<BE_Usuario> lista = new List<BE_Usuario>();
            try
            {
                lista = await _menu.Mostrar_Menu(obj_Usuario);
            }
            catch (Exception ex)
            {
                await _errores.Insertar_Exception(ex);
            }
            return Json(lista);
        }
        


        #endregion




    }
}
