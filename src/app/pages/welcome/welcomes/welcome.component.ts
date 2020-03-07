import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DetailService } from 'src/app/shared/detail.service';
import { environment } from 'src/environments/environment';
import { NzPaginationComponent } from 'ng-zorro-antd';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from 'rxjs/operators';
import { of, fromEvent } from 'rxjs';

export interface OrderData {
  response: string;
  count: number;
  result: any[];
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})


export class WelcomeComponent implements OnInit {
  @ViewChild(NzPaginationComponent, { static: false }) pagination: NzPaginationComponent;
  @ViewChild('search', { static: true }) search: ElementRef;
  loading = false;
  data: any;
  totalItems = 0;
  pageIndex = 1;
  currFilter = '';
  pageSize = 8;
  searchValue;

  constructor(
    private http: HttpClient,
    public router: Router,
    private detailSrv: DetailService,
  ) {
  }

  ngOnInit() {
    if (localStorage.getItem('usr')) {
      this.getOrderList();
    } else {
      this.router.navigate(['/login']);
    }

    fromEvent(this.search.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      })
      , debounceTime(300)
      , distinctUntilChanged()
    ).subscribe((text: string) => {
      this.submitSearch(text).subscribe((success) => {
        console.log('submit search', success);
        this.totalItems = success.count;
        this.data = success.result;
      }, (err) => {
        console.log('error', err);
      });
    });
  }

  getOrderList() {
    this.http.get<OrderData>(environment.api_url + '/get_transaction?page=1&row=8').subscribe(success => {
      console.log('SUCCESS', success);
      this.totalItems = success.count;
      this.data = success.result;
    }, err => {
      console.log('ERROR', err);
    });
  }

  submitSearch(value) {
    return this.http.get<OrderData>(environment.api_url + '/get_transaction?page=1&row=8&search=' + value);
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
