import { Component, OnInit } from '@angular/core';
import { ServicesModule } from '../../../services/services.module';
import { Router } from '@angular/router'
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
events:any=[]
  constructor(private service:ServicesModule, private router:Router) { }

  ngOnInit() {
    this.getEvents();
  }
  getEvents() {
    if (sessionStorage.getItem('hotelId') == null) {
      let data = 0;
      this.service.getEvent(data).subscribe(res => {
        this.events = res;
      })
    } else {
      let data = sessionStorage.getItem('hotelId');
      this.service.getEvent(data).subscribe(res => {
        this.events = res;
      })
    }
  }
  goto(n,id = null){
    if(n == '1' || n == 1 && id == null){
      this.router.navigate(['/home/manage-event'])
      sessionStorage.setItem('eventId','null')
    }else{
      this.router.navigate(['/home/manage-event']);
      sessionStorage.setItem('eventId',id)
    }
  }
}
