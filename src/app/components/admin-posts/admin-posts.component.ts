import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/post/postModel';
import { PostService } from 'src/app/services/postService/post.service';

@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.css']
})
export class AdminPostsComponent implements OnInit {
  posts:PostModel[]

  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.getPosts()
  }

  getPosts(){
    this.postService.getAll().subscribe(response=>{
      this.posts = response.data
    },errorResponse=>{
      console.log(errorResponse.error.message)
    })
  }

  goToPostDetails(post:PostModel){
    console.log(post)
  }

  addPost(){
    console.log("Worked")
  }
}
