import { Component, OnInit } from '@angular/core';
import { BookPostService } from '../bookpost.service';
import { BookPost } from '../bookpost.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-bookshop',
  standalone: true,
  imports:[CommonModule, FormsModule],
  templateUrl: './bookposts.component.html',
  styleUrls: ['./bookposts.component.css'],
})
export class BookPostsComponent implements OnInit {
  bookPosts: BookPost[] = [];
  newBookPost: BookPost = {
    id: 0,
    title: '',
    author: '',
    genre: '',
    description: '',
    condition: '',
    price: 0,
    imageUrl: '',
    userId: 0,
    date: null,
  };

  constructor(
    private bookPostService: BookPostService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.bookPostService.getAllBookPosts().subscribe(data => {
      this.bookPosts = data;
    });
  }

  addBookPost(): void {
    this.bookPostService.addBookPost(this.newBookPost).subscribe(bookPost => {
        this.bookPosts.push(bookPost);
      });
      
  }

  deleteBookPost(bookPostToDelete: BookPost) {
    this.bookPostService.deleteBookPostById(bookPostToDelete).subscribe(() => {
      this.bookPosts = this.bookPosts.filter(bookPost => bookPost.id !== bookPostToDelete.id)
    });
  }

  editBookPost(id: number) {
    this.router.navigate(['/edit-book', id]);
  }

}
