import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { take } from 'rxjs';
import { UserType } from '../../types/user-type';
import { UserSorter } from '../_helpers/user-sorter';
import { LastnameUserSorter } from '../_helpers/lastname-user-sorter';
import { RoleUserSorter } from '../_helpers/role-user-sorter';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public users: Array<UserType> = []
  private usersToDelete: Array<UserType> = []
  
  private sorters: Map<string, UserSorter> = new Map([
    ['lastname', new LastnameUserSorter()],
    ['role', new RoleUserSorter]
  ])

  public mainCheckboxState: boolean = false
  public checkboxesState: boolean[] = []

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.service.findAll().pipe(
      take(1) // Get first emit then close subscription
      ).subscribe({
        next: (users: Array<UserType>) => {
          // Your logic goes here
          this.users = users

          this.checkboxesState = this.users.map(() => false)
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

  // Check if all the checkboxes are checked
  allCheckboxesChecked() {
    return this.checkboxesState.every(state => state)
  }

  toggleMainCheckbox(): void {
    this.mainCheckboxState = !this.mainCheckboxState
    this.checkboxesState.fill(this.mainCheckboxState)
    // Delete all users or delete none
    if (this.mainCheckboxState) {
      for (let user in this.users) {
        this.usersToDelete[user] = this.users[user]
      }
    }
    else {
      this.usersToDelete = []
    }
  }

  // toggle main checkbox if you toggle a checkbox in the list
  toggleCheckbox(index: number) {
    this.checkboxesState[index] = !this.checkboxesState[index]
    this.mainCheckboxState = this.allCheckboxesChecked()
    // Delete user if checkbox is checked
    if (this.checkboxesState[index]) {
      this.usersToDelete[index] = this.users[index]
    }
    else {
      this.usersToDelete.splice(index, 1)
    }
  }

  onDelete(): void {
    this.service.delete(this.usersToDelete).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(`Got ${response.status} : ${JSON.stringify(response.body)}`)
      },
      error: (error) => {
        // Deal with error
      }
    })
  }
}