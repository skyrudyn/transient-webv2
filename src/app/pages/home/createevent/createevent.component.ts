import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicesModule } from '../../../services/services.module'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-createevent',
  templateUrl: './createevent.component.html',
  styleUrls: ['./createevent.component.css']
})
export class CreateeventComponent implements OnInit {
  formError: any;
  male: any
  female: any
  mixed: any
  eventTypes: any = [];
  staff: any = [];
  participantTypes: any = [];
  createdBy = localStorage.getItem('username')
  params: any;
  constructor(private router: Router, private toastr: ToastrService,
    private service: ServicesModule, private routerParam: ActivatedRoute) { }


  ngOnInit() {
    if (localStorage.getItem('LoggedIn') == '1') {
      let self = this;
      this.service.getType().subscribe(res => {
        self.eventTypes = res;
      })
      this.service.getStaff(localStorage.getItem('hotelId')).subscribe(res => {
        this.staff = res
      })
      // this.service.getParticipantType().subscribe(res => {
      //   this.participantTypes = res;
      // })
    } else {
      this.router.navigate(['/login'])
    }

    this.routerParam.queryParams.subscribe(params =>{
      if(params['eventid'])
    }
    )
  }

  goBack() {
    this.router.navigate(['/home/event'])
  }

  change(n) {
    console.log(n)
    if (n == 1) {
      this.male = true;
      this.female = false;
      this.mixed = false;
    } else if (n == 2) {
      this.male = false;
      this.female = true;
      this.mixed = false;
    } else if (n == 3) {
      this.male = true;
      this.female = true;
      this.mixed = false;
    } else if (n == 4) {
      this.male = false;
      this.female = false;
      this.mixed = true;
    }
    console.log(this.male, this.female, this.mixed)
  }
  create(eventName, eventLocation, eventDate,
    eventTime, payType, payRate,
    eventDesc, eventType, participantType,
    male, female, mixed, assignTo) {
    console.log(payType)
    this.formError = false;
    if (eventName == "") {
      this.toastr.error("Event Name cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (eventLocation == "") {
      this.toastr.error("Event Location cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (eventDate == "") {
      this.toastr.error("Event Date cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (eventTime == "") {
      this.toastr.error("Event Time cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (payType == "") {
      this.toastr.error("Pay Type cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (payRate == "") {
      this.toastr.error("Pay Rate cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (eventDesc == "") {
      this.toastr.error("Event Description cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (eventType == "") {
      this.toastr.error("Please choose Event Type", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (participantType == "") {
      this.toastr.error("Please choose Participant Type", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (male == "" && (participantType == 3 || participantType == 1)) {
      this.toastr.error("Male participant number cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (female == "" && (participantType == 3 || participantType == 2)) {
      this.toastr.error("Female participant number cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (mixed == "" && participantType == 4) {
      this.toastr.error("Mixed pariticipant number cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (assignTo == "") {
      this.toastr.error("Please assign event to a staff", "", { timeOut: 3000 });
      this.formError = true;
    }

    if (!this.formError) {
      let eventForm = 'eventName=' + eventName +
        '&eventLocation=' + eventLocation +
        '&eventDate=' + eventDate +
        '&eventTime=' + eventTime +
        '&payType=' + payType +
        '&payRate=' + payRate +
        '&eventDesc=' + eventDesc +
        '&eventType=' + eventType +
        '&participantType=' + participantType +
        '&male=' + male +
        '&female=' + female +
        '&mixed=' + mixed +
        '&assignTo=' + assignTo +
        '&createdBy=' + this.createdBy
      this.service.createEvent(eventForm).subscribe(res => {
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
}
