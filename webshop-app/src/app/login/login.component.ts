import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name: string;
  password: string;

  constructor(private authenticationService: AuthenticationService, private router: Router, private AppComponent : AppComponent) {
    this.name = '';
    this.password = '';
  }

  login() {
    if (this.name != '' && this.password != '') {
      this.authenticationService.login(this.name, this.password).subscribe(msg => {
        console.log(msg);
        localStorage.setItem('user', this.name);
        this.AppComponent.ngOnInit();
        this.router.navigate(['homepage']);
      }, error => {
        console.log(error);
      })
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
      this.AppComponent.ngOnInit();
      this.authenticationService.logout().subscribe(msg => {
        console.log(msg);
      }, error => {
        console.log(error);
      })
    }
  }
}
