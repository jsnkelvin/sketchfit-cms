import { Component, OnInit } from '@angular/core';
import { distanceInWords } from 'date-fns';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {

  exchangeData = [];

  constructor(
    private http:HttpClient
  ) { }

  ngOnInit() {
    this.http.get(environment.api_url + '/get_transaction?filter=exchange').subscribe(data => {
      this.exchangeData = data['result'];
      console.log(this.exchangeData);
      this.exchangeData.forEach(element => {
        element.datetime = distanceInWords(new Date(), element.exchange_date);
      });
    });
  }

}
