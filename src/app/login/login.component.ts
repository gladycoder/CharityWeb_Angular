import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginFormGroup!: FormGroup;
  constructor(private fb: FormBuilder,private authService:AuthService,private router : Router){
    this.loginFormGroup = this.fb.group({
      email: [''],
      password: [''],
    });
  }
  onSubmit(){
    console.log(this.loginFormGroup.value);
    this.authService.signInUser(this.loginFormGroup.value)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.accessToken);
          this.router.navigate(['/']);
        },
        err => console.log(err)
      )
  }
  }

