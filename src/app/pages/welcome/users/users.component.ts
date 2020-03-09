import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild('search', { static: true }) search: ElementRef;

  userData = [];
  totalItems = 0;
  pageIndex = 1;
  currFilter = '';
  currKeyword = '';
  pageSize = '8';
  searchValue;
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

}
