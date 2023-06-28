using BE;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DA.Repositorio.Repositorio_Usuario
{
    public interface IUsuario
    {

        Task<List<BE_Usuario>> Buscar_Usuarios(BE_Usuario obj_Usuario);
        Task<List<BE_Usuario>> Obtener_Usuarios(BE_Usuario obj_Usuario);
        Task<int> Actualizar_Usuarios(BE_Usuario obj_Usuario);
        Task<int> Grabar_Usuarios(BE_Usuario obj_Usuario);
        Task<int> Cambiar_Clave(BE_Usuario obj_Usuario);
        Task<int> Inactivar_Usuario(BE_Usuario obj_Usuario);
     


    }
}
