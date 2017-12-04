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
  // url = "https://transientservitor-backend.000webhostapp.com";
  // url = "https://banquetsservitor.pagekite.me/backendtransient";
  url ="https://472aedf7.ngrok.io/backendtransient";
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

  loginAdmin(data) {
    localStorage.clear();
    let url = '{url}/loginAdmin.php'
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

  updateEvent(data) {
    localStorage.clear();
    let url = '{url}/updateEvent.php'
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
    let url = '{url}/getEvent.php?createdBy={createdBy}'
              .replace(/\{url\}/g, this.url)
              .replace(/\{createdBy\}/g,datas)
    return this.http.get(url).map((res: Response) => {
      return res.json();
    });
  }

  getEventHistory(datas) {
    let url = '{url}/eventHistory.php?createdBy={createdBy}'
              .replace(/\{url\}/g, this.url)
              .replace(/\{createdBy\}/g,datas)
    return this.http.get(url).map((res: Response) => {
      return res.json();
    });
  }

  viewEvent(eventId){
    let url = '{url}/viewEvent.php?eventId={eventId}'
              .replace(/\{url\}/g, this.url)
              .replace(/\{eventId\}/g,eventId)
    return this.http.get(url).map((res: Response) => {
       return res.json(); 
    })
    
  }

  editStaff(staffId){
    let url = '{url}/editStaff.php?staffId={staffId}'
              .replace(/\{url\}/g, this.url)
              .replace(/\{staffId\}/g,staffId)

    return this.http.get(url).map((res:Response)=>{
        return res.json();
    })
  }

  updateStaff(data) {
    let url = '{url}/updateStaff.php'
              .replace(/\{url\}/g, this.url)

    this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
     let params=data;         
    return this.http.post(url,params , {headers: this.headers}).map((res: Response) => {
      return res.json();
    });
  }

  archiveEvent(data) {
    let url = '{url}/archiveEvent.php'
              .replace(/\{url\}/g, this.url)

    this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
     let params=data;         
    return this.http.post(url,params , {headers: this.headers}).map((res: Response) => {
      return res.json();
    });
  }

  getProfile(usertype,id) {
    let url = '{url}/getProfile.php?usertype={usertype}&id={id}'
              .replace(/\{url\}/g, this.url)
              .replace(/\{usertype\}/g, usertype)
              .replace(/\{id\}/g, id)
         
    return this.http.get(url).map((res: Response) => {
      return res.json();
    });
  }

  updateProfile(data) {
    let url = '{url}/updateProfile.php'
              .replace(/\{url\}/g, this.url)

    this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
     let params=data;         
    return this.http.post(url,params , {headers: this.headers}).map((res: Response) => {
      return res.json();
    });
  }

}
