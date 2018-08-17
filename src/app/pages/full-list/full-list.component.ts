import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Title, Meta } from '@angular/platform-browser';
import { Observable } from 'rxjs/internal/Observable';
import { FormControl, Validators, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-full-list',
  templateUrl: './full-list.component.html',
  styleUrls: ['./full-list.component.css']
})

export class FullListComponent implements OnInit {

  private users: any;
  private rForm: FormGroup;
  private showAddCont: Boolean;
  private tryAdd: Boolean;

  constructor(private usersService: UsersService, private titleService: Title, private meta: Meta, fb: FormBuilder) {
    this.users = undefined;
    this.rForm = fb.group({
      'first_name' : [null, [Validators.required]],
      'last_name' : [null, [Validators.required]],
      'birthday' : [null, [Validators.required]],
      'email' : [null, [Validators.required, Validators.email]]
    });
    this.showAddCont = false;
    this.tryAdd = false;
  }

  usersSort(kind) {
    this.usersService.sortUsers(kind)
    .subscribe( (users) => {
      this.users = users;
    });
  }

  userDelete(id) {
    this.usersService.deleteUser(id.innerText);
    this.usersService.getUsers('id', '999', '0')
    .subscribe(users => {
      this.users = users;
    });
  }

  userAdd(event: any, newName, newSurname, newDate, newEmail) {
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
      this.usersService.addUser(JSON.stringify(bodyObj));
      this.usersService.getUsers('id', '999', '0')
      .subscribe( (users) => {
        this.users = users;
      });
    } else {
      this.tryAdd = true;
    }
  }

  user_filter(e, type, filterValue) {
    this.usersService.getUsers('id', '999', '0', type, filterValue.value).subscribe(users => {
      this.users = users;
    });
  }

  ngOnInit() {
    this.titleService.setTitle('Full list of your contacts');
    this.meta.addTag({ name: 'keywords', content: 'full, list, contacts' });
    this.meta.addTag({ name: 'description', content: 'full list of your contacts' });

    this.usersService.getUsers('id', '999', '0')
    .subscribe(users => {
      this.users = users;
    });

  }
}
