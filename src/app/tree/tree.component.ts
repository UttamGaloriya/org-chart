import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { treeData } from '../data';

interface ChartData {
  name: string;
  designation: string;
  experience: number;
  department: string;
  children?: ChartData[];
}
@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  @ViewChild('chartContainer', { static: true }) chartContainer: any
  private svg!: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private zoom!: d3.ZoomBehavior<Element, unknown>;
  chartData: any = {
    name: 'atul',
    designation: 'CEO',
    experience: 20,
    department: "department",
    children: [
      {
        name: 'amul', department: "department",
        designation: 'Manager 1',
        experience: 20,
        children: [
          {
            name: 'amul', department: "department",
            designation: 'Team Lead 1',
            experience: 20,
          },
          {
            name: 'amul', department: "department",
            designation: 'Team Lead 2',
            children: [
              {
                name: 'amul', department: "department",
                designation: 'dev 1',
                children: [
                  {
                    name: 'amul',
                    department: "department",
                    designation: 'dev 11'
                  },
                  {
                    name: 'amul',
                    department: "department",
                    designation: 'dev 12',
                    children: [
                      {
                        name: 'amul',
                        department: "department",
                        designation: 'dev 121'
                      },
                      {
                        name: 'amul',
                        department: "department",
                        designation: 'dev 122'
                      },
                      {
                        name: 'amul',
                        department: "department",
                        designation: 'dev 123'
                      },
                      {
                        name: 'amul',
                        department: "department",
                        designation: 'dev 124'
                      }
                    ]
                  }
                ]
              },
              {
                name: 'amul',
                department: "department",
                designation: 'dev 2',
                children: [
                  {
                    name: 'amul',
                    department: "department",
                    designation: 'dev 21',
                    experience: 2,

                  },
                  {
                    department: "department",
                    name: 'amul',
                    designation: 'dev 22'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'amul',
        department: "department",
        designation: 'Manager 2',
        children: [
          {
            name: 'amul', department: "department",
            designation: 'Team Lead 3'
          },
          {
            name: 'amul', department: "department",
            designation: 'Team Lead 4'
          }
        ]
      }
    ]
  };
  chartDatax: any = {
    name: 'atulfdgd',
    designation: 'CEO',
    experience: 20,
    children: [
      {
        name: 'amfufvgdfgl',
        designation: 'Manfhjgjager 1',
        experience: 20,
        children: [
          {
            name: 'amul',
            designation: 'Team Lead 1',
            experience: 20,
          },
          {
            name: 'amdsul',
            designation: 'Team ghkjhkhjlkjLead 2',
            children: [
              {
                name: 'amsul',
                designation: 'dgkhjkv 1',
                children: [
                  {
                    name: 'amul',

                    designation: 'dev 11'
                  },
                  {
                    name: 'amsgful',

                    designation: 'devfghgfj 12',
                    children: [
                      {
                        name: 'amul',

                        designation: 'dev 121'
                      },
                      {
                        name: 'amul',

                        designation: 'dev 122'
                      },
                      {
                        name: 'amul',

                        designation: 'dev 123'
                      },
                      {
                        name: 'amfgjhfgjudfgl',

                        designation: 'dev 1gkghk24'
                      }
                    ]
                  }
                ]
              },
              {
                name: 'amul',

                designation: 'dev 2',
                children: [
                  {
                    name: 'amul',

                    designation: 'dev 21',
                    experience: 2,

                  },
                  {
                    name: 'amul',
                    designation: 'dev 22'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'amul',

        designation: 'Manager 2',
        children: [
          {
            name: 'amul',
            designation: 'Team Lead 3'
          },
          {
            name: 'amul',
            designation: 'Team Lead 4'
          }
        ]
      }
    ]
  };

  constructor() { }
  ngOnInit(): void {
    const container = this.chartContainer?.nativeElement;
    //function make
    const onclick = (event: any, d: any) => {
      console.log("clicked", d); if (d.children) {
        d.children = null; // Collapse the sub-branch
      } else {
        d.children = d.data.children; // Expand the sub-branch
      }
      this.chartData = this.chartDatax
      console.log("hi")
    }


    function mydata(data: any) {

      if (container) {

        console.log("hiddd")
        // Create an SVG element within the container
        const svg = d3.select(container)
          .append('svg')
          .attr('width', '100%')
          .attr('height', '100%');

        // Set the width and height of the chart
        const width = container.offsetWidth - 500;
        const height = container.offsetHeight;

        // Define the tree layout
        const treeLayout = d3.tree<ChartData>().size([height, width]);

        // Create the hierarchy from the chart data
        const nodes = d3.hierarchy(data);

        // Generate the tree layout
        const treeData = treeLayout(nodes);

        // Generate the links between nodes
        const links = treeData.links();

        // Generate the descendants of the tree
        const descendants = treeData.descendants();

        // Create the links between nodes using SVG paths
        const link = svg.selectAll('.link')
          .data(links)
          .enter()
          .append('path')
          .attr('class', 'link')
          .transition()
          .attr('d', d => {
            return `M${d.source.y},${d.source.x}
              C${(d.source.y + d.target.y) / 2},${d.source.x}
               ${(d.source.y + d.target.y) / 2},${d.target.x}
               ${d.target.y},${d.target.x}`;
          });

        // Create the nodes as circles and add text labels
        const node = svg.selectAll('.node')
          .data(descendants)
          .enter()
          .append('g')
          .attr('class', 'node')
          .attr('transform', d => `translate(${d.y},${d.x})`);


        node.append('rect')
          .attr('width', 200)
          .attr('height', 70)
          .attr('x', -90)
          .attr('y', -25)
          .classed('custom-node', true).transition();

        node.append('text')
          .attr('dy', '0.15em') // Adjust the vertical alignment of the text
          .attr('text-anchor', 'middle')
          .classed('custom-text', true) // Center the text horizontally
          .text(d => "Name  " + d.data.name); // Use the data property to set the text content

        node.append('text')
          .attr('dy', '1.1em') // Adjust the vertical alignment of the text
          .attr('text-anchor', 'middle')
          .classed('custom-text', true)// Center the text horizontally
          .text(d => "Designation  " + d.data.designation); // Use the data property to set the text content

        node.append('text')
          .attr('dy', '2.1em') // Adjust the vertical alignment of the text
          .attr('text-anchor', 'middle')
          .classed('custom-text', true) // Center the text horizontally
          .text(d => "Department  " + d.data.department); // Use the data property to set the text content
        ;
        node.filter((d: any) => d.children)
          .append('circle')
          .attr('r', 10)
          .attr('cx', 105)
          .attr('cy', 10)
          .on('click', onclick)

      }
    }

    mydata(this.chartData)
  };






}








