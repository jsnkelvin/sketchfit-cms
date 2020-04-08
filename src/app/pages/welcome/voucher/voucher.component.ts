import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('inputElement', { static: false }) inputElement: ElementRef;
  voucherData = '';
  currVoucher: any;
  currFormMode = '';
  isVisible = false;
  isOkLoading = false;
  validateForm: FormGroup;
  value = '';
  title = 'Input a number';

  demoValue = 100;
  formatterPercent = (value: number) => `${value} %`;
  parserPercent = (value: string) => value.replace(' %', '');
  formatterDollar = (value: number) => `$ ${value}`;
  parserDollar = (value: string) => value.replace('$ ', '');

  constructor(
    public http: HttpClient,
    private fb: FormBuilder
  ) { }

  onChange(value: string): void {
    this.updateValue(value);
  }

  // '.' at the end or only '-' in the input box.
  onBlur(): void {
    if (this.value.charAt(this.value.length - 1) === '.' || this.value === '-') {
      this.updateValue(this.value.slice(0, -1));
    }
  }

  updateValue(value: string): void {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
      this.value = value;
    }
    this.inputElement.nativeElement.value = this.value;
    this.updateTitle();
  }

  updateTitle(): void {
    this.title = (this.value !== '-' ? this.formatNumber(this.value) : '-') || 'Input a number';
  }

  formatNumber(value: string): string {
    const string = `${value}`;
    const list = string.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
  }

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
      data['result'].forEach(element => {
        console.log(element);
        element.updatedAt = moment(element.updatedAt).fromNow();
      });
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
        this.isVisible = true;
        this.validateForm.patchValue({
          voucher_code: voucher.voucher_code,
          type: voucher.type,
          value: voucher.value,
          start_date: moment(voucher.start_date).toISOString(),
          expire_date: moment(voucher.expire_date).toISOString(),
          limit: voucher.limit,
          status: voucher.status
        });
        break;
      }
    }
  }

  handleOk(): void {
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
