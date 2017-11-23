import { Component, OnInit } from '@angular/core';
import { ServicesModule } from 'app/services/services.module';

@Component({
  selector: 'app-event-history',
  templateUrl: './event-history.component.html',
  styleUrls: ['./event-history.component.css']
})
export class EventHistoryComponent implements OnInit {
  events:any;
  constructor(private service:ServicesModule) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    if (sessionStorage.getItem('hotelId') == null) {
      let data = 0;
      this.service.getEventHistory(data).subscribe(res => {
        this.events = res;
      })
    } else {
      let data = sessionStorage.getItem('hotelId');
      this.service.getEventHistory(data).subscribe(res => {
        this.events = res;
      })
    }
  }
}
