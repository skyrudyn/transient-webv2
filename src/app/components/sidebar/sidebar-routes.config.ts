import {  RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    // { path: 'dashboard', title: 'Dashboard',  icon: 'dashboard', class: '', allowedFor:'1' },
    // { path: 'dashboard', title: 'Dashboard',  icon: 'dashboard', class: '', allowedFor:'2' },
    // { path: 'dashboard-admin', title: 'Dashboard',  icon: 'dashboard', class: '', allowedFor:'3' },
    { path: 'staff-management', title: 'Staff Management',  icon:'supervisor_account', class: '', allowedFor:'1' },
    { path: 'event', title: 'Event',  icon:'event', class: '', allowedFor:'1' },
    { path: 'event', title: 'Event',  icon:'event', class: '', allowedFor:'2' },
    { path: 'event-history', title: 'Event History',  icon:'history', class: '', allowedFor:'1' },
    { path: 'event-history', title: 'Event History',  icon:'history', class: '', allowedFor:'2' },
    { path: 'hotelReg', title: 'Hotel Admins',  icon:'person', class: '', allowedFor:'3' },
    { path: 'applicantReg', title: 'Applicants',  icon:'person', class: '', allowedFor:'3' },
    { path: 'applications', title: 'Application Management',  icon:'insert_chart', class: '', allowedFor:'1' },
    { path: 'applications', title: 'Application Management',  icon:'insert_chart', class: '', allowedFor:'2' },
    { path: 'rating', title: 'Rating',  icon:'star rate', class: '', allowedFor: '1' },
    { path: 'rating', title: 'Rating',  icon:'star rate', class: '', allowedFor: '2' },
    { path: 'profile', title: 'My Profile',  icon:'person', class: '', allowedFor: '0' },
];
