import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DetailService } from 'src/app/shared/detail.service';
import { environment } from 'src/environments/environment';

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
    public router: Router,
    private detailSrv: DetailService
  ) {

  }

  ngOnInit() {
    if(localStorage.getItem('usr')){
      this.http.get(environment.api_url + '/get_transaction?page=1&row=50').subscribe(success => {
        console.log('SUCCESS', success);
        this.data = success['result'];
      }, err => {
        console.log('ERROR', err);
      });  
    }else{
      this.router.navigate(['/login'])
    }
    
  }

  detailed(item){
    console.log(item)
    this.detailSrv.paramTransaction = item
    this.router.navigate(['welcome/detail'])
  }

  filter(filter: string){
    this.data = null
    if(filter === 'reset'){
      this.http.get(environment.api_url + '/get_transaction?page=1&row=50').subscribe(success => {
        console.log('SUCCESS', success);
        this.data = success['result'];
      }, err => {
        console.log('ERROR', err);
      });
      return;
    }
    
    this.http.get(environment.api_url + '/get_transaction?page=1&row=50&filter='+ filter).subscribe(success => {
      console.log('SUCCESS', success);
      this.data = success['result'];
    }, err => {
      console.log('ERROR', err);
    });
  }

}
