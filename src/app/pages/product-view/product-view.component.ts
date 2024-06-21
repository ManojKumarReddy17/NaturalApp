import { Component, OnInit } from '@angular/core';
import { Product } from '../../Models/product';
import { MaterialModule } from '../../material.module';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProductService } from '../../../Service/product.service';
import { Location } from '@angular/common';
 

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [MaterialModule, RouterModule, RouterOutlet],
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']  
})
export class ProductViewComponent implements OnInit {
  allProducts: Product[];
  filteredList: Product[];
  loading: boolean = false; 

  constructor(
    private productService: ProductService,
    private location: Location  // Ensure Location is correctly injected
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.loading = true;

    this.productService.getProducts().subscribe({
      next: (allProducts: Product[] | Product) => {
        this.allProducts = Array.isArray(allProducts) ? allProducts : [allProducts];
        this.filteredList = [...this.allProducts]; 
        this.loading = false; 
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.loading = false; 
      }
    });
  }

  applyFilter(filterValue: string) {
    if (!filterValue) {
      this.filteredList = [...this.allProducts];
      return;
    }
    this.filteredList = this.allProducts.filter(product => {
      const productName = product.productName;
      if (productName) {
        return productName.toLowerCase().startsWith(filterValue.trim().toLowerCase());
      }
      return false; 
    });
  }

  goback() {
    this.location.back();
  }
}
