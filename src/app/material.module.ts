import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { PortalModule } from '@angular/cdk/portal';
import { RouterModule, RouterOutlet } from '@angular/router';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { MatToolbar } from '@angular/material/toolbar';
import { DatePipe } from '@angular/common';

import {MatBadgeModule} from '@angular/material/badge';
import { MatSidenav } from '@angular/material/sidenav';

@NgModule({
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatLabel,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    MatMenuModule,
    PortalModule,
    MatButtonModule,
    RouterOutlet, RouterModule,
    MatDatepickerModule,
    CdkMenu,
    CdkMenuItem,
    CdkMenuTrigger,
    MatToolbar,
    MatSidenav ,
    DatePipe,   


   ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    MatMenuModule,
    PortalModule,
    MatDatepickerModule,
    CdkMenu,
    CdkMenuItem,
    CdkMenuTrigger,
    MatToolbar,
    MatSidenav,
    DatePipe,
    MatBadgeModule
  ]
})
export class MaterialModule { }