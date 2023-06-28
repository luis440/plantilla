using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE
{
    public class BE_Usuario
    {
        public int ID { get; set; }
        public int ID_MENU { get; set; }
        public string ?APELLIDOS { get; set; }
        public string ?NOMBRES { get; set; }
        public string ?CORREO { get; set; }
        public string ?USUARIO { get; set; }
        public string ?CONTRASEÑA { get; set; }
        public string ?FECHA_CREACION { get; set; }
        public string ?USUARIO_CREACION { get; set; }
        public string ?FECHA_MODIFICACION { get; set; }
        public string ?USUARIO_MODIFICACION { get; set; }
        public string ?ESTADO { get; set; }
        public string ?EMPRESA { get; set; }
        public string? CLAVE { get; set; }
        public int COD_EMPRESA { get; set; }
        public int[]? PERMISOS { get; set; }

        public string? DESCRIPCION_MENU_SYS { get; set; }


    }
}
