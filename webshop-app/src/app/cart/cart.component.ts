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
  canNotCheckout = true

  constructor(private http: HttpClient) {
    this.sum = 0;
    this.canNotCheckout = true
  }

  ngOnInit(): void {
    this.products = []
    this.sum = 0
    var cart = localStorage.getItem("cart");
    if(cart){
      JSON.parse(cart).forEach((product : Product) => {
        this.sum+=product.prize;
        this.products.push(product);
      });
      this.canNotCheckout = false
    } else {
      this.canNotCheckout = true
    }
  }

  checkout(){
    this.http.post(environment.serverUrl + '/checkout', { products : this.products }, {responseType: 'text', withCredentials: true}).subscribe(msg =>{
      alert("Sikeres rendelés!")
      console.log(msg)
      localStorage.removeItem("cart")
      this.canNotCheckout = true
      this.sum = 0
      this.products = []
      this.ngOnInit()
    })
  }

  removeFromCart(product: Product){
    var cart = localStorage.getItem("cart");
    if(cart){
      var tmp = JSON.parse(cart)
      tmp.forEach((pr: Product, index: number)=>{
        if(product.itemid == pr.itemid){
          this.sum-=pr.prize
          tmp.splice(index, 1)
        }
      })
      localStorage.setItem("cart", JSON.stringify(tmp))
      this.ngOnInit()
    }
  }

}
