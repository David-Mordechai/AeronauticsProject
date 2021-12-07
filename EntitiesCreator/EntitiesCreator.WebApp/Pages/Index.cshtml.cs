
using EntitiesCreator.Application.Services;
using EntitiesCreator.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace EntitiesCreator.WebApp.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;
        private readonly IClientNotificationsService _clientNotificationsService;

        public IndexModel(
            ILogger<IndexModel> logger,
            IClientNotificationsService clientNotificationsService)
        {
            _logger = logger;
            this._clientNotificationsService = clientNotificationsService;
        }

        [BindProperty]
        public MapPointEntity MapPoint { get; set; }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _logger.LogInformation("Sending new MapPoint to all clients");
            await _clientNotificationsService.NotifyAllClents(MapPoint);

            return RedirectToPage("./Index");
        }
    }
}