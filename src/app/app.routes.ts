import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'scoreboard',
    loadComponent: () => import('./scoreboard/scoreboard.page').then( m => m.ScoreboardPage)
  },
  {
    path: 'permissions',
    loadComponent: () => import('./permissions/permissions.page').then( m => m.PermissionsPage)
  },
  {
    path: 'geolocation',
    loadComponent: () => import('./levels/geolocation/geolocation.page').then( m => m.GeolocationPage)
  },
  {
    path: 'distance',
    loadComponent: () => import('./levels/distance/distance.page').then( m => m.DistancePage)
  },
  {
    path: 'qr',
    loadComponent: () => import('./levels/qr/qr.page').then( m => m.QrPage)
  },
  {
    path: 'sensor',
    loadComponent: () => import('./levels/sensor/sensor.page').then( m => m.SensorPage)
  },
  {
    path: 'device-status',
    loadComponent: () => import('./levels/device-status/device-status.page').then( m => m.DeviceStatusPage)
  },
  {
    path: 'wlan',
    loadComponent: () => import('./levels/wlan/wlan.page').then( m => m.WlanPage)
  },
];
