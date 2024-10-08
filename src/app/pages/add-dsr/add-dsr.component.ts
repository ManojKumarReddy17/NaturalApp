import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../../../Service/product.service';
import { RetailorDetailsService } from '../../../Service/retailor-details.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../Models/product';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { selectProducts } from '../../../Store/selector';
import { addProducts, updatedProducts } from '../../../Store/actions';
import { MatTableModule } from '@angular/material/table';
import {orderformsession } from '../../Models/orderformsession';
import { ExecutiveService } from '../../../Service/executive.service';
import { ProfileService } from '../../../Service/profile.service';
import { UserDetails } from '../../Models/user-details';

@Component({
  selector: 'app-add-dsr',
  standalone: true,
  imports: [
    MaterialModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatTableModule
  ],
  templateUrl: './add-dsr.component.html',
  styleUrls: ['./add-dsr.component.scss']
})
export class AddDsrComponent implements OnInit {
  displayedColumns = ['productName', 'quantity', 'price', 'productTotal'];
  dataSource = new MatTableDataSource<Product>([]);
  retailers: any[] = [];
  areas: string[] = [];
  distributorid: string | null = null;
  ExecutiveId: string | null = null;
  retailorNames: any;
  executiveareas:any;
  selectedRetailer: any;
  selectedArea: string | undefined;
  retainedproducts: Observable<any>;
  selectedDateValue: Date = new Date();
  isExecutive: boolean = false;
 executive:string='';
 distributor:string='';
 userDetails: UserDetails = this.profileservice.getUserDetailsFromlocalStorage();
  dateForm = new FormGroup({
    selectedDate: new FormControl({selectedDate: new FormControl(null)}, [Validators.required, this.lastThreeDaysValidator()])
  });

  constructor(
    private productService: ProductService,
    private activeRoute: ActivatedRoute,
    private retailorService: RetailorDetailsService,
    private location: Location,
    private store: Store<Product[]>,
    private router: Router,
    private executivearea:ExecutiveService,
    private profileservice:ProfileService
  ) {}

  get selectedDate(){
    return this.dateForm.get('selectedDate');
  }

  lastThreeDaysValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedDate = new Date(control.value);
      const today = new Date();
      const threeDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3);

      return selectedDate >= threeDaysAgo && selectedDate <= today
        ? null
        : { 'invalidDate': { value: control.value } };
    };
  }

  ngOnInit(): void {
    // this.setupHardwareBackButton();
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      this.distributorid = params.get('id');
      this.ExecutiveId = params.get('id');
      this.retainedproducts = this.store.pipe(select(selectProducts));
      console.log(this.retainedproducts);
      
      this.getProducts();
      
      

      if (this.distributorid && this.distributorid.startsWith('NDIS')) {
        this. getRetailorNamesByDistributor();
        this.getexecutiveareabydistributor();
      } else if (this.ExecutiveId && this.ExecutiveId.startsWith('NEXE')) {
        this.isExecutive= true;
        this.getRetailorNamesByExecutive();
        this.getexecutivearea();
      }

      this.loadFromlocalStorage();
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filterPredicate = (data: any, filter: string) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      return data.productName && data.productName.toLowerCase().includes(filter.trim().toLowerCase());
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  clearInput(input: HTMLInputElement): void {
    input.select();
    // input.value = '';
    // this.applyFilter('');
   
  }

  getProducts(): void {
    this.productService.getProducts().subscribe({
      next: (allProducts: {items:Product[] | Product}) => {
        if (Array.isArray(allProducts.items)) {
          allProducts.items.forEach(x => x.quantity = '');
          this.dataSource.data = allProducts.items;
          this.retainedproducts.subscribe((ngrxData: any[]) => {
            this.dataSource.data.forEach((product) => {
              const ngrxProduct = ngrxData.find((item) => item.id === product.id);
              if (ngrxProduct) {
                product.quantity = ngrxProduct.quantity;
                product.price = ngrxProduct.price;
                product.subtotal = ngrxProduct.subtotal;
              }
            });
          });
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getRetailorNamesByDistributor(): void {
    if (this.distributorid) {
      this.retailorService.getRetailorNamesbydistributor(this.distributorid).subscribe({
        next: (data) => {
          this.retailorNames = data;
          this.retailorService.saveRetailorDetails(this.retailorNames);

          this.areas = Array.from(new Set(data.map((retailer: any) => retailer.area)));
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
          console.log(this.retailorNames);
          this.retailorService.saveRetailorDetails(this.retailorNames);
          this.areas = Array.from(new Set(data.map((retailer: any) => retailer.area)));
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  filterRetailers(): any[] {
    return this.retailorNames;
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

  review(): void {
    if (this.dateForm.invalid) {
      return;
    }
    
    const selectedProducts = this.dataSource.data.filter(product => product.quantity != 0 && product.quantity != '' && product.quantity != undefined);
    console.log(selectedProducts);
    console.log(this.selectedRetailer);
    this.productService.DisplaySelectedProducts(selectedProducts);
    selectedProducts.forEach(products => {
      try {
        this.store.dispatch(addProducts({ products }));
        this.store.dispatch(updatedProducts({ products: [products] }));
        console.log("Inserted the values into store");
      } catch (error) {
        console.error(error);
      }
    });
    const selectedDate = this.selectedDate?.value;

    this.saveTolocalStorage();
    this.router.navigate(['/CreateDSR', this.distributorid, 'Review'])
  }

  // setupHardwareBackButton(): void {
  //   document.addEventListener('backbutton', () => {
  //     this.handleHardwareBackButton();
  //   });
  // }

  validateQuantity(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
  
    if (value.length >= 3 && !this.isSpecialKey(event)) {
      event.preventDefault();
    }
  }
  
  
  isSpecialKey(event: KeyboardEvent): boolean {
    const specialKeys = [
      'Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'
    ];
  
    return specialKeys.indexOf(event.key) !== -1;
  }
  calculateSubtotal(product: any, value: string) {
    const quantity = parseInt(value, 10);
    if (quantity >= 0 && quantity <= 999) {
      // Update product quantity and calculate subtotal
      product.quantity = quantity;
      product.subtotal = product.price * quantity;
    }
  }
  
  

  // handleHardwareBackButton(): void {
  //   this.location.back();
  // }
  
  saveTolocalStorage(): void {
    let datevalue = this.selectedDateValue;
    // let todayDate = new Date();
    // const formateddate = datevalue.getDay()+ "-" + (datevalue.getMonth()+1) + "-" + datevalue.getFullYear();
    // const today = todayDate.getDay()+ "-" + (todayDate.getMonth()+1) + "-" + todayDate.getFullYear();
    // if(formateddate !== today){
      
      if(!datevalue.toString().endsWith('T00:00:00.000Z')){
        const istOffset = 5.5 * 60; // IST is UTC +5:30, so the offset in minutes is 330
        datevalue= new Date(datevalue.getTime() + istOffset * 60 * 1000);
         }
    //}
      
    
    // const date = new Date(datevalue);
    // let formattedDate = date.toISOString().split('T')[0];
    const orderFormSession: orderformsession = {
      rId: this.selectedRetailer || '',
      aId: this.selectedArea || '',
      createdDate: datevalue,
      retailor: this.retailorNames.filter((item) => item.id === this.selectedRetailer),
      area: this.selectedArea ? [{ id: '', areaName: this.selectedArea }] : [],
      selectedproducts: []
    };
    localStorage.setItem('orderFormSession', JSON.stringify(orderFormSession));
    //localStorage.setItem('createdDateValue', JSON.stringify(localTime));
  }

  loadFromlocalStorage(): void {
    const sessionData = localStorage.getItem('orderFormSession');
    if (sessionData) {
      const orderFormSession: orderformsession = JSON.parse(sessionData);
      //this.distributorid = orderFormSession.rId;
      this.selectedArea = orderFormSession.aId;
      this.selectedDateValue = orderFormSession.createdDate;
      //  this.selectedDate?.setValue(orderFormSession.createdDate.toISOString.substring(0, 10));
       this.selectedRetailer = orderFormSession.rId;
    }
  }

  resetlocalStorage(): void {
    localStorage.removeItem('orderFormSession');
  }
}