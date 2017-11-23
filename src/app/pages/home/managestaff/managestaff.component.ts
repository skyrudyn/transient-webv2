import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServicesModule } from '../../../services/services.module'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-managestaff',
  templateUrl: './managestaff.component.html',
  styleUrls: ['./managestaff.component.css']
})
export class ManagestaffComponent implements OnInit {

  hotelId = sessionStorage.getItem('hotelId');
  forms: any;
  view: boolean = false;
  formError: any;
  updateform:FormGroup;
  edit:boolean=false;
  constructor(private toastr: ToastrService, private service: ServicesModule,
    private router: Router,private fb:FormBuilder) {
    this.updateform = fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required],
      'staffName': [null, Validators.required],
      'contactNumber': [null, Validators.required],
      'email': [null, Validators.required]
    });
  }
  ngOnInit() {
    if (sessionStorage.getItem('LoggedIn') == '1') {

    } else {
      this.router.navigate(['/login'])
    }

    if (sessionStorage.getItem('staffId') == 'null') {
      this.view = false;

    } else if (sessionStorage.getItem('staffId') !== 'null') {

      this.view = true;
      let self = this;
      this.service.editStaff(sessionStorage.getItem('staffId')).subscribe(res => {
        self.forms = res;
        console.log(res)
        self.forms.forEach(element => {
          self.updateform.get('username').patchValue(element.username)
          self.updateform.get('password').patchValue(element.password)
          self.updateform.get('staffName').patchValue(element.staffName)
          self.updateform.get('contactNumber').patchValue(element.contactNumber)
          self.updateform.get('email').patchValue(element.staffEmail)
        });
        self.updateform.disable();
      })
    }
  }
  goBack() {
    this.router.navigate(['/home/staff-management'])
  }
  enableEdit() {
    this.edit = true;
    this.updateform.enable();
    this.toastr.info("Staff is editable");
  }
  updateStaff(updateforms) {
    console.log("comes",updateforms)
    this.formError = false;
    if (updateforms.username == null) {
      this.toastr.error("Username cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (updateforms.password == null) {
      this.toastr.error("Password cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (updateforms.staffName == null) {
      this.toastr.error("Staff Name cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (updateforms.contactNumber == null) {
      this.toastr.error("Contact Number cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (updateforms.email == null) {
      this.toastr.error("Email cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (!this.formError) {
      let updateStaff = 'username=' + updateforms.username +
        '&password=' + updateforms.password +
        '&staffName=' + updateforms.staffName +
        '&contactNumber=' + updateforms.contactNumber +
        '&email=' + updateforms.email +
        '&staffId=' + sessionStorage.getItem('staffId');
      this.service.updateStaff(updateStaff).subscribe(res => {
        if (res.successful) {
          this.toastr.success(res.message, "", { timeOut: 3000 })
          this.router.navigate(['/home/staff-management']);
        } else {
          this.toastr.error(res.error, "", { timeOut: 3000 })
        }

      }, error => {
        this.toastr.error("Service temporarily not available...", "", { timeOut: 3000 })
      })
    }
  }
  addStaff(username, password, staffName, contactNumber, email) {
    console.log("comes")
    this.formError = false;
    if (username == "") {
      this.toastr.error("Username cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (password == "") {
      this.toastr.error("Password cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (staffName == "") {
      this.toastr.error("Staff Name cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (contactNumber == "") {
      this.toastr.error("Contact Number cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (email == "") {
      this.toastr.error("Email cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (!this.formError) {
      let staffadd = 'username=' + username +
        '&password=' + password +
        '&staffName=' + staffName +
        '&contactNumber=' + contactNumber +
        '&email=' + email +
        '&hotelId=' + this.hotelId +
        '&user=' + '2';
      this.service.register(staffadd).subscribe(res => {
        if (res.successful) {
          this.toastr.success(res.message, "", { timeOut: 3000 })
          this.router.navigate(['/home/staff-management']);
        } else {
          this.toastr.error(res.error, "", { timeOut: 3000 })
        }

      }, error => {
        this.toastr.error("Service temporarily not available...", "", { timeOut: 3000 })
      })
    }
  }
}
