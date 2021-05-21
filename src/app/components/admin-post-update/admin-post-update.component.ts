import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostModel } from 'src/app/models/post/postModel';
import { PostService } from 'src/app/services/postService/post.service';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-admin-post-update',
  templateUrl: './admin-post-update.component.html',
  styleUrls: ['./admin-post-update.component.css']
})
export class AdminPostUpdateComponent implements OnInit {
  currentPostId: number
  currentPost: PostModel
  currentPostDate: any
  postUpdateForm: FormGroup

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService, private toastr: ToastrService,
    private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.currentPostId = parseInt(params["postId"])
      this.getPostById(this.currentPostId)
      this.createUpdateForm()
    })
  }

  createUpdateForm() {
    this.postUpdateForm = this.formBuilder.group({
      postHeader: ["", Validators.required],
      postSummary: ["", Validators.required],
      postBody: ["", Validators.required]
    })
  }


  getPostById(postId: number) {
    this.postService.getById(postId).subscribe(response => {
      this.currentPost = response.data
      this.currentPostDate = response.data.postDate
      this.postUpdateForm.setValue({
        postHeader: this.currentPost.postHeader, postSummary: this.currentPost.postSummary,
        postBody: this.currentPost.postBody
      })
    }, errorResponse => {
      this.toastr.error(errorResponse.error.message)
    })
  }

  update() {
    if (this.postUpdateForm.valid) {
      let post: PostModel = Object.assign({}, this.postUpdateForm.value)
      post.postDate = this.currentPostDate
      post.id = this.currentPostId
      this.postService.update(post).subscribe(response => {
        this.toastr.success(response.message)
        window.location.reload()
      }, errorResponse => {
        this.toastr.error(errorResponse.error.message)
      })
    } else {
      this.toastr.error("Lütfen formu doldurunuz")
    }
  }

  delete() {
    
    this.postService.delete(this.currentPost).subscribe(response => {
      window.location.replace("admin/posts")
      this.toastr.success(response.message)
    }, errorResponse => {
      this.toastr.error(errorResponse.error.message)
    })
  }
}
