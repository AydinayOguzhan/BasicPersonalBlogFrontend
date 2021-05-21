import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user/userModel';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users:User[]

  constructor(private userService:UserService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers(){
    this.userService.getAll().subscribe(response=>{
      this.users = response.data
      console.log(this.users)
    },errorResponse=>{
      this.toastr.error(errorResponse.error.message)
    })
  }

}
