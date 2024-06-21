import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { UserDetails } from '../../Models/user-details';
import { ProfileService } from '../../../Service/profile.service';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MaterialModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  userDetails: UserDetails;

  constructor(private profileService: ProfileService, private location: Location) {}

  ngOnInit(): void {
    this.userDetails = this.profileService.getUserDetailsFromSessionStorage();
    if (this.userDetails) {
      console.log(this.userDetails);
    } else {
      console.error('User details not available');
    }
  }

  goback() {
    this.location.back();
  }

}
