using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE
{
    public class BE_Empresa
    {
        public int ID_EMPRESA { get; set; }
        public string? DESCRIPCION_EMPRESA { get; set; }
        public string? NOMBRE_COMERCIAL_EMPRESA { get; set; }
        public string? REPRESENTANTE_CREDITO_EMPRESA { get; set; }
        public string? DIRECCION_EMPRESA { get; set; }
        public string? RUC_EMPRESA { get; set; }
        public string? ABREVIATURA_EMPRESA { get; set; }
        public string? TELEFONO_EMPRESA { get; set; }
        public int ID_PAIS { get; set; }
        public string? FECHA_CREACION { get; set; }
        public string? USUARIO_CREACION { get; set; }
        public string? FECHA_MODIFICACION { get; set; }
        public string? USUARIO_MODIFICACION { get; set; }
        public string? ESTADO { get; set; }

        public string? ISO3_PAIS { get; set; }
        public string? ISO2_PAIS { get; set; }

    }
}
