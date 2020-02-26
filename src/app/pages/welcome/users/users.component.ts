import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { differenceInCalendarYears } from 'date-fns';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userData = [];
  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

  ngOnInit() {
    this.http.get(environment.api_url + '/user?page=1&row=999').subscribe(data => {
      console.log(data);
      this.userData = data['result'];
      this.userData.forEach(element => {
        element.age = differenceInCalendarYears(new Date(), element.date_of_birth);
      });
    });
  }

}
