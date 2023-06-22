import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-learn2',
  templateUrl: './learn2.component.html',
  styleUrls: ['./learn2.component.scss']
})
export class Learn2Component implements OnInit {
  private chartData: any = {
    name: 'CEO',
    children: [
      {
        name: 'CTO',
        children: [
          {
            name: 'Engineering Manager',
            children: [
              { name: 'Senior Engineer' },
              { name: 'Senior Engineer' },
              { name: 'Junior Engineer' }
            ]
          },
          {
            name: 'Product Manager',
            children: [
              { name: 'Senior Product Analyst' },
              { name: 'Product Designer' }
            ]
          }
        ]
      },
      {
        name: 'CFO'
      },
      {
        name: 'COO',
        children: [
          {
            name: 'Operations Manager',
            children: [
              { name: 'Senior Operations Analyst' },
              { name: 'Operations Assistant' }
            ]
          },
          {
            name: 'Customer Support Manager',
            children: [
              { name: 'Senior Support Specialist' },
              { name: 'Support Specialist' }
            ]
          }
        ]
      },
      {
        name: 'CMO',
        children: [
          {
            name: 'Marketing Manager',
            children: [
              { name: 'Senior Marketing Analyst' },
              { name: 'Marketing Coordinator' }
            ]
          },
          {
            name: 'Public Relations Manager',
            children: [
              { name: 'PR Specialist' },
              { name: 'PR Assistant' }
            ]
          }
        ]
      }
    ]
  };
  constructor() { }

  ngOnInit() {
    const width = 800;
    const height = 600;

    const svg = d3.select('#chartContainer')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const root = d3.hierarchy(this.chartData);
    const treeLayout = d3.tree().size([height, width - 100]);
    treeLayout(root);

    const nodes = root.descendants();
    const links = root.links();

    // Add links
    svg.selectAll('.link')
      .data(links)
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', (d: any) => {
        return 'M' + d.source.y + ',' + d.source.x
          + 'C' + (d.source.y + d.target.y) / 2 + ',' + d.source.x
          + ' ' + (d.source.y + d.target.y) / 2 + ',' + d.target.x
          + ' ' + d.target.y + ',' + d.target.x;
      });

    // Add nodes
    const nodeGroup = svg.selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => 'translate(' + d.y + ',' + d.x + ')');

    nodeGroup.append('circle')
      .attr('r', 5);

    nodeGroup.append('text')
      .attr('dy', '0.32em')
      .attr('x', (d: any) => d.children ? -8 : 8)
      .attr('text-anchor', (d: any) => d.children ? 'end' : 'start')
      .text((d: any) => d.data.name);

    // Function to collapse nodes
    const collapse = (d: any) => {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    };

    // Initialize the chart with all nodes collapsed
    if (root.children) {
      root.children.forEach(collapse);
    }
  }

  // Zoom in
  zoomIn() {
    d3.select('#chartContainer svg')
      .transition()
      .duration(500)
      .call(
        d3.zoom().scaleBy as any, // Type assertion to any
        d3.zoomIdentity.scale(2) // Zoom factor
      );
  }

  // Zoom out
  zoomOut() {
    d3.select('#chartContainer svg')
      .transition()
      .duration(500)
      .call(
        d3.zoom().scaleBy as any, // Type assertion to any
        d3.zoomIdentity.scale(0.5) // Zoom factor
      );
  }

  // Expand all nodes
  expandAll() {
    d3.select('#chartContainer svg').selectAll('.node').each((d: any) => {
      if (d._children) {
        d.children = d._children;
        d._children = null;
      }
    });
    this.updateChart();
  }

  // Collapse all nodes
  collapseAll() {
    d3.select('#chartContainer svg').selectAll('.node').each((d: any) => {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      }
    });
    this.updateChart();
  }

  // Function to update the chart
  updateChart() {
    const svg = d3.select('#chartContainer svg');
    const root = d3.hierarchy(this.chartData);
    const treeLayout = d3.tree().size([600, 700]);
    treeLayout(root);

    const nodes = root.descendants();
    const links = root.links();

    svg.selectAll('.link').remove();
    svg.selectAll('.node').remove();

    svg.selectAll('.link')
      .data(links)
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', (d: any) => {
        return 'M' + d.source.y + ',' + d.source.x
          + 'C' + (d.source.y + d.target.y) / 2 + ',' + d.source.x
          + ' ' + (d.source.y + d.target.y) / 2 + ',' + d.target.x
          + ' ' + d.target.y + ',' + d.target.x;
      });

    const nodeGroup = svg.selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => 'translate(' + d.y + ',' + d.x + ')');

    nodeGroup.append('circle')
      .attr('r', 5);

    nodeGroup.append('text')
      .attr('dy', '0.32em')
      .attr('x', (d: any) => d.children ? -8 : 8)
      .attr('text-anchor', (d: any) => d.children ? 'end' : 'start')
      .text((d: any) => d.data.name);
  }

}
