import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcomes/welcome.component';
import { NzCardModule, NzGridModule, NgZorroAntdModule, NzPaginationModule, NzInputModule, NzSelectModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DetailedComponent } from './detailed/detailed.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { HomeComponent } from './home.component';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';
import { ReviewComponent } from './review/review.component';
import { ExchangeComponent } from './exchange/exchange.component';



@NgModule({
  imports: [WelcomeRoutingModule,
    CommonModule,
    FormsModule,
    NzGridModule,
    NzPaginationModule, NgZorroAntdModule, NzModalModule, NzCardModule,
    NzButtonModule,
    NzSelectModule,
    NzPopconfirmModule,
    NzInputModule,
    NzMessageModule],
  declarations: [WelcomeComponent, DetailedComponent, HomeComponent, ReviewComponent, ExchangeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
