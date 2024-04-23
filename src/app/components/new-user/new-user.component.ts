import { Component, OnInit } from '@angular/core';
import { ApiService as ApiServiceUser } from '../../../service/users/api.users.service';
import { User } from '../../models/user/user';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../service/alerts.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css',
})
export class NewUserComponent implements OnInit {
  usersData: User[] = [];
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    active: new FormControl(true),
    password: new FormControl('', Validators.required), // Inicializa como un array vacío
  });

  constructor(
    private apiUser: ApiServiceUser,
    private router: Router,
    private alerts: AlertService
  ) {}

  ngOnInit(): void {
    this.apiUser.getAllUsers().subscribe((data) => {
      this.usersData = data;
    });
  }

  addNewUser(form: any) {
    this.apiUser.postUser(form).subscribe({
      error: (error: any) => {
        this.alerts.showError(error.error.message, 'Error');
      },
      complete: () => {
        this.alerts.showSuccess('User created', 'Done');
        this.router.navigate(['dashboard']);
      },
    });
  }

  exit() {
    this.router.navigate(['dashboard']);
  }

  isFormValid(): boolean {
    return this.form.valid;
  }
}
