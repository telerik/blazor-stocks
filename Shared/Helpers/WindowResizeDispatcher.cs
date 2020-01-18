using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace BlazorFinancePortfolio.Helpers
{
    public static class WindowResizeDispatcher
    {
        public static event Func<Task> WindowResize;
        public static int? WindowWidth { get; set; }
        public static int? WindowHeight { get; set; }

        [JSInvokable]
        public static async Task RaiseWindowResizeEvent(int width, int height)
        {
            WindowWidth = width;
            WindowHeight = height;
            try
            {
                await WindowResize?.Invoke();
            }
            catch (Exception ex)
            {
                //something went wrong with the handlers
            }
        }
    }
}
