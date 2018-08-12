import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private route: ActivatedRoute, private usersService: UsersService) {
    
   }

  id: number;
  users = {
  };

  user_edit(event: any, userId, editName, editSurname, editDate, editEmail ) {
    fetch('http://angulartest.vivasg.com/human/'+this.id, {
      method: 'PATCH',
      body: JSON.stringify({
        "data": {
          "type": "human", "id": this.id,
          "attributes": {
            "name_first": editName.value,
            "name_last": editSurname.value,
            "birthday": editDate.value,
            "email": editEmail.value
          }
        }
      }),
      headers: {
        "Accept": "application/vnd.api+json",
        "Accept-Language": "uk",
        "Content-Type": "application/vnd.api+json",
        "Content-Language": "uk"
      }
    })
  };


  user_delete(event: any, userId) {
    fetch("http://angulartest.vivasg.com/human/" + userId.innerText, {
      method: 'delete',
      mode: 'cors',
      headers: {
        "Accept": "application/vnd.api+json",
        "Accept-Encoding": "utf-8",
        "Accept-Language": "uk",
        "Content-Type": "application/vnd.api+json",
        "Content-Language": "uk"
      }
    });
    setTimeout(() => {
      this.usersService.getUsers("http://angulartest.vivasg.com/human?page[limit]=5").subscribe(users => {
        this.users = users;
      })
    }, 100);
  };


  userName;
  ngOnInit() {
    this.route.params
    .subscribe( params => {
      this.id = + params['id'];
    });
    this.usersService.getUsers("http://angulartest.vivasg.com/human/"+this.id)
    .subscribe( users => {
      this.users = users['attributes'];
      console.log(this.users)
    });
    
  }

}
