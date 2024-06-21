import { Component, HostListener, OnInit } from '@angular/core';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MenuComponent } from './Components/menu/menu.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { Location } from '@angular/common';
import { Platform } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { App } from '@capacitor/app';
// import { AddDsrComponent } from './pages/add-dsr/add-dsr.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MaterialModule, HeaderComponent, FooterComponent, RouterOutlet, RouterModule, MenuComponent,ProfileComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'natural-angular-app';
constructor(private platform: Platform, private location: Location){
  this.initializeApp();
}

initializeApp(){
  this.platform.ready().then(() => {
    App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        // Navigate back in the web view history
        this.location.back();
      } else {
        // Show a confirmation dialog before exiting the app
        if (confirm('Are you sure you want to exit the app?')) {
          App.exitApp();
        }
      }
    });
  });
}
}
