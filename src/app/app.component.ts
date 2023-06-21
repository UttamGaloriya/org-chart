import { Component } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'org-chart';
  data: any;


  ngOnInit() {
    d3.csv(
      'https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv'
    ).then(data => {
      this.data = data;
    });
  }
}
