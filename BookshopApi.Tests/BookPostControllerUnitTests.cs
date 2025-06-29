using BookshopApi.Controllers;
using BookshopApi.Data;
using BookshopApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace BookshopApi.Tests
{
    public class BookPostControllerTests
    {
        private ApplicationDbContext GetInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()) // Crear una nueva base de datos en memoria para cada prueba
                .Options;

            return new ApplicationDbContext(options);
        }

        [Fact]
        public async Task GetAll_ReturnsListOfBookPosts()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            context.BookPosts.AddRange(
                new BookPost
                {
                    Title = "1984",
                    Author = "George Orwell",
                    Genre = "Dystopic",
                    Description = "Great book",
                    Condition = "used",
                    Price = 8,
                    Date = DateTime.Now,
                    ImageUrl = "",
                    UserId = 1
                },
                new BookPost
                {
                    Title = "Atlas Shrugged",
                    Author = "Ayn Rand",
                    Genre = "Novel",
                    Description = "Story of John Galt",
                    Condition = "used",
                    Price = 10,
                    Date = DateTime.Now,
                    ImageUrl = "",
                    UserId = 3
                }
            );
            context.SaveChanges();

            var controller = new BookPostController(context);

            // Act
            var result = await controller.GetAll();

            // Assert
            Assert.Equal(2, result.Count);

            Assert.Equal("1984", result[0].Title);
            Assert.Equal("George Orwell", result[0].Author);
            Assert.Equal("Dystopic", result[0].Genre);
            Assert.Equal("Great book", result[0].Description);
            Assert.Equal("used", result[0].Condition);
            Assert.Equal(8, result[0].Price);
            Assert.Equal(DateTime.Today, result[0].Date?.Date);
            Assert.Equal("", result[0].ImageUrl);
            Assert.Equal(1, result[0].UserId);

            Assert.Equal("Atlas Shrugged", result[1].Title);
            Assert.Equal("Ayn Rand", result[1].Author);
            Assert.Equal("Novel", result[1].Genre);
            Assert.Equal("Story of John Galt", result[1].Description);
            Assert.Equal("used", result[1].Condition);
            Assert.Equal(10, result[1].Price);
            Assert.Equal(DateTime.Today, result[1].Date?.Date);
            Assert.Equal("", result[1].ImageUrl);
            Assert.Equal(3, result[1].UserId);

        }

        [Fact]
        public async Task GetById_ReturnsBookPostById()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            context.BookPosts.Add(new BookPost
                {
                    Title = "1984",
                    Author = "George Orwell",
                    Genre = "Dystopic",
                    Description = "Great book",
                    Condition = "used",
                    Price = 8,
                    Date = DateTime.Now,
                    ImageUrl = "",
                    UserId = 1
                });
            context.SaveChanges();

            var controller = new BookPostController(context);

            // Act
            var result = await controller.GetById(1);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(1, result.Id);
            Assert.Equal("1984", result.Title);
            Assert.Equal("George Orwell", result.Author);
            Assert.Equal("Dystopic", result.Genre);
            Assert.Equal("Great book", result.Description);
            Assert.Equal("used", result.Condition);
            Assert.Equal(8, result.Price);
            Assert.Equal(DateTime.Today, result.Date?.Date);
            Assert.Equal("", result.ImageUrl);
            Assert.Equal(1, result.UserId);
        }

        [Fact]
        public async Task Create_AddsBookPost()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var controller = new BookPostController(context);

            var newBookPost = new BookPost{
                                Title = "1984",
                                Author = "George Orwell",
                                Genre = "Dystopic",
                                Description = "Great book",
                                Condition = "used",
                                Price = 8,
                                Date = DateTime.Now,
                                ImageUrl = "",
                                UserId = 1
                            };

            // Act
            await controller.Create(newBookPost);

            // Assert
            var bookPost = await context.BookPosts.FindAsync(1);
            Assert.NotNull(bookPost);
            Assert.Equal("1984", bookPost.Title);
            Assert.Equal("George Orwell", bookPost.Author);
            Assert.Equal("Dystopic", bookPost.Genre);
            Assert.Equal("Great book", bookPost.Description);
            Assert.Equal("used", bookPost.Condition);
            Assert.Equal(8, bookPost.Price);
            Assert.Equal(DateTime.Today, bookPost.Date?.Date);
            Assert.Equal("", bookPost.ImageUrl);
            Assert.Equal(1, bookPost.UserId);
        }

        [Fact]
        public async Task Update_UpdatesBookPost()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var existingBookPost = new BookPost{
                                Title = "1984",
                                Author = "George Orwell",
                                Genre = "Dystopic",
                                Description = "Great book",
                                Condition = "used",
                                Price = 8,
                                Date = DateTime.Now,
                                ImageUrl = "",
                                UserId = 1
                            };
            context.BookPosts.Add(existingBookPost);
            context.SaveChanges();

            var controller = new BookPostController(context);

            var updatedBookPost = new BookPost { Id = 1, Description = "Updated description" };

            // Act
            await controller.Update(updatedBookPost);

            // Assert
            var bookPost = await context.BookPosts.FindAsync(1);
            Assert.NotNull(bookPost);
            Assert.Equal("Updated description", bookPost.Description);
        }

        [Fact]
        public async Task Delete_RemovesBookPost()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var bookPostToDelete = new BookPost{
                                Title = "1984",
                                Author = "George Orwell",
                                Genre = "Dystopic",
                                Description = "Great book",
                                Condition = "used",
                                Price = 8,
                                Date = DateTime.Now,
                                ImageUrl = "",
                                UserId = 1
                            };
            context.BookPosts.Add(bookPostToDelete);
            context.SaveChanges();

            var controller = new BookPostController(context);

            // Act
            await controller.Delete(1);

            // Assert
            var bookPost = await context.BookPosts.FindAsync(1);
            Assert.Null(bookPost);
        }
    }
}
