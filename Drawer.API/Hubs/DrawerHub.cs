using Microsoft.AspNetCore.SignalR;

namespace Drawer.API.Hubs
{
    public class DrawerHub:Hub<IDrawerClient>
    {
        public override async Task OnConnectedAsync()
        {
            await Clients.All.JoinMessage($"Client {Context.ConnectionId} connected");
        }
    }
    
    public interface IDrawerClient
    {
        Task JoinMessage(string message);
    }
}
