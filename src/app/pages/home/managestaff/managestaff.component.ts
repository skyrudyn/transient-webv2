import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServicesModule } from '../../../services/services.module'
import { Router } from '@angular/router';

@Component({
  selector: 'app-managestaff',
  templateUrl: './managestaff.component.html',
  styleUrls: ['./managestaff.component.css']
})
export class ManagestaffComponent implements OnInit {

  hotelId = localStorage.getItem('hotelId');
  formError: any;
  constructor(private toastr: ToastrService, private service: ServicesModule,
              private router:Router) { }
  ngOnInit() {
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
