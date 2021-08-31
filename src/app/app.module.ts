import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './modules/login/login.module';
import { HomeModule } from './modules/home/home.module';
import { RegistrationModule } from './modules/registration/registration.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { ProfileModule } from './modules/profile/profile.module';
import { PostPageModule } from './modules/post-page/post-page.module';
import { AddTokenInterceptor } from './shared/interceptors/http.interceptor';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { ProfileSettingsModule } from './modules/profile-settings/profile-settings.module';
import { CreatePostModule } from './modules/create-post/create-post.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { FollowModule } from './modules/follow/follow.module';
import { SearchPageModule } from './modules/search-page/search-page.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    LoginModule,
    HomeModule,
    RegistrationModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BackofficeModule,
    ProfileModule,
    PostPageModule,
    FavoritesModule,
    ProfileSettingsModule,
    CreatePostModule,
    CampaignsModule,
    FollowModule,
    SearchPageModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
