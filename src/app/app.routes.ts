import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './Components/menu/menu.component';
import { Routes } from '@angular/router';
import { ContentComponent } from './pages/content/content.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { AddDsrComponent } from './pages/add-dsr/add-dsr.component';
import { RetailorDetailsComponent } from './pages/retailor-details/retailor-details.component';
import { ProductsComponent } from './Components/products/products.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ReviewComponent } from './pages/review/review.component';
import { ProductViewComponent } from './pages/product-view/product-view.component';
import { EditDsrComponent } from './pages/edit-dsr/edit-dsr.component';
import { OrderformEditComponent } from './pages/order-form-edit/order-form-edit.component';



export const routes: Routes = 
[
    { path: '', component: ProductsComponent },
    { path: 'Home', component: HomeComponent },
    { path: 'Login', component: LoginComponent },
    { path: 'Profile', component: ProfileComponent },
    {
        path: 'Menu',
        component: MenuComponent,
        children: 
        [
          { path: '', component: ContentComponent },
          { path: 'CreateDSR/:id', component: AddDsrComponent },
          {path:'Productview',component:ProductViewComponent}, 
          {path:'notifications',component:NotificationsComponent},
          {path:'Reports',component:ReportsComponent},
        ]
      },     
    { path: 'RetailorDetails', component: RetailorDetailsComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'products/Home', component: HomeComponent },
    { path: 'CreateDSR/:id/Review', component: ReviewComponent },
    {path:'Productview',component:ProductViewComponent},
    {path:'Edit',component:EditDsrComponent},
    { path:'Edit/:id/Orderform', component:OrderformEditComponent},

];


