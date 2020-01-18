using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlazorFinancePortfolio.Models;
using BlazorFinancePortfolio.Helpers;
using BlazorFinancePortfolio.Services;
using Telerik.Blazor.Components;
using Microsoft.JSInterop;

namespace BlazorFinancePortfolio.Client.Pages
{
    public partial class UserProfile : IDisposable
    {
        [Inject] NavigationManager NavManager { get; set; }
        [Inject] StocksListService StocksListService {get;set;}
        [Inject] IJSRuntime JSRuntime { get; set; }
        [CascadingParameter] public Currency SelectedCurrency { get; set; }

        [Parameter] public bool IsProfileVisible { get; set; }
        [Parameter] public EventCallback<bool> IsProfileVisibleChanged { get; set; }

        public List<Stock> Stocks { get; set; }
        TelerikChart ChartRef { get; set; }
        bool ChartLegendVisible { get; set; } = true;

        protected override async Task OnInitializedAsync()
        {
            if (IsCurrentPageProfile())
            {
                IsProfileVisible = true;
            }

            Stocks = await StocksListService.GetStocks(true);

            await ResizeChart();
            WindowResizeDispatcher.WindowResize += ResizeChart;

            await base.OnInitializedAsync();
        }

        async void CloseProfile()
        {
            if (IsCurrentPageProfile())
            {
                NavManager.NavigateTo("");
            }
            else
            {
                IsProfileVisible = false;
                await IsProfileVisibleChanged.InvokeAsync(IsProfileVisible);
            }
        }

        bool IsCurrentPageProfile()
        {
            string currPage = NavManager.Uri.Substring(Math.Min(NavManager.Uri.Length, NavManager.BaseUri.Length)).ToLowerInvariant();
            return currPage.StartsWith("profile");
        }

        async Task ResizeChart()
        {
            if (WindowResizeDispatcher.WindowWidth == null)
            {
                WindowResizeDispatcher.WindowWidth = await JSRuntime.InvokeAsync<int>("getWindowWidth");
            }

            if (WindowResizeDispatcher.WindowWidth <= 992)
            {
                ChartLegendVisible = false;
            }
            else
            {
                ChartLegendVisible = true;
            }
            StateHasChanged();

            if (ChartRef != null)
            {
                ChartRef.Refresh();
            }
        }

        public void Dispose()
        {
            WindowResizeDispatcher.WindowResize -= ResizeChart;
        }
    }
}
