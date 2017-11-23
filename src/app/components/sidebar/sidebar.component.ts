import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';

declare var $:any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  displayText:any;
  constructor() { }

  ngOnInit() {
    $.getScript('../../assets/js/sidebar-moving-tab.js');
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.displayText = sessionStorage.getItem('hotelName');
    let user =  sessionStorage.getItem('user');
    console.log(user)
  }

}
