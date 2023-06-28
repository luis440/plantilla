using BE;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DA.Repositorio.Repositorio_Pais
{
    public interface IPais
    {
        Task<List<BE_Pais_Moneda>> Buscar_Pais(BE_Pais_Moneda obj_Pais);
        Task<List<BE_Pais_Moneda>> Obtener_Pais(BE_Pais_Moneda obj_Pais);
        Task<int> Actualizar_Pais(BE_Pais_Moneda obj_Pais);
        Task<int> Grabar_Pais(BE_Pais_Moneda obj_Pais);     
        Task<int> Inactivar_Pais(BE_Pais_Moneda obj_Pais);

        Task<List<BE_Pais_Moneda>> Obtener_Combo_Pais();
        Task<List<BE_Pais_Moneda>> Obtener_Datos_Combo_Pais(BE_Pais_Moneda obj_Pais);

    }
}
