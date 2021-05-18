import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products : Product[] = []
  sum : number

  constructor(private http: HttpClient) {
    this.sum = 0;
  }

  ngOnInit(): void {
    var cart = localStorage.getItem("cart");
    if(cart){
      JSON.parse(cart).forEach((product : Product) => {
        this.sum+=product.prize;
        this.products.push(product);
      });
    }
  }

  checkout(){
    this.http.post(environment.serverUrl + '/checkout', {responseType: 'text', withCredentials: true, products : this.products }).subscribe(msg =>{
      console.log(msg)
      localStorage.removeItem("cart")
      this.products = []
    })
  }

}
