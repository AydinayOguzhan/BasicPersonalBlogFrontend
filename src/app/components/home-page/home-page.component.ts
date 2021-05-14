import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PostModel } from 'src/app/models/post/postModel';
import { PostService } from 'src/app/services/postService/post.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  posts:PostModel[]

  constructor(private postService:PostService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getAllPosts()
  }

  getAllPosts(){
    this.postService.getAll().subscribe(response=>{
      this.posts = response.data
    },errorResponse=>{
      this.toastr.error(errorResponse.error.message)
    })
  }

  seeThePost(post:PostModel){
    console.log(post);
    
  }

}
