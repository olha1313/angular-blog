import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() delay = 5000;

  public text = '';
  public type = 'success';

  private alertSubscription!: Subscription;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertSubscription = this.alertService.alert$.subscribe(alert => {
      this.text = alert.text;
      this.type = alert.type;

      const timeout = setTimeout(() => {
        clearTimeout(timeout)
        this.text = '';
      }, this.delay)
    })
  }

  ngOnDestroy(): void {
   if (this.alertSubscription) {
     this.alertSubscription.unsubscribe();
   }
  }
}
