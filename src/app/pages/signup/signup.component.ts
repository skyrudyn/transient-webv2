import { Component, OnInit } from '@angular/core';
import { ServicesModule } from '../../services/services.module'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formError: any;
  sform: FormGroup;
  show:boolean = false;
  constructor(private router: Router, private service: ServicesModule,
    private toastr: ToastrService, private fb: FormBuilder) {
    this.sform = fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required],
      'adminName': [null, Validators.required],
      'contactNumber': [null, Validators.required],
      'email': [null, Validators.required],
      'hotelName': [null, Validators.required],
      'hotelTag': [null, Validators.required],
      'hotelDesc': [null, Validators.required],
      'hotelBranch': [null, Validators.required],
      'hotelLocation': [null, Validators.required]
    });
  }

  ngOnInit() {
    sessionStorage.clear();
  }
  shows(){
  }
  cancelConfirm() {
    sessionStorage.clear
    this.router.navigate(['/login'])
  }
  register(sform) {
    this.formError = false;
    if (sform.username == null) {
      this.toastr.error("Username cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (sform.password == null) {
      this.toastr.error("Password cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (sform.adminName == null) {
      this.toastr.error("Admin Name cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (sform.contactNumber == null) {
      this.toastr.error("Contact Number cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (sform.email == null) {
      this.toastr.error("Email cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (sform.hotelName == null) {
      this.toastr.error("Hotel Name cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (sform.hotelBranch == null) {
      this.toastr.error("Hotel Branch cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (sform.hotelLocation == null) {
      this.toastr.error("Hotel Location cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }

    if (!this.formError) {
      let signUpForm = 'username=' + sform.username +
        '&password=' + sform.password +
        '&adminName=' + sform.adminName +
        '&contactNumber=' + sform.contactNumber +
        '&email=' + sform.email +
        '&hotelName=' + sform.hotelName +
        '&hotelTag=' + sform.hotelTag +
        '&hotelDesc=' + sform.hotelDesc +
        '&hotelBranch=' + sform.hotelBranch +
        '&hotelLocation=' + sform.hotelLocation +
        '&user=' + '1';
      this.service.register(signUpForm).subscribe(res => {
        if (res.successful) {
          this.toastr.success(res.message, "", { timeOut: 3000 })
          this.router.navigate(['/login']);
        } else {
          this.toastr.error(res.error, "", { timeOut: 3000 })
        }

      }, error => {
        this.toastr.error("Service temporarily not available...", "", { timeOut: 3000 })
      })
    }
  }
}
