import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SocialsComponent } from './components/socials/socials.component';
import { LoginTwitchComponent } from './components/login-twitch/login-twitch.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { HomePromoComponent } from './components/home/home-promo/home-promo.component';
import { HomeHeaderComponent } from './components/home/home-header/home-header.component';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatDividerModule } from '@angular/material/divider';
import { DashboardContentComponent } from './components/dashboard/dashboard-content/dashboard-content.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginTwitchComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    HomePromoComponent,
    HomeHeaderComponent,
    AboutComponent,
    PageHeaderComponent,
    DashboardComponent,
    PageNotFoundComponent,
    SocialsComponent,
    DashboardContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatChipsModule,
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
