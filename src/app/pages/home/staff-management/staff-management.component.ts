import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServicesModule } from '../../../services/services.module'
import { Router } from '@angular/router';
@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.css']
})
export class StaffManagementComponent implements OnInit {
  staffs: any;
  closeResult: any;
  numberOfStaff: any;
  i: number = 0;
  constructor(private toastr: ToastrService, private service: ServicesModule,
    private router: Router) { }

  ngOnInit() {
    this.getStaff();
  }
  getStaff() {
    this.service.getStaff(sessionStorage.getItem('hotelId')).subscribe(res => {
      if (res.successful) {
        this.staffs = res.response
        this.numberOfStaff = this.staffs.length;
      } else {
        this.numberOfStaff = 0;
        this.staffs = null
      }
    })
  }
  goto(n) {
    if (n == 0) {
      this.router.navigate(['/home/manage-staff'])
      sessionStorage.setItem('staffId', 'null')
    } else {
      this.router.navigate(['/home/manage-staff']);
      sessionStorage.setItem('staffId', n)
    }
  }
  delete(n) {
    this.service.deleteStaff(n).subscribe(data => {
      if (data.successful) {
        this.getStaff();
        this.toastr.success(data.message,"",{timeOut:1000})
      } else {
        this.toastr.error(data.error, "", { timeOut: 3000 });
      }
    })
  }
}
