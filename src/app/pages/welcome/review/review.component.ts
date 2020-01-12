import { Component, OnInit } from '@angular/core';
import { distanceInWords } from 'date-fns';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  reviewData = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get(environment.api_url + '/get_transaction?filter=reviewed').subscribe(data => {
      this.reviewData = data['result'];
      console.log(this.reviewData);
      this.reviewData.forEach(element => {
        element.datetime = distanceInWords(new Date(), element.review_date);
      });
    });
  }

}
