using Microsoft.AspNetCore.Blazor.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System.Threading.Tasks;
using BlazorFinancePortfolio.Services;
using BlazorSize;

namespace BlazorFinancePortfolio.Client
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("app");
            builder.Services.AddTelerikBlazor();
            builder.Services.AddScoped<CurrenciesService>();
            builder.Services.AddScoped<StocksListService>();
            builder.Services.AddScoped<RealTimeDataService>();
            builder.Services.AddScoped<ResizeListener>();

            await builder.Build().RunAsync();
        }
    }
}
