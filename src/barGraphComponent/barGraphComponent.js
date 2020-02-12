import React from 'react';
import * as d3 from "d3";
import data from '../buildings.json'


class BarGraphComponent extends React.Component {

constructor(props){
  super(props)
  this.myDiv = React.createRef();
  
}

componentDidMount(){

  data.forEach(item=>{
    item.height= +item.height
  })

  var margin={
    left:100,
    right:10,
    top:10,
    bottom:100
  }

  var height= 400 - margin.top - margin.bottom;
  var width= 600 - margin.right - margin.left;

  const x= d3.scaleBand()
               .domain(data.map((item)=>item.name))
               .range([0,width])
               .paddingInner(0.3)
               .paddingOuter(0.3)

   const y= d3.scaleLinear()
               .domain([0, d3.max(data,(item)=>item.height)])
               .range([0,height]);
   const myColor = d3.scaleOrdinal()
                      .domain(data.map((item)=>item.name))
                      .range(d3.schemeSet3);
  
   const svg=d3.select(this.myDiv.current).append('svg')
          .attr("width", width + margin.right + margin.left)
          .attr("height", height + margin.top + margin.bottom);

   var g=svg.append("g").attr("transform", `translate( ${margin.left} , ${margin.top})`)

   var xAxisCall= d3.axisBottom(x);
   g.append("g").attr("class", "x-axis")
                 .attr("transform", `translate( ${0}, ${height+margin.top+10})`)
                 .call(xAxisCall)
                 .selectAll('text')
                   .attr("y",10)
                   .attr("x",-5)
                   .attr("text-anchor", 'end')
                   .attr("transform", "rotate(-50)");

   var yAxisCall= d3.axisLeft(y);
   g.append("g").attr("class", "y-axis")
                 .attr("transform", `translate( ${0}, ${margin.top})`)
                 .call(yAxisCall)

   const rects= g.selectAll('rect').data(data);

  rects.enter().append('rect')
                .attr('y', 10)
                .attr('x', (item, index)=>{
                  return x(item.name)
                })
                .attr("width", x.bandwidth)
                .attr("height", (item, index)=>{
                  return y(item.height)
                })
                .attr("fill", (item, index)=>{
                  return myColor(item.name)
                })
}

render(){
  return (
      <div ref={this.myDiv}>
      </div>
  )
}
}

export default BarGraphComponent;
