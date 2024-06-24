
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
  id:any;

  constructor(
    private productService: ProductService,
    private activeRoute: ActivatedRoute,
    private retailorService: RetailorDetailsService,
    private location: Location,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.retainedproducts$ = this.store.pipe(select(selectProducts));
    this.getRetailorNamesByDistributor();
  }

  ngOnInit(): void {
    this.setupHardwareBackButton();
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      this.distributorid = params.get('id');
      this.ExecutiveId = params.get('id');
      const userinfo = JSON.parse(sessionStorage.getItem('userDetails'));
      this.distributorid = userinfo.id;
      console.log(this.distributorid);
      const id = this.distributorid || this.ExecutiveId;

      if (this.distributorid && this.distributorid.startsWith('NDIS')) {
        this.getRetailorNamesByDistributor();
      } else if (this.ExecutiveId && this.ExecutiveId.startsWith('NEXE')) {
        this.getRetailorNamesByExecutive();
      }

      this.getProducts();
    });

    this.subscription = this.retailorService.infoButtonClick$.subscribe((retailorlist: RetailorDetails) => {
      if (!this.isRetailorAlreadyPresent(retailorlist)) {
        this.retailorlist = retailorlist;
        console.log(retailorlist);
        this.retailorArea = retailorlist.area;
        this.id = retailorlist.id; 
      }
    });

    this.loadProductsFromSession();
  }

  private isRetailorAlreadyPresent(retailorlist: RetailorDetails): boolean {
    return this.retailorlist && this.retailorlist.id === retailorlist.id;
  }

  getProducts(): void {
    this.productService.getProducts().subscribe({
      next: (allProducts: Product[] | Product) => {
        if (Array.isArray(allProducts)) {
          allProducts.forEach(x => x.quantity = '');
          this.dataSource.data = allProducts;
          const sessionKey = `productDetails`;
          const sessionData = sessionStorage.getItem(sessionKey);
          if (sessionData != null) {
            const productDetails: ProductDetails = JSON.parse(sessionData);
            this.selectedRetailer = productDetails.retailor;
            this.orderDate = productDetails.createdDate;
            this.retailorlist.id;
            console.log(this.retailorlist.id)
            console.log(this.selectedRetailer);
            console.log(this.orderDate);
            this.dataSource.data.forEach((product) => {
              const singleProduct = productDetails.product.find((item) => item.product === product.productName);
              if (singleProduct) {
                product.price = singleProduct.price,
                product.quantity = singleProduct.quantity,
                product.subtotal = singleProduct.price * singleProduct.quantity;
              }
            });
            sessionStorage.removeItem(sessionKey);
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
          this.filterRetailers();
          this.areas = Array.from(new Set(data.map((retailer: any) => retailer.area)));
          console.log(this.areas);
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
          this.areas = Array.from(new Set(data.map((retailer: any) => retailer.area)));
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  review(): void {
    const selectedProducts = this.dataSource.data.filter(product => product.quantity !== 0 && product.quantity !== '' && product.quantity !== undefined);
    console.log(selectedProducts);
    console.log(this.selectedRetailer);
    console.log(this.id); 

    this.saveProductsToSession(selectedProducts);

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

    this.router.navigate(['/Edit', this.distributorid, 'Orderform'],
      {
        queryParams: {
          products: JSON.stringify(selectedProducts),
          retailer: JSON.stringify(this.selectedRetailer),
          area: this.selectedArea,
          rId: this.id
        }
      });
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

  setupHardwareBackButton(): void {
    document.addEventListener('backbutton', () => {
      this.handleHardwareBackButton();
    });
  }

  handleHardwareBackButton(): void {
    this.location.back();
  }

  filterRetailers(): any[] {
    if (!this.selectedArea || !this.retailorNames) {
      return this.retailorNames;
    } else {
      return this.retailorNames.filter(retailer => retailer.area === this.selectedArea);
    }
  }

  onAreaChange(selectedArea: string): void {
    this.selectedArea = selectedArea;
    if (!selectedArea) {
      this.selectedRetailer = undefined;
    }
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.productName && data.productName.toLowerCase().includes(filter.trim().toLowerCase());
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  private saveProductsToSession(selectedProducts: Product[]): void {
    sessionStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
  }

  private loadProductsFromSession(): void {
    const savedProducts = sessionStorage.getItem('selectedProducts');
    if (savedProducts) {
      this.dataSource.data = JSON.parse(savedProducts);
      sessionStorage.removeItem('selectedProducts');
    }
  }
}
