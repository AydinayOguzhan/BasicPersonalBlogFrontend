import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user/userModel';
import { UserOperationClaim } from 'src/app/models/user/userOperationClaim';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { UserOperationClaimService } from 'src/app/services/userOperationClaimService/user-operation-claim.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logged:boolean = false
  user: User
  userOperationClaims: UserOperationClaim[]
  ifAdmin: boolean

  constructor(private authService:AuthService, private userService:UserService, private localStorageService:LocalStorageService,
    private userOperationClaimService:UserOperationClaimService) { }

  ngOnInit(): void {
    this.isLogged()
    if (this.logged) {
      this.getUserByEmail(this.localStorageService.getVariable("email"))
      if (this.localStorageService.getVariable("id") == null) {
        return null
      }
      this.checkUserClaims(parseInt(this.localStorageService.getVariable("id")))
    }
  }

  isLogged(){
    if (this.authService.isAuthenticated()) {
        this.logged = true
    }
  }

  logout(){
    this.authService.logout()
  }

  getUserByEmail(email: string) {
    this.userService.getByEmail(email).subscribe(response => {
      this.user = response.data
    })
  }

  
  checkUserClaims(userId:number){
    this.userOperationClaimService.checkUserClaims(userId).subscribe(response=>{
      if (response.success) {
        this.ifAdmin = response.success
        console.log(response.success)
      }else{
        this.ifAdmin = response.success
      }
    },errorResponse=>{
      console.log(errorResponse.error.message)
    })
  }

}
