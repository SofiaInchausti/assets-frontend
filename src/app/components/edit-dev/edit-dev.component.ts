import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../service/assets/api.assets.service';
import { Developer } from '../../models/developer/developer';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService as ApiServiceDev } from '../../../service/developers/api.developers.service';
import { Asset } from '../../models/asset/asset';
import { AlertService } from '../../../service/alerts.service';

@Component({
  selector: 'app-edit-dev',
  templateUrl: './edit-dev.component.html',
  styleUrl: './edit-dev.component.css',
})
export class EditDevComponent {
  assetsInfo: number[] = [];
  assetsData: Asset[] = [];
  devData: Developer | undefined;

  constructor(
    private apiDev: ApiServiceDev,
    private router: Router,
    private api: ApiService,
    private activerouter: ActivatedRoute,
    private alerts: AlertService
  ) {}

  editForm = new FormGroup({
    fullname: new FormControl('' ,Validators.required),
    active: new FormControl(false, Validators.required),
    assets: new FormControl(),
  });

  ngOnInit(): void {
    let devId = this.activerouter.snapshot.paramMap.get('id');
    let devIdNumber: number;
    devIdNumber = devId ? parseInt(devId, 10) : 0;
    this.api.getAllAssets().subscribe((data) => {
      this.assetsData = data;
    });
    this.apiDev.getDeveloper(devIdNumber).subscribe((data: Developer) => {
      this.devData = data;
      this.editForm.patchValue({
        fullname: this.devData?.fullname!,
        active: this.devData?.active!,
        assets: Array.isArray(this.devData?.assets)
          ? (this.devData.assets as unknown as { id: number }[]).map(
              (asset) => asset.id
            )
          : [],
      });
    });
  }

  onAssetsChange(event: any) {
    const selectedValues = event.target.value;
    const selectedId = selectedValues.split(':')[1];
    if (!this.assetsData.includes(selectedId)) {
      this.assetsInfo.push(parseInt(selectedId));
    }
    this.editForm.get('assets')?.setValue(this.assetsInfo);
  }

  isAssetSelected(assetId: number | any): boolean {
    return Array.isArray(this.editForm.value.assets)
      ? this.editForm.value.assets.includes(assetId)
      : false;
  }

  putForm(form: Developer) {
    form.id = this.activerouter.snapshot.paramMap.get('id');
    this.apiDev.putDeveloper(form).subscribe({
      error: (error: any) => {
        this.alerts.showError(error.error.message,'Error');
      },
      complete: () => {
        this.alerts.showSuccess('Update request completed','Done');
        this.router.navigate(['dashboard']);
      },
    });
  }

  delete() {
    const devId = this.activerouter.snapshot.paramMap.get('id');
    if (devId) {
      this.apiDev.deleteDeveloper(devId).subscribe({
        error: (error: any) => {
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
