import { Component, OnInit } from '@angular/core';
import { ServicesModule } from '../../../services/services.module';
import { Router } from '@angular/router'
import { error } from 'selenium-webdriver';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  constructor(private service: ServicesModule, private router: Router) { }
  applications: any;
  sortedApplication: any = [];
  ngOnInit() {
    this.getApplication();
  }


  getApplication() {
    if (sessionStorage.getItem('hotelId') == null) {
      let data = 0;
      this.service.getApplication(data).subscribe(res => {
        if (res.succesfull) {
          this.applications = res.response;
          this.sort()
        } else {
          this.applications = null
        }
      })
    } else {
      let data = sessionStorage.getItem('hotelId');
      this.service.getApplication(data).subscribe(res => {
        if (res.succesfull) {
          this.applications = res.response;
          this.sort()
        } else {
          this.applications = null
        }
      })
    }
  }

  sort() {
  }

  viewApplication(application) {
    localStorage.setItem('applicationId', application.Id)
    localStorage.setItem('applicantId', application.applicantId)
    this.router.navigate(['/home/view-application']);
  }
}
