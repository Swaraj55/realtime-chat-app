import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {SESSION_STORAGE, StorageService, StorageTranscoders} from 'ngx-webstorage-service';
import { User } from '../user';

const CURRENT_USER = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  theAuthenticatedUser: any;

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
              private httpClient: HttpClient
  ) {

    // Populate the Behavior Subject with an initial value, the logged in user.
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public loggedIn(payload) {
    let apiEndpoint = '/api/login';
    return this.httpClient.post<any>(apiEndpoint, payload)
          .pipe(map(authResponse => {
            this.theAuthenticatedUser =  {
              email: authResponse.user.email,
              password: authResponse.user.password,
              room: authResponse.user.room,
              token: authResponse.token,
              status: authResponse.status,
              name: authResponse.user.name
            };
            if(authResponse && authResponse.token) {
              localStorage.setItem('user', JSON.stringify(this.theAuthenticatedUser));
              this.storage.set(CURRENT_USER, this.theAuthenticatedUser, StorageTranscoders.JSON);
            }
            //localStorage.setItem('user', JSON.stringify(this.theAuthenticatedUser));
            //this.storage.set(CURRENT_USER, this.theAuthenticatedUser, StorageTranscoders.JSON);
            // Set the current user's profile. This can be accessed by other components by injecting
            // this service and subscribing to currentUserValue.
            this.currentUserSubject.next(authResponse);

            return this.currentUserValue; 
          }));
  }

  isLoggedIn() {
    let item = JSON.parse(localStorage.getItem('user'));
    return !!item.token;
  }

  // getToken() {
  //   console.log(JSON.parse(localStorage.getItem('user')))
  //   return JSON.parse(localStorage.getItem('user'))
  // }
}
