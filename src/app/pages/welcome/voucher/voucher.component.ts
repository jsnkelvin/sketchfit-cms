import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {

  voucherData = '';
  currVoucher = '';
  currFormMode = '';
  isVisible = false;
  isOkLoading = false;
  validateForm: FormGroup;

  demoValue = 100;
  formatterPercent = (value: number) => `${value} %`;
  parserPercent = (value: string) => value.replace(' %', '');
  formatterDollar = (value: number) => `$ ${value}`;
  parserDollar = (value: string) => value.replace('$ ', '');

  constructor(
    public http: HttpClient,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getVoucherList();
    this.validateForm = this.fb.group({
      voucher_code: [null, [Validators.required]],
      type: [null, [Validators.required]],
      value: [0, [Validators.required]],
      start_date: [null],
      expire_date: [null],
      limit: [0],
      status: ['inactive', [Validators.required]],
    });
  }

  getVoucherList() {
    this.http.get(environment.api_url + '/voucher?page=1&row=999').subscribe(data => {
      console.log(data);
      this.voucherData = data['result'];
    });
  }

  showModal(type, voucher?) {
    switch (type) {
      case 'add': {
        this.currFormMode = 'add';
        this.resetForm();
        this.isVisible = true;
        break;
      }
      case 'edit': {
        this.currFormMode = 'edit';
        this.currVoucher = voucher;
        this.validateForm.patchValue({
          voucher_code: voucher.voucher_code,
          type: voucher.type,
          value: voucher.value,
          start_date: moment(voucher.start_date).toISOString(),
          expire_date: moment(voucher.expire_date).toISOString(),
          limit: voucher.limit,
          status: voucher.status
        });
        this.isVisible = true;
        break;
      }
    }
  }

  handleOk(): void {
    console.log(this.validateForm.value);

    this.isOkLoading = true;
    switch (this.currFormMode) {
      case 'add': {
        this.http.post(environment.api_url + '/voucher', this.validateForm.value).subscribe(
          success => {
            console.log(success);
            this.isVisible = false;
            this.isOkLoading = false;
            this.resetForm();
            this.getVoucherList();
          }, error => {
            console.log(error);
          }
        );
        break;
      }
      case 'edit': {
        this.http.put(environment.api_url + '/voucher', this.validateForm.value).subscribe(
          success => {
            console.log(success);
            this.isVisible = false;
            this.isOkLoading = false;
            this.getVoucherList();
            this.resetForm();
          }, error => {
            console.log(error);
          }
        );
        break;
      }
    }
  }

  handleCancel(): void {
    this.currFormMode = '';
    this.resetForm();
    this.isVisible = false;
  }

  resetForm() {
    this.validateForm.reset({
      voucher_code: null,
      type: null,
      value: 0,
      start_date: moment().toISOString(),
      expire_date: moment().toISOString(),
      limit: 0,
      status: null
    });
  }


}
