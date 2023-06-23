import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { chartData } from '../org.data';
import { Router } from '@angular/router';
interface HierarchyDatum {
  name: string;
  value: number;
  children?: Array<HierarchyDatum>;
}

// const data: HierarchyDatum = {
//   name: "A1",
//   value: 100,
//   children: [
//     {
//       name: "B1",
//       value: 100,
//       children: [
//         {
//           name: "C1",
//           value: 100,
//           children: undefined
//         },
//         {
//           name: "C2",
//           value: 300,
//           children: [
//             {
//               name: "D1",
//               value: 100,
//               children: undefined
//             },
//             {
//               name: "D2",
//               value: 300,
//               children: undefined
//             }
//           ]
//         },
//         {
//           name: "C3",
//           value: 200,
//           children: undefined
//         }
//       ]
//     },
//     {
//       name: "B2",
//       value: 200,
//       children: [
//         {
//           name: "C4",
//           value: 100,
//           children: undefined
//         },
//         {
//           name: "C5",
//           value: 300,
//           children: undefined
//         },
//         {
//           name: "C6",
//           value: 200,
//           children: [
//             {
//               name: "D3",
//               value: 100,
//               children: undefined
//             },
//             {
//               name: "D4",
//               value: 300,
//               children: undefined
//             }
//           ]
//         }
//       ]
//     }
//   ]
// };
const data = chartData

@Component({
  selector: 'app-learn2',
  templateUrl: './learn2.component.html',
  styleUrls: ['./learn2.component.scss']
})

export class Learn2Component implements OnInit {
  title = 'd3tree';
  @ViewChild('chart', { static: true })
  private chartContainer!: ElementRef;


  root: any;
  tree: any;
  treeLayout: any;
  svg: any;

  treeData: any;

  height: number | undefined;
  width: number | undefined;
  margin: any = { top: 500, bottom: 150, left: 200, right: 150 };
  duration: number = 750;
  nodeWidth: number = 20;
  nodeHeight: number = 20;
  nodeRadius: number = 20;
  horizontalSeparationBetweenNodes: number = 5;
  verticalSeparationBetweenNodes: number = 5;
  nodeTextDistanceY: string = "-5px";
  nodeTextDistanceX: number = 5;

  dragStarted: boolean | undefined;
  draggingNode: any;
  nodes!: any[];
  selectedNodeByDrag: any;

  selectedNodeByClick: any;
  previousClickedDomNode: any;
  links: any;

  constructor(private route: Router) { }

  ngOnInit() {
    this.renderTreeChart();
  }

  renderTreeChart() {
    let zoom = d3.zoom()
      .on('zoom', handleZoom);

    function handleZoom(e: any) {
      d3.select('svg g').attr('transform', e.transform)
    }

    function initZoom() {
      d3.select('svg g')
        .call(zoom as any)
    }

    let element: any = this.chartContainer.nativeElement;
    this.width = 100;
    this.height = 100;
    // this.width = element.offsetWidth - this.margin.left - this.margin.right;
    // this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    this.svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight + element.offsetHeight)
      .append("g")
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    // declares a tree layout and assigns the size
    this.tree = d3.tree()
      .size([this.height, this.width])
      .nodeSize([this.nodeWidth + this.horizontalSeparationBetweenNodes, this.nodeHeight + this.verticalSeparationBetweenNodes])
      .separation((a, b) => { return a.parent == b.parent ? 5 : 10 });

    // Assigns parent, children, height, depth
    this.root = d3.hierarchy(data, (d: any) => { return d.children; });
    this.root.x0 = this.height / 2;
    this.root.y0 = 10;

    // Collapse after the second level
    //this.root.children.forEach(collapse);

    this.updateChart(this.root);

    // function collapse(d:any) {
    //   if (d.children) {
    //       d._children = d.children;
    //       d._children.forEach(collapse);
    //       d.children = null;
    //   }
    // }

    initZoom()
  }

  click = (e: any, d: any) => {
    console.log('click');
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    this.updateChart(d);
  }

  updateChart(source: any) {
    const viewPage = (event: any, d: any) => {
      this.route.navigate(['/view', d.data.id])
      console.log(d.data.id)
    }

    let i = 0;
    console.log(source);
    this.treeData = this.tree(this.root);
    this.nodes = this.treeData.descendants();
    this.links = this.treeData.descendants().slice(1);
    this.nodes.forEach((d: any) => { d.y = d.depth * 180 });

    let node = this.svg.selectAll('g.node')
      .data(this.nodes, (d: any) => { return d.id || (d.id = ++i); });

    let nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => {
        return 'translate(' + source.y0 + ',' + source.x0 + ')';
      })
      ;


    nodeEnter.append('rect')
      .attr('height', 100)
      .attr('width', 150)
      .attr('x', -150)
      .attr('y', -50)
      .on('click', viewPage);

    nodeEnter.filter((d: any) => d.children)
      .append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style('fill', (d: any) => {
        return d._children ? '#000' : 'rgb(213 196 219)';
      }).on('click', this.click)
      ;



    nodeEnter.filter((d: any) => d.children)
      .append('text')
      .attr('dx', -4)
      .attr('dy', 6)
      .style('fill', '#000')
      .text('+');



    nodeEnter.append('text')
      .attr('dx', -120)
      .attr('dy', -18)
      .style('color', 'red')
      .text((d: any) => { return d.data.name })
      .on('click', viewPage);

    nodeEnter.append('text')
      .attr('dx', -120)
      .attr('dy', 0)
      .style('color', 'red')
      .text((d: any) => { return d.data.department })
      .on('click', viewPage);

    nodeEnter.append('text')
      .attr('dx', -120)
      .attr('dy', 18)
      .style('color', 'red')
      .text((d: any) => { return d.data.designation })
      .on('click', viewPage);




    // nodeEnter.append('text')
    //   .attr('dy', '.35em')
    //   .attr('x', (d: any) => {
    //     return d.children || d._children ? -13 : 13;
    //   })
    //   .attr('text-anchor', (d: any) => {
    //     return d.children || d._children ? 'end' : 'start';
    //   })
    //   .style('font', '12px sans-serif')
    //   .text((d: any) => { return d.data.id; });

    let nodeUpdate = nodeEnter.merge(node);

    nodeUpdate.transition()
      .duration(this.duration)
      .attr('transform', (d: any) => {
        return 'translate(' + d.y + ',' + d.x + ')';
      });

    nodeUpdate.select('circle.node')
      .attr('r', 10)
      .style('stroke-width', '3px')
      .style('stroke', 'steelblue')
      .style('fill', (d: any) => {
        return d._children ? 'lightsteelblue' : '#fff';
      })
      .attr('cursor', 'pointer');

    let nodeExit = node.exit().transition()
      .duration(this.duration)
      .attr('transform', (d: any) => {
        return 'translate(' + source.y + ',' + source.x + ')';
      })
      .remove();

    nodeExit.select('circle')
      .attr('r', 1e-6);

    nodeExit.select('text')
      .style('fill-opacity', 1e-6);

    let link = this.svg.selectAll('path.link')
      .data(this.links, (d: any) => { return d.id; });

    let linkEnter = link.enter().insert('path', 'g')
      .attr('class', 'link')
      .style('fill', 'none')
      .style('stroke', '#ccc')
      .style('stroke-width', '2px')
      .attr('d', function (d: any) {
        let o = { x: source.x0, y: source.y0 };
        return diagonal(o, o);
      });

    let linkUpdate = linkEnter.merge(link);

    linkUpdate.transition()
      .duration(this.duration)
      .attr('d', (d: any) => { return diagonal(d, d.parent); });

    let linkExit = link.exit().transition()
      .duration(this.duration)
      .attr('d', function (d: any) {
        let o = { x: source.x, y: source.y };
        return diagonal(o, o);
      })
      .remove();

    this.nodes.forEach((d: any) => {
      d.x0 = d.x;
      d.y0 = d.y;
    });

    function diagonal(s: { x: any; y: any; }, d: { x: any; y: any; }) {
      let path = `M ${s.y} ${s.x}
                  C ${(s.y + d.y) / 2} ${s.x},
                  ${(s.y + d.y) / 2} ${d.x},
                  ${d.y} ${d.x}`;
      return path;
    }
  }

}
