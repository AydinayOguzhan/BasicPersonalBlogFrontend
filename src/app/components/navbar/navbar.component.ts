import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logged:boolean = false

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.isLogged()
  }

  isLogged(){
    if (this.authService.isAuthenticated()) {
        this.logged = true
    }
  }

  logout(){
    this.authService.logout()
  }

}
