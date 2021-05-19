import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostModel } from 'src/app/models/post/postModel';
import { PostService } from 'src/app/services/postService/post.service';

@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.css']
})
export class AdminPostsComponent implements OnInit {
  posts:PostModel[]

  constructor(private postService:PostService, private router:Router) { }

  ngOnInit(): void {
    this.getPostsDesc()
  }

  getPostsDesc(){
    this.postService.getAllDesc().subscribe(response=>{
      this.posts = response.data
    },errorResponse=>{
      console.log(errorResponse.error.message)
    })
  }

  goToPostDetails(post:PostModel){
    console.log(post)
  }

  addPost(){
    this.router.navigate(["admin/post/add"])
  }
}
