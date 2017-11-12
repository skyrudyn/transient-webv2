import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar-routes.config';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;

    constructor(location: Location,private router:Router) {
      this.location = location;
    }

    ngOnInit(){
      this.listTitles = ROUTES.filter(listTitle => listTitle);
    }

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 2 );
      }
      titlee = titlee.split('/').pop();
      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return '';
    }

    logout(){
      console.log("logout clicked")
      localStorage.clear()
      this.router.navigate(['/login'])
    }
}
