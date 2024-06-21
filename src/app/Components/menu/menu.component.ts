import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { ContentComponent } from '../../pages/content/content.component';
import { ActivatedRoute, RouterModule, RouterOutlet, Router } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { ProductsComponent } from '../products/products.component';
import { MatDialog } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenav } from '@angular/material/sidenav';
import { UserDetails } from '../../Models/user-details';
import { ProfileService } from '../../../Service/profile.service';
import { NotificationsService } from '../../../Service/notifications.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MaterialModule, ContentComponent, RouterModule, RouterOutlet, ProfileComponent, ProductsComponent, MatBadgeModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  userName: any;
  userDetails: UserDetails;
  showLogoutPopup: boolean = false;
  distributorNotificationsCount: number;
  executiveNotificationsCount: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private profileService: ProfileService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params: any) => {
      this.userName = params.UserName;
    });

    this.userDetails = this.profileService.getUserDetailsFromSessionStorage();
    if (this.userDetails) {
      console.log('User Details:', this.userDetails);
      console.log('User Role:', this.userDetails.executives);
      this.fetchNotificationsCounts();
    } else {
      console.error('User details not available');
    }
  }

  fetchNotificationsCounts(): void {
    if (this.userDetails.id.startsWith('NDIS')) {
      this.notificationsService.getNotificationsByDistributorId(this.userDetails.id)
        .subscribe(data => {
          this.distributorNotificationsCount = data.length;
        });
    } else if (this.userDetails.id.startsWith('NEXE')) {
      this.notificationsService.getNotificationsByExecutiveId(this.userDetails.id)
        .subscribe(data => {
          this.executiveNotificationsCount = data.length;
        });
    }
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  openLogoutPopup() {
    this.showLogoutPopup = true;
  }

  closeLogoutPopup() {
    this.showLogoutPopup = false;
  }

  logout() {
    this.router.navigate(['/products'])
  }
}