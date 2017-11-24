import { Component, OnInit } from '@angular/core';
import { ServicesModule } from 'app/services/services.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  constructor(private service: ServicesModule, private fb: FormBuilder) {
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
    if (sessionStorage.getItem('staffId') != null) {
      this.id = sessionStorage.getItem('staffId');
    } else if (sessionStorage.getItem('adminId') != null) {
      this.id = sessionStorage.getItem('adminId')
    }

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

}
