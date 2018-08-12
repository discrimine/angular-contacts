import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../user.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-full-list',
  templateUrl: './full-list.component.html',
  styleUrls: ['./full-list.component.css']
})
export class FullListComponent implements OnInit {

  constructor(private usersService: UsersService, titleService: Title, meta: Meta) { 
    titleService.setTitle('Full list of your contacts');
    meta.addTag({ name: 'keywords', content: 'full, list, contacts' });
    meta.addTag({ name: 'description', content: 'full list of your contacts' })
  }

  users;

  sortById(){
    this.usersService.getUsers("http://angulartest.vivasg.com/human?sort=id").subscribe(users => {
      this.users = users;
    })
  };
  sortByFirstName(){
    this.usersService.getUsers("http://angulartest.vivasg.com/human?sort=name_first").subscribe(users => {
      this.users = users;
    })
  };
  sortByLastName(){
    this.usersService.getUsers("http://angulartest.vivasg.com/human?sort=name_last").subscribe(users => {
      this.users = users;
    })    
  };
  sortByBirth(){
    this.usersService.getUsers("http://angulartest.vivasg.com/human?sort=birthday").subscribe(users => {
      this.users = users;
    })    
  };
  sortByEmail(){
    this.usersService.getUsers("http://angulartest.vivasg.com/human?sort=email").subscribe(users => {
      this.users = users;
    })
  };

  ngOnInit() {
    this.usersService.getUsers("http://angulartest.vivasg.com/human?sort=email").subscribe(users => {
        this.users = users;
    })
  }

}
