import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import {ServicesModule } from '../../services/services.module'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private service:ServicesModule,
              private toastr:ToastrService) { }

  ngOnInit() {
    if(localStorage.getItem('LoggedIn')=='1'){
      this.router.navigate(['/home/dashboard'])
    }else{
      localStorage.clear()
    }
  }

  login(u, p) {
    localStorage.clear();
    console.log(u,p)
    if (u != '' || p != '') {
      let userCredential = { 'username': u, 'password': p };
        this.service.login(userCredential).subscribe(res => {
          if (res.successful && res.user == 1) {
            this.toastr.success("Logged in successfully","", { timeOut: 3000 });
            localStorage.setItem('username', res.username)
            localStorage.setItem('hotelName', res.hotelName)
            localStorage.setItem('hotelId', res.hotelId)
            localStorage.setItem('userEmail', res.userEmail)
            localStorage.setItem('contactNumber', res.contactNumber)
            localStorage.setItem('user', res.user);
            localStorage.setItem('LoggedIn','1');
            this.router.navigate(['/home/dashboard']);
    
          } else if (res.successful && res.user == 2) {
            this.toastr.success("Logged in successfully","", { timeOut: 3000 });
            localStorage.setItem('username', res.username)
            localStorage.setItem('hotelName', res.hotelName)
            localStorage.setItem('hotelId', res.hotelId)
            localStorage.setItem('userEmail', res.userEmail)
            localStorage.setItem('contactNumber', res.contactNumber)
            localStorage.setItem('staffId', res.staffId)
            localStorage.setItem('user', res.user);
            localStorage.setItem('LoggedIn','1');
            this.router.navigate(['/home/dashboard']);
    
          }
          else {
            this.toastr.error(res.error,"", { timeOut: 3000 });
          }
        },error=>{
          this.toastr.error("Service temporarily not available","", { timeOut: 3000 });
        });
      }else{
        this.toastr.error("Empty/Invalid username and password","", { timeOut: 3000 });
      }
      
    }
    
    register(){
      localStorage.clear;
      this.router.navigate(['/signup'])
    }
  }