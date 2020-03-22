import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-voucher',
  templateUrl: './detail-voucher.component.html',
  styleUrls: ['./detail-voucher.component.scss']
})
export class DetailVoucherComponent implements OnInit {
  voucher_code: any;
  dataDetail
  count: any;
  constructor(private http:HttpClient, private route: ActivatedRoute, private router: Router) {
    route.params.subscribe(paramData => {
      this.voucher_code = paramData.id
      if(!paramData){
        this.router.navigate(['voucher'])
      }else{
        this.getData()
      }
    })
  }

  ngOnInit() {

  }

  getData(){
    this.http.get(environment.api_url + '/voucher/used/' + this.voucher_code).subscribe(data => {
      console.log(data)
      const dt:any = data
      this.dataDetail = dt.result
      this.count = dt.count
    })
  }

}
