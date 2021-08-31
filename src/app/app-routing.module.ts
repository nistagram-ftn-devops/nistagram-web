import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: 'backoffice',
    loadChildren: () => import('./modules/backoffice/backoffice.module').then(m => m.BackofficeModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./modules/post-page/post-page.module').then(m => m.PostPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./modules/favorites/favorites.module').then(m => m.FavoritesModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./modules/profile-settings/profile-settings.module').then(m => m.ProfileSettingsModule)
  },
  {
    path: 'create-post',
    loadChildren: () => import('./modules/create-post/create-post.module').then(m => m.CreatePostModule)
  },
  {
    path: 'campaigns',
    loadChildren: () => import('./modules/campaigns/campaigns.module').then(m => m.CampaignsModule)
  },
  {
    path: 'follow',
    loadChildren: () => import('./modules/follow/follow.module').then(m => m.FollowModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./modules/search-page/search-page.module').then(m => m.SearchPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
