import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ServicesModule } from '../../services/services.module'
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  lform: FormGroup;
  constructor(private router: Router, private service: ServicesModule,
    private toastr: ToastrService,private fb: FormBuilder) {

    this.lform = fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required],
    });
  }

  ngOnInit() {
    if (sessionStorage.getItem('LoggedIn') == '1') {
      this.router.navigate(['/home/dashboard'])
    } else {
      sessionStorage.clear()
    }
  }

  login(form) {
    sessionStorage.clear();
    console.log(form.username,form.password)
    if (form.username != '' || form.password != '') {
      let userCredential = { 'username': form.username, 'password': form.password };
      this.service.login(userCredential).subscribe(res => {
        if (res.successful && res.user == 1) {
          this.toastr.success("Logged in successfully", "", { timeOut: 3000 });
          sessionStorage.setItem('username', res.username)
          sessionStorage.setItem('hotelName', res.hotelName)
          sessionStorage.setItem('adminId', res.adminId)
          sessionStorage.setItem('staffId', null)
          sessionStorage.setItem('hotelId', res.hotelId)
          sessionStorage.setItem('userEmail', res.userEmail)
          sessionStorage.setItem('contactNumber', res.contactNumber)
          sessionStorage.setItem('user', res.user);
          sessionStorage.setItem('LoggedIn', '1');
          this.router.navigate(['/home/dashboard']);

        } else if (res.successful && res.user == 2) {
          this.toastr.success("Logged in successfully", "", { timeOut: 3000 });
          sessionStorage.setItem('username', res.username)
          sessionStorage.setItem('hotelName', res.hotelName)
          sessionStorage.setItem('hotelId', res.hotelId)
          sessionStorage.setItem('userEmail', res.userEmail)
          sessionStorage.setItem('contactNumber', res.contactNumber)
          sessionStorage.setItem('staffId', res.staffId)
          sessionStorage.setItem('adminId', null)
          sessionStorage.setItem('user', res.user);
          sessionStorage.setItem('LoggedIn', '1');
          this.router.navigate(['/home/dashboard']);

        }
        else {
          this.toastr.error(res.error, "", { timeOut: 3000 });
        }
      }, error => {
        this.toastr.error("Service temporarily not available", "", { timeOut: 3000 });
      });
    } else {
      this.toastr.error("Empty/Invalid username and password", "", { timeOut: 3000 });
    }

  }

  register() {
    localStorage.clear;
    this.router.navigate(['/signup'])
  }
}