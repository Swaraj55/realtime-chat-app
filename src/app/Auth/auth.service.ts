import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {SESSION_STORAGE, StorageService, StorageTranscoders} from 'ngx-webstorage-service';
import { User } from '../../@discover-chat/user';

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
    this.currentUserSubject = new BehaviorSubject<User>(storage.get(CURRENT_USER, StorageTranscoders.JSON));
    
    this.currentUser = this.currentUserSubject.asObservable();
    console.log(this.currentUser.subscribe((data: any) => {
      // console.log("Data",data)
    }))
   }

  public get currentUserValue(): User {
    //console.log(this.currentUserSubject.value)
   return this.currentUserSubject.value;
  }

  public loggedIn(payload) {
    let apiEndpoint = 'http://localhost:3000/api/login';
    return this.httpClient.post<any>(apiEndpoint, payload)
          .pipe(map(authResponse => {
            this.theAuthenticatedUser =  {
              email: authResponse.user.email,
              password: authResponse.user.password,
              room: authResponse.user.room,
              token: authResponse.token,
              status: authResponse.status
            };

            this.storage.set(CURRENT_USER, this.theAuthenticatedUser, StorageTranscoders.JSON);

            // Set the current user's profile. This can be accessed by other components by injecting
            // this service and subscribing to currentUserValue.
            this.currentUserSubject.next(this.theAuthenticatedUser);

            return this.currentUserValue; 
          }));
  }

  isLoggedIn() {
    let item = JSON.parse(sessionStorage.getItem('currentUser'));
    console.log(item.token)
    return !!item.token;
  }

  public getToken(): string {
    return localStorage.getItem('token')
  }
}
