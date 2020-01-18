using BlazorFinancePortfolio.Services;
using Microsoft.AspNetCore.Components.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace BlazorFinancePortfolio.Client
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTelerikBlazor();
            services.AddScoped<CurrenciesService>();
            services.AddScoped<StocksListService>();
            services.AddScoped<RealTimeDataService>();
        }

        public void Configure(IComponentsApplicationBuilder app)
        {
            app.AddComponent<App>("app");
        }
    }
}
