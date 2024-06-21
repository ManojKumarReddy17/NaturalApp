import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { HeaderComponent } from '../../Components/header/header.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { MaterialModule } from '../../material.module';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, LoginComponent,HeaderComponent,FooterComponent,MaterialModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


}

