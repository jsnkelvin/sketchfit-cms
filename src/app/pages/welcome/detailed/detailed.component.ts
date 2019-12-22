import { Component, OnInit } from '@angular/core';
import { DetailService } from 'src/app/shared/detail.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


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

  constructor(
    detailSrv: DetailService,
    private httpClient: HttpClient,
    public router: Router,
    public nzMessageService: NzMessageService
  ) {
    if (detailSrv.paramTransaction) {
    this.data = detailSrv.paramTransaction;} else {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
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

}
