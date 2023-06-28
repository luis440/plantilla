using BE;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DA.Repositorio.Repositorio_Oficina
{
    public   interface IOficina
    {
        Task<List<BE_Oficina>> Buscar_Oficina(BE_Oficina obj_Oficina);
        Task<List<BE_Oficina>> Obtener_Oficina(BE_Oficina obj_Oficina);
        Task<int> Actualizar_Oficina(BE_Oficina obj_Oficina);
        Task<int> Grabar_Oficina(BE_Oficina obj_Oficina);
        Task<int> Inactivar_Oficina(BE_Oficina obj_Oficina);

        Task<List<BE_Oficina>> Obtener_Combo_Oficina_SBS();
        
        Task<List<BE_Oficina>> Obtener_Combo_Ciudad();
    }
}
