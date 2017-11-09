import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { EventComponent } from './event/event.component';
import { StaffManagementComponent } from './staff-management/staff-management.component';
import { ApplicationComponent } from './application/application.component';
import { RatingComponent } from './rating/rating.component';
import { CreateeventComponent } from './createevent/createevent.component';
import { ManagestaffComponent } from './managestaff/managestaff.component';
import { ViewapplicationComponent } from './viewapplication/viewapplication.component';


const routes: Routes = [
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'event', component: EventComponent },
      { path: 'manage-event', component: CreateeventComponent },
      { path: 'staff-management', component: StaffManagementComponent },
      { path: 'manage-staff', component: ManagestaffComponent },
      { path: 'applications', component: ApplicationComponent },
      { path: 'view-application', component: ViewapplicationComponent },
      { path: 'rating', component: RatingComponent },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  exports: [
    RouterModule
  ],
})
export class HomeRoutingModule { }

