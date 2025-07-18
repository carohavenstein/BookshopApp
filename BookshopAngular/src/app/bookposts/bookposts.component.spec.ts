import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookPostsComponent } from './bookposts.component';
import { BookPostService } from '../bookpost.service';
import { AuthService } from '../auth.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { BookPost } from '../bookpost.model';

describe('BookPostsComponent', () => {
  let component: BookPostsComponent;
  let fixture: ComponentFixture<BookPostsComponent>;
  let bookPostServiceSpy: jasmine.SpyObj<BookPostService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockPosts: BookPost[] = [
    {
      id: 1,
      title: '1984',
      author: 'George Orwell',
      genre: 'Dystopic',
      description: 'Classic',
      condition: 'used',
      price: 10,
      imageUrl: '',
      userId: 1,
      date: ''
    }
  ];

  beforeEach(async () => {
    bookPostServiceSpy = jasmine.createSpyObj('BookPostService', ['getAllBookPosts', 'addBookPost', 'deleteBookPostById', 'updateBookPost']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getUserId']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [BookPostsComponent],
      providers: [
        { provide: BookPostService, useValue: bookPostServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookPostsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all book posts on init', () => {
    bookPostServiceSpy.getAllBookPosts.and.returnValue(of(mockPosts));
    component.ngOnInit();
    expect(bookPostServiceSpy.getAllBookPosts).toHaveBeenCalled();
    expect(component.bookPosts.length).toBe(1);
  });

  it('should add a book post', () => {
    const newPost: BookPost = {
      ...mockPosts[0],
      id: 2,
      title: 'Animal Farm',
      author: 'George Orwell',
      genre: 'Novel',
      description: 'Classic',
      condition: 'used',
      price: 8,
      imageUrl: '',
      userId: 1,
      date: ''
    };
    component.newBookPost = newPost;
    bookPostServiceSpy.addBookPost.and.returnValue(of(newPost));

    component.addBookPost();

    expect(bookPostServiceSpy.addBookPost).toHaveBeenCalledWith(newPost);
    expect(component.bookPosts).toContain(newPost);
  });

  it('should delete a book post', () => {
    component.bookPosts = [...mockPosts];
    const postToDelete = mockPosts[0];
    bookPostServiceSpy.deleteBookPostById.and.returnValue(of({}));

    component.deleteBookPost(postToDelete);

    expect(bookPostServiceSpy.deleteBookPostById).toHaveBeenCalledWith(postToDelete);
    expect(component.bookPosts.length).toBe(0);
  });

});