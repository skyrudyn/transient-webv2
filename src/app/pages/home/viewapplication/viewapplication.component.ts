import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesModule } from '../../../services/services.module'
@Component({
  selector: 'app-viewapplication',
  templateUrl: './viewapplication.component.html',
  styleUrls: ['./viewapplication.component.css']
})
export class ViewapplicationComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute,
    private service: ServicesModule) { }
  applicantDetails: any;
  jobDetails: any;
  eventTypes: any;
  ngOnInit() {
    this.service.getType().subscribe(res => {
      if (res.successful) {
        this.eventTypes = res.response;
      } else {
        this.eventTypes = null
      }
    })
    this.service.getApplicantById(localStorage.getItem('applicantId')).subscribe(res => {
      if (res.successful) {
        this.applicantDetails = res;
        this.service.getApplicationById(localStorage.getItem('applicationId')).subscribe(res => {
          if (res.successful) {
            this.jobDetails = res.response;
          } else {
            this.jobDetails = null
          }
        })
      } else {
        this.applicantDetails = null
      }
    })

  }

  approve() {
    this.service.respondApplication(true, localStorage.getItem('applicationId')).subscribe(res => {
    })
  }
  reject() {
    this.service.respondApplication(false, localStorage.getItem('applicationId')).subscribe(res => {
    })
  }
}
