using BlazorFinancePortfolio.Helpers;
using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlazorFinancePortfolio.Client.Components.StocksChart
{
    public partial class DateRangePicker
    {
        [Parameter] public DateTime StartDate { get; set; } = DateTime.Now.Date.AddDays(-4);
        [Parameter] public DateTime EndDate { get; set; } = DateTime.Now.Date;
        [Parameter] public DateTime MinDate { get; set; } = Constants.GetMinDate();
        [Parameter] public DateTime MaxDate { get; set; } = Constants.GetMaxDate();
        [Parameter] public EventCallback<Tuple<DateTime, DateTime>> SelectionChanged { get; set; }
        string WrongRangeMessage = "Start date must be before end date. We reset the selection, try again.";
        bool ShowErrorMessage { get; set; }

        protected override Task OnParametersSetAsync()
        {
            StartDate = GetLowerDate();
            return base.OnParametersSetAsync();
        }

        bool IsValid()
        {
            if (StartDate <= EndDate)
            {
                return true;
            }
            return false;
        }

        async Task FlashErrorMessage()
        {
            ShowErrorMessage = true;
            await Task.Delay(3000);
            ShowErrorMessage = false;
        }

        async void Update()
        {
            if (IsValid())
            {
                ShowErrorMessage = false;
                await SelectionChanged.InvokeAsync(new Tuple<DateTime, DateTime>(StartDate, EndDate));
            }
        }

        async void StartChanged(DateTime userChoice)
        {
            //workaround for #562
            if(userChoice < MinDate)
            {
                StartDate = MinDate.Date;
                userChoice = MinDate.Date;
            }


            if (userChoice > GetHigherDate())
            {
                await FlashErrorMessage();
            }
            else
            {
                StartDate = userChoice.Date;
                Update();
            }
        }

        async void EndChanged(DateTime userChoice)
        {
            //workaround for #562
            if (userChoice < StartDate)
            {
                EndDate = StartDate.Date;
                userChoice = StartDate.Date;
            }


            if (userChoice < GetLowerDate())
            {
                await FlashErrorMessage();
            }
            else
            {
                EndDate = userChoice.Date;
                Update();
            }
        }

        DateTime GetLowerDate()
        {
            return StartDate <= EndDate ? StartDate : EndDate;
        }

        DateTime GetHigherDate()
        {
            return StartDate >= EndDate ? StartDate : EndDate;
        }
    }
}
