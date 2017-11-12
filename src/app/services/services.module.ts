import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import { Injectable } from '@angular/core';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ServicesModule {
  constructor(private http:Http,private router:Router) { }
  url = "https://transientservitor-backend.000webhostapp.com";
  // url="localhost/backendtransient";
  headers = new Headers();

  login(data) {
    localStorage.clear();
    let url = '{url}/login.php'
              .replace(/\{url\}/g, this.url)

    this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
     let params="username="+data.username+"&password="+data.password;         
    return this.http.post(url,params , {headers: this.headers}).map((res: Response) => {
      return res.json();
    });
  }

  register(data) {
    localStorage.clear();
    let url = '{url}/register.php'
              .replace(/\{url\}/g, this.url)

    this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
     let params=data;         
    return this.http.post(url,data , {headers: this.headers}).map((res: Response) => {
      return res.json();
    });
  }

  createEvent(data) {
    localStorage.clear();
    let url = '{url}/createEvent.php'
              .replace(/\{url\}/g, this.url)

    this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
     let params=data;         
    return this.http.post(url,params , {headers: this.headers}).map((res: Response) => {
      return res.json();
    });
  }

  getType() {
    let url = '{url}/type.php'
              .replace(/\{url\}/g, this.url)
         
    return this.http.get(url).map((res: Response) => {
      return res.json();
    });
  }

  getStaff(hotelId) {
    let url = '{url}/staff.php?hotelId={hotelId}'
              .replace(/\{url\}/g, this.url)
              .replace(/\{hotelId\}/g,hotelId)
    return this.http.get(url).map((res: Response) => {
      return res.json();
    });
  }

  getParticipantType() {
    let url = '{url}/getParticipantType.php'
              .replace(/\{url\}/g, this.url)
    return this.http.get(url).map((res: Response) => {
      return res.json();
    });
  }

  getEvent(datas) {
    let url = '{url}/getEvent.php?assignedTo={assignedTo}'
              .replace(/\{url\}/g, this.url)
              .replace(/\{assignedTo\}/g,datas)
    return this.http.get(url).map((res: Response) => {
      return res.json();
    });
  }
}
