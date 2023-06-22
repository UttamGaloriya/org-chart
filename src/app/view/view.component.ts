import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { chartData } from '../org.data';

interface ChartData {
  name: string;
  designation: string;
  experience: number;
  department: string;
  children?: ChartData[];
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  Id: number = -1
  chartData = chartData
  node!: ChartData

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((res) => {
      this.Id = parseInt(res['id'], 10);
    });

  }

  ngOnInit(): void {
    this.node = this.getNodeById(chartData, this.Id);

  }
  getNodeById = (data: any, id: number): any | null => {
    if (data.id === id) {
      return data;
    } else if (data.children) {
      for (const child of data.children) {
        const foundNode = this.getNodeById(child, id);
        if (foundNode) {
          return foundNode;
        }
      }
    }
    return null;
  };



}
