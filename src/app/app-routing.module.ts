import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'ppc',
    loadChildren: () => import('./pages/ppc/ppc.module').then( m => m.PpcPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'social',
    loadChildren: () => import('./pages/social/social.module').then( m => m.SocialPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'instagram',
    loadChildren: () => import('./pages/social/instagram/instagram.module').then( m => m.InstagramPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'seo',
    loadChildren: () => import('./pages/seo/seo.module').then( m => m.SeoPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'call-tracking',
    loadChildren: () => import('./pages/call-tracking/call-tracking.module').then( m => m.CallTrackingPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'google-analytics',
    loadChildren: () => import('./pages/google-analytics/google-analytics.module').then( m => m.GoogleAnalyticsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'report-view/:action/:id',
    loadChildren: () => import('./pages/report-view/report-view.module').then( m => m.ReportViewPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./pages/user-profile/user-profile.module').then( m => m.UserProfilePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'user-details',
    loadChildren: () => import('./pages/user-details/user-details.module').then( m => m.UserDetailsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'google-ads',
    loadChildren: () => import('./pages/google-ads/google-ads.module').then( m => m.GoogleAdsPageModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
