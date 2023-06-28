using BE;
using DA.Configuracion;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DA.Repositorio.Repositorio_Pais
{
    public class Pais : IPais
    {
        private readonly ConfiguracionConexion _conexion;
        public Pais(IOptions<ConfiguracionConexion> conexion)
        {
            _conexion = conexion.Value;
        }
        public async  Task<int> Actualizar_Pais(BE_Pais_Moneda obj_Pais)
        {
            int val = 0;
            SqlConnection con = new SqlConnection(_conexion.CadenaSQL);
            con.Open();
            using (SqlTransaction transaccion = con.BeginTransaction())
            {
                using (SqlCommand cmd = transaccion.Connection.CreateCommand())
                {
                    val = 0;
                    cmd.CommandText = "SP_ACTUALIZAR_PAIS";
                    cmd.Transaction = transaccion;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID_PAIS", Convert.ToInt32(obj_Pais.ID_PAIS));
                    cmd.Parameters.AddWithValue("@COD_PAIS", obj_Pais.COD_PAIS);
                    cmd.Parameters.AddWithValue("@DESCRIPCION_PAIS", obj_Pais.DESCRIPCION_PAIS);
                    cmd.Parameters.AddWithValue("@ISO3_PAIS", obj_Pais.ISO3_PAIS);
                    cmd.Parameters.AddWithValue("@ISO2_PAIS", obj_Pais.ISO2_PAIS);
                    cmd.Parameters.AddWithValue("@COD_MONEDA", obj_Pais.COD_MONEDA);
                    cmd.Parameters.AddWithValue("@DESCRIPCION_MONEDA", obj_Pais.DESCRIPCION_MONEDA);
                    cmd.Parameters.AddWithValue("@COD_ALFANUMERICO_MONEDA", obj_Pais.COD_ALFANUMERICO_MONEDA);
                    cmd.Parameters.AddWithValue("@ESTADO_PAIS", obj_Pais.ESTADO_PAIS);
                    cmd.Parameters.AddWithValue("@USUARIO_MODIFICACION", obj_Pais.USUARIO_MODIFICACION);

                    val = await cmd.ExecuteNonQueryAsync();
                    cmd.Parameters.Clear();
                }
                transaccion.Commit();
            }

            return val;
        }

        public async Task<List<BE_Pais_Moneda>> Buscar_Pais(BE_Pais_Moneda obj_Pais)
        {
            List<BE_Pais_Moneda> lista = new List<BE_Pais_Moneda>();
            using (var conexion = new SqlConnection(_conexion.CadenaSQL))
            {
                conexion.Open();

                SqlCommand cmd = new SqlCommand("SP_BUSCAR_PAIS", conexion);

                cmd.Parameters.AddWithValue("@DESCRIPCION_PAIS", string.IsNullOrEmpty(obj_Pais.DESCRIPCION_PAIS) ? "" : obj_Pais.DESCRIPCION_PAIS.Trim());
                cmd.Parameters.AddWithValue("@DESCRIPCION_MONEDA", string.IsNullOrEmpty(obj_Pais.DESCRIPCION_MONEDA) ? "" : obj_Pais.DESCRIPCION_MONEDA.Trim());
                cmd.Parameters.AddWithValue("@ESTADO", string.IsNullOrEmpty(obj_Pais.ESTADO_PAIS) ? "" : obj_Pais.ESTADO_PAIS.Trim());
                
                cmd.CommandType = CommandType.StoredProcedure;

                using (var lector = await cmd.ExecuteReaderAsync())
                {
                    while (await lector.ReadAsync())
                    {
                        lista.Add(new BE_Pais_Moneda()
                        {
                            ID_PAIS = Convert.ToInt32(lector[0].ToString().Trim()),
                            COD_PAIS = lector[1].ToString().Trim(),
                            DESCRIPCION_PAIS = lector[2].ToString().Trim(),
                            ISO3_PAIS = lector[3].ToString().Trim(),
                            ISO2_PAIS = lector[4].ToString().Trim(),
                            COD_MONEDA = lector[5].ToString().Trim(),
                            DESCRIPCION_MONEDA = lector[6].ToString().Trim(),
                            COD_ALFANUMERICO_MONEDA = lector[7].ToString().Trim(),
                            ESTADO_PAIS = lector[8].ToString().Trim(),
                            FECHA_CREACION = lector[9].ToString().Trim(),
                            USUARIO_CREACION = lector[10].ToString().Trim(),
                            FECHA_MODIFICACION = lector[11].ToString().Trim(),
                            USUARIO_MODIFICACION = lector[12].ToString().Trim()
                           
                        });


                    }
                    lector.Close();
                }
            }
            return lista;
        }

        public async Task<int> Grabar_Pais(BE_Pais_Moneda obj_Pais)
        {
            int val = 0;
            SqlConnection con = new SqlConnection(_conexion.CadenaSQL);
            con.Open();
            using (SqlTransaction transaccion = con.BeginTransaction())
            {
                using (SqlCommand cmd = transaccion.Connection.CreateCommand())
                {
                    val = 0;
                    cmd.CommandText = "SP_INSERTAR_PAIS";
                    cmd.Transaction = transaccion;
                    cmd.CommandType = CommandType.StoredProcedure;           
                    cmd.Parameters.AddWithValue("@COD_PAIS", obj_Pais.COD_PAIS);
                    cmd.Parameters.AddWithValue("@DESCRIPCION_PAIS", obj_Pais.DESCRIPCION_PAIS);
                    cmd.Parameters.AddWithValue("@ISO3_PAIS", obj_Pais.ISO3_PAIS);
                    cmd.Parameters.AddWithValue("@ISO2_PAIS", obj_Pais.ISO2_PAIS);
                    cmd.Parameters.AddWithValue("@COD_MONEDA", obj_Pais.COD_MONEDA);
                    cmd.Parameters.AddWithValue("@DESCRIPCION_MONEDA", obj_Pais.DESCRIPCION_MONEDA);
                    cmd.Parameters.AddWithValue("@COD_ALFANUMERICO_MONEDA", obj_Pais.COD_ALFANUMERICO_MONEDA);
                    cmd.Parameters.AddWithValue("@USUARIO_CREACION", obj_Pais.USUARIO_CREACION);

                    val = await cmd.ExecuteNonQueryAsync();
                    cmd.Parameters.Clear();
                }
                transaccion.Commit();
            }

            return val;
        }

        public async Task<int> Inactivar_Pais(BE_Pais_Moneda obj_Pais)
        {
            int val = 0;
            SqlConnection con = new SqlConnection(_conexion.CadenaSQL);
            con.Open();
            using (SqlTransaction transaccion = con.BeginTransaction())
            {
                using (SqlCommand cmd = transaccion.Connection.CreateCommand())
                {
                    val = 0;
                    cmd.CommandText = "SP_ELIMINAR_PAIS";
                    cmd.Transaction = transaccion;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID_PAIS", obj_Pais.ID_PAIS);
                    val = await cmd.ExecuteNonQueryAsync();
                    cmd.Parameters.Clear();
                }
                transaccion.Commit();

            }

            return val;
        }

        public async Task<List<BE_Pais_Moneda>> Obtener_Combo_Pais()
        {
            List<BE_Pais_Moneda> lista = new List<BE_Pais_Moneda>();


            SqlConnection con = new SqlConnection(_conexion.CadenaSQL);
            con.Open();

            using (SqlCommand cmd = new SqlCommand("SP_OBTENER_COMBO_PAIS", con))
            {
                

                cmd.CommandType = CommandType.StoredProcedure;

                SqlDataReader lector = await cmd.ExecuteReaderAsync();
                while (await lector.ReadAsync())
                {
                    BE_Pais_Moneda obj_BE = new BE_Pais_Moneda();

                    obj_BE.ID_PAIS = Convert.ToInt32(lector[0].ToString().Trim());
                    obj_BE.COD_PAIS = lector[1].ToString().Trim();
                    obj_BE.DESCRIPCION_PAIS = lector[2].ToString().Trim();
                    obj_BE.ISO3_PAIS = lector[3].ToString().Trim();
                    obj_BE.ISO2_PAIS = lector[4].ToString().Trim();
                    obj_BE.COD_MONEDA = lector[5].ToString().Trim();
                    obj_BE.DESCRIPCION_MONEDA = lector[6].ToString().Trim();
                    obj_BE.COD_ALFANUMERICO_MONEDA = lector[7].ToString().Trim();
                    obj_BE.ESTADO_PAIS = lector[8].ToString().Trim();
                    obj_BE.FECHA_CREACION = lector[9].ToString().Trim();
                    obj_BE.USUARIO_CREACION = lector[10].ToString().Trim();
                    obj_BE.FECHA_MODIFICACION = lector[11].ToString().Trim();
                    obj_BE.USUARIO_MODIFICACION = lector[12].ToString().Trim();


                    lista.Add(obj_BE);
                }

                lector.Close();
            }


            return lista;
        }

        public async Task<List<BE_Pais_Moneda>> Obtener_Datos_Combo_Pais(BE_Pais_Moneda obj_Pais)
        {
            List<BE_Pais_Moneda> lista = new List<BE_Pais_Moneda>();


            SqlConnection con = new SqlConnection(_conexion.CadenaSQL);
            con.Open();

            using (SqlCommand cmd = new SqlCommand("SP_OBTENER_DATOS_COMBO_PAIS", con))
            {

                cmd.Parameters.AddWithValue("@ID_PAIS", Convert.ToInt32(obj_Pais.ID_PAIS));
                cmd.CommandType = CommandType.StoredProcedure;

                SqlDataReader lector = await cmd.ExecuteReaderAsync();
                while (await lector.ReadAsync())
                {
                    BE_Pais_Moneda obj_BE = new BE_Pais_Moneda();

                    obj_BE.ID_PAIS = Convert.ToInt32(lector[0].ToString().Trim());
                    obj_BE.COD_PAIS = lector[1].ToString().Trim();
                    obj_BE.DESCRIPCION_PAIS = lector[2].ToString().Trim();
                    obj_BE.ISO3_PAIS = lector[3].ToString().Trim();
                    obj_BE.ISO2_PAIS = lector[4].ToString().Trim();
                    obj_BE.COD_MONEDA = lector[5].ToString().Trim();
                    obj_BE.DESCRIPCION_MONEDA = lector[6].ToString().Trim();
                    obj_BE.COD_ALFANUMERICO_MONEDA = lector[7].ToString().Trim();
                    obj_BE.ESTADO_PAIS = lector[8].ToString().Trim();
                    obj_BE.FECHA_CREACION = lector[9].ToString().Trim();
                    obj_BE.USUARIO_CREACION = lector[10].ToString().Trim();
                    obj_BE.FECHA_MODIFICACION = lector[11].ToString().Trim();
                    obj_BE.USUARIO_MODIFICACION = lector[12].ToString().Trim();


                    lista.Add(obj_BE);
                }

                lector.Close();
            }


            return lista;
        }

        public async Task<List<BE_Pais_Moneda>> Obtener_Pais(BE_Pais_Moneda obj_Pais)
        {
            List<BE_Pais_Moneda> lista = new List<BE_Pais_Moneda>();


            SqlConnection con = new SqlConnection(_conexion.CadenaSQL);
            con.Open();

            using (SqlCommand cmd = new SqlCommand("SP_OBTENER_DATOS_PAIS", con))
            {
                cmd.Parameters.AddWithValue("@ID_PAIS", obj_Pais.ID_PAIS);

                cmd.CommandType = CommandType.StoredProcedure;

                SqlDataReader lector = await cmd.ExecuteReaderAsync();
                while (await lector.ReadAsync())
                {
                    BE_Pais_Moneda obj_BE = new BE_Pais_Moneda();

                    obj_BE.ID_PAIS = Convert.ToInt32(lector[0].ToString().Trim());
                    obj_BE.COD_PAIS = lector[1].ToString().Trim();
                    obj_BE.DESCRIPCION_PAIS = lector[2].ToString().Trim();
                    obj_BE.ISO3_PAIS = lector[3].ToString().Trim();
                    obj_BE.ISO2_PAIS = lector[4].ToString().Trim();
                    obj_BE.COD_MONEDA = lector[5].ToString().Trim();
                    obj_BE.DESCRIPCION_MONEDA = lector[6].ToString().Trim();
                    obj_BE.COD_ALFANUMERICO_MONEDA = lector[7].ToString().Trim();
                    obj_BE.ESTADO_PAIS = lector[8].ToString().Trim();
                    obj_BE.FECHA_CREACION = lector[9].ToString().Trim();
                    obj_BE.USUARIO_CREACION = lector[10].ToString().Trim();
                    obj_BE.FECHA_MODIFICACION = lector[11].ToString().Trim();
                    obj_BE.USUARIO_MODIFICACION = lector[12].ToString().Trim();


                    lista.Add(obj_BE);
                }

                lector.Close();
            }


            return lista;
        }
    }
}
