import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  eta: any;
  constructor(
    private http: HttpClient
  ) { }

  getTrains() {
    return this.http.get('http://localhost:3000/trains');
  }

}
