import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageModule, NzGridModule, NzCardModule, NzButtonModule, NzPopconfirmModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';


const routes: Routes = [{
    path: "",
    component: LoginComponent
  }];


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    NzInputModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NzFormModule,
    NzGridModule, NzCardModule, NzButtonModule, NzPopconfirmModule, NzMessageModule
  ]
})
export class LoginModule { }
