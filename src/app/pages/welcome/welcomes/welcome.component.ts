import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DetailService } from 'src/app/shared/detail.service';
import { environment } from 'src/environments/environment';
import { NzPaginationComponent } from 'ng-zorro-antd';

export interface OrderData {
  response: string,
  count: number,
  result: any[]
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})


export class WelcomeComponent implements OnInit {
  @ViewChild(NzPaginationComponent, { static: false }) pagination: NzPaginationComponent;
  loading = false;
  data: any;
  totalItems = 0;
  pageIndex = 1;
  currFilter = '';
  pageSize = 8;

  constructor(
    private http: HttpClient,
    public router: Router,
    private detailSrv: DetailService,
  ) {
  }

  ngOnInit() {
    if (localStorage.getItem('usr')) {
      this.http.get<OrderData>(environment.api_url + '/get_transaction?page=1&row=8').subscribe(success => {
        console.log('SUCCESS', success);
        this.totalItems = success.count;
        this.data = success.result;
      }, err => {
        console.log('ERROR', err);
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  detailed(item) {
    console.log(item);
    this.detailSrv.paramTransaction = item;
    this.router.navigate(['welcome/detail']);
  }

  filter(filter: string) {
    this.pagination.updatePageIndexValue(1);
    this.currFilter = filter;
    const self = this;
    this.data = null;
    if (filter === 'reset') {
      this.currFilter = '';
      this.http.get<OrderData>(environment.api_url + '/get_transaction?page=1&row=8').subscribe(success => {
        console.log('SUCCESS', success);
        this.data = success.result;
      }, err => {
        console.log('ERROR', err);
      });
    } else {
      this.http.get<OrderData>(environment.api_url + '/get_transaction?page=1&row=8&filter=' + filter).subscribe(success => {
        this.totalItems = success.count;
        this.data = success.result;
      }, err => {
        console.log('ERROR', err);
      });
    }
  }

  indexChanged(event) {
    console.log('event', event);
    this.http.get<OrderData>(environment.api_url +
      '/get_transaction?page=' + event +
      '&row=8&filter=' + this.currFilter)
      .subscribe(success => {
        console.log('SUCCESS', success);
        this.totalItems = success.count;
        this.data = success.result;
      }, err => {
        console.log('ERROR', err);
      });
  }

}
