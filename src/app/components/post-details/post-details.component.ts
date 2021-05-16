import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from 'src/app/models/post/postModel';
import { PostService } from 'src/app/services/postService/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  currentPostId:number
  currentPost:PostModel

  constructor(private postService:PostService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.currentPostId = params["postId"]
      this.getPost(this.currentPostId)
    })
  }

  getPost(postId:number){
    this.postService.getById(postId).subscribe(response=>{
      this.currentPost = response.data
      console.log(this.currentPost)
    },errorResponse=>{
      console.log(errorResponse.error.message)
    })
  }
}
