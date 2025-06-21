using BookshopApi.Data;
using BookshopApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookshopApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BookPostController : ControllerBase
    {
        private ApplicationDbContext _context;

        public BookPostController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<BookPost>> GetAll()
        {
            return await _context.BookPosts.ToListAsync();
        }

        [HttpGet]
        public async Task<BookPost> GetById(int id)
        {
            return await _context.BookPosts.FindAsync(id);
        }

        [HttpPost]
        public async Task Create([FromBody] BookPost bookPost)
        {
            bookPost.Date = DateTime.Now;
            await _context.BookPosts.AddAsync(bookPost);
            await _context.SaveChangesAsync();
        }

        [HttpPut]
        public async Task Update([FromBody] BookPost bookPost)
        {
            BookPost bookPostToUpdate = await _context.BookPosts.FindAsync(bookPost.Id);
            bookPostToUpdate.Title = bookPost.Title;
            bookPostToUpdate.Author = bookPost.Author;
            bookPostToUpdate.Genre = bookPost.Genre;
            bookPostToUpdate.Description = bookPost.Description;
            bookPostToUpdate.Condition = bookPost.Condition;
            bookPostToUpdate.Price = bookPost.Price;
            bookPostToUpdate.ImageUrl = bookPost.ImageUrl;

            await _context.SaveChangesAsync();
        }

        [HttpDelete]
        public async Task Delete(int id)
        {
            var bookPostToDelete = await _context.BookPosts.FindAsync(id);
            _context.Remove(bookPostToDelete);
            await _context.SaveChangesAsync();
        }
    }
}
