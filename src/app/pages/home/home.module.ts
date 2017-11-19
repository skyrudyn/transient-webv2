import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '../../components/components.module';
import { HomeRoutingModule } from './home.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
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
import { EventHistoryComponent } from './event-history/event-history.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot(),
    ComponentsModule,
    HomeRoutingModule,
    RouterModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [
    HomeComponent, 
    DashboardComponent, 
    UserProfileComponent, 
    TableListComponent, 
    TypographyComponent, 
    IconsComponent, 
    MapsComponent, 
    NotificationsComponent, 
    UpgradeComponent, 
    EventComponent, 
    StaffManagementComponent, 
    ApplicationComponent, 
    RatingComponent, 
    CreateeventComponent, 
    ManagestaffComponent, 
    ViewapplicationComponent, 
    EventHistoryComponent,
  ]
})
export class HomeModule { }
