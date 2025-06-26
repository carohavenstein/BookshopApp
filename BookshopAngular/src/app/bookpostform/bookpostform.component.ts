import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookPostService } from '../bookpost.service';
import { BookPost } from '../bookpost.model';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bookpost-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bookpostform.component.html',
  styleUrls: ['./bookpostform.component.css']
})
export class BookPostFormComponent implements OnInit {
  bookPost: BookPost = new BookPost(0, '', '', '', '', '', 0, '', 0, null);
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookPostService: BookPostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.bookPostService.getBookPostById(+id).subscribe(post => {
        this.bookPost = post;
      });
    } else {
      const userId = this.authService.getUserId();
      if (userId) this.bookPost.userId = userId;
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.bookPostService.updateBookPost(this.bookPost).subscribe(() => {
        this.router.navigate(['/books']);
      });
    } else {
      this.bookPostService.addBookPost(this.bookPost).subscribe(() => {
        this.router.navigate(['/books']);
      });
    }
  }
}