import { Component, OnInit } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  Products : Product[] = [
    { id: 1, name: "Acer", description: "teszt", prize: 123},
    { id: 2, name: "Acer", description: "teszt2", prize: 1243},
    { id: 2, name: "Acer", description: "teszt2", prize: 1243},
    { id: 2, name: "Acer", description: "teszt2", prize: 1243},
    { id: 2, name: "Acer", description: "teszt2", prize: 1243},
    { id: 2, name: "Acer", description: "teszt2", prize: 1243},
    { id: 2, name: "Acer", description: "teszt2", prize: 1243}
  ]
  constructor() { }

  ngOnInit(): void {
  }

  

}
