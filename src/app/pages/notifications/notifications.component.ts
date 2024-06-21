import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationsService } from '../../../Service/notifications.service';
import { MaterialModule } from '../../material.module';
import { Subscription } from 'rxjs';
import { ProfileService } from '../../../Service/profile.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: any[] = [];
  userDetailsSubscription: Subscription;

  constructor(
    private notificationService: NotificationsService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.userDetailsSubscription = this.profileService.userDetails$.subscribe(
      userDetails => {
        if (userDetails) {
          const userId = userDetails.id;
          if (userId.startsWith('NDIS')) {
            // Fetch distributor notifications
            this.notificationService.getNotificationsByDistributorId(userId).subscribe(
              (data: any[]) => {
                this.notifications = data;
              },
              (error) => {
                console.error('Error fetching distributor notifications:', error);
              }
            );
          } else if (userId.startsWith('NEXE')) {
            // Fetch executive notifications
            this.notificationService.getNotificationsByExecutiveId(userId).subscribe(
              (data: any[]) => {
                this.notifications = data;
              },
              (error) => {
                console.error('Error fetching executive notifications:', error);
              }
            );
          }
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.userDetailsSubscription.unsubscribe();
  }
}
