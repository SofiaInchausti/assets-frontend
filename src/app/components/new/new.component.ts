import { Component } from '@angular/core';
import { ApiService } from '../../../service/assets/api.assets.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Asset } from '../../models/asset/asset';
import { AlertService } from '../../../service/alerts.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrl: './new.component.css',
})
export class NewComponent {
  form = new FormGroup({
    brand: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
  });

  constructor(
    private api: ApiService,
    private router: Router,
    private alerts: AlertService
  ) {}

  addNewAsset(form: Asset) {
    this.api.postAsset(form).subscribe({
      error: (error: any) => {
        this.alerts.showError(error, 'Error');
      },
      complete: () => {
        this.alerts.showSuccess('Asset created', 'Done');
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
