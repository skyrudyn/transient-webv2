import { Component, OnInit } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(public location: Location, public router: Router) {}

  ngOnInit() {
    if (this.location.path() == '/home') {
      console.log(this.location.path())
      this.router.navigate(['/home/dashboard']);
    }else if(this.location.path() == 'login' || this.location.path() == ''){
      this.router.navigate(['/login'])
      console.log(this.location.path())
    }
  }

}
