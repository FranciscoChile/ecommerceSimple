import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from "../product.service";


@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService
      .getAll()
      .subscribe(
          p => this.products = p,
          e => this.errorMessage = e,
          () => this.isLoading = false
      );

  }

}
