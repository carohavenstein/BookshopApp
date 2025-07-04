import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { BookPost } from './bookpost.model';
import { AuthService } from './auth.service'
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class BookPostService {
  apiUrlBookPost = environment.apiUrl + '/books';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllBookPosts(): Observable<BookPost[]> {
    return this.http.get<BookPost[]>(this.apiUrlBookPost);
  }


  getBookPostById(bookPostId: number): Observable<BookPost> {
    return this.http.get<BookPost>(
      this.apiUrlBookPost + '/' + bookPostId
    );
  }

  addBookPost(bookPost: BookPost): Observable<BookPost> {
    const currentUserId = this.authService.getUserId();
    if (currentUserId == null) {
      alert("Usuario no autenticado");
      return throwError(() => new Error("Usuario no autenticado"));
    }
    
    bookPost.userId = currentUserId;
    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<BookPost>(
      this.apiUrlBookPost, bookPost, httpOptions
    );
  }
  
  updateBookPost(bookPost: BookPost): Observable<BookPost> {
    const currentUserId = this.authService.getUserId();
    if (currentUserId == null) {
      alert("Usuario no autenticado");
      return throwError(() => new Error("Usuario no autenticado"));
    }

    if (bookPost.userId !== currentUserId) {
      alert("You can only update your own posts.");
      return throwError(() => new Error("Unauthorized update attempt"));
    }

    bookPost.userId = currentUserId;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.put<BookPost>(
      this.apiUrlBookPost + '/' + bookPost.id, bookPost, httpOptions
    );
    
  }

  deleteBookPostById(bookPost: BookPost) {
    const currentUserId = this.authService.getUserId();
    if (currentUserId === null) {
      alert("Usuario no atenticado");
      return throwError(() => new Error("Usuario no autenticado"));
    }

    if (bookPost.userId !== currentUserId) {
      alert("You can only delete your own posts.");
      return throwError(() => new Error("Unauthorized delete attempt"));
    }
    
    bookPost.userId = currentUserId;
    return this.http.delete(this.apiUrlBookPost + '/' + bookPost.id);
  }
}
