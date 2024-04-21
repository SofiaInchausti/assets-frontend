import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/assets/api.assets.service';
import { Asset } from '../../models/asset/asset';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})

export class DashboardComponent implements OnInit {
  assets: Asset[] = [];
  constructor(private api: ApiService, private router: Router) {}
  ngOnInit(): void {
    this.api.getAllAssets().subscribe((data) => {
      this.assets = data;
    });
  }

  addAsset() {
    this.router.navigate(['new']);
  }

  editAsset(id: string | number | null | undefined) {
    this.router.navigate(['edit/', id]);
  }
}
