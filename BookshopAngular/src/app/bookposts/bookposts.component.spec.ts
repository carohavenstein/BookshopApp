import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPostsComponent } from './bookposts.component';

describe('BookPostsComponent', () => {
  let component: BookPostsComponent;
  let fixture: ComponentFixture<BookPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
