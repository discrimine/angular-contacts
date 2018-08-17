import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private titleService: Title, private meta: Meta) {}

  ngOnInit() {
    this.titleService.setTitle('Home');
    this.meta.addTag({ name: 'keywords', content: 'contacts, home, main' });
    this.meta.addTag({ name: 'description', content: 'beautifull contact list' });
  }
}
