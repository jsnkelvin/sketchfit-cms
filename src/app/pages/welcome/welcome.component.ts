import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  loading = false;
  data:any;

  constructor(
    private http: HttpClient,
  ) {

  }

  ngOnInit() {
    this.http.get('http://test-api.sketchfit.com/api/v1/admin/get_transaction?page=1&row=50&filter=styling').subscribe(success => {
      console.log('SUCCESS', success);
      this.data = success['result'];
    }, err => {
      console.log('ERROR', err);
    });
  }

}
