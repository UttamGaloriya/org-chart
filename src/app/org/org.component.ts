import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { OrgChart } from 'd3-org-chart';
@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.scss']
})
export class OrgComponent implements OnInit {
  @ViewChild('chartContainer')
  chartContainer!: ElementRef;
  @Input() data: any[] | undefined;
  chart: any;

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    if (!this.chart) {
      this.chart = new OrgChart();
    }
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }
  updateChart() {
    if (!this.data) {
      return;
    }
    if (!this.chart) {
      return;
    }
    this.chart
      .container(this.chartContainer.nativeElement)
      .data(this.data)
      .nodeWidth((d: any) => 200)
      .nodeHeight((d: any) => 120)
      .render();
  }
}
