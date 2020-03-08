import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {

  voucherData = '';
  constructor(
    public http:HttpClient
  ) { }

  ngOnInit() {
    this.http.get(environment.api_url + '/voucher?page=1&row=999').subscribe(data => {
      console.log(data);
      this.voucherData = data['result'];
    });
  }

  editVoucher(voucher) {
    console.log("Masuk edit", voucher)
  }

}
