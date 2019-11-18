import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup
  userData = {
    username: 'sketchfitadmin',
    password: 'Asdf123!'
  }
  constructor(fb: FormBuilder, public router: Router, public nzMessageService: NzMessageService) {
    this.validateForm = fb.group({
      userName: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  ngOnInit() {
    if(localStorage.getItem('usr')){
      this.router.navigate(['/welcome/list'])
    }
  }

  submitForm(){
    const valData = this.validateForm.value
    if(valData.userName === this.userData.username && valData.password === this.userData.password){
      this.nzMessageService.success('Login Berhasil!')
      localStorage.setItem('usr',JSON.stringify(this.userData).toString())
      this.router.navigate(['/welcome/list'])
    }else{
      this.nzMessageService.error('Username atau Password Salah!')
    }
  }

}
