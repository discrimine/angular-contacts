import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { UsersService } from './user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { URLSearchParams } from "@angular/http";
import { stringify } from '@angular/compiler/src/util';

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

  
  

  ngOnInit(page_number) {

  }
}

