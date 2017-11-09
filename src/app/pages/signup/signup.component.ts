import { Component, OnInit } from '@angular/core';
import {ServicesModule } from '../../services/services.module'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formError:any;
  constructor(private router:Router,private service:ServicesModule,
              private toastr:ToastrService) { }

  ngOnInit() {
    localStorage.clear();
  }
  cancelConfirm(){
    localStorage.clear
    this.router.navigate(['/login'])
  }
  register(username,password,adminName,contactNumber,
    email,hotelName,hotelTag,hotelDesc,
    hotelBranch,hotelLocation){
      this.formError = false;
      if(username == ""){
        this.toastr.error("Username cannot be empty","", { timeOut: 3000 });
        this.formError =true;
      }
      if(password == ""){
        this.toastr.error("Password cannot be empty","", { timeOut: 3000 });
        this.formError =true;
      }
      if(adminName == ""){
        this.toastr.error("Admin Name cannot be empty","", { timeOut: 3000 });
        this.formError =true;
      }
       if(contactNumber == ""){
        this.toastr.error("Contact Number cannot be empty","", { timeOut: 3000 });
        this.formError =true;
      }
       if(email == ""){
        this.toastr.error("Email cannot be empty","", { timeOut: 3000 });
        this.formError =true;
      }
       if(hotelName == ""){
        this.toastr.error("Hotel Name cannot be empty","", { timeOut: 3000 });
        this.formError =true;
      }
       if(hotelBranch == ""){
        this.toastr.error("Hotel Branch cannot be empty","", { timeOut: 3000 });
        this.formError =true;
      }
       if(hotelLocation == ""){
        this.toastr.error("Hotel Location cannot be empty","", { timeOut: 3000 });
        this.formError =true;
      }

      if(!this.formError){
        let signUpForm =  'username='+username+
                          '&password='+password+
                          '&adminName='+adminName+
                          '&contactNumber='+contactNumber+
                          '&email='+email+
                          '&hotelName='+hotelName+
                          '&hotelTag='+hotelTag+
                          '&hotelDesc='+hotelDesc+
                          '&hotelBranch='+hotelBranch+
                          '&hotelLocation='+hotelLocation+
                          '&user='+'1';
        this.service.register(signUpForm).subscribe(res=>{
          if (res.successful) {
            this.toastr.success(res.message,"",{timeOut:3000})
            this.router.navigate(['/login']);
          }else{
            this.toastr.error(res.error,"",{timeOut:3000})
          }
          
        },error=>{
          this.toastr.error("Service temporarily not available...","",{timeOut:3000})
        })
      }
    }
}
