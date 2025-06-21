using Microsoft.EntityFrameworkCore;
using BookshopApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookshopApi.Data
{
    public class ApplicationDbContext: DbContext
    {
        public DbSet<BookPost> BookPosts { get; set; }
        public DbSet<User> Users { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }
}