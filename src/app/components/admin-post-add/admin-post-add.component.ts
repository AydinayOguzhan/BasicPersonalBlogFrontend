import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostModel } from 'src/app/models/post/postModel';
import { PostService } from 'src/app/services/postService/post.service';

@Component({
  selector: 'app-admin-post-add',
  templateUrl: './admin-post-add.component.html',
  styleUrls: ['./admin-post-add.component.css']
})
export class AdminPostAddComponent implements OnInit {
  postAddForm:FormGroup

  constructor(private formBuilder: FormBuilder, private toastr:ToastrService, private postService:PostService,
    private router:Router) { }

  ngOnInit(): void {
    this.createUpdateForm()
  }

  createUpdateForm() {
    this.postAddForm = this.formBuilder.group({
      postHeader: ["", Validators.required],
      postSummary: ["", Validators.required],
      postBody: ["", Validators.required],
    })
  }

  addPost(post:PostModel){
    this.postService.add(post).subscribe(response=>{
      this.toastr.success(response.message)
      this.router.navigate(["admin/posts"])
    },errorResponse=>{
      console.log(errorResponse.error.Message)
    })
  }

  add(){
    if (this.postAddForm.valid) {
      let post:PostModel = Object.assign({}, this.postAddForm.value)
      this.addPost(post)
    }else{
      this.toastr.error("Lütfen formu doldurunuz")
    }
  }
}
