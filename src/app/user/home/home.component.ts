import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { take } from 'rxjs';
import { UserType } from '../../types/user-type';
import { UserSorter } from '../_helpers/user-sorter';
import { LastnameUserSorter } from '../_helpers/lastname-user-sorter';
import { RoleUserSorter } from '../_helpers/role-user-sorter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public users: Array<UserType> = []
  
  private sorters: Map<string, UserSorter> = new Map([
    ['lastname', new LastnameUserSorter()],
    ['role', new RoleUserSorter]
  ])

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.service.findAll().pipe(
      take(1) // Get first emit then close subscription
      ).subscribe({
        next: (users: Array<UserType>) => {
          // Your logic goes here
          this.users = users
        },
        error: (error) => {
          // Deal with error
        },
        complete: () => {
          // Nothing special, emission was completed
        }
      })
  }

  sort(onColumn: string): void {
    const sorter = this.sorters.get(onColumn)
    if (sorter) {
      this.users.sort(sorter.getSorter())
      return
    }
    throw new TypeError(`No candidate found for ${onColumn}`)
  }
}