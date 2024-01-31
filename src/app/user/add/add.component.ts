import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {
  public form: FormGroup = new FormGroup({})

  constructor(
    private _formBuilder: FormBuilder,
    private _service: UserService
    ) {}

  get c(): {[key: string]: AbstractControl} {
    return this.form.controls
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      lastname: ['', [Validators.required]],
      firstname: [],
      birthdate: ['', [Validators.required]],
      role_id: ['', Validators.required]
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