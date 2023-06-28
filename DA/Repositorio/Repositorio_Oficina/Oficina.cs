using BE;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DA.Configuracion;
using Microsoft.Extensions.Options;

namespace DA.Repositorio.Repositorio_Oficina
{
    public class Oficina : IOficina
    {
        private readonly ConfiguracionConexion _conexion;
        public Oficina(IOptions<ConfiguracionConexion> conexion)
        {
            _conexion = conexion.Value;
        }

        public async Task<int> Actualizar_Oficina(BE_Oficina obj_Oficina)
        {
            int val = 0;
            SqlConnection con = new SqlConnection(_conexion.CadenaSQL);
            con.Open();
            using (SqlTransaction transaccion = con.BeginTransaction())
            {
                using (SqlCommand cmd = transaccion.Connection.CreateCommand())
                {
                    val = 0;
                    cmd.CommandText = "SP_ACTUALIZAR_OFICINA";
                    cmd.Transaction = transaccion;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID_OFICINA", Convert.ToInt32(obj_Oficina.ID_OFICINA));
                    cmd.Parameters.AddWithValue("@COD_OFICINA", obj_Oficina.COD_OFICINA);
                    cmd.Parameters.AddWithValue("@DESCRIPCION_OFICINA", obj_Oficina.DESCRIPCION_OFICINA);
                    cmd.Parameters.AddWithValue("@ID_OFICINA_SBS", Convert.ToInt32(obj_Oficina.ID_OFICINA_SBS));
                    cmd.Parameters.AddWithValue("@ID_EMPRESA", Convert.ToInt32(obj_Oficina.ID_EMPRESA));
                    cmd.Parameters.AddWithValue("@ID_CIUDAD", Convert.ToInt32(obj_Oficina.ID_CIUDAD));
                    cmd.Parameters.AddWithValue("@DIRECCION_OFICINA", obj_Oficina.DIRECCION_OFICINA);
                    cmd.Parameters.AddWithValue("@ESTADO_OFICINA", obj_Oficina.ESTADO_OFICINA);
                    cmd.Parameters.AddWithValue("@USUARIO_MODIFICACION", obj_Oficina.USUARIO_MODIFICACION);
                 

                    val = await cmd.ExecuteNonQueryAsync();
                    cmd.Parameters.Clear();
                }
                transaccion.Commit();
            }

            return val;
        }

        public async Task<List<BE_Oficina>> Buscar_Oficina(BE_Oficina obj_Oficina)
        {
            List<BE_Oficina> lista = new List<BE_Oficina>();
            using (var conexion = new SqlConnection(_conexion.CadenaSQL))
            {
                conexion.Open();

                SqlCommand cmd = new SqlCommand("SP_BUSCAR_OFICINA", conexion);

                cmd.Parameters.AddWithValue("@ID_EMPRESA", obj_Oficina.ID_EMPRESA);
                cmd.Parameters.AddWithValue("@DESCRIPCION_OFICINA", string.IsNullOrEmpty(obj_Oficina.DESCRIPCION_OFICINA) ? "" : obj_Oficina.DESCRIPCION_OFICINA.Trim());
                cmd.Parameters.AddWithValue("@ESTADO_OFICINA", string.IsNullOrEmpty(obj_Oficina.ESTADO_OFICINA) ? "" : obj_Oficina.ESTADO_OFICINA.Trim());

                cmd.CommandType = CommandType.StoredProcedure;

                using (var lector = await cmd.ExecuteReaderAsync())
                {
                    while (await lector.ReadAsync())
                    {
                        lista.Add(new BE_Oficina()
                        {
                            ID_OFICINA = Convert.ToInt32(lector[0].ToString().Trim()),
                            COD_OFICINA = Convert.ToInt32(lector[1].ToString().Trim()),
                            DESCRIPCION_OFICINA = lector[2].ToString().Trim(),
                            ID_OFICINA_SBS = Convert.ToInt32(lector[3].ToString().Trim()),
                            ID_EMPRESA = Convert.ToInt32(lector[4].ToString().Trim()),
                            ID_CIUDAD = Convert.ToInt32(lector[5].ToString().Trim()),
                            DIRECCION_OFICINA = lector[6].ToString().Trim(),
                            ESTADO_OFICINA = lector[7].ToString().Trim(),
                            FECHA_CREACION = lector[8].ToString().Trim(),
                            USUARIO_CREACION = lector[9].ToString().Trim(),
                            FECHA_MODIFICACION = lector[10].ToString().Trim(),
                            USUARIO_MODIFICACION = lector[11].ToString().Trim(),
                            DESCRIPCION_EMPRESA = lector[12].ToString().Trim(),

                        });


                    }
                    lector.Close();
                }
            }
            return lista;
        }

        public async Task<int> Grabar_Oficina(BE_Oficina obj_Oficina)
        {
            int val = 0;
            SqlConnection con = new SqlConnection(_conexion.CadenaSQL);
            con.Open();
            using (SqlTransaction transaccion = con.BeginTransaction())
            {
                using (SqlCommand cmd = transaccion.Connection.CreateCommand())
                {
                    val = 0;
                    cmd.CommandText = "SP_INSERTAR_OFICINA";
                    cmd.Transaction = transaccion;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@COD_OFICINA", obj_Oficina.COD_OFICINA);
                    cmd.Parameters.AddWithValue("@DESCRIPCION_OFICINA", obj_Oficina.DESCRIPCION_OFICINA);
                    cmd.Parameters.AddWithValue("@ID_OFICINA_SBS", obj_Oficina.ID_OFICINA_SBS);
                    cmd.Parameters.AddWithValue("@ID_EMPRESA", obj_Oficina.ID_EMPRESA);
                    cmd.Parameters.AddWithValue("@ID_CIUDAD", obj_Oficina.ID_CIUDAD);
                    cmd.Parameters.AddWithValue("@DIRECCION_OFICINA", obj_Oficina.DIRECCION_OFICINA);
                    cmd.Parameters.AddWithValue("@USUARIO_CREACION", obj_Oficina.USUARIO_CREACION);
                 

                    val = await cmd.ExecuteNonQueryAsync();
                    cmd.Parameters.Clear();
                }
                transaccion.Commit();
            }

            return val;
        }

        public async Task<int> Inactivar_Oficina(BE_Oficina obj_Oficina)
        {
            int val = 0;
            SqlConnection con = new SqlConnection(_conexion.CadenaSQL);
            con.Open();
            using (SqlTransaction transaccion = con.BeginTransaction())
            {
                using (SqlCommand cmd = transaccion.Connection.CreateCommand())
                {
                    val = 0;
                    cmd.CommandText = "SP_ELIMINAR_OFICINA";
                    cmd.Transaction = transaccion;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID_OFICINA", obj_Oficina.ID_OFICINA);
                    val = await cmd.ExecuteNonQueryAsync();
                    cmd.Parameters.Clear();
                }
                transaccion.Commit();

            }

            return val;
        }
        public async Task<List<BE_Oficina>> Obtener_Oficina(BE_Oficina obj_Oficina)
        {
            List<BE_Oficina> lista = new List<BE_Oficina>();


            SqlConnection con = new SqlConnection(_conexion.CadenaSQL);
            con.Open();

            using (SqlCommand cmd = new SqlCommand("SP_OBTENER_DATOS_OFICINA", con))
            {
                cmd.Parameters.AddWithValue("@ID_OFICINA", obj_Oficina.ID_OFICINA);

                cmd.CommandType = CommandType.StoredProcedure;

                SqlDataReader lector = await cmd.ExecuteReaderAsync();
                while (await lector.ReadAsync())
                {
                    BE_Oficina obj_BE = new BE_Oficina();

                    obj_BE.ID_OFICINA = Convert.ToInt32(lector[0].ToString().Trim());
                    obj_BE.COD_OFICINA = Convert.ToInt32(lector[1].ToString().Trim());
                    obj_BE.DESCRIPCION_OFICINA = lector[2].ToString().Trim();
                    obj_BE.ID_OFICINA_SBS = Convert.ToInt32(lector[3].ToString().Trim());
                    obj_BE.ID_EMPRESA = Convert.ToInt32(lector[4].ToString().Trim());
                    obj_BE.ID_CIUDAD = Convert.ToInt32(lector[5].ToString().Trim());
                    obj_BE.DIRECCION_OFICINA = lector[6].ToString().Trim();
                    obj_BE.ESTADO_OFICINA = lector[7].ToString().Trim();
                    obj_BE.FECHA_CREACION = lector[8].ToString().Trim();
                    obj_BE.USUARIO_CREACION = lector[9].ToString().Trim();
                    obj_BE.FECHA_MODIFICACION = lector[10].ToString().Trim();
                    obj_BE.USUARIO_MODIFICACION = lector[11].ToString().Trim();
                   


                    lista.Add(obj_BE);
                }

                lector.Close();
            }


            return lista;
        }

        public Task<List<BE_Oficina>> Obtener_Combo_Ciudad()
        {
            throw new NotImplementedException();
        }

       

        public Task<List<BE_Oficina>> Obtener_Combo_Oficina_SBS()
        {
            throw new NotImplementedException();
        }

      
    }
}
