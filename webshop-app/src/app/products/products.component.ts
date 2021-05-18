import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products : Product[] = []

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.post<Product[]>(environment.serverUrl + '/products', {responseType: 'text', withCredentials: true}).subscribe(data =>{
      this.products = data
    })
  }

  addToCart(){
    
  }

}
