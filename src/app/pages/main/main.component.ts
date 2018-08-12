import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(titleService: Title, meta: Meta) {
    titleService.setTitle('Home');
    meta.addTag({ name: 'keywords', content: 'contacts, home, main' });
    meta.addTag({ name: 'description', content: 'beautifull contact list' })
  }

  ngOnInit() {
  }

}
