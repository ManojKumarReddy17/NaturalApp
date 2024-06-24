import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { RetailorDetailsService } from '../../../Service/retailor-details.service';
import { ProductDetails, productDetails } from '../../Models/product-details';
import { RetailorDetails } from '../../Models/retailor-details';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { DsrService } from '../../../Service/dsr.service';
import { Store } from '@ngrx/store';
import { addProductDetails, addProducts, loadProductDetails } from '../../../Store/actions';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-retailor-details',
  standalone: true,
  imports: [RouterModule, RouterOutlet, MatTableModule, MaterialModule, MatToolbarModule],
  templateUrl: './retailor-details.component.html',
  styleUrls: ['./retailor-details.component.scss']
})
export class RetailorDetailsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['product', 'quantity', 'price'];
  dataSource = new MatTableDataSource<productDetails>();
  retailorlist: RetailorDetails;
  private subscription: Subscription;
  product: ProductDetails;
  showDeletePopup = false;
  selectedRetailorId: string | null = null;
  showSuccessMessage = false;
  constructor(
    private retailorService: RetailorDetailsService,
    private location: Location,
    private dsrservice: DsrService,
    private store: Store<productDetails[]>,
    private router: Router
  ) {}
  ngOnInit(): void {
    const savedRetailorDetails = this.retailorService.getUserDetailsFromSessionStorage();
    if (savedRetailorDetails) {
      this.retailorlist = savedRetailorDetails;
      this.loadProducts(savedRetailorDetails.id);
    }
    this.subscription = this.retailorService.infoButtonClick$.subscribe((retailorlist: RetailorDetails) => {
      if (!this.isRetailorAlreadyPresent(retailorlist)) {
        this.retailorlist = retailorlist;
        console.log(retailorlist);
        console.log()
        this.loadProducts(retailorlist.id);
      }
    });
  }
  private loadProducts(id: string): void {
    const sessionKey = `productDetails`;
    const sessionData = sessionStorage.getItem(sessionKey);
      this.retailorService.getProductsById(id).subscribe((productDetails: ProductDetails) => {
        this.processData(productDetails);
        console.log('Fetched from service:', productDetails);
        sessionStorage.setItem(sessionKey, JSON.stringify(productDetails));
        this.store.dispatch(loadProductDetails({ productDetails }));
      });

  }
  private processData(data: ProductDetails): void {
    this.dataSource.data = data.product;
    console.log(this.dataSource.data);
  }
  goback() {
    this.location.back();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  private isRetailorAlreadyPresent(retailorlist: RetailorDetails): boolean {
    return this.retailorlist && this.retailorlist.id === retailorlist.id;
  }
  openDeletePopup(id: string): void {
    this.selectedRetailorId = id;
    this.showDeletePopup = true;
  }
  confirmDelete(): void {
    if (this.selectedRetailorId !== null) {
      this.deleteDsr(this.selectedRetailorId);
      this.selectedRetailorId = null;
    }
    this.showDeletePopup = false;
    this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
      this.router.navigateByUrl('').then(() => {
        this.router.navigate(['']);
      });
    }, 3000); 
  }
  cancelDelete(): void {
    this.showDeletePopup = false;
  }
  deleteDsr(id: string): void {
    this.dsrservice.deleteDsr(id).subscribe(
      () => console.log('DSR deleted successfully'),
      error => console.error('Error deleting DSR:', error)
    );
  }
}