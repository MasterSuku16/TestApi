// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TestApi9A.Models;


namespace TestApi9A
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext>options) :base(options){
        }
        public DbSet<Comment>? Comments { get; set; } 

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Comment>().HasData(
                new Comment()
                {
                    Id = 1,
                    Title = "Test",
                    Description="this person is amazing",
                    Author = "Isaac suku",
                    CreatedAt = new DateTime()
                },
                new Comment()
                {
                    Id = 2,
                    Title = "Test2",
                    Description="Thank u for asking",
                    Author = "Narvaez",
                    CreatedAt = new DateTime()
                }
            );
        }
    }
}