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
closeResult:any;
numberOfStaff:any;
i:number = 0;
  constructor(private toastr: ToastrService, private service: ServicesModule,
              private router:Router) { }

  ngOnInit() {
    let self:this;
    this.service.getStaff(sessionStorage.getItem('hotelId')).subscribe(res=>{
      if(res.successful){
        this.staffs =res.response
        this.numberOfStaff = this.staffs.length;
      }else{
        this.staffs=null
      }
      })
  }
  goto(n){
    console.log(n)
    if( n == 0 ){
      this.router.navigate(['/home/manage-staff'])
      sessionStorage.setItem('staffId','null')
    }else{
      this.router.navigate(['/home/manage-staff']);
      sessionStorage.setItem('staffId',n)
    }
  }
  delete(n){
    
  }
}
