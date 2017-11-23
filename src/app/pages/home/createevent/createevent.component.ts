import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicesModule } from '../../../services/services.module'
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  createdBy = sessionStorage.getItem('hotelId')
  params: any;
  today: any;
  forms: any;
  view: boolean = false;
  edit: boolean = false;
  ceform: FormGroup;
  eventId: any;
  constructor(private router: Router, private toastr: ToastrService,
    private service: ServicesModule, private routerParam: ActivatedRoute,
    private fb: FormBuilder) {
    this.ceform = fb.group({
      'eventName': [null, Validators.required],
      'eventLocation': [null, Validators.required],
      'eventDate': [null, Validators.required],
      'eventTime': [null, Validators.required],
      'payType': [null, Validators.required],
      'payRate': [null, Validators.required],
      'eventDesc': [null, Validators.required],
      'eventType': [null, Validators.required],
      'participantType': [null, Validators.required],
      'male': [null, Validators.required],
      'female': [null, Validators.required],
      'mixed': [null, Validators.required],
      'assignedTo': [null, Validators.required],
      'eventPublishDate': [null, Validators.required],
      'eventCloseDate': [null, Validators.required]
    });
  }


  ngOnInit() {
    if (sessionStorage.getItem('LoggedIn') == '1') {
      let self = this;
      this.service.getType().subscribe(res => {
        self.eventTypes = res;
      })
      this.service.getStaff(sessionStorage.getItem('hotelId')).subscribe(res => {
        this.staff = res
      })
      this.service.getParticipantType().subscribe(res => {
        this.participantTypes = res;
      })

      this.today = new Date().toJSON().split('T')[0];
    } else {
      this.router.navigate(['/login'])
    }
    
    if (sessionStorage.getItem('eventId') == 'null') {
      this.view = true;
      
    } else if(sessionStorage.getItem('eventId') !== 'null'){
      this.eventId = sessionStorage.getItem('eventId');
      this.view = false;
      let self = this;
      this.service.viewEvent(sessionStorage.getItem('eventId')).subscribe(res => {
        self.forms = res;
        self.forms.forEach(element => {
          self.ceform.get('eventName').patchValue(element.eventName)
          self.ceform.get('eventLocation').patchValue(element.eventLocation)
          self.ceform.get('eventDate').patchValue(element.eventDate)
          self.ceform.get('eventTime').patchValue(element.eventTime)
          self.ceform.get('payType').patchValue(element.payType)
          self.ceform.get('payRate').patchValue(element.payRate)
          self.ceform.get('eventDesc').patchValue(element.eventDesc)
          self.ceform.get('eventType').patchValue(element.eventType)
          self.ceform.get('participantType').patchValue(element.participantType)
          self.change(element.participantType);
          self.ceform.get('male').patchValue(element.male)
          self.ceform.get('female').patchValue(element.female)
          self.ceform.get('mixed').patchValue(element.mixed)
          self.ceform.get('assignedTo').patchValue(element.assignedTo)
          self.ceform.get('eventPublishDate').patchValue(element.eventPublishDate)
          self.ceform.get('eventCloseDate').patchValue(element.eventCloseDate)
        });
        self.ceform.disable();
      })
    }


  }

  goBack() {
    this.router.navigate(['/home/event'])
  }
  enableEdit() {
    this.edit = true;
    this.ceform.enable();
    this.toastr.info("Event is editable");
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
  create(cefrom, i) {
    console.log("logging",cefrom);
    this.formError = false;
    if (cefrom.eventName == null) {
      this.toastr.error("Event Name cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (cefrom.eventLocation == null) {
      this.toastr.error("Event Location cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (cefrom.eventDate == null) {
      this.toastr.error("Event Date cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (cefrom.eventTime == null) {
      this.toastr.error("Event Time cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (cefrom.payType == null) {
      this.toastr.error("Pay Type cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (cefrom.payRate ==null) {
      this.toastr.error("Pay Rate cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (cefrom.eventDesc == null) {
      this.toastr.error("Event Description cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (cefrom.eventType == null) {
      this.toastr.error("Please choose Event Type", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (cefrom.participantType == null) {
      this.toastr.error("Please choose Participant Type", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (cefrom.male == null && (cefrom.participantType == 3 || cefrom.participantType == 1)) {
      this.toastr.error("Male participant number cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (cefrom.female == null && (cefrom.participantType == 3 || cefrom.participantType == 2)) {
      this.toastr.error("Female participant number cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (cefrom.mixed == null && cefrom.participantType == 4) {
      this.toastr.error("Mixed pariticipant number cannot be empty", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (cefrom.assignedTo == null) {
      this.toastr.error("Please assign event to a staff", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (cefrom.eventPublishDate == null) {
      this.toastr.error("Please set Event Publish Date", "", { timeOut: 3000 });
      this.formError = true;
    }
    if (cefrom.eventCloseDate == null) {
      this.toastr.error("Please set Event Close Date", "", { timeOut: 3000 });
      this.formError = true;
    }

    if (!this.formError && i == 1) {
      let eventForm = 'eventName=' + cefrom.eventName +
        '&eventLocation=' + cefrom.eventLocation +
        '&eventDate=' + cefrom.eventDate +
        '&eventTime=' + cefrom.eventTime +
        '&payType=' + cefrom.payType +
        '&payRate=' + cefrom.payRate +
        '&eventDesc=' + cefrom.eventDesc +
        '&eventType=' + cefrom.eventType +
        '&participantType=' + cefrom.participantType +
        '&male=' + cefrom.male +
        '&female=' + cefrom.female +
        '&mixed=' + cefrom.mixed +
        '&assignTo=' + cefrom.assignedTo +
        '&eventPublishDate=' + cefrom.eventPublishDate +
        '&eventCloseDate=' + cefrom.eventCloseDate +
        '&createdBy=' + this.createdBy
        let self=this
      this.service.createEvent(eventForm).subscribe(res => {
        if (res.successful) {
          this.toastr.success(res.message, "", { timeOut: 3000 })
          self.router.navigate(['/home/event']);
        } else {
          this.toastr.error(res.error, "", { timeOut: 3000 })
        }
      }, error => {
        this.toastr.error("Service temporarily not available...", "", { timeOut: 3000 })
      })
    } else if (!this.formError && i == 2) {
      let updateForm = 'eventName=' + cefrom.eventName +
        '&eventLocation=' + cefrom.eventLocation +
        '&eventDate=' + cefrom.eventDate +
        '&eventTime=' + cefrom.eventTime +
        '&payType=' + cefrom.payType +
        '&payRate=' + cefrom.payRate +
        '&eventDesc=' + cefrom.eventDesc +
        '&eventType=' + cefrom.eventType +
        '&participantType=' + cefrom.participantType +
        '&male=' + cefrom.male +
        '&female=' + cefrom.female +
        '&mixed=' + cefrom.mixed +
        '&assignTo=' + cefrom.assignedTo +
        '&eventPublishDate=' + cefrom.eventPublishDate +
        '&eventCloseDate=' + cefrom.eventCloseDate +
        '&createdBy=' + this.createdBy +
        '&eventId=' + this.eventId;
        let self=this
      this.service.updateEvent(updateForm).subscribe(res => {
        if (res.successful) {
          this.toastr.success(res.message, "", { timeOut: 3000 })
          self.router.navigate(['/home/event']);
        } else {
          this.toastr.error(res.error, "", { timeOut: 3000 })
        }
      }, error => {
        this.toastr.error("Service temporarily not available...", "", { timeOut: 3000 })
      })
    }else{
      this.toastr.error("Form input error", "", { timeOut: 3000 })
    
    }
    // } else {
    //   this.formError = false;
    //   if (eventName == "") {
    //     this.toastr.error("Event Name cannot be empty", "", { timeOut: 3000 });
    //     this.formError = true;
    //   }
    //   if (eventLocation == "") {
    //     this.toastr.error("Event Location cannot be empty", "", { timeOut: 3000 });
    //     this.formError = true;
    //   }
    //   if (eventDate == "") {
    //     this.toastr.error("Event Date cannot be empty", "", { timeOut: 3000 });
    //     this.formError = true;
    //   }
    //   if (eventTime == "") {
    //     this.toastr.error("Event Time cannot be empty", "", { timeOut: 3000 });
    //     this.formError = true;
    //   }
    //   if (payType == "") {
    //     this.toastr.error("Pay Type cannot be empty", "", { timeOut: 3000 });
    //     this.formError = true;
    //   }
    //   if (payRate == "") {
    //     this.toastr.error("Pay Rate cannot be empty", "", { timeOut: 3000 });
    //     this.formError = true;
    //   }
    //   if (eventDesc == "") {
    //     this.toastr.error("Event Description cannot be empty", "", { timeOut: 3000 });
    //     this.formError = true;
    //   }
    //   if (eventType == "") {
    //     this.toastr.error("Please choose Event Type", "", { timeOut: 3000 });
    //     this.formError = true;
    //   }
    //   if (participantType == "") {
    //     this.toastr.error("Please choose Participant Type", "", { timeOut: 3000 });
    //     this.formError = true;
    //   }
    //   if (male == "" && (participantType == 3 || participantType == 1)) {
    //     this.toastr.error("Male participant number cannot be empty", "", { timeOut: 3000 });
    //     this.formError = true;
    //   }
    //   if (female == "" && (participantType == 3 || participantType == 2)) {
    //     this.toastr.error("Female participant number cannot be empty", "", { timeOut: 3000 });
    //     this.formError = true;
    //   }
    //   if (mixed == "" && participantType == 4) {
    //     this.toastr.error("Mixed pariticipant number cannot be empty", "", { timeOut: 3000 });
    //     this.formError = true;
    //   }
    //   if (assignTo == "") {
    //     this.toastr.error("Please assign event to a staff", "", { timeOut: 3000 });
    //     this.formError = true;
    //   }

    //   if (!this.formError) {
    //     let updateForm = 'eventName=' + eventName +
    //       '&eventLocation=' + eventLocation +
    //       '&eventDate=' + eventDate +
    //       '&eventTime=' + eventTime +
    //       '&payType=' + payType +
    //       '&payRate=' + payRate +
    //       '&eventDesc=' + eventDesc +
    //       '&eventType=' + eventType +
    //       '&participantType=' + participantType +
    //       '&male=' + male +
    //       '&female=' + female +
    //       '&mixed=' + mixed +
    //       '&assignTo=' + assignTo +
    //       '&createdBy=' + this.createdBy +
    //       '&eventId=' + localStorage.getItem('eventId');
    //     this.service.updateEvent(updateForm).subscribe(res => {
    //       if (res.successful) {
    //         this.toastr.success(res.message, "", { timeOut: 3000 })
    //         this.router.navigate(['/home/event']);
    //       } else {
    //         this.toastr.error(res.error, "", { timeOut: 3000 })
    //       }
    //     }, error => {
    //       this.toastr.error("Service temporarily not available...", "", { timeOut: 3000 })
    //     })
    //   }
    // }
  }

}
