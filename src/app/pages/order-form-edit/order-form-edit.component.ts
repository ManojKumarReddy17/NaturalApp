
  
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { Product } from '../../Models/product';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ResponsiveDirective } from '../../responsive.directive';
import { ProductService } from '../../../Service/product.service';
import { Observer } from 'rxjs';
import { ProductDetails } from '../../Models/product-details';
import { DsrService } from '../../../Service/dsr.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../Store/appstate';
import { AutherizationService } from '../../../Service/autherization.service';
import { UserDetails } from '../../Models/user-details';
import { ProfileService } from '../../../Service/profile.service';
import { updatedProducts } from '../../../Store/actions';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-order-form-edit',
  standalone: true,
  imports: [MaterialModule, RouterModule, ResponsiveDirective, MatTableModule],
  templateUrl: './order-form-edit.component.html',
  styleUrl: './order-form-edit.component.scss'
})
export class OrderformEditComponent implements OnInit {

  productdetails: Product[] = [];
  displayedColumns = ['ProductID', 'ProductName', 'Category', 'Quantity', 'Price', 'Subtotal'];
  dataSource = new MatTableDataSource<Product>();
  subtotal: number;
  selectedProducts: Product[] = [];

  selectedRetailer: any;
  selectedArea: string | undefined;
  selectedDate: Date;
  UpdatedProducts: ProductDetails = new ProductDetails();
  id: string;
  role: string;
  exeId: string;
  dsr: any;
  successMessage: string;

  constructor(
    private productService: ProductService,
    private activeRoute: ActivatedRoute,
    private authService: AutherizationService,
    private location: Location,
    private dsrService: DsrService,
    private store: Store<AppState>,
    private userDetailsService: ProfileService,
    private snackBar: MatSnackBar, // Inject MatSnackBar
    private router: Router // Inject Router
  ) {
    this.dataSource = new MatTableDataSource<Product>();
    const products = JSON.parse(sessionStorage.getItem('productDetails'));
    this.dataSource.data = products;
    this.selectedDate = JSON.parse(sessionStorage.getItem('selectedDateValue'));
    const retailor = JSON.parse(sessionStorage.getItem('selectedRetailor'));
    this.selectedArea = retailor.area;
    this.selectedRetailer = retailor.firstName + ' ' + retailor.lastName;
  }

  ngOnInit(): void {
    const userinfo = JSON.parse(sessionStorage.getItem('userDetails'));
    if(userinfo.id.startsWith('NDIS')){
      this.id = userinfo.id;
      this.role = 'distributor';
    }
    else if(userinfo.id.startsWith('NEXE')){
      this.id= userinfo.id;
      this.role = 'executive';
    }

    this.userDetailsService.getUserDetails().subscribe((userDetails: UserDetails) => {
      this.exeId = userDetails.exeId;  
    });

    this.productService.getdetails.subscribe((productdetail: Product[]) => {
      this.productdetails = productdetail;
      this.dataSource.data = this.productdetails;
    });
  }

  calculateSubtotal(product: Product, newQuantity: string) {
    product.subtotal = product.price * parseFloat(newQuantity);
  }

  calculatetotal(): number {
    let total = 0;
    this.dataSource.data.forEach(product => {
      total += product.subtotal || 0;
    });
    return total;
  }

  goback() {
    this.selectedProducts.forEach(product => {
      product.total = product.quantity * product.price;
    });

    console.log(this.selectedProducts);
    this.location.back();
  }

  submit() {
    this.UpdatedProducts.product = [];
    const retailor = JSON.parse(sessionStorage.getItem('selectedRetailor'));
    const selectedDate = JSON.parse(sessionStorage.getItem('selectedDateValue'));
    const disIdAndexeId = JSON.parse(sessionStorage.getItem('userDetails'));
    const dsrId = JSON.parse(sessionStorage.getItem('infoButtonClickSubject'));

    this.productdetails.forEach(data => {
      if (!data.dsr) {
        console.warn(`Product ${data.id} is missing dsr value.`);
      }
      this.UpdatedProducts.product.push({
        product: data.id,
        price: data.price,
        quantity: data.quantity,
        dsr: dsrId.id
      });
    });
    if(this.id.startsWith('NDIS')){
      this.UpdatedProducts.distributor = disIdAndexeId.id;
    this.UpdatedProducts.dsr = dsrId.id;
    this.UpdatedProducts.executive = disIdAndexeId.exeId;
    this.UpdatedProducts.retailor = retailor.id;
    this.UpdatedProducts.orderBy = disIdAndexeId.id;
    }
    if(this.id.startsWith('NEXE')){
      this.UpdatedProducts.executive = disIdAndexeId.id;
      this.UpdatedProducts.dsr = dsrId.id;
      this.UpdatedProducts.distributor = retailor.distributor;
      this.UpdatedProducts.retailor = retailor.id;
    this.UpdatedProducts.orderBy = disIdAndexeId.id;
    }
    
    this.UpdatedProducts.createdDate = selectedDate;
    this.UpdatedProducts.totalAmount = this.calculatetotal();

    console.log('Final payload to be sent:', this.UpdatedProducts);

    const observer: Observer<ProductDetails> = {
      next: (response) => {
        console.log('Product edited successfully:', response);
        const snackBarRef = this.snackBar.open('Product edited successfully', 'Close', {
          duration: 5000, // Duration for the snackbar to be visible
        });

        snackBarRef.onAction().subscribe(() => {
          this.closePopup();
        });
      },
      error: (error) => {
        console.error('Error editing product:', error);
        if (error.error && error.error.errors) {
          console.error('Validation errors:', error.error.errors);
        }
      },
      complete: () => {
        console.log('Product editing completed.');
      }
    };

    this.dsrService.editProduct(this.UpdatedProducts).subscribe(observer);
  }

  closePopup() {
    this.router.navigate(['/Menu']);
  }
}

