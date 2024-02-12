import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login} from '../models/login';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUrl = "http://localhost:5000/api/login";
  constructor(private http: HttpClient,private router: Router) { }

  signInUser(user:Login) {
    return this.http.post<Login>(this.loginUrl, user);
  }
  
  loggedIn() {
    return localStorage.getItem('token');
  }


  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
