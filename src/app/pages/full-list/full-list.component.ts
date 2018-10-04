import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Title, Meta } from '@angular/platform-browser';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { User } from '../../services/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-full-list',
  templateUrl: './full-list.component.html',
  styleUrls: ['./full-list.component.css']
})

export class FullListComponent implements OnInit {

  private rForm: FormGroup;
  private tryAdd: boolean;
  private showAddCont: boolean;
  private errorMsg: any;
  private apiParams: any;
  private users: User[];
  private paginationFlag: boolean;
  private pageArray: any;

  constructor(
    private usersService: UsersService,
    private titleService: Title,
    private meta: Meta,
    fb: FormBuilder,
  ) {
    this.rForm = fb.group({
      'nameFirst' : ['', [Validators.required]],
      'nameLast' : ['', [Validators.required]],
      'birthday' : ['', [Validators.required]],
      'email' : ['', [Validators.required, Validators.email]]
    });
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
    this.paginationFlag = false;
    this.pageArray = [];
  }

  getUsers(): Observable<User[]> {
    return this.usersService.getUsers(this.apiParams);
  }

  loadUsers(users: User[]): void {
    this.users = users;
  }

  showUsers(): void {
    this.getUsers()
    .subscribe(
      (users: User[]) => {
        this.loadUsers(users);
        this.users.length < 81 ? this.paginationFlag = true : this.paginationFlag = false;
        this.usersOnPage();
      },
      (error: HttpErrorResponse) => this.catchErr(error)
    );
  }

  catchErr(error): void {
    error.errors.map( err => {
      if (err.status === '503' || err.status === '504') {
        this.errorMsg[0].warning.push(err);
        setTimeout( () => {
          this.errorMsg[0].warning.pop();
        }, 5000);
      } else {
        this.errorMsg[0].critical.push(err);
        setTimeout( () => {
          this.errorMsg[0].critical.pop();
        }, 5000);
      }
    });
  }

  usersSort(kind): void {
    this.apiParams.sort = kind;
    this.showUsers();
  }

  userDelete(id): void {
    const confirmDelete = confirm('are u sure?');
    if (confirmDelete) {
      this.usersService
      .deleteUser(id.innerText)
      .pipe(
        mergeMap(
          (): Observable<User[]> => {
            return this.getUsers();
          }
        )
      )
      .subscribe(
        (users: User[]) => this.loadUsers(users),
        (error: HttpErrorResponse) => this.catchErr(error)
      );
    }
  }

  userAdd(event, newName, newSurname, newDate, newEmail): void {
    if (this.rForm.valid) {
      const bodyObj: User = this.rForm.value;
      this.showAddCont = false;
      this.tryAdd = false;
      this.usersService.addUser(bodyObj)
      .pipe(
        mergeMap(
          (): Observable<User[]> => {
            return this.getUsers();
          }
        )
      )
      .subscribe(
        (users: User[]) => this.loadUsers(users),
        (error: HttpErrorResponse) => this.catchErr(error)
      );
      alert('new cont is added');
    } else {
      this.tryAdd = true;
    }
  }

  userFilter(event, filterType, filterValue): void {
    this.apiParams.filterType = filterType;
    this.apiParams.filterValue = filterValue.value;
    this.showUsers();
  }

  usersOnPage(amount?: number) {
    this.apiParams.count = amount;
    const pageCount = Math.ceil(81 / this.apiParams.count);
    if (this.paginationFlag === true) {
      for (let i = 1; i < pageCount; i++) {
        this.pageArray.push(i);
      }
    }
  }

  ngOnInit() {
    this.titleService.setTitle('Full list of your contacts');
    this.meta.addTag({ name: 'keywords', content: 'full, list, contacts' });
    this.meta.addTag({ name: 'description', content: 'full list of your contacts' });

    this.showUsers();
  }
}
