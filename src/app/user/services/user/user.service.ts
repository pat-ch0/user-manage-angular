import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { UserType } from '../../../types/user-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Array<UserType>> {
    return this.httpClient.get<UserType[]>(`${environment.userApiRoot}users`)
  }
}