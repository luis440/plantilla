using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE
{
    public class BE_Oficina
    {
        public int ID_OFICINA { get; set; }
        public int COD_OFICINA { get; set; }
        public string? DESCRIPCION_OFICINA { get; set; }
        public int ID_OFICINA_SBS { get; set; }
        public int ID_EMPRESA { get; set; }
        public int ID_CIUDAD { get; set; }
        public string? DIRECCION_OFICINA { get; set; }
        public string? ESTADO_OFICINA { get; set; }
        public string? FECHA_CREACION { get; set; }
        public string? USUARIO_CREACION { get; set; }
        public string? FECHA_MODIFICACION { get; set; }
        public string? USUARIO_MODIFICACION { get; set; }
        public string? DESCRIPCION_EMPRESA { get; set; }

    }
}
