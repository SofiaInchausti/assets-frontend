import { Component } from '@angular/core';
import { ApiService } from '../../../service/users/api.users.service';
import { User } from '../../models/user/user';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {

  userData: User;

  constructor(
    private apiUser: ApiService,
    private router: Router,
    private activerouter: ActivatedRoute
  ) {}

  editForm = new FormGroup({
    username: new FormControl(' '),
    active: new FormControl(false),
    password: new FormControl(),
  });

  ngOnInit(): void {
    let userId = this.activerouter.snapshot.paramMap.get('id');
    let userIdNumber: number;
    userIdNumber = userId ? parseInt(userId, 10) : 0;
    this.apiUser.getUser(userIdNumber).subscribe((data: User) => {
      this.userData = data;
      this.editForm.patchValue({
        username: this.userData?.username || '',
        active: this.userData?.active!,
        password: this.userData?.password
      });
    });
  }

  putForm(form: any) {
    form.id = this.activerouter.snapshot.paramMap.get('id');
    this.apiUser.putUser(form).subscribe({
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('Update request completed');
        this.router.navigate(['dashboard']);
      },
    });
  }

  delete() {
    const userId = this.activerouter.snapshot.paramMap.get('id');
    if (userId) {
      this.apiUser.deleteUser(userId).subscribe({
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          console.log('Deletion request completed');
          this.router.navigate(['dashboard']);
        },
      });
    }
  }

  exit() {
    this.router.navigate(['dashboard']);
  }
}

