  import { Component, OnInit } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { ReturnStatement } from '@angular/compiler';
  import { UsersService } from '../../user.service';
  import { Router, ActivatedRoute, Params } from '@angular/router';
  import { URLSearchParams } from "@angular/http";
  import { stringify } from '@angular/compiler/src/util';
  import { FormControl, Validators, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
  import { Title, Meta } from '@angular/platform-browser';
  
  
  @Component({
    selector: 'app-root',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.css'],
    providers: [UsersService]
  })
  export class ContactsComponent {
    title = 'adress book';
    users = [];
    add_cont = false;
    show_edit;
    rForm: FormGroup;
    tryAdd = false;
  
    constructor(private usersService: UsersService, fb: FormBuilder, titleService: Title, meta: Meta) {
     this.rForm = fb.group({
       'first_name' : [null, [Validators.required]],
       'last_name' : [null, [Validators.required]],
       'birthday' : [null, [Validators.required]],
       'email' : [null, [Validators.required, Validators.email]]
     })
     titleService.setTitle('Your contacts');
     meta.addTag({ name: 'keywords', content: 'contacts list, contacts book' });
     meta.addTag({ name: 'description', content: 'best contact list in over the world' })
    };
    
    user_subs(link) {
      this.usersService.getUsers(link).subscribe(users => {
        this.users = users;
      })
    }
    //name filter
    user_filter(event: any, filterName) {
      if (filterName.value != "") {
        this.user_subs("http://angulartest.vivasg.com/human?page[limit]=5&filter[name_first]=" + filterName.value + "&page[offset]=");
      } else {
        this.user_subs("http://angulartest.vivasg.com/human?page[limit]=5");
      }
    };
    //email filter
    user_filter_email(event: any, filterEmail) {
      if (filterEmail.value != "") {
        this.user_subs("http://angulartest.vivasg.com/human?page[limit]=5&filter[email]=" + filterEmail.value + "&page[offset]=");
      } else {
        this.usersService.getUsers("http://angulartest.vivasg.com/human?page[limit]=5").subscribe(users => {
          this.users = users;
        })
      }
    };
    //new user
    user_add(event: any, newName, newSurname, newDate, newEmail) {
      if (this.rForm.valid){
        const bodyObj = {
          "data": {
            "type": "human",
            "attributes": {
              "name_first": newName.value,
              "name_last": newSurname.value,
              "birthday": newDate.value,
              "email": newEmail.value
            }
          }
        }
        fetch("http://angulartest.vivasg.com/human", {
          method: 'post',
          mode: 'cors',
          headers: {
            "Accept": "application/vnd.api+json",
            "Accept-Encoding": "utf-8",
            "Accept-Language": "uk",
            "Content-Type": "application/vnd.api+json",
            "Content-Language": "uk"
          }
          , body: JSON.stringify(bodyObj)
        });
        this.usersService.getUsers("http://angulartest.vivasg.com/human?page[limit]=5").subscribe(users => {
          this.users = users;
        })
        this.add_cont = false;
      }else{
        alert('incorrect data');
        this.tryAdd = true;
      }
    };
    //user_delete
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
    // user edit
    userName;
    userSurname;
    userDate;
    userEmail;
    userId;
    user_edit_show(event: any, userId, userName, userSurname, userDate, userEmail){;
      this.userName = userName.innerText;
      this.userSurname = userSurname.innerText;
      this.userDate = userDate.innerText;
      this.userEmail = userEmail.innerText;
      this.userId = userId.innerText;
    }
    // pagination
    pages_array = [];
    number_of_pages = 0;
    a = this.usersService.getUsers("http://angulartest.vivasg.com/human").subscribe(users => {
        this.number_of_pages = users.length;
        for (let i = 0; i < this.number_of_pages/5; i++) {
          this.pages_array.push(i);
        }
      })

    pagi_func(event: any, pageNum){
      pageNum = (parseInt(pageNum.innerText)-1)*5;
      this.usersService.getUsers("http://angulartest.vivasg.com/human?page[limit]=5&page[offset]=" + pageNum).subscribe(users => {
        this.users = users;
      })
    }
  
    ngOnInit(page_number) {
      this.usersService.getUsers("http://angulartest.vivasg.com/human?page[limit]=5").subscribe(users => {
        this.users = users;
      })
    }
  }
  