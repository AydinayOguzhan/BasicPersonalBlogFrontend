import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PostModel } from 'src/app/models/post/postModel';
import { HomePagePostDateService } from 'src/app/services/homePagePostDateService/home-page-post-date.service';
import { PostService } from 'src/app/services/postService/post.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  posts:PostModel[]

  constructor(private postService:PostService, private toastr:ToastrService, private homePagePostDate:HomePagePostDateService) { }

  ngOnInit(): void {
    this.getPostDate()
  }

  getAllPosts(postDate:number){
    let date = new Date()
    date.setDate(date.getDate() - postDate) 
    let jsonDate = date.toJSON()

    this.postService.GetAllNDaysBefore(jsonDate).subscribe(response=>{
      this.posts = response.data

    },errorResponse=>{
      console.log(errorResponse.error.message)
      this.toastr.error(errorResponse.error.message)
    })
  }

  getPostDate(){
    this.homePagePostDate.get().subscribe(response=>{
      this.getAllPosts(response.data.postDate)

    },errorResponse=>{
      console.log(errorResponse.error.Message)
      this.toastr.error(errorResponse.error.message)
    })
  }

  seeThePost(post:PostModel){
    console.log(post);
  }

}
