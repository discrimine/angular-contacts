import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from '../../services/user.model';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { merge, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  private id: number;
  private user: User;
  private errorMsg: any;

  constructor(private route: ActivatedRoute, private router: Router, private usersService: UsersService) {
    this.id = 0;
    this.errorMsg = [{
      warning : [
      ],
      critical : [
      ]
    }];
    this.user = {
      id: 0,
      nameFirst: '',
      nameLast: '',
      email: '',
      birthday: ''
    };
   }

  getUser(): Observable<User> {
    return this.usersService.getUser(this.id);
  }

  loadUser(user: User): void {
    this.user = user;
  }

  showUser(): void {
    this.getUser()
    .subscribe(
      (user: User) => this.loadUser(user),
      (error: HttpErrorResponse) => this.catchErr(error)
    );
  }

  catchErr(error): void {
    error.errors.map( err => {
      if (err.status === '503' || err.status === '504') {
        this.errorMsg[0].warning.push(err);
      } else {
        this.errorMsg[0].critical.push(err);
      }
    });
  }

  userEdit(event: any, editName, editSurname, editDate, editEmail ): void {
    const body = JSON.stringify({
      'data': {
        'type' : 'human', 'id': this.id,
        'attributes' : {
          'name_first' : editName.value,
          'name_last' : editSurname.value,
          'birthday' : editDate.value,
          'email' : editEmail.value
        }
      }
    });
    this.usersService.changeUser(this.id, body)
    .pipe(
      mergeMap( (): Observable<User> => {
        return this.getUser();
      })
    )
    .subscribe(
      (user: User) => this.loadUser(user),
      (error: HttpErrorResponse) => this.catchErr(error)
    );
    alert('successfully changed');
  }

  userDelete(): void {
    this.usersService.deleteUser(this.id)
    .subscribe(
      (response: boolean) => {
        console.log(response);
      },
      (error) => this.catchErr(error)
    );
    alert('successfuly deleted');
    this.router.navigate(['/fullList']);
  }

  ngOnInit() {
    this.route.params
    .subscribe( params => {
      this.id = + params['id'];
    });
    this.showUser();
  }

}
