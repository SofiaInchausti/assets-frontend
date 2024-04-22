import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/assets/api.assets.service';
import { ApiService as ApiServiceDev } from '../../../service/developers/api.developers.service';
import { Asset } from '../../models/asset/asset';
import { Router } from '@angular/router';
import { Developer } from '../../models/developer/developer';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  assets: Asset[] = [];
  developers: Developer[] = [];
  constructor(
    private api: ApiService,
    private apiDev: ApiServiceDev,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.api.getAllAssets().subscribe((data) => {
      this.assets = data;
    });
    this.apiDev.getAllDevelopers().subscribe((data) => {
      this.developers = data;
    });
  }

  getAssetById(assetId: number): Asset | undefined {
    const data = this.assets.find((asset) => asset.id === assetId);
    return data;
  }

  addAsset() {
    this.router.navigate(['new']);
  }

  editAsset(id: string | number | null | undefined) {
    this.router.navigate(['edit/', id]);
  }

  addDeveloper() {
    this.router.navigate(['new-dev']);
  }

  editDeveloper(id: string | number | null | undefined) {
    this.router.navigate(['edit-dev/', id]);
  }
}
