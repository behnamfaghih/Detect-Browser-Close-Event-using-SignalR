//using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace TestBrowserClose.SignalR
{
    public class SignalRMiddleware : Hub
    {
        /// <summary>
        /// OnConnectedAsync
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        /// 
        public override async Task OnConnectedAsync()
        {           
            await base.OnConnectedAsync();
        }

        /// <summary>
        /// OnDisconnectedAsync
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public override async Task OnDisconnectedAsync(Exception? exception)
        {            
            await base.OnDisconnectedAsync(exception);
        }

        public async Task UserDisconnected()
        {
            // your code here
            await Clients.All.SendAsync("UserDisconnected", Context.ConnectionId);
        }


    }
}
