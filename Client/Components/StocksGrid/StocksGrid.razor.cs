﻿using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlazorFinancePortfolio.Models;
using BlazorFinancePortfolio.Helpers;
using BlazorFinancePortfolio.Services;
using Microsoft.JSInterop;

namespace BlazorFinancePortfolio.Client.Components.StocksGrid
{
    public partial class StocksGrid : IDisposable
    {
        [Inject] StocksListService StocksListService { get; set; }
        [Inject] IJSRuntime JSRuntime { get; set; }
        [Parameter] public Stock SelectedStock { get; set; }
        [Parameter] public EventCallback<Stock> SelectedStockChanged { get; set; }
        [Parameter] public List<Stock> Data { get; set; }
        [Parameter] public List<Stock> UncategorizedStocks { get; set; }
        [CascadingParameter] public Currency SelectedCurrency { get; set; }

        string SelectedValue { get; set; }
        Stock DefailtUncategorizedStock { get; set; } = new Stock() { Name = "+ Add new stock", Symbol = null };

        bool LargerThanPhone { get; set; }
        bool LargerThanTablet { get; set; }

        async Task OnSelect(Stock currStock)
        {
            if (!string.Equals(currStock.Symbol, SelectedStock?.Symbol))
            {
                SelectedStock = currStock;
                await SelectedStockChanged.InvokeAsync(SelectedStock);
            }
        }

        async Task OnAdd(string symbol)
        {
            if (!string.IsNullOrWhiteSpace(symbol))
            {
                var stock = UncategorizedStocks.FirstOrDefault(s => s.Symbol == symbol);
                if (stock != null && Data.All(s => s.Symbol != stock.Symbol))
                {
                    Stock addedStock = await StocksListService.AddStock(stock);
                    Data = await StocksListService.GetStocks(true);

                    UncategorizedStocks.Remove(stock);
                    var newUncategorizedStocks = new List<Stock>(UncategorizedStocks);
                    UncategorizedStocks = newUncategorizedStocks;

                    SelectedValue = null;
                }
            }
        }

        async Task OnRemoveConfirm()
        {
            if (SelectedStock == null)
            {
                return;
            }

            var stockForRemove = Data.FirstOrDefault(c => c.Symbol == SelectedStock.Symbol);
            await StocksListService.RemoveStock(stockForRemove);
            Data = await StocksListService.GetStocks(true);
            UncategorizedStocks = await StocksListService.GetStocks(false);

            SelectedStock = Data.FirstOrDefault();
            await SelectedStockChanged.InvokeAsync(SelectedStock);
        }

        protected override async Task OnInitializedAsync()
        {
            await ToggleColumns();

            Data = await StocksListService.GetStocks(true);

            UncategorizedStocks = await StocksListService.GetStocks(false);

            SelectedStock = Data.FirstOrDefault();
            await SelectedStockChanged.InvokeAsync(SelectedStock);

            await base.OnInitializedAsync();
        }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                WindowResizeDispatcher.WindowResize += ToggleColumns;
            }

            await base.OnAfterRenderAsync(firstRender);
        }

        async Task ToggleColumns()
        {
            if (WindowResizeDispatcher.WindowWidth == null)
            {
                WindowResizeDispatcher.WindowWidth = await JSRuntime.InvokeAsync<int>("getWindowWidth");
            }

            LargerThanPhone = WindowResizeDispatcher.WindowWidth > 768;
            LargerThanTablet = WindowResizeDispatcher.WindowWidth > 992;

            StateHasChanged();
        }

        public void Dispose()
        {
            WindowResizeDispatcher.WindowResize -= ToggleColumns;
        }
    }
}
