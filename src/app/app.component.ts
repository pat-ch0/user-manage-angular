import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserType } from './types/user-type';
import { IsSelectedType } from './types/selected-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-init'

  public users: Array<UserType & IsSelectedType> = [
    {
      id: 1,
      lastname: 'WICK',
      firstname: 'John',
      role: 'Admin',
    },
    {
      id: 2,
      lastname: 'BOND',
      firstname: 'James',
      role: 'Contributor',
    },
    {
      id: 3,
      lastname: 'MONKEY D.',
      firstname: 'Luffy',
      role: 'Visitor',
    }
  ]

  public showPassword = false
  private showTimeout: any
  public counter: number = 0
  private counterInterval: any
  public buttonState = 0
  public buttonStateContent = ''


  ngOnInit(): void {
    /* this.counterInterval = setInterval(
      () => this.counter++, 1000
    ) */
  }

  ngOnDestroy(): void {
    clearInterval(this.counterInterval)
    clearTimeout(this.showTimeout)
  }

  toggleShowPassword() {
    this.showPassword = true
    this.showTimeout = setTimeout(
      () => this.showPassword = false, 2000
    )
  }

  toggleUserSelection(user: UserType & IsSelectedType): void {
    user.isSelected = !user.isSelected
  }

  removeUser(user: UserType): void {
    this.users.splice(this.users.indexOf(user), 1)
  }

  handleUserSelection(): void {
    console.log("start", this.buttonState)
    if (this.buttonState === 0 || this.buttonState === 1) {
      this.users.map((user) => {
        user.isSelected = this.buttonState === 0 ? true : false
        return user
      })
      this.buttonState = this.buttonState === 0 ? 1 : 0
      this.buttonStateContent = this.buttonState === 1 ? 'x' : ''
      console.log("fin", this.buttonState)
    }
  }

  public getSelectedUsers(): number {
    return this.users.filter((user) => user.isSelected).length
  }
}