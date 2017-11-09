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
staffs:any;
  constructor(private toastr: ToastrService, private service: ServicesModule,
              private router:Router) { }

  ngOnInit() {
    this.service.getStaff(localStorage.getItem('hotelId')).subscribe(res=>{
      this.staffs =res
      })
  }
  
}
