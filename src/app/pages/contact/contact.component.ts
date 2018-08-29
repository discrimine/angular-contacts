import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { mergeMap } from 'rxjs/operators';
import { Observable  } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  private id: number;
  private users: any;
  private errorMsg: any;

  constructor(private route: ActivatedRoute, private router: Router, private usersService: UsersService) {
    this.id = 0;
    this.users = {};
   }

  user_edit(event: any, editName, editSurname, editDate, editEmail ) {
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
      mergeMap(
        (): Observable<any> => {
          return this.usersService.getUser(this.id);
        }
      )
    )
    .subscribe(
      (users: any[]) => {
        this.users = users['attributes'];
      }
    );
    alert('successfully changed');
  }

  user_delete() {
    this.usersService.deleteUser(this.id)
    .pipe(
      mergeMap(
        (): Observable<any> => {
          return this.usersService.getUsers({
            sort : 'id',
          });
        }
      )
    )
    .subscribe(
      (users: any[]) => {
        this.users = users;
      }
    );
    alert('successfuly deleted');
    this.router.navigate(['/fullList']);
  }

  ngOnInit() {
    this.route.params
    .subscribe( params => {
      this.id = + params['id'];
    });
    this.usersService.getUser(this.id)
    .subscribe(
    (users) => {
      this.users = users['attributes'];
    },
    (error) => this.errorMsg = error.errors
  );

  }

}
