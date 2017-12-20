import { Injectable } from '@angular/core';
import { Product } from './product';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class ProductService {

  private baseUrl: string = 'http://localhost:8080/ecomSimple';

  constructor(private http : Http){}

  getAll(): Observable<Product[]>{
    let products$ = this.http
      .get(`${this.baseUrl}/products`, {headers: this.getHeaders()})
      .map(mapProducts)
      .catch(handleError);

      return products$;
  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

}

  function mapProducts(response:Response): Product[]{
     return response.json().content.map(toProduct)
  }

  function toProduct(p:any): Product{
    let product = <Product>({
      id: p.idproduct,
      name: p.nombre,
      stock: p.stock
    });
    console.log('Parsed product:', product);
    return product;
  }

  function handleError (error: any) {
    let errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`
    console.error(errorMsg);
    return Observable.throw(errorMsg);
  }
