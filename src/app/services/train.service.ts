import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CtaResponse } from '../models/eta';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  eta: any;
  constructor(
    private http: HttpClient
  ) { }

  getTrains() {
    return this.http.get<CtaResponse>('http://localhost:3000/trains')
  }

}
