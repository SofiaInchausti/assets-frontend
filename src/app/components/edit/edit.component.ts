import { Component } from '@angular/core';
import { ApiService } from '../../../service/assets/api.assets.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Asset } from '../../models/asset/asset';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AlertService } from '../../../service/alerts.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  constructor(
    private router: Router,
    private api: ApiService,
    private activerouter: ActivatedRoute,
    private alerts: AlertService
  ) {}

  assetData: Asset | undefined;

  editForm = new FormGroup({
    brand: new FormControl('', Validators.required),
  model: new FormControl('', Validators.required),
  type: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    let assetId = this.activerouter.snapshot.paramMap.get('id');
    let assetIdNumber: number;
    assetIdNumber = assetId ? parseInt(assetId, 10) : 0;
    this.api.getAsset(assetIdNumber).subscribe((data) => {
      this.assetData = data;
      this.editForm.setValue({
        brand: this.assetData.brand!,
        model: this.assetData.model!,
        type: this.assetData.type!,
      });
    });
  }

  putForm(form: Asset) {
    form.id = this.activerouter.snapshot.paramMap.get('id');
    this.api.putAsset(form).subscribe({
      error: (error) => {
        this.alerts.showError(error.error.message,'Error');
      },
      complete: () => {
        this.alerts.showSuccess('Update request completed','Done');
        this.router.navigate(['dashboard']);
      },
    });
  }

  delete() {
    const assetId = this.activerouter.snapshot.paramMap.get('id');
    if (assetId) {
      this.api.deleteAsset(assetId).subscribe({
        error: (error) => {
          this.alerts.showError(error.error.message,'Error');
        },
        complete: () => {
          this.alerts.showSuccess('Deletion request completed','Done');
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
