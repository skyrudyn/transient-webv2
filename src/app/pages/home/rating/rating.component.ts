import { Component, OnInit } from '@angular/core';
import { ServicesModule } from '../../../services/services.module';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
ratings:any;
  constructor(private toastr: ToastrService, private service: ServicesModule,
    private router: Router,private fb:FormBuilder) { }

  ngOnInit() {
    this.getRating();
  }
  getRating(){
    this.service.getRating(sessionStorage.getItem('hotelId')).subscribe(data=>{
      if(data.successful){
        this.ratings = data.response;
      }else{
        
      }
    })
  }

}
