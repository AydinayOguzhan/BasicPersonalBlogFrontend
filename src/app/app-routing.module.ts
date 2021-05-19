import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPostAddComponent } from './components/admin-post-add/admin-post-add.component';
import { AdminPostsComponent } from './components/admin-posts/admin-posts.component';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { RegisterComponent } from './components/register/register.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",component:HomePageComponent},
  {path:"home",component:HomePageComponent},
  {path:"blog",component:BlogPageComponent},
  {path:"postdetails/:postId", component:PostDetailsComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"userUpdate", component:UserUpdateComponent},

  {path:"admin/posts", component:AdminPostsComponent,canActivate:[LoginGuard]},
  {path:"admin/post/add", component:AdminPostAddComponent,canActivate:[LoginGuard]},
  {path:"admin/users", component:AdminPostsComponent,canActivate:[LoginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
