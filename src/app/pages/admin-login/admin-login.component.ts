import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesModule } from 'app/services/services.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  lform: FormGroup;
  constructor(private router: Router, private service: ServicesModule,
    private toastr: ToastrService, private fb: FormBuilder) {

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
      this.service.loginAdmin(userCredential).subscribe(res => {
        if (res.successful) {
          this.toastr.success("Logged in successfully", "", { timeOut: 3000 });
          // sessionStorage.setItem('username', res.username)
          sessionStorage.setItem('username', res.adminName)
          sessionStorage.setItem('adminEmail', res.adminEmail)
          sessionStorage.setItem('user', res.user);
          sessionStorage.setItem('LoggedIn', '1');
          this.router.navigate(['/home/dashboard-admin']);

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


}
