import { Component, ElementRef, ViewChild } from '@angular/core';
import { DistributorService } from '../../../Service/distributor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ExecutiveService } from '../../../Service/executive.service';
import { HeaderComponent } from '../../Components/header/header.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { UserDetails } from '../../Models/user-details';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfileService } from '../../../Service/profile.service';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, FormsModule, HeaderComponent, FooterComponent, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @ViewChild('Username')
  userName!: ElementRef;

  userDetails: UserDetails;
  name: any;
  public showPassword: boolean = false;
  isSubmitting: boolean = false; // New variable to track form submission

  invalidCredentials: boolean = false;

  constructor(
    private distributorService: DistributorService,
    private route: ActivatedRoute,
    private executiveService: ExecutiveService,
    private profileService: ProfileService,
    private router: Router
  ) {
    route.queryParams.subscribe((x: any) => this.name = x.name);
  }

  onSubmit(userdetails: NgForm) {
    this.isSubmitting = true; 
    if (this.name === 'DISTRIBUTOR') {
      this.distributorService.getData(userdetails.value).subscribe({
        next: (userdetails) => {
          this.handleLogin(userdetails, 'DISTRIBUTOR');
          this.isSubmitting = false; 
        },
        error: (err) => {
          this.handleLoginError();
          this.isSubmitting = false; 
        }
      });
    } else if (this.name === 'EXECUTIVE') {
      this.executiveService.getData(userdetails.value).subscribe({
        next: (userdetails) => {
          this.handleLogin(userdetails, 'EXECUTIVE');
          this.isSubmitting = false; 
        },
        error: (err) => {
          this.handleLoginError();
          this.isSubmitting = false;
        }
      });
    }
  }

  handleLogin(userdetails: UserDetails, role: string) {
    this.userDetails = userdetails;
    this.profileService.setUserDetails(this.userDetails);
    console.log(this.userDetails);
    if (role === 'DISTRIBUTOR') {
      this.distributorService.saveDistributordetails(this.userDetails);
      this.router.navigate(['/Menu'],);
    } else if (role === 'EXECUTIVE') {
      this.router.navigate(['/Menu'],);
    }
  }

  handleLoginError() {
    this.invalidCredentials = true;
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  closePopupWindow() {
    this.invalidCredentials = false;
  }

}
