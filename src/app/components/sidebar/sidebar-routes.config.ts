import {  RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard',  icon: 'dashboard', class: '', allowedFor:'4' },
    { path: 'dashboard-admin', title: 'Dashboard',  icon: 'dashboard', class: '', allowedFor:'3' },
    { path: 'event', title: 'Event',  icon:'event', class: '', allowedFor:'4' },
    { path: 'event-history', title: 'Event History',  icon:'history', class: '', allowedFor:'4' },
    { path: 'staff-management', title: 'Staff Management',  icon:'person', class: '', allowedFor:'1' },
    { path: 'hotelReg', title: 'Hotel Admins',  icon:'person', class: '', allowedFor:'3' },
    { path: 'applicantReg', title: 'Applicants',  icon:'person', class: '', allowedFor:'3' },
    { path: 'applications', title: 'Application Management',  icon:'insert_chart', class: '', allowedFor:'4' },
    { path: 'rating', title: 'Rating',  icon:'star rate', class: '', allowedFor: '4' },
];
