import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from '../type/userdata.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
baseUrl :string  ='https://dummyjson.com/users';
  constructor(private http: HttpClient) {
   }
   fetchUserData():  Observable<UserData>{
    return this.http.get<UserData>(this.baseUrl);
  }

}
