import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup

  constructor(private formBuilder:FormBuilder,private toastr:ToastrService, private authService:AuthService,
    private router:Router, private localStorageService:LocalStorageService, private userService:UserService) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if (this.loginForm.valid) {
      let user = Object.assign({},this.loginForm.value)      
      this.authService.login(user).subscribe(response=>{
        this.localStorageService.setVariable("token",response.data.token)
        this.localStorageService.setVariable("email",user.email)
        this.toastr.success(response.message)
        this.getUserByEmail(user.email)
      },errorResponse=>{
        this.toastr.error(errorResponse.error.message)
      })
    }else{
      this.toastr.error("Lütfen formu doldurunuz")
    }
  }

  getUserByEmail(email: string) {
    console.log("getuserbyemail çalıştı");
    
    this.userService.getByEmail(email).subscribe(response => {
      this.localStorageService.setVariable("id", response.data.id.toString())
      console.log(response.data.id)
      this.router.navigate(["/"])
        this.toastr.info(response.message).onShown.subscribe(()=>{
          window.location.reload()
        })
    },errorResponse=>{
      console.log(errorResponse.error.Message)
    })
  }
}
