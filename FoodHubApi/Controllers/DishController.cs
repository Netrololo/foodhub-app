using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace FoodHubApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DishController : ControllerBase
    {
        // Эндпоинт, который будет отдавать ингредиенты для экрана кастомизации
        [HttpGet("{id}/modifiers")]
        public IActionResult GetDishModifiers(int id)
        {
            var dishConstructorData = new
            {
                DishId = id,
                Name = "Бургер классический",
                BasePrice = 350.00,
                Modifiers = new List<object>
                {
                    new { Id = "kotleta", Name = "Котлета", Price = 120.00, IsDefault = true },
                    new { Id = "tomatoes", Name = "Томаты", Price = 40.00, IsDefault = true },
                    new { Id = "onion", Name = "Лук", Price = 20.00, IsDefault = true },
                    new { Id = "cheese", Name = "Маринованный сыр", Price = 50.00, IsDefault = false }
                }
            };
            return Ok(dishConstructorData);
        }
    }
}
