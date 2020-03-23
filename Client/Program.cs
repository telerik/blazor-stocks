using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using BlazorFinancePortfolio.Services;
using BlazorPro.BlazorSize;

namespace BlazorFinancePortfolio.Client
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("app");
            builder.Services.AddBaseAddressHttpClient();

            builder.Services.AddTelerikBlazor();
            builder.Services.AddScoped<CurrenciesService>();
            builder.Services.AddScoped<StocksListService>();
            builder.Services.AddScoped<RealTimeDataService>();
            builder.Services.AddResizeListener(options =>
            {
                options.ReportRate = 200;
                options.EnableLogging = false;
                options.SuppressInitEvent = true;
            });

            await builder.Build().RunAsync();
        }
    }
}
