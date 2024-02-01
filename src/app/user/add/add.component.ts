import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { HttpResponse } from '@angular/common/http';
import {provideNativeDateAdapter} from '@angular/material/core';

interface RoleIds {
  value: number;
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
  providers: [provideNativeDateAdapter()],
})

export class AddComponent {
  public form: FormGroup = new FormGroup({})
  public startDate = new Date(2000, 5, 15)
  public minDate: Date = new Date()
  public maxDate: Date = new Date()
  roleControl = new FormControl<RoleIds | null>(null, Validators.required);

  constructor(private _formBuilder: FormBuilder, private _service: UserService) {
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
    this.form = this._formBuilder.group({
      lastname: ['', [Validators.required]],
      firstname: [],
      birthdate: ['', [Validators.required]],
      role_id: ['', [Validators.required]]
    })
  }

  onSubmit(): void {
    this._service.add(this.form.value).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(`Got ${response.status} : ${JSON.stringify(response.body)}`)
      },
      error: (error) => {
        // Deal with error
      }
    })
  }
}