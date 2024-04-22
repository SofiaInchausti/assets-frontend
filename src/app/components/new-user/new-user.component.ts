import { Component, OnInit } from '@angular/core';
import { ApiService as ApiServiceUser } from '../../../service/users/api.users.service';
import { User } from '../../models/user/user';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent implements OnInit {
usersData:User[]=[]
  form = new FormGroup({
    username: new FormControl(''),
    active: new FormControl(true),
    password: new FormControl(), // Inicializa como un array vacío
  });

  constructor(
    private apiUser: ApiServiceUser,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.apiUser.getAllUsers().subscribe((data) => {
      this.usersData = data;
    });
  }

  addNewUser(form: any) {
    this.apiUser.postUser(form).subscribe((data: any) => {});
  }

  exit() {
    this.router.navigate(['dashboard']);
  }
}
