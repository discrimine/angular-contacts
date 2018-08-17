import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  private id: number;
  private users: any;

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
    this.usersService.changeUser(this.id, body);
    alert('successfully changed');
    this.usersService.getUser(this.id)
    .subscribe( users => {
      this.users = users['attributes'];
    });
  }

  user_delete() {
    this.usersService.deleteUser(this.id);
    alert('successfuly deleted');
    this.router.navigate(['/fullList']);
  }

  ngOnInit() {
    this.route.params
    .subscribe( params => {
      this.id = + params['id'];
    });
    this.usersService.getUser(this.id)
    .subscribe( users => {
      this.users = users['attributes'];
    });

  }

}
