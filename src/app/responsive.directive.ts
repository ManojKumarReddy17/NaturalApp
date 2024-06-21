import { Directive, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'; 

@Directive({
  selector: '[appResponsive]',
  standalone: true
})
export class ResponsiveDirective implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.subscription = this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Web,
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
