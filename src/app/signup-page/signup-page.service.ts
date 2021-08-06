import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SignupPageService {

  basicURL = 'http://localhost:3000/api/signup'

  constructor(private httpClient: HttpClient) { }

  singupUser(payload: any) {
    return this.httpClient.post<any>(this.basicURL, payload)
  }
  
}
