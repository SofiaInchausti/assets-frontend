import { Component } from '@angular/core';
import { ApiService } from '../../../service/users/api.users.service';
import { User } from '../../models/user/user';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../service/alerts.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent {
  userData: User;

  constructor(
    private apiUser: ApiService,
    private router: Router,
    private activerouter: ActivatedRoute,
    private alerts: AlertService
  ) {}

  editForm = new FormGroup({
    username: new FormControl(' ', Validators.required),
    active: new FormControl(false),
    password: new FormControl('', Validators.required),
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
        password: this.userData?.password,
      });
    });
  }

  putForm(form: any) {
    form.id = this.activerouter.snapshot.paramMap.get('id');
    this.apiUser.putUser(form).subscribe({
      error: (error: any) => {
        this.alerts.showError(error, 'Error');
      },
      complete: () => {
        this.alerts.showSuccess('Update request completed', 'Done');
        this.router.navigate(['dashboard']);
      },
    });
  }

  delete() {
    const userId = this.activerouter.snapshot.paramMap.get('id');
    if (userId) {
      this.apiUser.deleteUser(userId).subscribe({
        error: (error: any) => {
          this.alerts.showError(error, 'Error');
        },
        complete: () => {
          this.alerts.showSuccess('Deletion request completed', 'Done');
          this.router.navigate(['dashboard']);
        },
      });
    }
  }

  exit() {
    this.router.navigate(['dashboard']);
  }

  isFormValid(): boolean {
    return this.editForm.valid;
  }
}
