import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { Product } from '../../Models/product';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ResponsiveDirective } from '../../responsive.directive';
import { ProductService } from '../../../Service/product.service';
import { Observer } from 'rxjs';
import { ProductDetails } from '../../Models/product-details';
import { DsrService } from '../../../Service/dsr.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../Store/appstate';
import { AutherizationService } from '../../../Service/autherization.service';
import { UserDetails } from '../../Models/user-details';
import { DistributorService } from '../../../Service/distributor.service';
import { ProfileService } from '../../../Service/profile.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [MaterialModule, RouterModule, ResponsiveDirective, MatTableModule],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  productdetails: Product[] = [];
  displayedColumns = ['ProductID', 'ProductName', 'Category', 'Quantity', 'Price', 'Subtotal'];
  dataSource = new MatTableDataSource<Product>();
  subtotal: number;
  selectedProducts: Product[] = [];
  selectedRetailer: any;
  selectedArea: string | undefined;
  selectedDate: Date = new Date();
  UpdatedProducts: ProductDetails = new ProductDetails();
  id: string;
  role: string;
  exeId: string;
  successMessage: string;

  constructor(
    private productService: ProductService,
    private activeRoute: ActivatedRoute,

    private authService: AutherizationService,
    private location: Location,
    private dsrService: DsrService,
    private store: Store<AppState>,
    private userDetailsService: ProfileService 
  ) {
    this.activeRoute.queryParams.subscribe((params: any) => {
      this.selectedRetailer = params.retailer ? JSON.parse(params.retailer) : {};
      this.selectedArea = params.area;
      this.selectedDate = params.date ? new Date(params.date) : new Date();
      this.selectedProducts = params.products ? JSON.parse(params.products) : [];
      this.dataSource.data = this.selectedProducts;
    });
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.id = params.get('id');

      if (this.id.startsWith('NDIS')) {
        this.role = 'distributor';
      } else if (this.id.startsWith('NEXE')) {
        this.role = 'executive';
      }
    });

    this.userDetailsService.getUserDetails().subscribe((userDetails: UserDetails) => {
      this.exeId = userDetails.exeId;  
    });

    this.productService.getdetails.subscribe((productdetail: Product[]) => {
      this.productdetails = productdetail;
      this.dataSource.data = this.productdetails;

      this.UpdatedProducts.createdDate = this.dsrService.getdate();
      this.UpdatedProducts.retailor = this.dsrService.getRetailor();
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

    this.productdetails.forEach(data => {
      this.UpdatedProducts.product.push({
        product: data.id,
        price: data.price,
        quantity: data.quantity,
        dsr: data.dsr
      });
    });

    if (this.id.startsWith('NDIS')) {
    
      this.UpdatedProducts.distributor = this.id;
      this.UpdatedProducts.executive = this.exeId;
      this.UpdatedProducts.retailor = this.selectedRetailer.id;
      this.UpdatedProducts.orderBy = this.id;
      this.UpdatedProducts.createdDate = new Date();
    } else if (this.id.startsWith('NEXE')) {
      
      this.UpdatedProducts.executive = this.id;
      this.UpdatedProducts.distributor = this.selectedRetailer.distributor;
      this.UpdatedProducts.retailor = this.selectedRetailer.id;
      this.UpdatedProducts.orderBy = this.id;
      this.UpdatedProducts.createdDate = new Date();
    }

    this.UpdatedProducts.totalAmount = this.calculatetotal();

    console.log('Final payload to be sent:', this.UpdatedProducts);

    this.successMessage = 'Order form created successfully';

    setTimeout(() => {
      this.successMessage = ''; 
    }, 50000000);

    const observer: Observer<ProductDetails> = {
      next: (response) => {
        console.log('Product posted successfully:', response);
      },
      error: (error) => {
        console.error('Error posting product:', error);
        if (error.error && error.error.errors) {
          console.error('Validation errors:', error.error.errors);
        }
      },
      complete: () => {
        console.log('Product posting completed.');
      }
    };

    this.dsrService.Postproducts(this.UpdatedProducts).subscribe(observer);
  }
}
