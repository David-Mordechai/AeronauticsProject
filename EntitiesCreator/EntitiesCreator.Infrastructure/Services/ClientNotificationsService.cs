using EntitiesCreator.Application.Services;
using EntitiesCreator.Domain.Entities;
using EntitiesCreator.Infrastructure.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace EntitiesCreator.Infrastructure.Services
{
    internal class ClientNotificationsService : IClientNotificationsService
    {
        private readonly IHubContext<MapPointsHub> _hubContext;

        public ClientNotificationsService(IHubContext<MapPointsHub> hubContext)
        {
            _hubContext = hubContext;
        }

        async Task IClientNotificationsService.NotifyAllClents(MapPointEntity mapPoint)
        {
            await _hubContext.Clients.All.SendAsync("MessageReceived", mapPoint);
        }
    }
}
