using Microsoft.EntityFrameworkCore;

namespace FoodHubApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Restaurant> Restaurants => Set<Restaurant>();
        public DbSet<Dish> Dishes => Set<Dish>();
        public DbSet<Modifier> Modifiers => Set<Modifier>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Restaurant>(e =>
            {
                e.ToTable("restaurants");
                e.Property(x => x.Id).HasColumnName("id");
                e.Property(x => x.Name).HasColumnName("name");
                e.Property(x => x.DeliveryRadiusKm).HasColumnName("delivery_radius_km");
                e.Property(x => x.IsOpen).HasColumnName("is_open");
            });

            modelBuilder.Entity<Dish>(e =>
            {
                e.ToTable("dishes");
                e.Property(x => x.Id).HasColumnName("id");
                e.Property(x => x.RestaurantId).HasColumnName("restaurant_id");
                e.Property(x => x.Name).HasColumnName("name");
                e.Property(x => x.Description).HasColumnName("description");
                e.Property(x => x.BasePrice).HasColumnName("base_price");
                e.Property(x => x.Calories).HasColumnName("calories");
                e.Property(x => x.Proteins).HasColumnName("proteins");
                e.Property(x => x.Fats).HasColumnName("fats");
                e.Property(x => x.Carbs).HasColumnName("carbs");
                e.Property(x => x.Allergens).HasColumnName("allergens");
                e.Property(x => x.IsInStopList).HasColumnName("is_in_stop_list");

                e.HasMany(d => d.Modifiers)
                 .WithOne()
                 .HasForeignKey(m => m.DishId);
            });

            modelBuilder.Entity<Modifier>(e =>
            {
                e.ToTable("modifiers");
                e.Property(x => x.Id).HasColumnName("id");
                e.Property(x => x.DishId).HasColumnName("dish_id");
                e.Property(x => x.Name).HasColumnName("name");
                e.Property(x => x.PriceDelta).HasColumnName("price_delta");
                e.Property(x => x.IsRemoval).HasColumnName("is_removal");
            });
        }
    }

    public class Restaurant
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal DeliveryRadiusKm { get; set; }
        public bool IsOpen { get; set; }
    }

    public class Dish
    {
        public int Id { get; set; }
        public int RestaurantId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal BasePrice { get; set; }
        public int? Calories { get; set; }
        public decimal? Proteins { get; set; }
        public decimal? Fats { get; set; }
        public decimal? Carbs { get; set; }
        public string[]? Allergens { get; set; }
        public bool IsInStopList { get; set; }
        public List<Modifier> Modifiers { get; set; } = new();
    }

    public class Modifier
    {
        public int Id { get; set; }
        public int DishId { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal PriceDelta { get; set; }
        public bool IsRemoval { get; set; }
    }
}
