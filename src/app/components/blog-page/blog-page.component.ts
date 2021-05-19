import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostModel } from 'src/app/models/post/postModel';
import { PostService } from 'src/app/services/postService/post.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {
  posts:PostModel[]

  constructor(private postService:PostService, private toastr:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.getAllPostsDesc()
  }

  getAllPostsDesc(){
    this.postService.getAllDesc().subscribe(response=>{
      this.posts = response.data
    },errorResponse=>{
      this.toastr.error(errorResponse.error.message)
      console.log(errorResponse.error.message)
    })
  }

  seeThePost(post:PostModel){
    console.log(post);
    this.router.navigate(["postdetails/" + post.id])
  }


}
