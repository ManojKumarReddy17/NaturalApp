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
  import { ProfileService } from '../../../Service/profile.service';
  import { updatedProducts } from '../../../Store/actions';
  

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
    selectedDate: Date = new Date();
    UpdatedProducts: ProductDetails = new ProductDetails();
    id: string;
    role: string;
    exeId: string;
    dsr: any;
  
    constructor(
      private productService: ProductService,
      private activeRoute: ActivatedRoute,
      private authService: AutherizationService,
      private location: Location,
      private dsrService: DsrService,
      private store: Store<AppState>,
      private userDetailsService: ProfileService 
    ) {
      this.dataSource = new MatTableDataSource<Product>();
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
        if (!data.dsr) {
          console.warn(`Product ${data.id} is missing dsr value.`);
        }
        this.UpdatedProducts.product.push({
          product: data.id,
          price: data.price,
          quantity: data.quantity,
          dsr: data.dsr
        });
      });
  
      this.UpdatedProducts.distributor = this.id;
      this.UpdatedProducts.dsr = this.dsr;
  
      this.UpdatedProducts.executive = this.exeId;
      this.UpdatedProducts.retailor = this.selectedRetailer.id;
      this.UpdatedProducts.orderBy = this.id;
  
      this.UpdatedProducts.createdDate = new Date();
      this.UpdatedProducts.totalAmount = this.calculatetotal();
  
      console.log('Final payload to be sent:', this.UpdatedProducts);
  
      const observer: Observer<ProductDetails> = {
        next: (response) => {
          console.log('Product edited successfully:', response);
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
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

