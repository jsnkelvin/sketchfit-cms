import { Component, OnInit } from '@angular/core';
import { DetailService } from 'src/app/shared/detail.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.scss']
})
export class DetailedComponent implements OnInit {
  data;
  resi;

  headerAdmin = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  fg: FormGroup

  constructor(
    detailSrv: DetailService,
    private httpClient: HttpClient,
    public router: Router,
    fb: FormBuilder,
    public nzMessageService: NzMessageService
  ) {
    if (detailSrv.paramTransaction) {
    this.data = detailSrv.paramTransaction;} else {
      this.router.navigate(['/']);
    }

    this.fg = fb.group({
      courier: [null, [Validators.required]],
      receipt_number: [null, [Validators.required]],
      transaction_id: [this.data.id]
    })

  }

  ngOnInit() {
    if(this.data.courier){
      const body = {
        courier: this.data.courier,
        receipt_number: this.data.receipt_number,
        transaction_id: this.data.id
      }
      this.fg.patchValue(body)
    }
  }

  cancel(): void {

  }

  confirm(status: string): void {
    const body = {
      transaction_id: this.data.id,
      status
    };
    console.log(body);
    this.httpClient.put(environment.api_url + '/update_order_status', body, this.headerAdmin).subscribe(data => {
      console.log(data);
      this.nzMessageService.success('Update Transaction Berhasil');
      this.router.navigate(['/welcome/list']);
    }, err => {
      this.nzMessageService.error('Something went wrong!');
    });

  }

  submitForm(){
    for (const i in this.fg.controls) {
      this.fg.controls[i].markAsDirty();
      this.fg.controls[i].updateValueAndValidity();
    }

    const body = this.fg.value
    const id = this.data.id
    if(this.fg.valid){
      this.httpClient.put(environment.api_url + '/courier', body, this.headerAdmin).subscribe(data => {
        console.log(data);
        this.nzMessageService.success('Update Transaction Berhasil');
        this.router.navigate(['/welcome/list']);
      }, err => {
        this.nzMessageService.error('Something went wrong!');
      })
    }
  }

}
