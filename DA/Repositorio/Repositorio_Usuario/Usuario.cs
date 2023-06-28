using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DA.Configuracion;
using BE;
using Microsoft.Extensions.Options;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Drawing;

namespace DA.Repositorio.Repositorio_Usuario
{
    public class Usuario : IUsuario
    {
        private readonly ConfiguracionConexion _conexion;
        public Usuario(IOptions<ConfiguracionConexion> conexion)
        {
            _conexion = conexion.Value;
        }

        public async Task<int> Grabar_Usuarios(BE_Usuario obj_Usuario)
        {
            int val = 0;
            SqlConnection con = new SqlConnection(_conexion.CadenaSQL);
            con.Open();
            using (SqlTransaction transaccion = con.BeginTransaction())
            {
                    using (SqlCommand cmd = transaccion.Connection.CreateCommand())
                    {
                        val = 0;
                        cmd.CommandText = "SP_INSERTAR_USUARIO";
                        cmd.Transaction = transaccion;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@APELLIDOS", obj_Usuario.APELLIDOS);
                        cmd.Parameters.AddWithValue("@NOMBRES", obj_Usuario.NOMBRES);
                        cmd.Parameters.AddWithValue("@CORREO", obj_Usuario.CORREO);
                        cmd.Parameters.AddWithValue("@USUARIO", obj_Usuario.USUARIO);
                        cmd.Parameters.AddWithValue("@CONTRASEÑA", obj_Usuario.CONTRASEÑA);
                        cmd.Parameters.AddWithValue("@USUARIO_CREACION", "SYSTEM");
                        
                        val =await cmd.ExecuteNonQueryAsync();
                        cmd.Parameters.Clear();
                    }
                    transaccion.Commit();
            }

            return val;
        }
        public async Task<int> Actualizar_Usuarios(BE_Usuario obj_Usuario)
        {
            int val = 0;
            SqlConnection con = new SqlConnection(_conexion.CadenaSQL);
            con.Open();
            using (SqlTransaction transaccion = con.BeginTransaction())
            {
                    using (SqlCommand cmd = transaccion.Connection.CreateCommand())
                    {
                        val = 0;
                        cmd.CommandText = "SP_ACTUALIZAR_USUARIO";
                        cmd.Transaction = transaccion;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ID", obj_Usuario.ID);
                        cmd.Parameters.AddWithValue("@APELLIDOS", obj_Usuario.APELLIDOS);
                        cmd.Parameters.AddWithValue("@NOMBRES", obj_Usuario.NOMBRES);
                        cmd.Parameters.AddWithValue("@CORREO", obj_Usuario.CORREO);
                        cmd.Parameters.AddWithValue("@USUARIO", obj_Usuario.USUARIO);
                        cmd.Parameters.AddWithValue("@CONTRASEÑA", obj_Usuario.CONTRASEÑA);
                        cmd.Parameters.AddWithValue("@USUARIO_MODIFICACION", "SYSTEM");
                        cmd.Parameters.AddWithValue("@ESTADO", obj_Usuario.ESTADO);
                      
                        val =await cmd.ExecuteNonQueryAsync();
                        cmd.Parameters.Clear();
                    }
                    transaccion.Commit();
            }

            return val;
        }

        public async Task<List<BE_Usuario>> Buscar_Usuarios(BE_Usuario obj_Usuario)
        {
            List<BE_Usuario> lista = new List<BE_Usuario>();
            using (var conexion = new SqlConnection(_conexion.CadenaSQL))
            {
                conexion.Open();

                SqlCommand cmd = new SqlCommand("SP_BUSCAR_USUARIO", conexion);

                cmd.Parameters.AddWithValue("@APELLIDOS", string.IsNullOrEmpty(obj_Usuario.APELLIDOS) ? "" : obj_Usuario.APELLIDOS.Trim());
                cmd.Parameters.AddWithValue("@NOMBRES", string.IsNullOrEmpty(obj_Usuario.NOMBRES) ? "" : obj_Usuario.NOMBRES.Trim());
                cmd.Parameters.AddWithValue("@ESTADO", string.IsNullOrEmpty(obj_Usuario.ESTADO) ? "" : obj_Usuario.ESTADO.Trim());
                cmd.Parameters.AddWithValue("@USUARIO", string.IsNullOrEmpty(obj_Usuario.ESTADO) ? "" : obj_Usuario.USUARIO.Trim());
                cmd.CommandType = CommandType.StoredProcedure;

                using (var lector = await cmd.ExecuteReaderAsync())
                {
                    while (await lector.ReadAsync())
                    {
                        lista.Add(new BE_Usuario()
                        {
                            ID = Convert.ToInt32(lector[0].ToString().Trim()),
                            APELLIDOS = lector[1].ToString().Trim(),
                            NOMBRES = lector[2].ToString().Trim(),
                            CORREO = lector[3].ToString().Trim(),
                            USUARIO = lector[4].ToString().Trim(),
                            CONTRASEÑA = lector[5].ToString().Trim(),
                            FECHA_CREACION = lector[6].ToString().Trim(),
                            USUARIO_CREACION = lector[7].ToString().Trim(),
                            FECHA_MODIFICACION = lector[8].ToString().Trim(),
                            USUARIO_MODIFICACION = lector[9].ToString().Trim(),
                            ESTADO = lector[10].ToString().Trim()
                        });


                    }
                    lector.Close();
                }
            }
            return lista;
        }
      


        public async Task<List<BE_Usuario>> Obtener_Usuarios(BE_Usuario obj_Usuario)
        {
            List<BE_Usuario> lista = new List<BE_Usuario>();
           

                SqlConnection con = new SqlConnection(_conexion.CadenaSQL);
                con.Open();

                using (SqlCommand cmd = new SqlCommand("SP_OBTENER_DATOS_USUARIO", con))
                {
                    cmd.Parameters.AddWithValue("@ID", obj_Usuario.ID);

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

        public async Task<int> Cambiar_Clave(BE_Usuario obj_Usuario)
        {
            int val = 0;
            SqlConnection con = new SqlConnection(_conexion.CadenaSQL);
            con.Open();
            using (SqlTransaction transaccion = con.BeginTransaction())
            {
                

                    using (SqlCommand cmd = transaccion.Connection.CreateCommand())
                    {
                        val = 0;
                        cmd.CommandText = "SP_ACTUALIZAR_CLAVE";
                        cmd.Transaction = transaccion;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ID", obj_Usuario.ID);
                        cmd.Parameters.AddWithValue("@CLAVE1", obj_Usuario.CLAVE);
                        cmd.Parameters.AddWithValue("@USUARIO", obj_Usuario.USUARIO);
                        val =await cmd.ExecuteNonQueryAsync();
                        cmd.Parameters.Clear();
                    }
                    transaccion.Commit();
            }

            return val;
        }

        public async Task<int> Inactivar_Usuario(BE_Usuario obj_Usuario)
        {
            int val = 0;
            SqlConnection con = new SqlConnection(_conexion.CadenaSQL);
            con.Open();
            using (SqlTransaction transaccion = con.BeginTransaction())
            {
                    using (SqlCommand cmd = transaccion.Connection.CreateCommand())
                    {
                        val = 0;
                        cmd.CommandText = "SP_ELIMINAR_USUARIO";
                        cmd.Transaction = transaccion;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ID", obj_Usuario.ID);
                        val =await cmd.ExecuteNonQueryAsync();
                        cmd.Parameters.Clear();
                    }
                    transaccion.Commit();
               
            }

            return val;

        }
    
    }
}
