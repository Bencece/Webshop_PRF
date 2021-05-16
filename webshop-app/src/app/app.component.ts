import { AfterContentInit, Component, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'webshop-app';
  logText = "Bejelentkezés"

  ngOnInit()  {
    if (localStorage.getItem('user')) {
      this.logText = "Kijelentkezés"
    } else {
      this.logText = "Bejelentkezés"
    }
  }

}