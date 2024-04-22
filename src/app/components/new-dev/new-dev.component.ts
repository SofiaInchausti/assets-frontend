import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService as ApiServiceDev } from '../../../service/developers/api.developers.service';
import { ApiService } from '../../../service/assets/api.assets.service';
import { Router } from '@angular/router';
import { Asset } from '../../models/asset/asset';

@Component({
  selector: 'app-new-dev',
  templateUrl: './new-dev.component.html',
  styleUrls: ['./new-dev.component.css'],
})
export class NewDevComponent implements OnInit {
  assetsInfo: number[] = [];
  assetsData: Asset[] = [];
  selectedAssets: any;

  form = new FormGroup({
    fullname: new FormControl(''),
    active: new FormControl(true),
    assets: new FormControl(), // Inicializa como un array vacío
  });

  constructor(
    private api: ApiService,
    private apiDev: ApiServiceDev,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.api.getAllAssets().subscribe((data) => {
      this.assetsData = data;
    });
  }

  onAssetsChange(event: any) {
    const selectedValues = event.target.value;
    const selectedId = selectedValues.split(':')[1];
    if (!this.assetsData.includes(selectedId)) {
      this.assetsInfo.push(parseInt(selectedId));
    }
    this.form.get('assets')?.setValue(this.assetsInfo);
  }

  addNewDeveloper(form: any) {
    this.apiDev.postDeveloper(form).subscribe((data: any) => {});
  }

  exit() {
    this.router.navigate(['dashboard']);
  }
}
