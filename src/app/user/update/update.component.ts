import { Component } from '@angular/core';
import { UserType } from '../../types/user-type';
import { UserService } from '../services/user/user.service';
import { take } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { HttpResponse } from '@angular/common/http';

interface RoleIds {
  value: number;
}

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class UpdateComponent {
  public form: FormGroup = new FormGroup({})
  public users: Array<UserType> = []
  public startDate = new Date(2000, 5, 15)
  public minDate: Date = new Date()
  public maxDate: Date = new Date()

  constructor(private _formBuilder: FormBuilder, private service: UserService) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 145, 0, 1);
    this.maxDate = new Date(currentYear - 6, 11, 31);
  }

  roleIds: RoleIds[] = [
    {value: 1},
    {value: 2},
    {value: 3},
  ]

  get c(): {[key: string]: AbstractControl} {
    return this.form.controls
  }

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

    this.form = this._formBuilder.group({
      id: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      firstname: [],
      birthdate: ['', [Validators.required]],
      role_id: ['', [Validators.required]]
    })
  }

  onSubmit(): void {
    this.service.update(this.form.value).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(`Got ${response.status} : ${JSON.stringify(response.body)}`)
      },
      error: (error) => {
        // Deal with error
      }
    })
  }
}
