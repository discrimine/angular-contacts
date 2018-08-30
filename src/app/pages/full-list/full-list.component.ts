import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Title, Meta } from '@angular/platform-browser';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { mergeMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-full-list',
  templateUrl: './full-list.component.html',
  styleUrls: ['./full-list.component.css']
})

export class FullListComponent implements OnInit {

  private rForm: FormGroup;
  private users: any;
  private tryAdd: boolean;
  private showAddCont: boolean;
  private errorMsg: any;
  private apiParams: any;

  constructor(private usersService: UsersService, private titleService: Title, private meta: Meta, fb: FormBuilder) {
    this.rForm = fb.group({
      'first_name' : [null, [Validators.required]],
      'last_name' : [null, [Validators.required]],
      'birthday' : [null, [Validators.required]],
      'email' : [null, [Validators.required, Validators.email]]
    });
    this.users = [];
    this.showAddCont = false;
    this.tryAdd = false;
    this.errorMsg = [{
      warning : [
      ],
      critical : [
      ]
    }];
    this.apiParams = {
      sort : '',
      count : '',
      offset : '',
      filterType : '',
      filterValue : ''
    };
  }

  catchErr(error) {
    error.errors.map( err => {
      if (err.status === '503' || err.status === '504') {
        this.errorMsg[0].warning.push(err);
      } else {
        this.errorMsg[0].critical.push(err);
      }
    });
  }

  usersSort(kind): void {
    this.apiParams.sort = kind;
    this.usersService.getUsers(this.apiParams)
    .subscribe(
      (users: any[]) => this.users = users,
      (error) => this.catchErr(error)
    );
  }

  userDelete(id): void {
    const confirmDelete = confirm('are u sure?');
    if (confirmDelete) {
      this.usersService
      .deleteUser(id.innerText)
      .pipe(
        mergeMap(
          (): Observable<any> => {
            return this.usersService.getUsers(this.apiParams);
          }
        )
      )
      .subscribe(
        (users: any[]) => this.users = users,
        (error) => this.catchErr(error)
      );
    }
  }

  userAdd(event, newName, newSurname, newDate, newEmail): void {
    if (this.rForm.valid) {
      const bodyObj = {
        'data': {
          'type': 'human',
          'attributes' : {
            'name_first' : newName.value,
            'name_last' : newSurname.value,
            'birthday' : newDate.value,
            'email' : newEmail.value
          }
        }
      };
      alert('new cont is added');
      this.showAddCont = false;
      this.tryAdd = false;
      this.usersService.addUser(JSON.stringify(bodyObj))
      .pipe(
        mergeMap(
          (): Observable<any> => {
            return this.usersService.getUsers(this.apiParams);
          }
        )
      )
      .subscribe(
        (users: any[]) => this.users = users,
        (error) => this.catchErr(error)
      );
    } else {
      this.tryAdd = true;
    }
  }

  user_filter(event, filterType, filterValue) {
    this.apiParams.filterType = filterType;
    this.apiParams.filterValue = filterValue.value;
    this.usersService.getUsers(this.apiParams)
    .subscribe(
      (users) => this.users = users,
      (error) => this.catchErr(error)
    );
  }

  ngOnInit() {
    this.titleService.setTitle('Full list of your contacts');
    this.meta.addTag({ name: 'keywords', content: 'full, list, contacts' });
    this.meta.addTag({ name: 'description', content: 'full list of your contacts' });

    this.usersService.getUsers(this.apiParams)
    .subscribe(
      (users) => this.users = users,
      (error) => this.catchErr(error)
    );
  }
}
