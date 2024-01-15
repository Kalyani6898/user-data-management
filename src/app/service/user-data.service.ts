import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserData } from '../module/user.module';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private http: HttpClient) {}

  apiUrl: String = 'https://dummyjson.com/users';

  /**
   *
   * @returns user data fetched from API
   */
  getUserData(): Observable<UserData> {
    return this.http.get<UserData>(`${this.apiUrl}`).pipe(
      tap((data) => {
        console.log('Dummy data API called:-', data);
        return data;
      })
    );
  }
}
