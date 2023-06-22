import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { chartData } from '../org.data';

@Component({
  selector: 'app-learn2',
  templateUrl: './learn2.component.html',
  styleUrls: ['./learn2.component.scss']
})
export class Learn2Component implements OnInit {
  // @ViewChild('chartContainer') chartContainer: ElementRef;
  @ViewChild('chartContainer', { static: true }) chartContainer: any
  chartData: any = chartData;
  constructor() { }

  ngOnInit() {
    this.createTree();
  }

  createTree(): void {
    const container = this.chartContainer.nativeElement;

    const onclick = (event: any, d: any) => {
      if (d.children) {
        d.children = null; // Collapse the sub-branch
      } else {
        d.children = d._children; // Expand the sub-branch
      }
      debugger
      this.updateTree(d);
    };


    // const treeLayout = d3.tree().nodeSize([70, 200]);


    const svg = d3.select(container)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .style('margin', 10);

    const width = container.offsetWidth - 500;
    const height = container.offsetHeight;
    const treeLayout = d3.tree<any>().size([height, width]);
    const nodes = d3.hierarchy(this.chartData);
    const treeData = treeLayout(nodes);


    const link = svg.selectAll('.link')
      .data(treeData.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', (d: any) => {
        return `M${d.source.y},${d.source.x}
          C${d.source.y},${d.source.x}
           ${d.source.y},${d.target.x}
           ${d.target.y},${d.target.x}`;
        // return `M${d.source.y},${d.source.x}
        //   C${(d.source.y + d.target.y) / 2},${d.source.x}
        //    ${(d.source.y + d.target.y) / 2},${d.target.x}
        //    ${d.target.y},${d.target.x}`;
      });

    const node = svg.selectAll('.node')
      .data(treeData.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => `translate(${d.y},${d.x})`);


    node.append('rect')
      .attr('width', 30)
      .attr('height', 30)
      .attr('x', 0)
      .attr('y', -15)
      .classed('custom-node', true);

    // node.append('text')
    //   .attr('dy', '0.15em')
    //   .attr('text-anchor', 'middle')
    //   .classed('custom-text', true)
    //   .text((d: any) => "Name: " + d.data.name);
    // node.append('text')
    //   .attr('dy', '1.1em')
    //   .attr('text-anchor', 'middle')
    //   .classed('custom-text', true)
    //   .text((d: any) => "Designation: " + d.data.designation);
    // node.append('text')
    //   .attr('dy', '2.1em')
    //   .attr('text-anchor', 'middle')
    //   .classed('custom-text', true)
    //   .text((d: any) => "Department: " + d.data.department);
    node.filter((d: any) => d.children)
      .append('circle')
      .attr('r', 10)
      .attr('cx', 30)
      .attr('cy', 0)
      .on('click', onclick);
  }

  updateTree(source: any): void {
    const treeLayout = d3.tree().nodeSize([70, 200]);
    const nodes = d3.hierarchy(this.chartData);
    const treeData = treeLayout(nodes);
    const svg = d3.select(this.chartContainer.nativeElement).select('svg');
    const link = svg.selectAll('.link')
      .data(treeData.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', (d: any) => {
        return `M${d.source.y},${d.source.x}
          C${(d.source.y + d.target.y) / 2},${d.source.x}
           ${(d.source.y + d.target.y) / 2},${d.target.x}
           ${d.target.y},${d.target.x}`;
      });
    const node = svg.selectAll('.node')
      .data(treeData.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => `translate(${d.y},${d.x})`);
    node.append('rect')
      .attr('width', 200)
      .attr('height', 70)
      .attr('x', -90)
      .attr('y', -25)
      .classed('custom-node', true);
    node.append('text')
      .attr('dy', '0.15em')
      .attr('text-anchor', 'middle')
      .classed('custom-text', true)
      .text((d: any) => "Name: " + d.data.name);
    node.append('text')
      .attr('dy', '1.1em')
      .attr('text-anchor', 'middle')
      .classed('custom-text', true)
      .text((d: any) => "Designation: " + d.data.designation);
    node.append('text')
      .attr('dy', '2.1em')
      .attr('text-anchor', 'middle')
      .classed('custom-text', true)
      .text((d: any) => "Department: " + d.data.department);
    node.filter((d: any) => d.children)
      .append('circle')
      .attr('r', 10)
      .attr('cx', 105)
      .attr('cy', 10)
      .on('click', (event, d: any) => {
        if (d.children) {
          d.children = null; // Collapse the sub-branch
        } else {
          d.children = d._children; // Expand the sub-branch
        }
        this.updateTree(d);
      });
  }

}
