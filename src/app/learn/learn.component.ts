import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Movie } from '../movie';
import { OrgChart } from 'd3-org-chart';
@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit {
  private datax = [40, 100, 20, 60, 30];
  datau = this.treeData
  private data = {
    "name": "A1",
    "children": [
      {
        "name": "B1",
        "children": [
          {
            "name": "C1",
            "value": 100
          },
          {
            "name": "C2",
            "value": 300
          },
          {
            "name": "C3",
            "value": 200
          }
        ]
      },
      {
        "name": "B2",
        "children": [
          {
            "name": "C11",
            "value": 100
          },
          {
            "name": "C22",
            "value": 300
          },
          {
            "name": "C33",
            "children": [
              {
                "name": "Cx1",
                "value": 100
              },
              {
                "name": "Cx2",
                "value": 300
              },
              {
                "name": "Cx3",
                "value": 200
              }
            ]
          }
        ]
      },
      {
        "name": "B3",
        "children": [
          {
            "name": "Cc1",
            "value": 100
          },
          {
            "name": "Cc2",
            "value": 300
          },
          {
            "name": "Cc3",
            "value": 200
          }
        ]
      }
    ]
  };
  private cities = [
    { name: 'London', population: 8674000 },
    { name: 'New York', population: 8406000 },
    { name: 'Sydney', population: 4293000 },
    { name: 'Paris', population: 2244000 },
    { name: 'Beijing', population: 11510000 }
  ];
  constructor() { }

  ngOnInit(): void {
    // this.circleChart()

    // d3.select('.bars')
    //   .selectAll('rect')
    //   .data(this.cities)
    //   .join('rect')
    //   .attr('height', 20)
    //   .attr('width', function (d, i) { return d.population * 0.00004 })
    //   .attr('y', function (d, i) { return i * 21 })


    // d3.select('.labels')
    //   .selectAll('text')
    //   .data(this.cities)
    //   .join('text')
    //   .attr('y', function (d, i) {
    //     return i * 20 + 13;
    //   })
    //   .text((d:any) => d.name)


    this.treeData(this.data)

  }





  treeData(data: any) {

    var treeLayout = d3.tree()

      .size([400, 200])

    var root = d3.hierarchy(data)

    treeLayout(root)

    d3.select('svg g.nodes')
      .selectAll('circle.node')
      .data(root.descendants())
      .join('circle')
      .classed('node', true)
      .attr('cx', function (d: any) { return d.x; })
      .attr('cy', function (d: any) { return d.y; })
      .attr('r', 4)
      .append('text')
      .text("hello ");


    d3.select('svg g.links')
      .selectAll('line.link')
      .data(root.links())
      .join('line')
      .classed('link', true)
      .attr('x1', function (d: any) { return d.source.x; })
      .attr('y1', function (d: any) { return d.source.y; })
      .attr('x2', function (d: any) { return d.target.x; })
      .attr('y2', function (d: any) { return d.target.y; })
      ;
    d3.select('svg g.nodes')
      .selectAll('text.label')
      .data(root.descendants())
      .join('text')
      .classed('label', true)
      .attr('x', function (d: any) { return d.x; })
      .attr('y', function (d: any) { return d.y - 10; })
      .text(function (d: any) {
        // console.log(d.data.name)
        return d.data.name;
      });
  }

}
