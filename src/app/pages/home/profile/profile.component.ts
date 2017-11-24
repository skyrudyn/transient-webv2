import { Component, OnInit } from '@angular/core';
import { ServicesModule } from 'app/services/services.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  usertype: any;
  hotelName: any;
  name: any;
  id: any;
  forms: any;
  pform: FormGroup;
  edit: boolean = false;
  formError: boolean = false;
  constructor(private service: ServicesModule, private fb: FormBuilder, private toastr: ToastrService) {
    this.pform = fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required],
      'name': [null, Validators.required],
      'contactNumber': [null, Validators.required],
      'email': [null, Validators.required]
    });

  }

  ngOnInit() {
    this.usertype = sessionStorage.getItem('user');
    this.hotelName = sessionStorage.getItem('hotelName');
    this.name = sessionStorage.getItem('username');
    // if (sessionStorage.getItem('staffId') != null) {
    //   this.id = sessionStorage.getItem('staffId');
    // } else if (sessionStorage.getItem('adminId') != null) {
    //   this.id = sessionStorage.getItem('adminId')
    // }
    this.id = sessionStorage.getItem('id');
    
    if (this.usertype != null) {
      let self = this;
      this.service.getProfile(this.usertype, this.id).subscribe(res => {
        self.forms = res;
        self.forms.forEach(element => {
          self.pform.get('username').patchValue(element.username)
          self.pform.get('password').patchValue(element.password)
          self.pform.get('name').patchValue(element.adminName)
          self.pform.get('contactNumber').patchValue(element.contactNumber)
          self.pform.get('email').patchValue(element.adminEmail)

        });
        self.pform.disable();
      })
    }
  }

  enableEdit() {
    this.edit = true;
    this.pform.enable();
    this.toastr.info("Profile is editable");
  }
  update(form) {

    this.formError = false;
    if (form.username == null) {
      this.toastr.error("Username cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (form.password == null) {
      this.toastr.error("Password cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (form.name == null) {
      this.toastr.error("Name cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (form.contactNumber == null) {
      this.toastr.error("Contact Number cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (form.email == null) {
      this.toastr.error("Email cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (!this.formError) {
      let puform = 'username=' + form.username +
        '&password=' + form.password +
        '&name=' + form.name +
        '&contactNumber=' + form.contactNumber +
        '&email=' + form.email +
        '&id=' + this.id+
        '&usertype=' + this.usertype;
        let self= this;
      this.service.register(puform).subscribe(res => {
        if (res.successful) {
          this.toastr.success(res.message, "", { timeOut: 3000 })
          self.pform.disable();
          self.edit = false;
        } else {
          this.toastr.error(res.error, "", { timeOut: 3000 })
        }

      }, error => {
        this.toastr.error("Service temporarily not available...", "", { timeOut: 3000 })
      })
    }
  }

}
