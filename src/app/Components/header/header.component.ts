import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  onSubmit() {
    alert('Login Sucess Full');
  }
}




