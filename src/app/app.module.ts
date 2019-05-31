import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginTwitchComponent } from './components/login-twitch/login-twitch.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FooterComponent } from './components/footer/footer.component';
import { HomePromoComponent } from './components/home/home-promo/home-promo.component';
import { HomeHeaderComponent } from './components/home/home-header/home-header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginTwitchComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    HomePromoComponent,
    HomeHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
