using BE;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DA.Repositorio.Repositorio_Empresa
{
    public interface IEmpresa
    {
        Task<List<BE_Empresa>> Buscar_Empresa(BE_Empresa obj_Empresa);
        Task<List<BE_Empresa>> Obtener_Empresa(BE_Empresa obj_Empresa);
        Task<int> Actualizar_Empresa(BE_Empresa obj_Empresa);
        Task<int> Grabar_Empresa(BE_Empresa obj_Empresa);
        Task<int> Inactivar_Empresa(BE_Empresa obj_Empresa);
        Task<List<BE_Empresa>> Obtener_Combo_Empresa();
    }
}
