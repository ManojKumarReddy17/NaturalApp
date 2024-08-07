import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../../../Service/product.service';
import { RetailorDetailsService } from '../../../Service/retailor-details.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../Models/product';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../../material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { selectProducts } from '../../../Store/selector';
import { addProducts, loadProductDetails, updatedProducts } from '../../../Store/actions';
import { AppState } from '../../../Store/appstate';
import { ProductDetails } from '../../Models/product-details';
import { RetailorDetails } from '../../Models/retailor-details';
import { orderformsession } from '../../Models/orderformsession';
import { json } from 'stream/consumers';
import { ExecutiveService } from '../../../Service/executive.service';
import { UserDetails } from '../../Models/user-details';
import { ProfileService } from '../../../Service/profile.service';
@Component({
  selector: 'app-edit-dsr',
  standalone: true,
  imports: [MatTableModule, MaterialModule, FormsModule, MatDatepickerModule, MatNativeDateModule, RouterModule],
  templateUrl: './edit-dsr.component.html',
  styleUrls: ['./edit-dsr.component.scss']
})
export class EditDsrComponent implements OnInit {
  displayedColumns = ['productName', 'quantity', 'price', 'productTotal'];
  dataSource = new MatTableDataSource<Product>([]);
  selectedDate: Date = new Date();
  retailers: any[] = [];
  areas: string[] = [];
  distributorid: string | null = null;
  ExecutiveId: string | null = null;
  retailorNames: any;
  selectedRetailer: any;
  product: any;
  selectedArea: string | undefined;
  retainedproducts$: Observable<Product[]>;
  subscription: any;
  retailorlist: RetailorDetails;
  retailorArea: string | undefined;
  RetailerArea:any;
  RetailerName:any;
  orderDate:Date;
  executiveareas:any;
  executive:string='';
  distributor:string='';
  id:any;
  userDetails: UserDetails = this.profileservice.getUserDetailsFromlocalStorage();
  sessionKey = `productDetails`;
 sessionData = localStorage.getItem(this.sessionKey);
  constructor(
    private productService: ProductService,
    private activeRoute: ActivatedRoute,
    private retailorService: RetailorDetailsService,
    private location: Location,
    private store: Store<AppState>,
    private router: Router,
    private executivearea:ExecutiveService,
    private profileservice:ProfileService
  ) {
    this.retainedproducts$ = this.store.pipe(select(selectProducts));
    this.getRetailorNamesByDistributor();
    
    
    const retailor = JSON.parse(localStorage.getItem('selectedRetailor'));
    if(retailor == null || retailor == ''){
      const sessionData = localStorage.getItem('infoButtonClickSubject');
         const retailorData = JSON.parse(sessionData);
         this.selectedArea = retailorData.aId;
          this.selectedRetailer = retailorData.rId;
        this.selectedDate = retailorData.createdDate;
    }
    else{
      this.selectedArea = retailor.area;
         this.selectedRetailer = retailor.id;
        this.selectedDate = JSON.parse(localStorage.getItem('selectedDateValue'));
    }
       
    
  }

  ngOnInit(): void {
    //this.setupHardwareBackButton();
    const userinfo = JSON.parse(localStorage.getItem('userDetails'));
    if(userinfo.id.startsWith('NDIS')){
      this.distributorid = userinfo.id;
    }
    else if(userinfo.id.startsWith('NEXE')){
      this.ExecutiveId= userinfo.id
    }
    if (this.distributorid && this.distributorid.startsWith('NDIS')) {
      this.getRetailorNamesByDistributor();
      this.getexecutiveareabydistributor();
    } else if (this.ExecutiveId && this.ExecutiveId.startsWith('NEXE')) {
      this.getRetailorNamesByExecutive();
      this.getexecutivearea();
    }
    this.getProducts();
   
   

    this.subscription = this.retailorService.infoButtonClick$.subscribe((retailorlist: RetailorDetails) => {
      if (!this.isRetailorAlreadyPresent(retailorlist)) {
        this.retailorlist = retailorlist;
        console.log(retailorlist);
        this.retailorArea = retailorlist.area;
        this.id = retailorlist.id;
        //this.filterRetailers();
      }
    });

    this.loadProductsFromSession();
  }

  private isRetailorAlreadyPresent(retailorlist: RetailorDetails): boolean {
    return this.retailorlist && this.retailorlist.id === retailorlist.id;
  }

  getProducts(): void {
    this.productService.getProducts().subscribe({
      next: (allProducts: {items:Product[] | Product}) => {
        if (Array.isArray(allProducts.items)) {
          allProducts.items.forEach(x => x.quantity = '');
          this.dataSource.data = allProducts.items;
          if (this.sessionData != null) {
            const productDetails= JSON.parse(this.sessionData);
            this.dataSource.data.forEach((product) => {
              let singleProduct: any
              if(productDetails.product != null){
                singleProduct = productDetails.product.find((item) =>item.productId === product.id);
              }
              else{
                singleProduct = productDetails.find((item) => item.id === product.id)
              }
              if (singleProduct) {
                product.price = singleProduct.price,
                product.quantity = singleProduct.quantity,
                product.subtotal = singleProduct.price * singleProduct.quantity;
              }
            });
          }
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  processData(productDetails: ProductDetails): void {
    console.log('Processing product details:', productDetails);
  }

  getRetailorNamesByDistributor(): void {
    if (this.distributorid) {
      this.retailorService.getRetailorNamesbydistributor(this.distributorid).subscribe({
        next: (data) => {
          this.retailorNames = data;
          //this.filterRetailers();
          // this.areas = Array.from(new Set(data.map((retailer: any) => retailer.area)));
          // console.log(this.areas);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  getRetailorNamesByExecutive(): void {
    if (this.ExecutiveId) {
      this.retailorService.getRetailorNamesbyexecutive(this.ExecutiveId).subscribe({
        next: (data) => {
          this.retailorNames = data;
          
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  getexecutivearea():void{
    this.executive=this.userDetails.id

   this.executivearea.getexecutivearea(this.executive).subscribe({
     next:(data) =>{
       this.executiveareas=data;
       
     }
   })
  
 }
getexecutiveareabydistributor():void{
  this.distributor=this.userDetails.exeId

 this.executivearea.getexecutivearea(this.distributor).subscribe({
   next:(data) =>{
     this.executiveareas=data;
   }
 })
}
  review(): void {
    const selectedProducts = this.dataSource.data.filter(product => product.quantity !== 0 && product.quantity !== '' && product.quantity !== undefined);
    // console.log(selectedProducts);
    // console.log(this.selectedRetailer);
    const retailorSelect = this.retailorNames.find((item) => item.id === this.selectedRetailer);
    localStorage.setItem('selectedRetailor', JSON.stringify(retailorSelect));
    localStorage.setItem('selectedDateValue', JSON.stringify(this.selectedDate));
    localStorage.setItem('selectedArea', JSON.stringify(this.selectedArea));
    localStorage.setItem(this.sessionKey, JSON.stringify(selectedProducts));
    this.productService.DisplaySelectedProducts(selectedProducts);
    this.router.navigate(['/Edit','Orderform']);
   
      
  }

  calculateSubtotal(product: any, newQuantity: string): void {
    product.subtotal = product.price * parseFloat(newQuantity);
  }

  calculatePricetotal(product: any, productPrice: string): void {
    product.subtotal = parseFloat(productPrice) * product.quantity;
  }

  calculateTotal(): number {
    let total = 0;
    this.dataSource.data.forEach(product => {
      total += product.subtotal || 0;
    });
    return total;
  }

  // setupHardwareBackButton(): void {
  //   document.addEventListener('backbutton', () => {
  //     this.handleHardwareBackButton();
  //   });
  // }

  // handleHardwareBackButton(): void {
  //   this.location.back();
  // }

  // filterRetailers(): any[] {
  //   if (!this.selectedArea || !this.retailorNames) {
  //     const details = JSON.parse(this.sessionData);
  //     this.selectedRetailer = this.retailorNames.find((item) => item.id == details.rId);
  //     return this.retailorNames;
  //   } else {
  //     return this.retailorNames.filter(retailer => retailer.area === this.selectedArea);
  //   }
  // }
  setdefaultretailor() {
  }
  

  applyFilter(filterValue: string): void {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.productName && data.productName.toLowerCase().includes(filter.trim().toLowerCase());
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  private saveProductsToSession(selectedProducts: Product[]): void {
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
   
   
  }


  private loadProductsFromSession(): void {
    const savedProducts = localStorage.getItem('selectedProducts');
    if (savedProducts) {
      this.dataSource.data = JSON.parse(savedProducts);
      localStorage.removeItem('selectedProducts');
    }
    
  }

}
