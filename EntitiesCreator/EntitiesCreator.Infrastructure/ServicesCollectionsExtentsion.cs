using EntitiesCreator.Application.Services;
using EntitiesCreator.Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;

namespace EntitiesCreator.Infrastructure
{
    public static class ServicesCollectionsExtentsion
    {
        public static void AddEntitiesPresenterServices(this IServiceCollection services)
        {
            services.AddTransient<IClientNotificationsService, ClientNotificationsService>();
        }
    }
}
