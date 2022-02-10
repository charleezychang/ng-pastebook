import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FetchService } from './fetch.service';
import { LoginModel } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isValidForm: boolean = false;

  loginModelObj: LoginModel = new LoginModel();
  
  userForm = new FormGroup({
    Email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/)
    ]),
    Password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder, private service: FetchService ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      Email : [''],
      Password : ['']
    })
  }

  // submitForm() {
  //   this.isValidForm = false;
  //    if (this.userForm.invalid) {
  //       return;
  //    }
  //    this.isValidForm = true;
  //    this.router.navigateByUrl("/");
  // }

  get Email() {
    return this.userForm.get('Email');
  }

  get Password() {
    return this.userForm.get('Password');
  }

  // postLoginDetails() {
  submitForm() {
    this.loginModelObj.Email = this.userForm.value.Email;
    this.loginModelObj.Password = this.userForm.value.Password;

    console.log(this.loginModelObj)

    this.service.postLogin(this.loginModelObj)
    .subscribe(res=>{
      console.log(res.toString());
      
      alert("yazzz")
      this.router.navigateByUrl("/");

    })
  }

}
