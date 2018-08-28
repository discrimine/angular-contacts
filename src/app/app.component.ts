import { Component } from '@angular/core';
import { UsersService } from './services/users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsersService]
})
export class AppComponent {
  title = 'адресная книга';
  users = [];
  add_cont;
  show_edit;

  constructor(private usersService: UsersService) {
  };

  ngOnInit() {

  }
}

