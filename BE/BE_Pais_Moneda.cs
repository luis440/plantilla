using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE
{
    public class BE_Pais_Moneda
    {
        public int ID_PAIS { get; set; }
        public string? COD_PAIS { get; set; }
        public string? DESCRIPCION_PAIS { get; set; }
        public string? ISO3_PAIS { get; set; }
        public string? ISO2_PAIS { get; set; }
        public string? COD_MONEDA { get; set; }
        public string? DESCRIPCION_MONEDA { get; set; }
        public string? COD_ALFANUMERICO_MONEDA { get; set; }
        public string? ESTADO_PAIS { get; set; }
        public string? FECHA_CREACION { get; set; }
        public string? USUARIO_CREACION { get; set; }
        public string? FECHA_MODIFICACION { get; set; }
        public string? USUARIO_MODIFICACION { get; set; }
    }
}
