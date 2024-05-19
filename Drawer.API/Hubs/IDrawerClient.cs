using Drawer.API.Models;

namespace Drawer.API.Hubs;

public interface IDrawerClient
{
    public Task ReceiveTextMessage(ReceiveTextMessage message);
    public Task JoinGroupCallerMessage(JoinGroupCallerMessage message);
    public Task JoinGroupMessage(JoinGroupMessage message);
    public Task LeaveGroupMessage(LeaveGroupMessage message);
    public Task MouseDownMessage(MouseDownMessage message); 
    public Task MouseMoveMessage(MousePositionMessage message);
    public Task MouseUpMessage();
}