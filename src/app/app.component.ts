import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-init'

  public counter: number = 0
  private counterInterval: any

  public users: Array<any> = [
    {
      id: 1,
      lastname: 'WICK',
      firstname: 'John'
    },
    {
      id: 2,
      lastname: 'BOND',
      firstname: 'James'
    },
    {
      id: 3,
      lastname: 'MONKEY D.',
      firstname: 'Luffy'
    }
  ]

  public showPassword = false
  private showTimeout: any

  ngOnInit(): void {
    this.counterInterval = setInterval(
      () => this.counter++, 1000
    )
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
}