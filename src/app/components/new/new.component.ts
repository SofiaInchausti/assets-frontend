import { Component } from '@angular/core';
import { ApiService } from '../../../service/assets/api.assets.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Asset } from '../../models/asset/asset';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})
export class NewComponent {

  form = new FormGroup({
    id: new FormControl('', [Validators.required]),
    brand: new FormControl(''),
    model: new FormControl(''),
    type: new FormControl(''),
  })

  constructor(private api:ApiService, private router:Router) { }

  addNewAsset(form: Asset ){
    this.api.postAsset(form).subscribe((data: any)=>{
    })
  }

  exit(){
    this.router.navigate(['dashboard']);
  }
}
