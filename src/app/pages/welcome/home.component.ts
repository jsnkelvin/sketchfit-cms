import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isCollapsed = false;
  constructor(public router: Router, public modalService: NzModalService) { }

  ngOnInit() {
  }

  logoutConfirm(){
    this.modalService.confirm({
      nzTitle: 'Log Out?',
      nzContent: '<b style="color: red;">Are You Sure want to logout ?</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {this.logout()},
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  logout(){
    localStorage.removeItem('usr')
    this.router.navigate(['login'])
  }

}
