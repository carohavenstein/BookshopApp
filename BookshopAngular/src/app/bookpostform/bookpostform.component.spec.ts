import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookPostFormComponent } from './bookpostform.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BookPostService } from '../bookpost.service';
import { AuthService } from '../auth.service';
import { of } from 'rxjs';
import { BookPost } from '../bookpost.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('BookPostFormComponent', () => {
  let component: BookPostFormComponent;
  let fixture: ComponentFixture<BookPostFormComponent>;
  let bookPostServiceSpy: jasmine.SpyObj<BookPostService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const mockBookPostService = jasmine.createSpyObj('BookPostService', [
      'getBookPostById',
      'updateBookPost',
      'addBookPost'
    ]);
    const mockAuthService = jasmine.createSpyObj('AuthService', ['getUserId']);
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [BookPostFormComponent, FormsModule, CommonModule],
      providers: [
        { provide: BookPostService, useValue: mockBookPostService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null // Cambiar a un ID string para test de edición
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookPostFormComponent);
    component = fixture.componentInstance;
    bookPostServiceSpy = TestBed.inject(BookPostService) as jasmine.SpyObj<BookPostService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set userId on init if not edit mode', () => {
    authServiceSpy.getUserId.and.returnValue(42);
    fixture.detectChanges();
    expect(component.bookPost.userId).toBe(42);
    expect(component.isEditMode).toBeFalse();
  });

  it('should load bookPost in edit mode', () => {
    // Simulamos que la URL tiene un id => modo edición
    const route = TestBed.inject(ActivatedRoute);
    spyOn(route.snapshot.paramMap, 'get').and.returnValue('7');
    const fakePost = new BookPost(7, 'Title', 'Author', 'Genre', 'Desc', 'New', 10, '', 1, null);
    bookPostServiceSpy.getBookPostById.and.returnValue(of(fakePost));

    fixture.detectChanges(); // Ejecuta ngOnInit

    expect(component.isEditMode).toBeTrue();
    expect(component.bookPost.title).toBe('Title');
    expect(bookPostServiceSpy.getBookPostById).toHaveBeenCalledWith(7);
  });

  it('should call updateBookPost on submit when in edit mode', () => {
    component.isEditMode = true;
    component.bookPost = new BookPost(1, 'T', 'A', 'G', 'D', 'Used', 9, '', 1, null);
    bookPostServiceSpy.updateBookPost.and.returnValue(of(component.bookPost));

    component.onSubmit();

    expect(bookPostServiceSpy.updateBookPost).toHaveBeenCalledWith(component.bookPost);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/books']);
  });

  it('should call addBookPost on submit when not in edit mode', () => {
    component.isEditMode = false;
    component.bookPost = new BookPost(0, 'T', 'A', 'G', 'D', 'New', 15, '', 1, null);
    bookPostServiceSpy.addBookPost.and.returnValue(of(component.bookPost));

    component.onSubmit();

    expect(bookPostServiceSpy.addBookPost).toHaveBeenCalledWith(component.bookPost);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/books']);
  });
});