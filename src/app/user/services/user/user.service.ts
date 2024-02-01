import { HttpClient, HttpResponse } from '@angular/common/http';
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

  add(user: any): Observable<HttpResponse<any>> {
    const userType = {
      id: null,
      lastname: user.lastname,
      firstname: user.firstname,
      birthdate: user.birthdate,
      role_id: user.role_id
    }
    return this.httpClient.post(
      `${environment.userApiRoot}users`, userType, {observe: 'response'}
      )
  }

  // parseDate is useless since we use a Date input
  private _parseDate(strDate: Date): Date {
    const parts = strDate.toString().split('/')
    return new Date (
      +parts[0], (+(parts[1]) - 1), +parts[2]
    )
  }
}