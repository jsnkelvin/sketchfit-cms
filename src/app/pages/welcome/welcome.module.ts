import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { NzCardModule, NzGridModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [WelcomeRoutingModule, CommonModule, NzGridModule, NzCardModule],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
