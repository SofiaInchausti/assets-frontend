import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../service/login/api.login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private api: ApiService, private router: Router) {}

  errorStatus: boolean = false;
  errorMsj: any = '';

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('token')) {
      this.router.navigate(['dashboard']);
    }
  }

  onLogin(form: any) {
    this.api.login(form).subscribe({
      next: (response: any) => {
        const { token } = response;
        localStorage.setItem('token', token);
        this.router.navigate(['dashboard']);
      },
      error: (error: any) => {
        console.error('Error al iniciar sesión:', error);
        if (error.status === 404) {
          this.errorStatus = true;
          this.errorMsj = 'Username and password are required.';
        } else {
          this.errorStatus = true;
          this.errorMsj = error.error.message || 'An error occurred while logging in.';
        }
      },
    });
  }
}
