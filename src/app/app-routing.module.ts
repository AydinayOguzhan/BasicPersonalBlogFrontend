import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPostsComponent } from './components/admin-posts/admin-posts.component';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",component:HomePageComponent},
  {path:"home",component:HomePageComponent},
  {path:"blog",component:BlogPageComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"userUpdate", component:UserUpdateComponent},

  {path:"admin/posts", component:AdminPostsComponent,canActivate:[LoginGuard]},
  {path:"admin/users", component:AdminPostsComponent,canActivate:[LoginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
