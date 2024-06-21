import { Component, OnInit } from '@angular/core';
import { Product } from '../../Models/product';
import { ProductService } from '../../../Service/product.service';
import { MaterialModule } from '../../material.module';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MaterialModule, RouterModule, RouterOutlet],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  allProducts: Product[];
  filteredList: Product[];
  loading: boolean = false; 

  constructor(private productService: ProductService) {}

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
}  