import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private postService:PostService, private toastr:ToastrService, private homePagePostDate:HomePagePostDateService,
    private router:Router) { }

  ngOnInit(): void {
    this.getPostDate()
  }

  getAllPostsDesc(postDate:number){
    let date = new Date()
    date.setDate(date.getDate() - postDate) 
    let jsonDate = date.toJSON()

    this.postService.getAllNDaysBeforeDesc(jsonDate).subscribe(response=>{
      this.posts = response.data

    },errorResponse=>{
      console.log(errorResponse.error.message)
      this.toastr.error(errorResponse.error.message)
    })
  }

  getPostDate(){
    this.homePagePostDate.get().subscribe(response=>{
      this.getAllPostsDesc(response.data.postDate)

    },errorResponse=>{
      console.log(errorResponse.error.Message)
      this.toastr.error(errorResponse.error.message)
    })
  }

  seeThePost(post:PostModel){
    console.log(post);
    this.router.navigate(["postdetails/" + post.id])
  }

}
