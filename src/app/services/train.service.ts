import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CtaResponse } from '../models/eta';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  eta: any;
  baseUrl = environment.baseUrl;
  constructor(
    private http: HttpClient
  ) { }

  getTrains() {
    return this.http.get<CtaResponse>(this.baseUrl + '/trains')
  }

  getStopName() {
    return this.http.get<String>(this.baseUrl + '/stopName')
  }
}
