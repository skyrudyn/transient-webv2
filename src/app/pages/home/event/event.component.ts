import { Component, OnInit } from '@angular/core';
import { ServicesModule } from '../../../services/services.module';
import { Router } from '@angular/router'
import { error } from 'selenium-webdriver';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events: any = []
  staffs: any;
  disabled: any;
  constructor(private service: ServicesModule, private router: Router, private toastr: ToastrService, ) { }
  staffId: any;
  ngOnInit() {
    this.getEvents();
    if (sessionStorage.getItem('staffId') != null) {
      this.staffId = sessionStorage.getItem('staffId');
    }
    this.service.getStaff(sessionStorage.getItem('hotelId')).subscribe(res => {
      if(res.successful){
      this.staffs = res.response
    }else{
      this.staffs = null
    }
    })
    if (sessionStorage.getItem('user') == '2') {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }
  getEvents() {
    if (sessionStorage.getItem('hotelId') == null) {
      let data = 0;
      this.service.getEvent(data).subscribe(res => {
        if (res.successful) {
          this.events = res.response;
        } else {
          this.events = null;
        }
      })
    } else {
      let data = sessionStorage.getItem('hotelId');
      this.service.getEvent(data).subscribe(res => {
        if (res.successful) {
          this.events = res.response;
        } else {
          this.events = null;
        }
      })
    }
  }
  goto(n, id = null) {
    if (n == '1' || n == 1 && id == null) {
      this.router.navigate(['/home/create-event'])
      sessionStorage.setItem('eventId', 'null')
    } else {
      this.router.navigate(['/home/create-event']);
      sessionStorage.setItem('eventId', id)
    }
  }
  delete(eventId) {
    console.log(eventId)
    let remove = 'eventId=' + eventId;

    this.service.archiveEvent(remove).subscribe(res => {
      if (res.successful) {
        this.toastr.success(res.message, "", { timeOut: 3000 })
        this.router.navigate(['/home/event']);
      } else {
        this.toastr.error(res.error, "", { timeOut: 3000 })
      }

    }, error => {
      this.toastr.error("Service temporarily not available...", "", { timeOut: 3000 })
    })
  }
}
