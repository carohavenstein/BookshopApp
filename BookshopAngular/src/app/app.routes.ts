import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookPostFormComponent } from './bookpostform/bookpostform.component';
import { BookPostsComponent } from './bookposts/bookposts.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'books', component: BookPostsComponent },
  { path: 'add-book', component: BookPostFormComponent },
  { path: 'edit-book/:id', component: BookPostFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }