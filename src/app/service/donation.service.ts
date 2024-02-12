import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dontaion } from '../models/donation';

@Injectable({
  providedIn: 'root',
})
export class DonationService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:5000/api/fetch';
  createDonationUrl = 'http://localhost:5000/api/create';
  updateDonationUrl = 'http://localhost:5000/api/update';
  deleteDonationUrl = 'http://localhost:5000/api/delete';

  getDonation(): Observable<Dontaion[]> {
    return this.http.get<Dontaion[]>(this.baseUrl);
  }

  createDonation(donator: Dontaion): Observable<Dontaion> {
    donator._id = '0000';
    return this.http.post<Dontaion>(this.createDonationUrl, donator);
  }

  updateDonation(donator: Dontaion): Observable<Dontaion> {
    return this.http.put<Dontaion>(
      this.updateDonationUrl + '/' + donator._id,
      donator
    );
  }

  deleteDonation(_id: string): Observable<Dontaion> {
    return this.http.delete<Dontaion>(this.deleteDonationUrl + '/' + _id);
  }
}
