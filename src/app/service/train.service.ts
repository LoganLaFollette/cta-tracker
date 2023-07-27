import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CtaResponse } from '../model/eta';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

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

  // TODO: refactor API for efficient usage
  getStopName() {
    let stopName: Observable<String>;
    try {
      stopName = this.http.get<String>(this.baseUrl + '/stopName')
    } catch (e) {
      console.log(e);
    }
    
    return stopName;
  }
}
