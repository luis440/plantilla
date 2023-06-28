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
using DA.Repositorio.Repositorio_Pais;

namespace DA.Repositorio.Repositorio_Empresa
{
    public class Empresa : IEmpresa
    {
        private readonly ConfiguracionConexion _conexion;
        public Empresa(IOptions<ConfiguracionConexion> conexion)
        {
            _conexion = conexion.Value;
        }
        public async Task<int> Actualizar_Empresa(BE_Empresa obj_Empresa)
        {
            int val = 0;
            SqlConnection con = new SqlConnection(_conexion.CadenaSQL);
            con.Open();
            using (SqlTransaction transaccion = con.BeginTransaction())
            {
                using (SqlCommand cmd = transaccion.Connection.CreateCommand())
                {
                    val = 0;
                    cmd.CommandText = "SP_ACTUALIZAR_EMPRESA";
                    cmd.Transaction = transaccion;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID_EMPRESA", Convert.ToInt32(obj_Empresa.ID_EMPRESA));
                    cmd.Parameters.AddWithValue("@DESCRIPCION_EMPRESA", obj_Empresa.DESCRIPCION_EMPRESA);
                    cmd.Parameters.AddWithValue("@NOMBRE_COMERCIAL_EMPRESA", obj_Empresa.NOMBRE_COMERCIAL_EMPRESA);
                    cmd.Parameters.AddWithValue("@REPRESENTANTE_CREDITO_EMPRESA", obj_Empresa.REPRESENTANTE_CREDITO_EMPRESA);
                    cmd.Parameters.AddWithValue("@DIRECCION_EMPRESA", obj_Empresa.DIRECCION_EMPRESA);
                    cmd.Parameters.AddWithValue("@RUC_EMPRESA", obj_Empresa.RUC_EMPRESA);
                    cmd.Parameters.AddWithValue("@TELEFONO_EMPRESA", obj_Empresa.TELEFONO_EMPRESA);
                    cmd.Parameters.AddWithValue("@ID_PAIS", obj_Empresa.ID_PAIS);
                    cmd.Parameters.AddWithValue("@USUARIO_MODIFICACION", obj_Empresa.USUARIO_MODIFICACION);
                    cmd.Parameters.AddWithValue("@ESTADO", obj_Empresa.ESTADO);

                    val = await cmd.ExecuteNonQueryAsync();
                    cmd.Parameters.Clear();
                }
                transaccion.Commit();
            }

            return val;
        }

        public async Task<List<BE_Empresa>> Buscar_Empresa(BE_Empresa obj_Empresa)
        {
            List<BE_Empresa> lista = new List<BE_Empresa>();
            using (var conexion = new SqlConnection(_conexion.CadenaSQL))
            {
                conexion.Open();

                SqlCommand cmd = new SqlCommand("SP_BUSCAR_EMPRESA", conexion);

                cmd.Parameters.AddWithValue("@DESCRIPCION_EMPRESA", string.IsNullOrEmpty(obj_Empresa.DESCRIPCION_EMPRESA) ? "" : obj_Empresa.DESCRIPCION_EMPRESA.Trim());
                cmd.Parameters.AddWithValue("@RUC_EMPRESA", string.IsNullOrEmpty(obj_Empresa.RUC_EMPRESA) ? "" : obj_Empresa.RUC_EMPRESA.Trim());
                cmd.Parameters.AddWithValue("@ESTADO", string.IsNullOrEmpty(obj_Empresa.ESTADO) ? "" : obj_Empresa.ESTADO.Trim());

                cmd.CommandType = CommandType.StoredProcedure;

                using (var lector = await cmd.ExecuteReaderAsync())
                {
                    while (await lector.ReadAsync())
                    {
                        lista.Add(new BE_Empresa()
                        {
                            ID_EMPRESA = Convert.ToInt32(lector[0].ToString().Trim()),
                            DESCRIPCION_EMPRESA = lector[1].ToString().Trim(),
                            NOMBRE_COMERCIAL_EMPRESA = lector[2].ToString().Trim(),
                            REPRESENTANTE_CREDITO_EMPRESA = lector[3].ToString().Trim(),
                            DIRECCION_EMPRESA = lector[4].ToString().Trim(),
                            RUC_EMPRESA = lector[5].ToString().Trim(),
                            ABREVIATURA_EMPRESA = lector[6].ToString().Trim(),
                            TELEFONO_EMPRESA = lector[7].ToString().Trim(),
                            ID_PAIS = Convert.ToInt32(lector[8].ToString().Trim()),
                            FECHA_CREACION = lector[9].ToString().Trim(),
                            USUARIO_CREACION = lector[10].ToString().Trim(),
                            FECHA_MODIFICACION = lector[11].ToString().Trim(),
                            USUARIO_MODIFICACION = lector[12].ToString().Trim(),
                            ESTADO = lector[13].ToString().Trim()
                        });


                    }
                    lector.Close();
                }
            }
            return lista;
        }

        public async Task<int> Grabar_Empresa(BE_Empresa obj_Empresa)
        {
            int val = 0;
            SqlConnection con = new SqlConnection(_conexion.CadenaSQL);
            con.Open();
            using (SqlTransaction transaccion = con.BeginTransaction())
            {
                using (SqlCommand cmd = transaccion.Connection.CreateCommand())
                {
                    val = 0;
                    cmd.CommandText = "SP_INSERTAR_EMPRESA";
                    cmd.Transaction = transaccion;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@DESCRIPCION_EMPRESA", obj_Empresa.DESCRIPCION_EMPRESA);
                    cmd.Parameters.AddWithValue("@NOMBRE_COMERCIAL_EMPRESA", obj_Empresa.NOMBRE_COMERCIAL_EMPRESA);
                    cmd.Parameters.AddWithValue("@REPRESENTANTE_CREDITO_EMPRESA", obj_Empresa.REPRESENTANTE_CREDITO_EMPRESA);
                    cmd.Parameters.AddWithValue("@DIRECCION_EMPRESA", obj_Empresa.DIRECCION_EMPRESA);
                    cmd.Parameters.AddWithValue("@RUC_EMPRESA", obj_Empresa.RUC_EMPRESA);
                    cmd.Parameters.AddWithValue("@TELEFONO_EMPRESA", obj_Empresa.TELEFONO_EMPRESA);
                    cmd.Parameters.AddWithValue("@ID_PAIS", obj_Empresa.ID_PAIS);
                    cmd.Parameters.AddWithValue("@USUARIO_CREACION", obj_Empresa.USUARIO_CREACION);

                    val = await cmd.ExecuteNonQueryAsync();
                    cmd.Parameters.Clear();
                }
                transaccion.Commit();
            }

            return val;
        }

        public async Task<int> Inactivar_Empresa(BE_Empresa obj_Empresa)
        {
            int val = 0;
            SqlConnection con = new SqlConnection(_conexion.CadenaSQL);
            con.Open();
            using (SqlTransaction transaccion = con.BeginTransaction())
            {
                using (SqlCommand cmd = transaccion.Connection.CreateCommand())
                {
                    val = 0;
                    cmd.CommandText = "SP_ELIMINAR_EMPRESA";
                    cmd.Transaction = transaccion;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID_EMPRESA", obj_Empresa.ID_EMPRESA);
                    val = await cmd.ExecuteNonQueryAsync();
                    cmd.Parameters.Clear();
                }
                transaccion.Commit();

            }

            return val;
        }

        public async Task<List<BE_Empresa>> Obtener_Combo_Empresa()
        {
            List<BE_Empresa> lista = new List<BE_Empresa>();


            SqlConnection con = new SqlConnection(_conexion.CadenaSQL);
            con.Open();

            using (SqlCommand cmd = new SqlCommand("SP_OBTENER_COMBO_EMPRESA", con))
            {
                

                cmd.CommandType = CommandType.StoredProcedure;

                SqlDataReader lector = await cmd.ExecuteReaderAsync();
                while (await lector.ReadAsync())
                {
                    BE_Empresa obj_BE = new BE_Empresa();



                    obj_BE.ID_EMPRESA = Convert.ToInt32(lector[0].ToString().Trim());
                    obj_BE.DESCRIPCION_EMPRESA = lector[1].ToString().Trim();
                    obj_BE.NOMBRE_COMERCIAL_EMPRESA = lector[2].ToString().Trim();
                    obj_BE.REPRESENTANTE_CREDITO_EMPRESA = lector[3].ToString().Trim();
                    obj_BE.DIRECCION_EMPRESA = lector[4].ToString().Trim();
                    obj_BE.RUC_EMPRESA = lector[5].ToString().Trim();
                    obj_BE.ABREVIATURA_EMPRESA = lector[6].ToString().Trim();
                    obj_BE.TELEFONO_EMPRESA = lector[7].ToString().Trim();
                    obj_BE.ID_PAIS = Convert.ToInt32(lector[8].ToString().Trim());
                    obj_BE.FECHA_CREACION = lector[9].ToString().Trim();
                    obj_BE.USUARIO_CREACION = lector[10].ToString().Trim();
                    obj_BE.FECHA_MODIFICACION = lector[11].ToString().Trim();
                    obj_BE.USUARIO_MODIFICACION = lector[12].ToString().Trim();
                    obj_BE.ESTADO = lector[13].ToString().Trim();
                   

                    lista.Add(obj_BE);
                }

                lector.Close();
            }


            return lista;
        }

        public async Task<List<BE_Empresa>> Obtener_Empresa(BE_Empresa obj_Empresa)
        {
            List<BE_Empresa> lista = new List<BE_Empresa>();


            SqlConnection con = new SqlConnection(_conexion.CadenaSQL);
            con.Open();

            using (SqlCommand cmd = new SqlCommand("SP_OBTENER_DATOS_EMPRESA", con))
            {
                cmd.Parameters.AddWithValue("@ID_EMPRESA", obj_Empresa.ID_EMPRESA);

                cmd.CommandType = CommandType.StoredProcedure;

                SqlDataReader lector = await cmd.ExecuteReaderAsync();
                while (await lector.ReadAsync())
                {
                    BE_Empresa obj_BE = new BE_Empresa();



                    obj_BE.ID_EMPRESA = Convert.ToInt32(lector[0].ToString().Trim());
                    obj_BE.DESCRIPCION_EMPRESA = lector[1].ToString().Trim();
                    obj_BE.NOMBRE_COMERCIAL_EMPRESA = lector[2].ToString().Trim();
                    obj_BE.REPRESENTANTE_CREDITO_EMPRESA = lector[3].ToString().Trim();
                    obj_BE.DIRECCION_EMPRESA = lector[4].ToString().Trim();
                    obj_BE.RUC_EMPRESA = lector[5].ToString().Trim();
                    obj_BE.ABREVIATURA_EMPRESA = lector[6].ToString().Trim();
                    obj_BE.TELEFONO_EMPRESA = lector[7].ToString().Trim();
                    obj_BE.ID_PAIS = Convert.ToInt32(lector[8].ToString().Trim());
                    obj_BE.FECHA_CREACION = lector[9].ToString().Trim();
                    obj_BE.USUARIO_CREACION = lector[10].ToString().Trim();
                    obj_BE.FECHA_MODIFICACION = lector[11].ToString().Trim();
                    obj_BE.USUARIO_MODIFICACION = lector[12].ToString().Trim();
                    obj_BE.ESTADO = lector[13].ToString().Trim();
                    obj_BE.ISO3_PAIS = lector[14].ToString().Trim();
                    obj_BE.ISO2_PAIS = lector[15].ToString().Trim();

                    lista.Add(obj_BE);
                }

                lector.Close();
            }


            return lista;
        }
    }
}
