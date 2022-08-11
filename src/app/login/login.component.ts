import { Component, OnInit } from '@angular/core';
import { SharedService } from '../Shared/shared.service';
import { EncrDecrService } from '../Shared/encr-decr.service';
import { FormBuilder,  Validators, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm! : FormGroup;

  constructor(private sharedService:SharedService, private encrDecrService:EncrDecrService,  public formBuilder: FormBuilder,private route: Router) { }

  ngOnInit(): void {

    this.loginForm= this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.required],
    })
  }

  get myForm() {
    return this.loginForm.controls;
  }
  onSubmit():void {
    this.sharedService.showloader()
     let encyptredPassword=this.encrDecrService.encryptValue(this.loginForm.value.password)
      this.sharedService.getUserData(this.loginForm.value.email).subscribe((data) => {
        data=data[Object.keys(data)[0]];
        this.sharedService.notaValidUser()
        if(data ==undefined){
          this.sharedService.toaster('Unautorized User');
        }
        else if( encyptredPassword!=data?.password)  this.sharedService.toaster('Email or Password is incorrect')
        else{
          this.sharedService.validUser()
          this.route.navigateByUrl('dashboard')
        }

        this.loginForm.reset();
        this.sharedService.hideloader();
      },
        (error) => {
          this.sharedService.hideloader();
          this.sharedService.toaster('Unautorized User')
        });
      }

}
