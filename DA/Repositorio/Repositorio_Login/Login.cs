using BE;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DA.Configuracion;
using Microsoft.Extensions.Options;

namespace DA.Repositorio.Repositorio_Login
{
    public class Login : ILogin
    {
        private readonly ConfiguracionConexion _conexion;
        public Login(IOptions<ConfiguracionConexion> conexion)
        {
            _conexion = conexion.Value;
        }
        public async Task<List<BE_Usuario>> Validar_Login(BE_Usuario obj_Usuario)
        {
           
                List<BE_Usuario> lista = new List<BE_Usuario>();
               

                    SqlConnection con = new SqlConnection(_conexion.CadenaSQL);
                    con.Open();

                    using (SqlCommand cmd = new SqlCommand("SP_VALIDAR_LOGIN", con))
                    {
                        cmd.Parameters.AddWithValue("@USUARIO", obj_Usuario.USUARIO);
                        cmd.Parameters.AddWithValue("@CONTRASEÑA", obj_Usuario.CONTRASEÑA);
                        cmd.CommandType = CommandType.StoredProcedure;

                        SqlDataReader lector = await cmd.ExecuteReaderAsync();
                        while (await lector.ReadAsync())
                        {
                            BE_Usuario obj_BE = new BE_Usuario();

                            obj_BE.ID = Convert.ToInt32(lector[0].ToString().Trim());
                            obj_BE.APELLIDOS = lector[1].ToString().Trim();
                            obj_BE.NOMBRES = lector[2].ToString().Trim();
                            obj_BE.CORREO = lector[3].ToString().Trim();
                            obj_BE.USUARIO = lector[4].ToString().Trim();
                            obj_BE.CONTRASEÑA = lector[5].ToString().Trim();
                            obj_BE.FECHA_CREACION = lector[6].ToString().Trim();
                            obj_BE.USUARIO_CREACION = lector[7].ToString().Trim();
                            obj_BE.FECHA_MODIFICACION = lector[8].ToString().Trim();
                            obj_BE.USUARIO_MODIFICACION = lector[9].ToString().Trim();
                            obj_BE.ESTADO = lector[10].ToString().Trim();
                     

                    lista.Add(obj_BE);
                        }

                        lector.Close();
                    }

                return lista;
            
        }
    }
}
