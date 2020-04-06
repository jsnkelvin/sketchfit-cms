import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild('search', { static: true }) search: ElementRef;

  userData = [];
  pageIndex = 1;
  currFilter = '';
  currKeyword = '';
  pageSize = '8';
  searchValue;
  totalItems: any;
  isVisible = false;
  dateRange;

  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

  ngOnInit() {
    fromEvent(this.search.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      })
      , debounceTime(300)
      , distinctUntilChanged()
    ).subscribe((text: string) => {
      this.currKeyword = text;
      this.pageIndex = 1;
      this.getUserList();
    });

    this.getUserList();
  }

  getUserList() {
    this.http.get(environment.api_url +
      '/user?page=' + this.pageIndex +
      '&row=' + this.pageSize +
      '&search=' + this.currKeyword +
      '&filter=' + this.currFilter)
      .subscribe(success => {
        console.log('SUCCESS', success);
        this.userData = success['result'];
        this.totalItems = success['count'];
      }, err => {
        console.log('ERROR', err);
      });
  }

  exportData(startDate, endDate) {
    window.open(environment.api_url + '/user/export?start_date=' + startDate + '&end_date=' + endDate,'_blank');
  }

  indexChanged(event) {
    this.pageIndex = event;
    console.log('event', event);
    this.http.get(environment.api_url +
      '/user?page=' + event +
      '&row=' + this.pageSize +
      '&search=' + this.currKeyword +
      '&filter=' + this.currFilter)
      .subscribe(success => {
        console.log('SUCCESS', success);
        this.userData = success['result'];
        this.totalItems = success['count'];
      }, err => {
        console.log('ERROR', err);
      });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    const startDate = moment(this.dateRange[0]).format('YYYY-MM-DD');
    const endDate = moment(this.dateRange[1]).format('YYYY-MM-DD');
    console.log('Button ok clicked!', startDate, endDate);
    console.log(this.dateRange);
    this.exportData(startDate, endDate);
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  onChange(result: Date): void {
    // console.log('onChange: ', result);
  }

}
