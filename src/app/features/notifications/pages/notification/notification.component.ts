import {Component, inject, OnInit} from '@angular/core';
import {PageLayoutComponent} from '@core/layouts';
import {NotificationService} from '@features/notifications/services/notification/notification.service';

@Component({
  selector: 'app-notification',
  imports: [
    PageLayoutComponent
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit{
    private readonly notificationService = inject(NotificationService);

    ngOnInit(): void {
        console.log("Method not implemented.");
    }
}
