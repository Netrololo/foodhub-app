using FoodHubApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodHubApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DishController : ControllerBase
    {
        private readonly AppDbContext _db;

        public DishController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet("{id}/modifiers")]
        public async Task<IActionResult> GetDishModifiers(int id)
        {
            var dish = await _db.Dishes
                .Include(d => d.Modifiers)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (dish == null)
                return NotFound(new { message = "Блюдо не найдено" });

            var dishConstructorData = new
            {
                DishId = dish.Id,
                Name = dish.Name,
                BasePrice = dish.BasePrice,
                Modifiers = dish.Modifiers.Select(m => new
                {
                    Id = m.Id.ToString(),
                    Name = m.Name,
                    Price = m.PriceDelta,
                    IsDefault = m.IsRemoval
                }).ToList()
            };

            return Ok(dishConstructorData);
        }
    }
}
