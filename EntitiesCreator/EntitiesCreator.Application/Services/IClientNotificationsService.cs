using EntitiesCreator.Domain.Entities;

namespace EntitiesCreator.Application.Services
{
    public interface IClientNotificationsService
    {
        Task NotifyAllClents(MapPointEntity mapPoint);
    }
}
