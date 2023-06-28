using DA.Configuracion;
using DA.Repositorio;
using DA.Repositorio.Repositorio_Empresa;
using DA.Repositorio.Repositorio_Errores;
using DA.Repositorio.Repositorio_Login;
using DA.Repositorio.Repositorio_Menu;
using DA.Repositorio.Repositorio_Oficina;
using DA.Repositorio.Repositorio_Pais;
using DA.Repositorio.Repositorio_Usuario;
using Newtonsoft.Json.Serialization;
using Serilog;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.Configure<ConfiguracionConexion>(builder.Configuration.GetSection("ConfiguracionConexion"));
builder.Services.AddScoped<IUsuario, Usuario>();
builder.Services.AddScoped<ILogin, Login>();
builder.Services.AddScoped<IErrores, Errores>();
builder.Services.AddScoped<IMenu, Menu>();
builder.Services.AddScoped<IPais, Pais>();
builder.Services.AddScoped<IEmpresa, Empresa>();
builder.Services.AddScoped<IOficina, Oficina>();
/*Permite obtener las entidades en Mayusculas*/
builder.Services.AddControllersWithViews().AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);
/*Permite crear un Log*/
Log.Logger = new LoggerConfiguration()
   .WriteTo.File("C:\\MERKAVA\\Log-.log", rollingInterval: RollingInterval.Day).CreateLogger();

/*******  Visualizar el Log de todo el proyecto *********/
/*

var _logger = new LoggerConfiguration()
   .WriteTo.File("C:\\temp\\Logs\\Apilog-.log", rollingInterval : RollingInterval.Day).CreateLogger();

builder.Logging.AddSerilog(_logger);
*/


//builder.Services.AddMvc().AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());
//services.AddMvc().AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver())
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Seguridad}/{action=Login}/{id?}");

app.Run();
