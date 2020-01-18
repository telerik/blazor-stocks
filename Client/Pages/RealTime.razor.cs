using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;
using BlazorFinancePortfolio.Models;
using BlazorFinancePortfolio.Services;
using BlazorFinancePortfolio.Helpers;
using Microsoft.JSInterop;

namespace BlazorFinancePortfolio.Client.Pages
{
    public partial class RealTime : IDisposable
    {
        [Inject] RealTimeDataService RealTimeDataService { get; set; }
        [Inject] IJSRuntime JSRuntime { get; set; }
        [CascadingParameter] public Currency SelectedCurrency { get; set; }
        bool ShowAllColumns { get; set; }
        int LoadDataInterval { get; set; } = 1500;
        List<RealTimeData> GridData { get; set; }
        CancellationTokenSource CancelToken;
        Random rnd = new Random();

        protected override async Task OnInitializedAsync()
        {
            await ToggleColumns();
            WindowResizeDispatcher.WindowResize += ToggleColumns;
            CancelToken = new CancellationTokenSource();
            GridData = await RealTimeDataService.GetInitialData(SelectedCurrency.Symbol);
            await IntervalDataUpdate();
        }

        async Task IntervalDataUpdate()
        {
            while (CancelToken.Token != null)
            {
                await Task.Delay(LoadDataInterval, CancelToken.Token);
                await RefreshData();
                StateHasChanged();
            }
        }

        void StopTimer()
        {
            if (CancelToken != null)
            {
                CancelToken.Cancel();
            }
        }

        protected async Task ToggleColumns()
        {
            if (WindowResizeDispatcher.WindowWidth == null)
            {
                WindowResizeDispatcher.WindowWidth = await JSRuntime.InvokeAsync<int>("getWindowWidth");
            }

            if (WindowResizeDispatcher.WindowWidth < 992)
            {
                ShowAllColumns = false;
            }
            else
            {
                ShowAllColumns = true;
            }
            StateHasChanged();
        }

        public void Dispose()
        {
            WindowResizeDispatcher.WindowResize -= ToggleColumns;
            StopTimer();
        }

        async Task RefreshData()
        {
            foreach (RealTimeData item in GridData)
            {
                decimal change = RealTimeDataService.GetRandomChange();
                item.Change = change;
                item.Price = item.Price + change;
            }
        }

        string GetPriceChangeClass(decimal change)
        {
            if (change > 0) return "price-up";
            if (change < 0) return "price-down";
            return "";
        }
    }
}
