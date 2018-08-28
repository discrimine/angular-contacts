import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Title, Meta } from '@angular/platform-browser';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

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
  }

  usersSort(kind): void{
    this.usersService.sortUsers(kind)
    .subscribe( (users) => {
      this.users = users
    });
  }

  userDelete(id): void{
    let confirmDelete = confirm('are u sure?');
    if (confirmDelete){
      this.usersService.deleteUser(id.innerText);
    }
  }

  userAdd(event, newName, newSurname, newDate, newEmail): void{
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
      // .success(() => {
      //   this.usersService.getUsers()
      //   .subscribe( (users) =>{
      //     this.users = users;
      //   })
      // })
    } else {
      this.tryAdd = true;
    }
  }

  user_filter(event, filterType, filterValue) {
    this.usersService.getUsers({
      filterType : filterType,
      filterValue : filterValue.value
    })
    .subscribe( (users) => {
      this.users = users
    });
  }

  ngOnInit() {
    this.titleService.setTitle('Full list of your contacts');
    this.meta.addTag({ name: 'keywords', content: 'full, list, contacts' });
    this.meta.addTag({ name: 'description', content: 'full list of your contacts' });

    this.usersService.getUsers({
      sort : 'id',
    })
    .subscribe( (users) => {
      this.users = users
    })

  }
}
