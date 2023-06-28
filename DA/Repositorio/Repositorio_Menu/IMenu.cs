using BE;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DA.Repositorio.Repositorio_Menu
{
    public interface IMenu
    {
        Task<List<BE_Menu>> Listar_Menu();

        Task<List<BE_Menu>> Listar_Permisos_Mantenimiento(BE_Usuario obj_Usuario);
        Task<List<BE_Menu>> Listar_Permisos_Mastercard(BE_Usuario obj_Usuario);
        Task<List<BE_Menu>> Listar_Permisos_Seguridad(BE_Usuario obj_Usuario);
        Task<List<BE_Usuario>> Buscar_Usuario_Permiso(BE_Usuario obj_Usuario);

        Task<int> Guardar_Permiso(BE_Usuario obj_Usuario);

        Task<List<BE_Usuario>> Mostrar_Menu(BE_Usuario obj_Usuario);

    }
}
