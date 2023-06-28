using Serilog;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DA.Repositorio.Repositorio_Errores
{
    public class Errores : IErrores
    {
        public async Task Insertar_Exception(Exception ex)
        {
            string resultado_error = "";

            var task = new Task(() =>

            {
                StackTrace st = new StackTrace(ex, true);
                StackFrame frame = st.GetFrames().Where(f => !string.IsNullOrEmpty(f.GetFileName())
                     && f.GetILOffset() != StackFrame.OFFSET_UNKNOWN
                     && f.GetNativeOffset() != StackFrame.OFFSET_UNKNOWN
                     && !f.GetMethod().Module.Assembly.GetName().Name.Contains("mscorlib")).First();

                string MachineName = Environment.MachineName;
                string UserName = Environment.UserName.ToUpper();
                string Mensaje = ex.Message;
                int LineaError = frame.GetFileLineNumber();
                string Proyecto = frame.GetMethod().Module.Assembly.GetName().Name;
                string Clase = frame.GetMethod().DeclaringType.Name;
                string metodo = frame.GetMethod().Name;
                string codigoError = Convert.ToString(frame.GetHashCode());

                resultado_error = "Equipo: " + MachineName + " | " + "Usuario: " + UserName + " | " + "Mensaje: " + Mensaje + " | " +
                "LineaError: " + LineaError + " | " + "Proyecto: " + Proyecto + " | " + "Clase: " + Clase + " | " + "metodo: " + metodo +
                " | " + "codigoError: " + codigoError;

            });
            task.Start();
            await task;
            Log.Information(resultado_error);

        }
    }
}
